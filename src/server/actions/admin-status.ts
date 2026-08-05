"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { requireAdmin } from "@/lib/auth-guards";
import type { VolunteerStatus } from "@prisma/client";

const volunteerStatuses = [
  "PENDING",
  "REVIEWING",
  "ACCEPTED",
  "DECLINED",
] as const;

export async function setVolunteerStatus(id: string, status: string) {
  await requireAdmin();
  if (!volunteerStatuses.includes(status as (typeof volunteerStatuses)[number])) {
    return;
  }
  await db.volunteer.update({
    where: { id },
    data: { status: status as VolunteerStatus },
  });
  for (const locale of ["fr", "en"]) {
    revalidatePath(`/${locale}/admin/volunteers`);
  }
}

export async function toggleContactHandled(id: string) {
  await requireAdmin();
  const current = await db.contactMessage.findUnique({ where: { id } });
  if (!current) return;
  await db.contactMessage.update({
    where: { id },
    data: { handled: !current.handled },
  });
  for (const locale of ["fr", "en"]) {
    revalidatePath(`/${locale}/admin/messages`);
  }
}
