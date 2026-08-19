import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { localeAlternates } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.membership" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: localeAlternates(locale, "/membership"),
  };
}

export default async function MembershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.membership");

  const benefits = ["a", "b", "c", "d"] as const;

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <section className="container grid max-w-5xl gap-10 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h2 className="mb-6 text-2xl font-semibold">{t("benefitsTitle")}</h2>
          <ul className="space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="bg-primary/10 text-primary mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-4" />
                </span>
                <span className="text-pretty">{t(`benefits.${b}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card flex flex-col justify-center gap-5 rounded-2xl border p-8 shadow-sm">
          <Button asChild className="w-full">
            <Link href="/volunteer">{t("cta")}</Link>
          </Button>
          <p className="text-muted-foreground text-center text-xs">
            {t("note")}
          </p>
        </div>
      </section>
    </>
  );
}
