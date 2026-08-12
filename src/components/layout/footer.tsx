import type { ComponentType } from "react";
import { Facebook, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";
import { mainNav, getInvolvedNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "./logo";
import { LocaleSwitcher } from "./locale-switcher";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type SocialLink = {
  href: string;
  Icon: ComponentType<{ className?: string }>;
  label: string;
};

const socialLinks: SocialLink[] = [
  ...(siteConfig.social.linkedin
    ? [{ href: siteConfig.social.linkedin, Icon: Linkedin, label: "LinkedIn" }]
    : []),
  ...(siteConfig.social.facebook
    ? [{ href: siteConfig.social.facebook, Icon: Facebook, label: "Facebook" }]
    : []),
  ...(siteConfig.social.whatsapp
    ? [{ href: siteConfig.social.whatsapp, Icon: WhatsAppIcon, label: "WhatsApp" }]
    : []),
  { href: `mailto:${siteConfig.email}`, Icon: Mail, label: "Email" },
];

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary/40 border-t">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-muted-foreground max-w-xs text-sm">
            {t("tagline")}
          </p>
          <div className="flex gap-2">
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground hover:bg-background hover:text-foreground rounded-md border p-2 transition-colors"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label={t("explore")}>
          <h2 className="mb-4 text-sm font-semibold">{t("explore")}</h2>
          <ul className="space-y-2.5 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("getInvolved")}>
          <h2 className="mb-4 text-sm font-semibold">{t("getInvolved")}</h2>
          <ul className="space-y-2.5 text-sm">
            {getInvolvedNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold">{t("legal")}</h2>
          <ul className="text-muted-foreground space-y-2.5 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-foreground">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-foreground">
                {t("terms")}
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-foreground"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
          <div className="mt-4">
            <LocaleSwitcher />
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {year} {siteConfig.name}. {t("rights")}
          </p>
          <p className="font-serif italic">{siteConfig.motto.en}</p>
        </div>
      </div>
    </footer>
  );
}
