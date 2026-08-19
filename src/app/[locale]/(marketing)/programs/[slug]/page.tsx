import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Icon } from "@/components/icon";
import {
  getProgramBySlug,
  getProgramSlugs,
} from "@/server/repositories/programs";
import { routing } from "@/lib/i18n/routing";
import { formatDate } from "@/lib/utils";
import { localeAlternates } from "@/lib/i18n/metadata";

export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await getProgramSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return {};
  const isEn = locale === "en";
  return {
    title: isEn ? program.titleEn : program.titleFr,
    description: isEn ? program.summaryEn : program.summaryFr,
    alternates: localeAlternates(locale, `/programs/${slug}`),
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const t = await getTranslations("pages.programs");
  const nav = await getTranslations("nav");
  const isEn = (await getLocale()) === "en";
  const relatedEvents = program.events;
  const title = isEn ? program.titleEn : program.titleFr;

  return (
    <>
      <header className="border-b bg-gradient-to-b from-sand-100/60 to-background dark:from-stone-900/60">
        <div className="container py-14 md:py-16">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: nav("home"), href: "/" },
                { label: nav("programs"), href: "/programs" },
                { label: title },
              ]}
            />
          </div>
          <div className="flex items-start gap-5">
            <span className="bg-primary/10 text-primary flex size-16 shrink-0 items-center justify-center rounded-2xl">
              <Icon name={program.icon ?? "Sprout"} className="size-8" />
            </span>
            <div>
              <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
              <p className="text-muted-foreground mt-3 max-w-2xl text-lg text-pretty">
                {isEn ? program.summaryEn : program.summaryFr}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="container max-w-3xl py-16">
        <h2 className="mb-4 text-2xl font-semibold">{t("objectives")}</h2>
        <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
          {isEn ? program.descriptionEn : program.descriptionFr}
        </p>
      </section>

      {relatedEvents.length > 0 && (
        <section className="bg-secondary/40 border-y">
          <div className="container max-w-3xl py-14">
            <h2 className="mb-6 text-2xl font-semibold">{t("relatedEvents")}</h2>
            <ul className="space-y-3">
              {relatedEvents.map((e) => (
                <li key={e.slug}>
                  <Link
                    href="/events"
                    className="bg-card hover:border-primary/40 flex items-center gap-4 rounded-xl border p-4 transition-colors"
                  >
                    <CalendarDays className="text-primary size-5 shrink-0" />
                    <div>
                      <p className="font-medium">
                        {isEn ? e.titleEn : e.titleFr}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {formatDate(e.startDate, locale)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="container py-16">
        <div className="bg-primary text-primary-foreground rounded-3xl px-8 py-12 text-center">
          <h2 className="font-serif text-2xl font-semibold">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">{t("ctaBody")}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/volunteer">
                {isEn ? "Volunteer" : "Devenir bénévole"}
                <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/donate">{isEn ? "Donate" : "Faire un don"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
