"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { requireAdmin } from "@/lib/auth-guards";
import { impactStatsSchema } from "@/lib/validations";
import type { AdminActionState } from "./admin-articles";

export async function updateImpactStats(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = impactStatsSchema.safeParse({
    youth: formData.get("youth"),
    programs: formData.get("programs"),
    communities: formData.get("communities"),
    countries: formData.get("countries"),
  });
  if (!parsed.success) return { status: "error", message: "invalid" };

  for (const [key, value] of Object.entries(parsed.data)) {
    const settingKey = `impact.${key}`;
    await db.setting.upsert({
      where: { key: settingKey },
      update: { value: String(value) },
      create: { key: settingKey, value: String(value) },
    });
  }

  // Homepage (ISR) + this settings page.
  for (const locale of ["fr", "en"]) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/tenere/settings`);
  }
  return { status: "success" };
}
