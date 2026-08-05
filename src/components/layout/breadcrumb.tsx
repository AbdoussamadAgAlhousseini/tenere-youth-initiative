import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";

export type Crumb = { label: string; href?: string };

/** Accessible breadcrumb trail for detail pages. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const t = useTranslations();

  return (
    <nav aria-label={t("breadcrumb")}>
      <ol className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight className="size-3.5 shrink-0" aria-hidden />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
