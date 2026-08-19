import "server-only";

// Transactional email via Resend (API key only — no SMTP).
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;
const RESEND_FROM =
  process.env.RESEND_FROM ??
  "Tenere Youth Initiative <onboarding@resend.dev>";

/** True when email sending is configured. */
export const emailConfigured = Boolean(RESEND_API_KEY && NOTIFICATION_EMAIL);

type SendMailOptions = {
  subject: string;
  text: string;
  html?: string;
  /** Defaults to NOTIFICATION_EMAIL. */
  to?: string;
  /** Reply-To (e.g. a visitor's validated email). */
  replyTo?: string;
};

/**
 * Best-effort transactional email. Returns { sent: false } instead of throwing
 * when Resend is not configured, so callers can ignore email failures safely.
 */
export async function sendMail(
  opts: SendMailOptions,
): Promise<{ sent: boolean }> {
  const to = opts.to ?? NOTIFICATION_EMAIL;
  if (!RESEND_API_KEY || !to) return { sent: false };

  // Strip CR/LF from the subject to avoid header injection.
  const subject = opts.subject.replace(/[\r\n]+/g, " ").slice(0, 200);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [to],
        subject,
        text: opts.text,
        html: opts.html,
        reply_to: opts.replyTo,
      }),
    });
    return { sent: res.ok };
  } catch {
    return { sent: false };
  }
}
