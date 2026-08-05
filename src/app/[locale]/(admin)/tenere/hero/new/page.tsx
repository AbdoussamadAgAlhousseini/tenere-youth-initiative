import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { HeroSlideForm } from "@/components/admin/hero-slide-form";
import { createHeroSlide } from "@/server/actions/admin-hero";

export default async function NewHeroSlidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/hero">
          <ArrowLeft />
          Accueil — slogans
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Nouvelle slide</h1>
      <HeroSlideForm action={createHeroSlide} submitLabel="Créer" />
    </div>
  );
}
