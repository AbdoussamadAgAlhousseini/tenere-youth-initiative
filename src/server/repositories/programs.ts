import { db } from "@/server/db";

/** All published programs, ordered for display. */
export function getPrograms() {
  return db.program.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

/** A single published program by slug (with its projects and events). */
export function getProgramBySlug(slug: string) {
  return db.program.findFirst({
    where: { slug, published: true },
    include: {
      projects: true,
      events: { orderBy: { startDate: "asc" } },
    },
  });
}

/** Slugs of published programs — for static params / sitemap. */
export async function getProgramSlugs() {
  const rows = await db.program.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}
