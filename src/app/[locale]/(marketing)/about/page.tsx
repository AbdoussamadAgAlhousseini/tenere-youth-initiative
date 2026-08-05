import type { Metadata } from "next";
import {
  Compass,
  HeartHandshake,
  Leaf,
  Sprout,
  Target,
  Users,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Leadership } from "@/components/sections/leadership";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("intro") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const milestones = [
    { key: "founding", year: "2019" },
    { key: "programs", year: "2021" },
    { key: "network", year: "2023" },
    { key: "today", year: "2025" },
  ] as const;

  const values = [
    { key: "rooted", Icon: Leaf },
    { key: "youth", Icon: Users },
    { key: "solidarity", Icon: HeartHandshake },
    { key: "sustainability", Icon: Sprout },
  ] as const;

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />

      {/* History timeline */}
      <section className="container max-w-4xl py-16 md:py-20">
        <h2 className="mb-8 text-2xl font-semibold">{t("history.title")}</h2>
        <p className="text-muted-foreground mb-10 max-w-3xl text-pretty">
          {t("history.body")}
        </p>
        <ol className="relative space-y-8 border-l pl-8">
          {milestones.map((m) => (
            <li key={m.key} className="relative">
              <span className="bg-primary absolute -left-[2.6rem] top-1 flex size-6 items-center justify-center rounded-full text-xs font-bold text-primary-foreground">
                •
              </span>
              <p className="text-accent font-serif text-lg font-semibold">
                {m.year}
              </p>
              <p className="text-muted-foreground">
                {t(`history.milestones.${m.key}`)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Vision & Mission */}
      <section className="bg-secondary/40 border-y">
        <div className="container grid max-w-5xl gap-6 py-16 md:grid-cols-2 md:py-20">
          {[
            { Icon: Compass, title: t("vision.title"), body: t("vision.body") },
            { Icon: Target, title: t("mission.title"), body: t("mission.body") },
          ].map(({ Icon, title, body }) => (
            <article
              key={title}
              className="bg-card flex flex-col gap-4 rounded-2xl border p-8 shadow-sm"
            >
              <span className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
                <Icon className="size-6" />
              </span>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground text-pretty">{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container max-w-5xl py-16 md:py-20">
        <h2 className="mb-10 text-center text-2xl font-semibold">
          {t("values.title")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ key, Icon }) => (
            <div
              key={key}
              className="bg-card flex flex-col gap-3 rounded-xl border p-6 text-center"
            >
              <span className="bg-accent/10 text-accent mx-auto flex size-12 items-center justify-center rounded-xl">
                <Icon className="size-6" />
              </span>
              <h3 className="font-semibold">{t(`values.items.${key}.title`)}</h3>
              <p className="text-muted-foreground text-sm text-pretty">
                {t(`values.items.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Women-led leadership team */}
      <div className="bg-secondary/40 border-t">
        <Leadership />
      </div>
    </>
  );
}
