import type { Metadata } from "next";
import { CalendarDays, MapPin, Video } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { getUpcomingEvents } from "@/server/repositories/misc";
import { formatDate } from "@/lib/utils";

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.events" });
  return { title: t("title"), description: t("intro") };
}

const typeTone: Record<string, string> = {
  WEBINAR: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  FORUM: "bg-oasis-500/10 text-oasis-700 dark:text-oasis-300",
  WORKSHOP: "bg-accent/10 text-accent",
  CONFERENCE: "bg-sand-500/10 text-sand-700 dark:text-sand-300",
};

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.events");
  const isEn = (await getLocale()) === "en";
  const events = await getUpcomingEvents();

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <section className="container py-16 md:py-20">
        <h2 className="mb-8 text-xl font-semibold">{t("upcoming")}</h2>
        {events.length === 0 ? (
          <p className="text-muted-foreground">{t("noEvents")}</p>
        ) : (
          <ul className="space-y-4">
            {events.map((e) => (
              <li
                key={e.slug}
                className="bg-card flex flex-col gap-4 rounded-2xl border p-6 shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <div className="flex gap-5">
                  <div className="bg-primary/5 flex size-16 shrink-0 flex-col items-center justify-center rounded-xl">
                    <span className="text-primary font-serif text-2xl font-semibold leading-none">
                      {e.startDate.getDate()}
                    </span>
                    <span className="text-muted-foreground text-xs uppercase">
                      {e.startDate.toLocaleString(locale, { month: "short" })}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeTone[e.type]}`}
                    >
                      {e.type}
                    </span>
                    <h3 className="mt-1.5 text-lg font-semibold">
                      {isEn ? e.titleEn : e.titleFr}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm text-pretty">
                      {isEn ? e.descriptionEn : e.descriptionFr}
                    </p>
                    <div className="text-muted-foreground mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-4" />
                        {formatDate(e.startDate, locale)}
                        {e.endDate ? ` – ${formatDate(e.endDate, locale)}` : ""}
                      </span>
                      <span className="flex items-center gap-1.5">
                        {e.isOnline ? (
                          <Video className="size-4" />
                        ) : (
                          <MapPin className="size-4" />
                        )}
                        {(isEn ? e.locationEn : e.locationFr) ?? ""}
                      </span>
                    </div>
                  </div>
                </div>
                <Button asChild className="shrink-0">
                  <Link href="/contact">{t("register")}</Link>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
