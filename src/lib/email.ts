import "server-only";

import nodemailer from "nodemailer";

// --- Resend (preferred: just an API key, like the akal project) -------------
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;
// Until the domain is verified in Resend, send from the shared test sender.
const RESEND_FROM =
  process.env.RESEND_FROM ??
  "Tenere Youth Initiative <onboarding@resend.dev>";

// --- SMTP fallback (nodemailer) ---------------------------------------------
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT ?? "465");
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASSWORD;
const smtpConfigured = Boolean(smtpHost && smtpUser && smtpPass);

/** True when any email transport is configured. */
export const emailConfigured = Boolean(RESEND_API_KEY || smtpConfigured);

/** Default recipient for notifications. */
function defaultTo() {
  return NOTIFICATION_EMAIL ?? smtpUser ?? undefined;
}

let transporter: nodemailer.Transporter | null = null;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });
  }
  return transporter;
}

type SendMailOptions = {
  subject: string;
  text: string;
  html?: string;
  to?: string;
  replyTo?: string;
};

/**
 * Best-effort transactional email. Prefers Resend (API key), falls back to
 * SMTP. Returns { sent: false } instead of throwing when nothing is
 * configured, so callers can ignore email failures safely.
 */
export async function sendMail(
  opts: SendMailOptions,
): Promise<{ sent: boolean }> {
  const to = opts.to ?? defaultTo();
  if (!to) return { sent: false };
  // Strip CR/LF from the subject to avoid header injection.
  const subject = opts.subject.replace(/[\r\n]+/g, " ").slice(0, 200);

  if (RESEND_API_KEY) {
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

  if (smtpConfigured) {
    await getTransporter().sendMail({
      from: `"Tenere Youth Initiative" <${smtpUser}>`,
      to,
      subject,
      text: opts.text,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    return { sent: true };
  }

  return { sent: false };
}
