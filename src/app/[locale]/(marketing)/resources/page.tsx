import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import {
  ResourceList,
  type ResourceItem,
} from "@/components/resources/resource-list";
import { getResources } from "@/server/repositories/misc";
import { localeAlternates } from "@/lib/i18n/metadata";

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.resources" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: localeAlternates(locale, "/resources"),
  };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.resources");
  const rows = await getResources();

  const resources: ResourceItem[] = rows.map((r) => ({
    slug: r.slug,
    titleFr: r.titleFr,
    titleEn: r.titleEn,
    descriptionFr: r.descriptionFr,
    descriptionEn: r.descriptionEn,
    type: r.type,
    fileUrl: r.fileUrl,
    fileFormat: r.fileFormat,
    fileSize: r.fileSize,
  }));

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <ResourceList resources={resources} />
    </>
  );
}
