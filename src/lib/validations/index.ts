import { z } from "zod";

/** Newsletter subscription. */
export const newsletterSchema = z.object({
  email: z.string().email(),
  locale: z.enum(["fr", "en"]).default("fr"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "consent_required" }),
  }),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

/** Contact form. */
export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  subject: z.string().min(3).max(160),
  message: z.string().min(10).max(4000),
  // Honeypot — must stay empty (anti-spam).
  website: z.string().max(0).optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

/** Volunteer application. */
export const programThemes = [
  "LEADERSHIP",
  "EDUCATION",
  "PASTORALISM",
  "CLIMATE",
  "DIGITAL",
  "WOMEN",
  "ENTREPRENEURSHIP",
  "ADVOCACY",
] as const;

export const volunteerSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  expertise: z.array(z.enum(programThemes)).min(1).max(programThemes.length),
  availability: z.string().max(500).optional(),
  motivation: z.string().min(10).max(2000),
});
export type VolunteerInput = z.infer<typeof volunteerSchema>;

/** Donation (UI stub — no real payment yet). */
export const donationSchema = z.object({
  amount: z.number().int().positive().max(1_000_000),
  currency: z.enum(["EUR", "USD", "XOF"]).default("EUR"),
  frequency: z.enum(["ONE_TIME", "MONTHLY", "YEARLY"]).default("ONE_TIME"),
  donorName: z.string().max(120).optional(),
  email: z.string().email().optional(),
  message: z.string().max(1000).optional(),
});
export type DonationInput = z.infer<typeof donationSchema>;

/** Admin: create/update an article. */
export const articleAdminSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug_format"),
  titleFr: z.string().min(1).max(200),
  titleEn: z.string().min(1).max(200),
  excerptFr: z.string().min(1).max(500),
  excerptEn: z.string().min(1).max(500),
  bodyFr: z.string().min(1),
  bodyEn: z.string().min(1),
  categoryId: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});
export type ArticleAdminInput = z.infer<typeof articleAdminSchema>;

/** Admin: create/update an event. */
export const eventAdminSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug_format"),
  titleFr: z.string().min(1).max(200),
  titleEn: z.string().min(1).max(200),
  descriptionFr: z.string().min(1),
  descriptionEn: z.string().min(1),
  type: z.enum(["WEBINAR", "FORUM", "CONFERENCE", "WORKSHOP"]),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  locationFr: z.string().max(200).optional(),
  locationEn: z.string().max(200).optional(),
  isOnline: z.boolean().default(false),
  programId: z.string().optional(),
});
export type EventAdminInput = z.infer<typeof eventAdminSchema>;

/** Admin: create/update a program. */
export const programAdminSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug_format"),
  theme: z.enum(programThemes),
  icon: z.string().max(60).optional(),
  titleFr: z.string().min(1).max(200),
  titleEn: z.string().min(1).max(200),
  summaryFr: z.string().min(1).max(600),
  summaryEn: z.string().min(1).max(600),
  descriptionFr: z.string().min(1),
  descriptionEn: z.string().min(1),
  order: z.coerce.number().int().min(0).default(0),
  published: z.boolean().default(true),
});
export type ProgramAdminInput = z.infer<typeof programAdminSchema>;

/** Admin: create/update a testimonial. */
export const testimonialAdminSchema = z.object({
  authorFr: z.string().min(1).max(120),
  authorEn: z.string().min(1).max(120),
  roleFr: z.string().max(160).optional(),
  roleEn: z.string().max(160).optional(),
  quoteFr: z.string().min(1),
  quoteEn: z.string().min(1),
  order: z.coerce.number().int().min(0).default(0),
  published: z.boolean().default(true),
});
export type TestimonialAdminInput = z.infer<typeof testimonialAdminSchema>;

/** Admin: homepage impact key-figures (stored as impact.* settings). */
export const impactStatsSchema = z.object({
  youth: z.coerce.number().int().min(0),
  programs: z.coerce.number().int().min(0),
  communities: z.coerce.number().int().min(0),
  countries: z.coerce.number().int().min(0),
});
export type ImpactStatsInput = z.infer<typeof impactStatsSchema>;

/** Admin: create/update a team member (leadership). */
export const teamMemberAdminSchema = z.object({
  name: z.string().min(1).max(120),
  roleFr: z.string().min(1).max(160),
  roleEn: z.string().min(1).max(160),
  bioFr: z.string().min(1),
  bioEn: z.string().min(1),
  photo: z.string().url().optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).default(0),
  published: z.boolean().default(true),
});
export type TeamMemberAdminInput = z.infer<typeof teamMemberAdminSchema>;

/** Admin: create/update a partner. */
export const partnerAdminSchema = z.object({
  name: z.string().min(1).max(160),
  url: z.string().url().optional().or(z.literal("")),
  tier: z.enum(["STRATEGIC", "FINANCIAL", "TECHNICAL", "COMMUNITY"]),
  order: z.coerce.number().int().min(0).default(0),
});
export type PartnerAdminInput = z.infer<typeof partnerAdminSchema>;

/** Admin: create/update a resource. */
export const resourceAdminSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug_format"),
  titleFr: z.string().min(1).max(200),
  titleEn: z.string().min(1).max(200),
  descriptionFr: z.string().min(1),
  descriptionEn: z.string().min(1),
  type: z.enum(["REPORT", "GUIDE", "TOOLKIT", "PUBLICATION"]),
  fileUrl: z.string().min(1).max(500),
  fileFormat: z.string().max(20).optional(),
  fileSize: z.coerce.number().int().min(0).optional(),
  published: z.boolean().default(true),
});
export type ResourceAdminInput = z.infer<typeof resourceAdminSchema>;

/** Admin: create/update a taxonomy term (category or tag). */
export const taxonomyAdminSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug_format"),
  nameFr: z.string().min(1).max(120),
  nameEn: z.string().min(1).max(120),
});
export type TaxonomyAdminInput = z.infer<typeof taxonomyAdminSchema>;

/** Admin: create/update a gallery item. */
export const galleryAdminSchema = z.object({
  titleFr: z.string().max(200).optional(),
  titleEn: z.string().max(200).optional(),
  url: z.string().max(500).optional(),
  type: z.enum(["IMAGE", "VIDEO"]).default("IMAGE"),
  album: z.string().max(120).optional(),
  order: z.coerce.number().int().min(0).default(0),
});
export type GalleryAdminInput = z.infer<typeof galleryAdminSchema>;

/** Event registration. */
export const registrationSchema = z.object({
  eventId: z.string().min(1),
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
});
export type RegistrationInput = z.infer<typeof registrationSchema>;
