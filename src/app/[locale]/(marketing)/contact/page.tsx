import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/config/site";
import { localeAlternates } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: localeAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <section className="container grid max-w-5xl gap-10 py-16 md:grid-cols-[1.4fr_1fr] md:py-20">
        <ContactForm />

        <aside className="space-y-6">
          <div className="bg-secondary/40 rounded-2xl border p-6">
            <h2 className="mb-4 font-semibold">{t("info.title")}</h2>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-muted-foreground hover:text-foreground flex items-center gap-3 text-sm"
            >
              <Mail className="text-primary size-5" />
              {siteConfig.email}
            </a>
          </div>
          <p className="text-muted-foreground font-serif italic">
            {siteConfig.motto[locale === "en" ? "en" : "fr"]}
          </p>
        </aside>
      </section>
    </>
  );
}
