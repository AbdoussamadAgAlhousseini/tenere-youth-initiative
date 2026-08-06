"use server";

import { db } from "@/server/db";
import { contactSchema } from "@/lib/validations";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendMail } from "@/lib/email";
import type { ActionState } from "./newsletter";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Record a contact message (honeypot + rate limited). */
export async function sendContactMessage(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const ip = await getClientIp();
  if (!rateLimit(`contact:${ip}`, 3, 60_000).success) {
    return { status: "error", message: "rate_limited" };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: "invalid" };
  }

  // Honeypot filled → silently accept without storing (bot).
  if (parsed.data.website) {
    return { status: "success" };
  }

  try {
    const { name, email, subject, message } = parsed.data;
    await db.contactMessage.create({ data: { name, email, subject, message } });

    // Best-effort email notification (never fails the submission).
    try {
      await sendMail({
        subject: `Nouveau message de contact : ${subject}`,
        replyTo: email,
        text: `Nom : ${name}\nEmail : ${email}\nSujet : ${subject}\n\n${message}`,
        html: `<p><strong>Nom :</strong> ${escapeHtml(name)}<br/>
<strong>Email :</strong> ${escapeHtml(email)}<br/>
<strong>Sujet :</strong> ${escapeHtml(subject)}</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      });
    } catch {
      // ignore email errors — the message is already stored
    }

    return { status: "success" };
  } catch {
    return { status: "error", message: "server_error" };
  }
}
