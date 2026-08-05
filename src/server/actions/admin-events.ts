"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { requireAdmin } from "@/lib/auth-guards";
import { eventAdminSchema } from "@/lib/validations";
import type { AdminActionState } from "./admin-articles";
import type { EventType } from "@prisma/client";

function revalidateEvents(slug?: string) {
  for (const locale of ["fr", "en"]) {
    revalidatePath(`/${locale}/events`);
    revalidatePath(`/${locale}/admin/events`);
    revalidatePath(`/${locale}`);
    if (slug) revalidatePath(`/${locale}/events/${slug}`);
  }
}

function parse(formData: FormData) {
  return eventAdminSchema.safeParse({
    slug: formData.get("slug"),
    titleFr: formData.get("titleFr"),
    titleEn: formData.get("titleEn"),
    descriptionFr: formData.get("descriptionFr"),
    descriptionEn: formData.get("descriptionEn"),
    type: formData.get("type"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
    locationFr: formData.get("locationFr") || undefined,
    locationEn: formData.get("locationEn") || undefined,
    isOnline: formData.get("isOnline") === "on",
    programId: formData.get("programId") || undefined,
  });
}

export async function createEvent(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };

  const { programId, type, ...data } = parsed.data;
  try {
    await db.event.create({
      data: { ...data, type: type as EventType, programId: programId || null },
    });
  } catch {
    return { status: "error", message: "slug_taken" };
  }
  revalidateEvents(data.slug);
  return { status: "success" };
}

export async function updateEvent(
  id: string,
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };

  const { programId, type, ...data } = parsed.data;
  try {
    await db.event.update({
      where: { id },
      data: { ...data, type: type as EventType, programId: programId || null },
    });
  } catch {
    return { status: "error", message: "slug_taken" };
  }
  revalidateEvents(data.slug);
  return { status: "success" };
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  const event = await db.event.findUnique({ where: { id } });
  await db.event.delete({ where: { id } });
  revalidateEvents(event?.slug);
}
