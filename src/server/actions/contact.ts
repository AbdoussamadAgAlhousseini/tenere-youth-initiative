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

// SEO spam always pushes a promotional link plus ranking/indexing jargon.
// Flagged messages are still stored (nothing lost) but don't trigger an email.
const SPAM_PHRASES = [
  "search index",
  "search results",
  "search engine",
  "first page",
  "seo",
  "back link",
  "backlink",
  "ranking",
  "rank higher",
  "web traffic",
  "list your",
  "helpindex",
  "index your",
  "get listed",
];

function isLikelySpam(name: string, subject: string, message: string): boolean {
  const text = `${name}\n${subject}\n${message}`.toLowerCase();
  const hasLink =
    /https?:\/\/|www\.|[a-z0-9-]+\.(com|org|net|io|xyz|info|biz|ru|top|online|site|shop|club|link)\b/i.test(
      text,
    );
  const hasJargon = SPAM_PHRASES.some((p) => text.includes(p));
  return hasLink && hasJargon;
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
    const spam = isLikelySpam(name, subject, message);
    // Store everything; pre-mark spam as handled so it stays out of the way.
    await db.contactMessage.create({
      data: { name, email, subject, message, handled: spam },
    });

    // Skip the email notification for likely spam (still visible in admin).
    if (spam) return { status: "success" };

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
