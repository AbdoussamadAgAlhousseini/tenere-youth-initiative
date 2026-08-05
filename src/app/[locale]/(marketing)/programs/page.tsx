import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { ProgramCard } from "@/components/cards/program-card";
import { getPrograms } from "@/server/repositories/programs";

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.programs" });
  return { title: t("title"), description: t("intro") };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.programs");
  const isEn = (await getLocale()) === "en";
  const programs = await getPrograms();

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <section className="container py-16 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
    </>
  );
}
