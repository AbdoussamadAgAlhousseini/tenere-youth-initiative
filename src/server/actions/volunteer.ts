"use server";

import { db } from "@/server/db";
import { volunteerSchema } from "@/lib/validations";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import type { ProgramTheme } from "@prisma/client";
import type { ActionState } from "./newsletter";

/** Submit a volunteer application. */
export async function submitVolunteer(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const ip = await getClientIp();
  if (!rateLimit(`volunteer:${ip}`, 3, 60_000).success) {
    return { status: "error", message: "rate_limited" };
  }

  const parsed = volunteerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? undefined,
    expertise: formData.getAll("expertise"),
    availability: formData.get("availability") ?? undefined,
    motivation: formData.get("motivation"),
  });

  if (!parsed.success) {
    return { status: "error", message: "invalid" };
  }

  try {
    const { expertise, ...rest } = parsed.data;
    await db.volunteer.create({
      data: { ...rest, expertise: expertise as ProgramTheme[] },
    });
    return { status: "success" };
  } catch {
    return { status: "error", message: "server_error" };
  }
}
