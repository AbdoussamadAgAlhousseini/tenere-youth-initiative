"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { requireAdmin } from "@/lib/auth-guards";
import { heroSlideAdminSchema } from "@/lib/validations";
import type { AdminActionState } from "./admin-articles";

function revalidateHero() {
  for (const locale of ["fr", "en"]) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/tenere/hero`);
  }
}

function parseSlide(formData: FormData) {
  return heroSlideAdminSchema.safeParse({
    titleFr: formData.get("titleFr"),
    titleEn: formData.get("titleEn"),
    subtitleFr: formData.get("subtitleFr") || "",
    subtitleEn: formData.get("subtitleEn") || "",
    image: formData.get("image") || "",
    order: formData.get("order") || 0,
    published: formData.get("published") === "on",
  });
}

function toData(input: ReturnType<typeof heroSlideAdminSchema.parse>) {
  return {
    titleFr: input.titleFr,
    titleEn: input.titleEn,
    subtitleFr: input.subtitleFr?.trim() ? input.subtitleFr.trim() : null,
    subtitleEn: input.subtitleEn?.trim() ? input.subtitleEn.trim() : null,
    image: input.image?.trim() ? input.image.trim() : null,
    order: input.order,
    published: input.published,
  };
}

export async function createHeroSlide(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parseSlide(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  await db.heroSlide.create({ data: toData(parsed.data) });
  revalidateHero();
  return { status: "success" };
}

export async function updateHeroSlide(
  id: string,
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parseSlide(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  await db.heroSlide.update({ where: { id }, data: toData(parsed.data) });
  revalidateHero();
  return { status: "success" };
}

export async function deleteHeroSlide(id: string) {
  await requireAdmin();
  await db.heroSlide.delete({ where: { id } });
  revalidateHero();
}
