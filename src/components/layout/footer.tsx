import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";
import { mainNav, getInvolvedNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "./logo";
import { LocaleSwitcher } from "./locale-switcher";

const socialLinks = [
  { href: siteConfig.social.facebook, Icon: Facebook, label: "Facebook" },
  { href: siteConfig.social.instagram, Icon: Instagram, label: "Instagram" },
  { href: siteConfig.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
  { href: siteConfig.social.youtube, Icon: Youtube, label: "YouTube" },
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
