"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { requireAdmin } from "@/lib/auth-guards";
import { taxonomyAdminSchema } from "@/lib/validations";
import type { AdminActionState } from "./admin-articles";

function revalidateTaxonomy() {
  for (const locale of ["fr", "en"]) {
    revalidatePath(`/${locale}/news`);
    revalidatePath(`/${locale}/tenere/categories`);
    revalidatePath(`/${locale}/tenere/tags`);
  }
}

function parse(formData: FormData) {
  return taxonomyAdminSchema.safeParse({
    slug: formData.get("slug"),
    nameFr: formData.get("nameFr"),
    nameEn: formData.get("nameEn"),
  });
}

// ---- Categories ------------------------------------------------------------

export async function createCategory(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  try {
    await db.category.create({ data: parsed.data });
  } catch {
    return { status: "error", message: "slug_taken" };
  }
  revalidateTaxonomy();
  return { status: "success" };
}

export async function updateCategory(
  id: string,
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  try {
    await db.category.update({ where: { id }, data: parsed.data });
  } catch {
    return { status: "error", message: "slug_taken" };
  }
  revalidateTaxonomy();
  return { status: "success" };
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  await db.category.delete({ where: { id } });
  revalidateTaxonomy();
}

// ---- Tags ------------------------------------------------------------------

export async function createTag(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  try {
    await db.tag.create({ data: parsed.data });
  } catch {
    return { status: "error", message: "slug_taken" };
  }
  revalidateTaxonomy();
  return { status: "success" };
}

export async function updateTag(
  id: string,
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  try {
    await db.tag.update({ where: { id }, data: parsed.data });
  } catch {
    return { status: "error", message: "slug_taken" };
  }
  revalidateTaxonomy();
  return { status: "success" };
}

export async function deleteTag(id: string) {
  await requireAdmin();
  await db.tag.delete({ where: { id } });
  revalidateTaxonomy();
}
