"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { requireAdmin } from "@/lib/auth-guards";
import { teamMemberAdminSchema } from "@/lib/validations";
import type { AdminActionState } from "./admin-articles";

function revalidateTeam() {
  for (const locale of ["fr", "en"]) {
    revalidatePath(`/${locale}/about`);
    revalidatePath(`/${locale}/tenere/team`);
  }
}

function parseTeamMember(formData: FormData) {
  return teamMemberAdminSchema.safeParse({
    name: formData.get("name"),
    roleFr: formData.get("roleFr"),
    roleEn: formData.get("roleEn"),
    bioFr: formData.get("bioFr"),
    bioEn: formData.get("bioEn"),
    photo: formData.get("photo") || "",
    order: formData.get("order") || 0,
    published: formData.get("published") === "on",
  });
}

export async function createTeamMember(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parseTeamMember(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  const { photo, ...rest } = parsed.data;
  await db.teamMember.create({ data: { ...rest, photo: photo || null } });
  revalidateTeam();
  return { status: "success" };
}

export async function updateTeamMember(
  id: string,
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parseTeamMember(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  const { photo, ...rest } = parsed.data;
  await db.teamMember.update({
    where: { id },
    data: { ...rest, photo: photo || null },
  });
  revalidateTeam();
  return { status: "success" };
}

export async function deleteTeamMember(id: string) {
  await requireAdmin();
  await db.teamMember.delete({ where: { id } });
  revalidateTeam();
}
