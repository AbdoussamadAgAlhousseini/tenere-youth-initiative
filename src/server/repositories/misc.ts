import { db } from "@/server/db";

/** Upcoming events, ordered by start date. */
export function getUpcomingEvents(take?: number) {
  return db.event.findMany({
    where: { startDate: { gte: new Date() } },
    orderBy: { startDate: "asc" },
    include: { program: true },
    ...(take ? { take } : {}),
  });
}

export function getEventBySlug(slug: string) {
  return db.event.findUnique({
    where: { slug },
    include: { program: true },
  });
}

/** Partners ordered for the logo slider. */
export function getPartners() {
  return db.partner.findMany({ orderBy: { order: "asc" } });
}

/** Published history-timeline milestones, ordered. */
export function getMilestones() {
  return db.milestone.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

/** Published team members (leadership), ordered. */
export function getTeamMembers() {
  return db.teamMember.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

/** Published testimonials. */
export function getTestimonials() {
  return db.testimonial.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

/** Published resources, optionally filtered by type. */
export function getResources(type?: string) {
  return db.resource.findMany({
    where: {
      published: true,
      ...(type ? { type: type as never } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
}

/** Gallery items for the public gallery, ordered. */
export function getGalleryItems() {
  return db.galleryItem.findMany({ orderBy: { order: "asc" } });
}

/** Impact key-figures stored as settings (impact.*). */
export async function getImpactStats() {
  const rows = await db.setting.findMany({
    where: { key: { startsWith: "impact." } },
  });
  const map = new Map(rows.map((r) => [r.key, Number(r.value)]));
  return {
    youth: map.get("impact.youth") ?? 0,
    programs: map.get("impact.programs") ?? 0,
    communities: map.get("impact.communities") ?? 0,
    countries: map.get("impact.countries") ?? 0,
  };
}
