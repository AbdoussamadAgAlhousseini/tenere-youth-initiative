"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { requireAdmin } from "@/lib/auth-guards";
import { milestoneAdminSchema } from "@/lib/validations";
import type { AdminActionState } from "./admin-articles";

function revalidateTimeline() {
  for (const locale of ["fr", "en"]) {
    revalidatePath(`/${locale}/about`);
    revalidatePath(`/${locale}/tenere/timeline`);
  }
}

function parseMilestone(formData: FormData) {
  return milestoneAdminSchema.safeParse({
    year: formData.get("year"),
    textFr: formData.get("textFr"),
    textEn: formData.get("textEn"),
    order: formData.get("order") || 0,
    published: formData.get("published") === "on",
  });
}

export async function createMilestone(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parseMilestone(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  await db.milestone.create({ data: parsed.data });
  revalidateTimeline();
  return { status: "success" };
}

export async function updateMilestone(
  id: string,
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parseMilestone(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  await db.milestone.update({ where: { id }, data: parsed.data });
  revalidateTimeline();
  return { status: "success" };
}

export async function deleteMilestone(id: string) {
  await requireAdmin();
  await db.milestone.delete({ where: { id } });
  revalidateTimeline();
}
