import { ArrowRight, Home } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Dune backdrop */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-72 opacity-70"
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

      <p className="text-accent font-serif text-8xl font-semibold sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">{t("title")}</h1>
      <p className="text-muted-foreground mt-3 max-w-md text-pretty">
        {t("body")}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">
            <Home />
            {t("home")}
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/programs">
            {t("programs")}
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
