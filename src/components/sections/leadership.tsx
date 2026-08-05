import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { leadership, initials } from "@/lib/content/leadership";

export function Leadership() {
  const locale = useLocale();
  const isEn = locale === "en";
  const t = useTranslations("leadership");

  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-accent mb-3 text-sm font-semibold uppercase tracking-wide">
          {t("eyebrow")}
        </p>
        <h2 className="text-3xl font-semibold sm:text-4xl">{t("title")}</h2>
        <p className="text-muted-foreground mt-4 text-lg text-pretty">
          {t("statement")}
        </p>
        <span className="bg-primary/10 text-primary mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
          <Sparkles className="size-4" aria-hidden />
          {t("badge")}
        </span>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {leadership.map((leader) => (
          <li
            key={leader.name}
            className="bg-card flex flex-col items-center gap-4 rounded-2xl border p-8 text-center shadow-sm"
          >
            <div
              className={`flex size-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${leader.tone} ring-4 ring-background`}
            >
              {leader.photo ? (
                <Image
                  src={leader.photo}
                  alt={leader.name}
                  width={96}
                  height={96}
                  className="size-full object-cover"
                />
              ) : (
                <span className="font-serif text-2xl font-semibold text-white">
                  {initials(leader.name)}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{leader.name}</h3>
              <p className="text-primary text-sm font-medium">
                {isEn ? leader.roleEn : leader.roleFr}
              </p>
            </div>
            <p className="text-muted-foreground text-sm text-pretty">
              {isEn ? leader.bioEn : leader.bioFr}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
