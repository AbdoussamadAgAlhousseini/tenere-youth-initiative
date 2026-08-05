"use client";

import type { ReactNode } from "react";

import { Link, usePathname } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

/** Navigation link that highlights when it matches the current route. */
export function NavLink({
  href,
  children,
  onClick,
  className,
  activeClassName,
  exact = false,
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/" || exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive ? "" : undefined}
      className={cn(className, isActive && activeClassName)}
    >
      {children}
    </Link>
  );
}
