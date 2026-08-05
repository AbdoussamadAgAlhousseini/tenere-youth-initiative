import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { HeroSlideForm } from "@/components/admin/hero-slide-form";
import { updateHeroSlide } from "@/server/actions/admin-hero";
import { db } from "@/server/db";

export default async function EditHeroSlidePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const item = await db.heroSlide.findUnique({ where: { id } });
  if (!item) notFound();

  const action = updateHeroSlide.bind(null, id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/hero">
          <ArrowLeft />
          Accueil — slogans
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Modifier la slide</h1>
      <HeroSlideForm
        action={action}
        defaults={{
          titleFr: item.titleFr,
          titleEn: item.titleEn,
          subtitleFr: item.subtitleFr ?? "",
          subtitleEn: item.subtitleEn ?? "",
          image: item.image ?? "",
          order: item.order,
          published: item.published,
        }}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
