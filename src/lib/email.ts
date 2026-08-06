import "server-only";

import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT ?? "465");
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASSWORD;

/** True when SMTP credentials are present (otherwise sending is skipped). */
export const emailConfigured = Boolean(host && user && pass);

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // SSL for 465, STARTTLS otherwise
      auth: { user, pass },
    });
  }
  return transporter;
}

type SendMailOptions = {
  subject: string;
  text: string;
  html?: string;
  /** Defaults to CONTACT_TO or the SMTP user. */
  to?: string;
  /** Reply-To (e.g. the visitor's email). Must be a validated address. */
  replyTo?: string;
};

/**
 * Best-effort transactional email. Returns { sent: false } instead of throwing
 * when SMTP is not configured, so callers can ignore email failures safely.
 */
export async function sendMail(
  opts: SendMailOptions,
): Promise<{ sent: boolean }> {
  if (!emailConfigured) return { sent: false };

  const to = opts.to ?? process.env.CONTACT_TO ?? (user as string);
  // Strip CR/LF from the subject to avoid header injection.
  const subject = opts.subject.replace(/[\r\n]+/g, " ").slice(0, 200);

  await getTransporter().sendMail({
    from: `"Tenere Youth Initiative" <${user}>`,
    to,
    subject,
    text: opts.text,
    html: opts.html,
    replyTo: opts.replyTo,
  });

  return { sent: true };
}
