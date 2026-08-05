import { ArrowRight, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";

export function WomenLedBanner() {
  const t = useTranslations("leadership");

  return (
    <section className="container py-8">
      <div className="bg-secondary/50 relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl border p-8 text-center md:flex-row md:justify-between md:p-10 md:text-left">
        <div className="flex items-center gap-5">
          <span className="bg-accent/15 text-accent flex size-14 shrink-0 items-center justify-center rounded-2xl">
            <Users className="size-7" aria-hidden />
          </span>
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">
              {t("bannerTitle")}
            </h2>
            <p className="text-muted-foreground mt-1 max-w-xl text-pretty">
              {t("bannerBody")}
            </p>
          </div>
        </div>
        <Button asChild variant="outline" className="shrink-0">
          <Link href="/about">
            {t("bannerCta")}
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
