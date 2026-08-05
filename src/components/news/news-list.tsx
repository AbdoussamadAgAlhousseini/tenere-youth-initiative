"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { BlogCard } from "@/components/cards/blog-card";
import { Input } from "@/components/ui/input";
import { formatDate, cn } from "@/lib/utils";

export type NewsArticle = {
  slug: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  categorySlug: string | null;
  date: string;
};

export type NewsCategory = {
  slug: string;
  nameFr: string;
  nameEn: string;
};

const tones = [
  "from-oasis-300 to-oasis-600",
  "from-sand-300 to-sand-600",
  "from-sky-400 to-sky-700",
];

export function NewsList({
  articles,
  categories,
}: {
  articles: NewsArticle[];
  categories: NewsCategory[];
}) {
  const locale = useLocale();
  const isEn = locale === "en";
  const t = useTranslations("pages.news");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesCategory = !category || a.categorySlug === category;
      const haystack = (
        isEn ? a.titleEn + a.excerptEn : a.titleFr + a.excerptFr
      ).toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [articles, query, category, isEn]);

  const catName = (slug: string | null) => {
    if (!slug) return undefined;
    const c = categories.find((x) => x.slug === slug);
    return c ? (isEn ? c.nameEn : c.nameFr) : slug;
  };

  return (
    <div className="container py-16 md:py-20">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="pl-9"
            aria-label={t("searchPlaceholder")}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory(null)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              !category
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-secondary",
            )}
          >
            {t("allCategories")}
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                category === c.slug
                  ? "bg-primary text-primary-foreground border-primary"
                  : "hover:bg-secondary",
              )}
            >
              {isEn ? c.nameEn : c.nameFr}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center">
          {t("noResults")}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a, i) => (
            <BlogCard
              key={a.slug}
              slug={a.slug}
              title={isEn ? a.titleEn : a.titleFr}
              excerpt={isEn ? a.excerptEn : a.excerptFr}
              category={catName(a.categorySlug)}
              date={formatDate(a.date, locale)}
              tone={tones[i % tones.length]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
