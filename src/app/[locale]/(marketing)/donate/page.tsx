import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { DonationWidget } from "@/components/forms/donation-widget";
import { localeAlternates } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.donate" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: localeAlternates(locale, "/donate"),
  };
}

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.donate");

  const impacts = [
    { amount: "25 €", key: "a" },
    { amount: "50 €", key: "b" },
    { amount: "100 €", key: "c" },
  ] as const;

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <section className="container grid max-w-5xl gap-10 py-16 md:grid-cols-[1fr_1.1fr] md:py-20">
        <aside className="space-y-6">
          <h2 className="text-2xl font-semibold">{t("impactTitle")}</h2>
          <ul className="space-y-4">
            {impacts.map((i) => (
              <li
                key={i.key}
                className="bg-secondary/40 flex items-center gap-4 rounded-xl border p-4"
              >
                <span className="text-primary font-serif text-2xl font-semibold">
                  {i.amount}
                </span>
                <span className="text-muted-foreground text-sm text-pretty">
                  {t(`impact.${i.key}`)}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <DonationWidget />
      </section>
    </>
  );
}
