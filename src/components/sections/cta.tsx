import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  const t = useTranslations("home.cta");

  return (
    <section className="container py-20">
      <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-3xl px-8 py-16 text-center shadow-lg">
        {/* Dune motif */}
        <svg
          aria-hidden
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-32 w-full opacity-15"
        >
          <path
            fill="currentColor"
            d="M0 224l60-16c60-16 180-48 300-42.7C480 160 600 224 720 240s240-16 360-37.3C1200 181 1320 203 1380 213.3l60 10.7v96H0z"
          />
        </svg>
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg opacity-90 text-pretty">{t("body")}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/donate">{t("primary")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/volunteer">{t("secondary")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
