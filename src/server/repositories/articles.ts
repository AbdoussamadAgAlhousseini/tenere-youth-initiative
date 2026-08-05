import { db } from "@/server/db";
import { ArticleStatus, type Prisma } from "@prisma/client";

const PAGE_SIZE = 9;

type ArticleFilters = {
  page?: number;
  categorySlug?: string;
  tagSlug?: string;
  query?: string;
};

/** Paginated list of published articles with optional filters. */
export async function getArticles({
  page = 1,
  categorySlug,
  tagSlug,
  query,
}: ArticleFilters = {}) {
  const where: Prisma.ArticleWhereInput = {
    status: ArticleStatus.PUBLISHED,
    ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    ...(tagSlug ? { tags: { some: { slug: tagSlug } } } : {}),
    ...(query
      ? {
          OR: [
            { titleFr: { contains: query, mode: "insensitive" } },
            { titleEn: { contains: query, mode: "insensitive" } },
            { excerptFr: { contains: query, mode: "insensitive" } },
            { excerptEn: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    db.article.findMany({
      where,
      include: { category: true, tags: true, author: true },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.article.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

/** A single published article by slug. */
export function getArticleBySlug(slug: string) {
  return db.article.findFirst({
    where: { slug, status: ArticleStatus.PUBLISHED },
    include: { category: true, tags: true, author: true },
  });
}

/** The most recent published articles (for the home page). */
export function getRecentArticles(take = 3) {
  return db.article.findMany({
    where: { status: ArticleStatus.PUBLISHED },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export function getCategories() {
  return db.category.findMany({ orderBy: { nameFr: "asc" } });
}

export async function getArticleSlugs() {
  const rows = await db.article.findMany({
    where: { status: ArticleStatus.PUBLISHED },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}
