"use server";

import { db } from "@/server/db";
import { contactSchema } from "@/lib/validations";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import type { ActionState } from "./newsletter";

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
    return { status: "success" };
  } catch {
    return { status: "error", message: "server_error" };
  }
}
