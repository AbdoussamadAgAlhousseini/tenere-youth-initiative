"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { requireAdmin } from "@/lib/auth-guards";
import { programAdminSchema } from "@/lib/validations";
import type { AdminActionState } from "./admin-articles";
import type { ProgramTheme } from "@prisma/client";

function revalidatePrograms(slug?: string) {
  for (const locale of ["fr", "en"]) {
    revalidatePath(`/${locale}/programs`);
    revalidatePath(`/${locale}/admin/programs`);
    revalidatePath(`/${locale}`);
    if (slug) revalidatePath(`/${locale}/programs/${slug}`);
  }
}

function parse(formData: FormData) {
  return programAdminSchema.safeParse({
    slug: formData.get("slug"),
    theme: formData.get("theme"),
    icon: formData.get("icon") || undefined,
    titleFr: formData.get("titleFr"),
    titleEn: formData.get("titleEn"),
    summaryFr: formData.get("summaryFr"),
    summaryEn: formData.get("summaryEn"),
    descriptionFr: formData.get("descriptionFr"),
    descriptionEn: formData.get("descriptionEn"),
    order: formData.get("order") || 0,
    published: formData.get("published") === "on",
  });
}

export async function createProgram(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };

  const { theme, ...data } = parsed.data;
  try {
    await db.program.create({
      data: { ...data, theme: theme as ProgramTheme },
    });
  } catch {
    return { status: "error", message: "slug_taken" };
  }
  revalidatePrograms(data.slug);
  return { status: "success" };
}

export async function updateProgram(
  id: string,
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };

  const { theme, ...data } = parsed.data;
  try {
    await db.program.update({
      where: { id },
      data: { ...data, theme: theme as ProgramTheme },
    });
  } catch {
    return { status: "error", message: "slug_taken" };
  }
  revalidatePrograms(data.slug);
  return { status: "success" };
}

export async function deleteProgram(id: string) {
  await requireAdmin();
  const program = await db.program.findUnique({ where: { id } });
  await db.program.delete({ where: { id } });
  revalidatePrograms(program?.slug);
}
