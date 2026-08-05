import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.legal" });
  return { title: t("termsTitle"), robots: { index: false } };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.legal");

  return (
    <>
      <PageHeader title={t("termsTitle")} intro={t("intro")} />
      <section className="container max-w-3xl py-16">
        <p className="text-muted-foreground">{t("intro")}</p>
      </section>
    </>
  );
}
