"use server";

import { db } from "@/server/db";
import { donationSchema } from "@/lib/validations";
import { auth } from "@/lib/auth";
import type { DonationFrequency } from "@prisma/client";
import type { ActionState } from "./newsletter";

/**
 * Record a donation intent. Payments are UI-only for now: the donation is
 * stored with STUB status and no charge is made.
 */
export async function createDonation(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = donationSchema.safeParse({
    amount: Number(formData.get("amount")),
    currency: formData.get("currency") ?? "EUR",
    frequency: formData.get("frequency") ?? "ONE_TIME",
    donorName: formData.get("donorName") ?? undefined,
    email: formData.get("email") ?? undefined,
    message: formData.get("message") ?? undefined,
  });

  if (!parsed.success) {
    return { status: "error", message: "invalid" };
  }

  try {
    const session = await auth();
    const { frequency, ...rest } = parsed.data;
    await db.donation.create({
      data: {
        ...rest,
        frequency: frequency as DonationFrequency,
        status: "STUB",
        userId: session?.user?.id,
      },
    });
    return { status: "success" };
  } catch {
    return { status: "error", message: "server_error" };
  }
}
