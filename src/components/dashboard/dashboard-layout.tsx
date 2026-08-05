import type { ReactNode } from "react";

import { NavLink } from "@/components/layout/nav-link";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  exact?: boolean;
};

/** Two-column dashboard shell with a sticky sidebar. */
export function DashboardLayout({
  title,
  subtitle,
  items,
  children,
}: {
  title: string;
  subtitle?: string;
  items: DashboardNavItem[];
  children: ReactNode;
}) {
  return (
    <div className="container py-10 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-4">
            <p className="text-lg font-semibold">{title}</p>
            {subtitle && (
              <p className="text-muted-foreground truncate text-sm">
                {subtitle}
              </p>
            )}
          </div>
          <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {items.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                exact={item.exact}
                className="text-muted-foreground hover:bg-secondary hover:text-foreground flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
                activeClassName="bg-secondary text-foreground font-medium"
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
