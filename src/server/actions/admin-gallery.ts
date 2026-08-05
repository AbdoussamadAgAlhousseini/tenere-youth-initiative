"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { requireAdmin } from "@/lib/auth-guards";
import { galleryAdminSchema } from "@/lib/validations";
import type { AdminActionState } from "./admin-articles";
import type { MediaType } from "@prisma/client";

function revalidateGallery() {
  for (const locale of ["fr", "en"]) {
    revalidatePath(`/${locale}/gallery`);
    revalidatePath(`/${locale}/tenere/gallery`);
  }
}

function parse(formData: FormData) {
  return galleryAdminSchema.safeParse({
    titleFr: formData.get("titleFr") || undefined,
    titleEn: formData.get("titleEn") || undefined,
    url: formData.get("url") || undefined,
    type: formData.get("type") || "IMAGE",
    album: formData.get("album") || undefined,
    order: formData.get("order") || 0,
  });
}

export async function createGalleryItem(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  const { type, url, ...data } = parsed.data;
  await db.galleryItem.create({
    data: { ...data, type: type as MediaType, url: url ?? "" },
  });
  revalidateGallery();
  return { status: "success" };
}

export async function updateGalleryItem(
  id: string,
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  const { type, url, ...data } = parsed.data;
  await db.galleryItem.update({
    where: { id },
    data: { ...data, type: type as MediaType, url: url ?? "" },
  });
  revalidateGallery();
  return { status: "success" };
}

export async function deleteGalleryItem(id: string) {
  await requireAdmin();
  await db.galleryItem.delete({ where: { id } });
  revalidateGallery();
}
