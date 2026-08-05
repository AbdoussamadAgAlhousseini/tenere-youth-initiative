import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import {
  GalleryGrid,
  type GalleryItemDTO,
} from "@/components/gallery/gallery-grid";
import { getGalleryItems } from "@/server/repositories/misc";

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.gallery" });
  return { title: t("title"), description: t("intro") };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.gallery");
  const rows = await getGalleryItems();

  const items: GalleryItemDTO[] = rows.map((g) => ({
    id: g.id,
    titleFr: g.titleFr,
    titleEn: g.titleEn,
    album: g.album,
    url: g.url,
  }));

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <GalleryGrid items={items} />
    </>
  );
}
