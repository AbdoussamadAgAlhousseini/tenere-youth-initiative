import { CalendarDays } from "lucide-react";

import { Link } from "@/lib/i18n/navigation";

export function BlogCard({
  slug,
  title,
  excerpt,
  category,
  date,
  tone = "from-oasis-300 to-oasis-600",
}: {
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  date: string;
  tone?: string;
}) {
  return (
    <article className="group bg-card flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Link href={`/news/${slug}`} className="block">
        <div
          className={`aspect-[16/10] bg-gradient-to-br ${tone} relative overflow-hidden transition-transform duration-500 group-hover:scale-105`}
          aria-hidden
        >
          {category && (
            <span className="bg-background/90 text-foreground absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold">
              {category}
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <CalendarDays className="size-3.5" />
          {date}
        </p>
        <h3 className="text-lg font-semibold leading-snug">
          <Link
            href={`/news/${slug}`}
            className="hover:text-primary transition-colors"
          >
            {title}
          </Link>
        </h3>
        <p className="text-muted-foreground line-clamp-3 text-sm text-pretty">
          {excerpt}
        </p>
      </div>
    </article>
  );
}
