import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GalleryForm } from "@/components/admin/gallery-form";
import { createGalleryItem } from "@/server/actions/admin-gallery";

export default async function NewGalleryItemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/gallery">
          <ArrowLeft />
          Galerie
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Nouvelle image</h1>
      <GalleryForm action={createGalleryItem} submitLabel="Ajouter" />
    </div>
  );
}
