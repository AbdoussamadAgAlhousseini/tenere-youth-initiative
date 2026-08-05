import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { BlogCard } from "@/components/cards/blog-card";
import {
  getArticleBySlug,
  getArticleSlugs,
  getRecentArticles,
} from "@/server/repositories/articles";
import { routing } from "@/lib/i18n/routing";
import { formatDate } from "@/lib/utils";

export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  const isEn = locale === "en";
  return {
    title: isEn ? article.titleEn : article.titleFr,
    description: isEn ? article.excerptEn : article.excerptFr,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const t = await getTranslations("pages.news");
  const nav = await getTranslations("nav");
  const isEn = (await getLocale()) === "en";
  const title = isEn ? article.titleEn : article.titleFr;

  const category = article.category;
  const body = isEn ? article.bodyEn : article.bodyFr;
  const readTime = Math.max(1, Math.round(body.split(/\s+/).length / 200));
  const date = article.publishedAt ?? article.createdAt;

  const recent = await getRecentArticles(4);
  const related = recent.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <article>
      <header className="border-b bg-gradient-to-b from-sand-100/60 to-background dark:from-stone-900/60">
        <div className="container max-w-3xl py-14">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: nav("home"), href: "/" },
                { label: nav("news"), href: "/news" },
                { label: title },
              ]}
            />
          </div>
          {category && (
            <p className="text-accent mb-3 text-sm font-semibold uppercase tracking-wide">
              {isEn ? category.nameEn : category.nameFr}
            </p>
          )}
          <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
          <p className="text-muted-foreground mt-4 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              {formatDate(date, locale)}
            </span>
            <span aria-hidden>·</span>
            <span>
              {readTime} {t("readTime")}
            </span>
          </p>
        </div>
      </header>

      <div className="container max-w-3xl py-12">
        <div
          className="aspect-[16/8] rounded-2xl bg-gradient-to-br from-oasis-300 to-oasis-600"
          aria-hidden
        />
        <div className="prose prose-stone dark:prose-invert mt-10 max-w-none">
          <p className="text-lg leading-relaxed text-pretty">{body}</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-secondary/40 border-t">
          <div className="container py-16">
            <h2 className="mb-8 text-2xl font-semibold">{t("related")}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <BlogCard
                  key={a.slug}
                  slug={a.slug}
                  title={isEn ? a.titleEn : a.titleFr}
                  excerpt={isEn ? a.excerptEn : a.excerptFr}
                  category={
                    a.category
                      ? isEn
                        ? a.category.nameEn
                        : a.category.nameFr
                      : undefined
                  }
                  date={formatDate(a.publishedAt ?? a.createdAt, locale)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
