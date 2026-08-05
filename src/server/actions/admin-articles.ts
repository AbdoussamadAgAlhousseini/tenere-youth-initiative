"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { requireAdmin } from "@/lib/auth-guards";
import { articleAdminSchema } from "@/lib/validations";
import type { ArticleStatus } from "@prisma/client";

export type AdminActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field errors keyed by field name. */
  errors?: Record<string, string>;
};

function revalidateArticles(slug?: string) {
  for (const locale of ["fr", "en"]) {
    revalidatePath(`/${locale}/news`);
    revalidatePath(`/${locale}/tenere/articles`);
    revalidatePath(`/${locale}`);
    if (slug) revalidatePath(`/${locale}/news/${slug}`);
  }
}

function parse(formData: FormData) {
  return articleAdminSchema.safeParse({
    slug: formData.get("slug"),
    titleFr: formData.get("titleFr"),
    titleEn: formData.get("titleEn"),
    excerptFr: formData.get("excerptFr"),
    excerptEn: formData.get("excerptEn"),
    bodyFr: formData.get("bodyFr"),
    bodyEn: formData.get("bodyEn"),
    categoryId: formData.get("categoryId") || undefined,
    status: formData.get("status"),
  });
}

export async function createArticle(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const session = await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { status: "error", message: "invalid" };
  }

  const { categoryId, status, ...data } = parsed.data;
  try {
    await db.article.create({
      data: {
        ...data,
        status: status as ArticleStatus,
        categoryId: categoryId || null,
        authorId: session.user.id,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });
  } catch {
    return { status: "error", message: "slug_taken" };
  }
  revalidateArticles(data.slug);
  return { status: "success" };
}

export async function updateArticle(
  id: string,
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { status: "error", message: "invalid" };
  }

  const { categoryId, status, ...data } = parsed.data;
  const existing = await db.article.findUnique({ where: { id } });
  try {
    await db.article.update({
      where: { id },
      data: {
        ...data,
        status: status as ArticleStatus,
        categoryId: categoryId || null,
        publishedAt:
          status === "PUBLISHED"
            ? (existing?.publishedAt ?? new Date())
            : null,
      },
    });
  } catch {
    return { status: "error", message: "slug_taken" };
  }
  revalidateArticles(data.slug);
  return { status: "success" };
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  const article = await db.article.findUnique({ where: { id } });
  await db.article.delete({ where: { id } });
  revalidateArticles(article?.slug);
}
