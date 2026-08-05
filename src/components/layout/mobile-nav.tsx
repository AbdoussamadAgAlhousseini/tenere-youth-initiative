"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";
import { mainNav, getInvolvedNav } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";

export function MobileNav() {
  const t = useTranslations("nav");
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Lock body scroll while the panel is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  // The panel is portalled to <body> so it is not affected by the header's
  // backdrop-filter (which would otherwise anchor `position: fixed`).
  const panel = (
    <div className="bg-background fixed inset-0 z-[60] flex flex-col lg:hidden">
      <div className="flex h-16 shrink-0 items-center justify-between border-b px-6">
        <Link href="/" onClick={close} aria-label={t("home")}>
          <Logo />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("closeMenu")}
          onClick={close}
        >
          <X className="size-6" />
        </Button>
      </div>
      <nav
        className="flex flex-1 flex-col gap-1 overflow-y-auto p-6"
        aria-label={t("menu")}
      >
        {mainNav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            onClick={close}
            className="hover:bg-secondary rounded-md px-3 py-3 text-lg font-medium"
            activeClassName="bg-secondary text-primary"
          >
            {t(item.key)}
          </NavLink>
        ))}
        <div className="my-4 h-px bg-border" />
        {getInvolvedNav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            onClick={close}
            className="hover:bg-secondary rounded-md px-3 py-3 text-lg font-medium"
            activeClassName="bg-secondary text-primary"
          >
            {t(item.key)}
          </NavLink>
        ))}
        <Button asChild size="lg" className="mt-4">
          <Link href="/donate" onClick={close}>
            {t("donate")}
          </Link>
        </Button>
      </nav>
    </div>
  );

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={t("openMenu")}
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu className="size-6" />
      </Button>

      {open && mounted && createPortal(panel, document.body)}
    </div>
  );
}
