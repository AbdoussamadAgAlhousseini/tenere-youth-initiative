"use server";

import { randomBytes } from "crypto";

import { db } from "@/server/db";
import { newsletterSchema } from "@/lib/validations";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export type ActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

/** Subscribe an email to the newsletter (double opt-in token generated). */
export async function subscribeNewsletter(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const ip = await getClientIp();
  if (!rateLimit(`newsletter:${ip}`, 5, 60_000).success) {
    return { status: "error", message: "rate_limited" };
  }

  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    locale: formData.get("locale") ?? "fr",
    consent: formData.get("consent") === "on" || formData.get("consent") === "true",
  });

  if (!parsed.success) {
    return { status: "error", message: "invalid" };
  }

  const { email, locale } = parsed.data;

  try {
    await db.newsletterSubscriber.upsert({
      where: { email },
      update: { locale },
      create: { email, locale, token: randomBytes(24).toString("hex") },
    });
    return { status: "success" };
  } catch {
    return { status: "error", message: "server_error" };
  }
}
