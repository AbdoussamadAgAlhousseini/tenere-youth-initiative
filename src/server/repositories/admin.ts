import { db } from "@/server/db";

/** Aggregate counts for the admin dashboard. */
export async function getAdminStats() {
  const [
    programs,
    articles,
    events,
    volunteers,
    members,
    subscribers,
    contactMessages,
    donations,
    partners,
    resources,
  ] = await Promise.all([
    db.program.count(),
    db.article.count(),
    db.event.count(),
    db.volunteer.count(),
    db.member.count(),
    db.newsletterSubscriber.count(),
    db.contactMessage.count(),
    db.donation.count(),
    db.partner.count(),
    db.resource.count(),
  ]);

  return {
    programs,
    articles,
    events,
    volunteers,
    members,
    subscribers,
    contactMessages,
    donations,
    partners,
    resources,
  };
}

export function listVolunteers() {
  return db.volunteer.findMany({ orderBy: { createdAt: "desc" } });
}

export function listContactMessages() {
  return db.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
}

export function listSubscribers() {
  return db.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });
}

export function listDonations() {
  return db.donation.findMany({ orderBy: { createdAt: "desc" } });
}

export function listArticlesAdmin() {
  return db.article.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, author: true },
  });
}

export function listEventsAdmin() {
  return db.event.findMany({ orderBy: { startDate: "asc" } });
}

export function listProgramsAdmin() {
  return db.program.findMany({ orderBy: { order: "asc" } });
}

export function listTestimonialsAdmin() {
  return db.testimonial.findMany({ orderBy: { order: "asc" } });
}

export function listTeamMembersAdmin() {
  return db.teamMember.findMany({ orderBy: { order: "asc" } });
}

export function listMilestonesAdmin() {
  return db.milestone.findMany({ orderBy: { order: "asc" } });
}

export function listHeroSlidesAdmin() {
  return db.heroSlide.findMany({ orderBy: { order: "asc" } });
}

export function listPartnersAdmin() {
  return db.partner.findMany({ orderBy: { order: "asc" } });
}

export function listResourcesAdmin() {
  return db.resource.findMany({ orderBy: { createdAt: "desc" } });
}

export function listCategoriesAdmin() {
  return db.category.findMany({ orderBy: { nameFr: "asc" } });
}

export function listTagsAdmin() {
  return db.tag.findMany({ orderBy: { nameFr: "asc" } });
}

export function listGalleryAdmin() {
  return db.galleryItem.findMany({ orderBy: { order: "asc" } });
}

export function listUsers() {
  return db.user.findMany({ orderBy: { createdAt: "desc" } });
}
