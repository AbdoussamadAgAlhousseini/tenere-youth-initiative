import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { NewsList, type NewsArticle } from "@/components/news/news-list";
import { getArticles, getCategories } from "@/server/repositories/articles";
import { localeAlternates } from "@/lib/i18n/metadata";

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.news" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: localeAlternates(locale, "/news"),
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.news");

  const [{ items }, categories] = await Promise.all([
    getArticles({ page: 1 }),
    getCategories(),
  ]);

  const articles: NewsArticle[] = items.map((a) => ({
    slug: a.slug,
    titleFr: a.titleFr,
    titleEn: a.titleEn,
    excerptFr: a.excerptFr,
    excerptEn: a.excerptEn,
    categorySlug: a.category?.slug ?? null,
    date: (a.publishedAt ?? a.createdAt).toISOString(),
  }));

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <NewsList articles={articles} categories={categories} />
    </>
  );
}
