import { ArrowUpRight } from "lucide-react";

import { Link } from "@/lib/i18n/navigation";
import { Icon } from "@/components/icon";

export function ProgramCard({
  slug,
  icon,
  title,
  summary,
}: {
  slug: string;
  icon: string;
  title: string;
  summary: string;
}) {
  return (
    <Link
      href={`/programs/${slug}`}
      className="group bg-card focus-visible:ring-ring hover:border-primary/40 relative flex flex-col gap-4 rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <span className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon name={icon} className="size-6" />
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm text-pretty">{summary}</p>
      <ArrowUpRight className="text-muted-foreground group-hover:text-primary absolute right-5 top-5 size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
