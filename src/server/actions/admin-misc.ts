"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { requireAdmin } from "@/lib/auth-guards";
import { testimonialAdminSchema, partnerAdminSchema } from "@/lib/validations";
import type { AdminActionState } from "./admin-articles";
import type { PartnerTier } from "@prisma/client";

function revalidateHome() {
  for (const locale of ["fr", "en"]) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/tenere/testimonials`);
    revalidatePath(`/${locale}/tenere/partners`);
  }
}

// ---- Testimonials ----------------------------------------------------------

function parseTestimonial(formData: FormData) {
  return testimonialAdminSchema.safeParse({
    authorFr: formData.get("authorFr"),
    authorEn: formData.get("authorEn"),
    roleFr: formData.get("roleFr") || undefined,
    roleEn: formData.get("roleEn") || undefined,
    quoteFr: formData.get("quoteFr"),
    quoteEn: formData.get("quoteEn"),
    order: formData.get("order") || 0,
    published: formData.get("published") === "on",
  });
}

export async function createTestimonial(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parseTestimonial(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  await db.testimonial.create({ data: parsed.data });
  revalidateHome();
  return { status: "success" };
}

export async function updateTestimonial(
  id: string,
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parseTestimonial(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  await db.testimonial.update({ where: { id }, data: parsed.data });
  revalidateHome();
  return { status: "success" };
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await db.testimonial.delete({ where: { id } });
  revalidateHome();
}

// ---- Partners --------------------------------------------------------------

function parsePartner(formData: FormData) {
  return partnerAdminSchema.safeParse({
    name: formData.get("name"),
    url: formData.get("url") || "",
    tier: formData.get("tier"),
    order: formData.get("order") || 0,
  });
}

export async function createPartner(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parsePartner(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  const { url, tier, ...rest } = parsed.data;
  await db.partner.create({
    data: { ...rest, tier: tier as PartnerTier, url: url || null },
  });
  revalidateHome();
  return { status: "success" };
}

export async function updatePartner(
  id: string,
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = parsePartner(formData);
  if (!parsed.success) return { status: "error", message: "invalid" };
  const { url, tier, ...rest } = parsed.data;
  await db.partner.update({
    where: { id },
    data: { ...rest, tier: tier as PartnerTier, url: url || null },
  });
  revalidateHome();
  return { status: "success" };
}

export async function deletePartner(id: string) {
  await requireAdmin();
  await db.partner.delete({ where: { id } });
  revalidateHome();
}
