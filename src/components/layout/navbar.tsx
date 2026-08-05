import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";
import { mainNav } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { SiteHeader } from "./site-header";

export function Navbar() {
  const t = useTranslations("nav");

  return (
    <SiteHeader>
      <a
        href="#main"
        className="bg-primary text-primary-foreground sr-only rounded-md px-4 py-2 focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50"
      >
        {t("skipToContent")}
      </a>
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={t("home")}>
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label={t("menu")}
        >
          {mainNav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md px-3 py-2 text-sm font-medium transition-colors"
              activeClassName="text-foreground bg-secondary"
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button asChild className="hidden lg:inline-flex">
            <Link href="/donate">{t("donate")}</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </SiteHeader>
  );
}
