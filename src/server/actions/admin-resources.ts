"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { requireAdmin } from "@/lib/auth-guards";
import { resourceAdminSchema } from "@/lib/validations";
import type { AdminActionState } from "./admin-articles";
import type { ResourceType } from "@prisma/client";

function revalidateResources() {
  for (const locale of ["fr", "en"]) {
    revalidatePath(`/${locale}/resources`);
    revalidatePath(`/${locale}/admin/resources`);
  }
}

function parse(formData: FormData) {
  return resourceAdminSchema.safeParse({
    slug: formData.get("slug"),
    titleFr: formData.get("titleFr"),
    titleEn: formData.get("titleEn"),
    descriptionFr: formData.get("descriptionFr"),
    descriptionEn: formData.get("descriptionEn"),
    type: formData.get("type"),
    fileUrl: formData.get("fileUrl"),
    fileFormat: formData.get("fileFormat") || undefined,
    fileSize: formData.get("fileSize") || undefined,
    published: formData.get("published") === "on",
  });
}

export async function createResource(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  const { type, ...data } = parsed.data;
  try {
    await db.resource.create({ data: { ...data, type: type as ResourceType } });
  } catch {
    return { status: "error", message: "slug_taken" };
  }
  revalidateResources();
  return { status: "success" };
}

export async function updateResource(
  id: string,
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  const { type, ...data } = parsed.data;
  try {
    await db.resource.update({
      where: { id },
      data: { ...data, type: type as ResourceType },
    });
  } catch {
    return { status: "error", message: "slug_taken" };
  }
  revalidateResources();
  return { status: "success" };
}

export async function deleteResource(id: string) {
  await requireAdmin();
  await db.resource.delete({ where: { id } });
  revalidateResources();
}
