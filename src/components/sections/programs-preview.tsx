import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "@/components/cards/program-card";
import { getPrograms } from "@/server/repositories/programs";

export async function ProgramsPreview() {
  const t = await getTranslations("home.programs");
  const common = await getTranslations("common");
  const isEn = (await getLocale()) === "en";
  const programs = await getPrograms();

  return (
    <section className="container py-20">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-semibold">{t("title")}</h2>
          <p className="text-muted-foreground mt-2 max-w-xl">{t("subtitle")}</p>
        </div>
        <Button asChild variant="outline" className="shrink-0">
          <Link href="/programs">
            {common("viewAll")}
            <ArrowRight />
          </Link>
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map((p) => (
          <ProgramCard
            key={p.slug}
            slug={p.slug}
            icon={p.icon ?? "Sprout"}
            title={isEn ? p.titleEn : p.titleFr}
            summary={isEn ? p.summaryEn : p.summaryFr}
          />
        ))}
      </div>
    </section>
  );
}
