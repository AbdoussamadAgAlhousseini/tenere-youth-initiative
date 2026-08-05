import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GalleryForm } from "@/components/admin/gallery-form";
import { updateGalleryItem } from "@/server/actions/admin-gallery";
import { db } from "@/server/db";

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const item = await db.galleryItem.findUnique({ where: { id } });
  if (!item) notFound();

  const action = updateGalleryItem.bind(null, id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/gallery">
          <ArrowLeft />
          Galerie
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Modifier l&apos;image</h1>
      <GalleryForm
        action={action}
        defaults={{
          titleFr: item.titleFr ?? "",
          titleEn: item.titleEn ?? "",
          url: item.url,
          type: item.type,
          album: item.album ?? "",
          order: item.order,
        }}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
