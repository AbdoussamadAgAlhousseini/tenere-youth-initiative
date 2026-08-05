import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden">
      {/* Dune gradient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-sand-100 via-background to-background dark:from-stone-900 dark:via-background"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-64 opacity-70"
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 224l60-16c60-16 180-48 300-42.7C480 160 600 224 720 240s240-16 360-37.3C1200 181 1320 203 1380 213.3l60 10.7v96H0z"
            className="fill-sand-200/60 dark:fill-stone-800/60"
          />
          <path
            d="M0 288l80-10.7c80-10.3 240-32.3 400-16C640 277 800 320 960 314.7c160-5.7 320-58.7 400-85.4l80-26.6V320H0z"
            className="fill-oasis-500/10"
          />
        </svg>
      </div>

      <div className="container flex flex-col items-center gap-6 py-24 text-center md:py-32">
        <span className="bg-secondary text-secondary-foreground inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide">
          {t("eyebrow")}
        </span>
        <h1 className="max-w-4xl text-4xl font-semibold sm:text-5xl md:text-6xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg text-pretty">
          {t("subtitle")}
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/membership">
              {t("ctaPrimary")}
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/programs">{t("ctaSecondary")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
