// Canonical event content — shared by the front-end and the database seed.

export type EventContent = {
  slug: string;
  type: "WEBINAR" | "FORUM" | "CONFERENCE" | "WORKSHOP";
  /** Days from "now" the event starts — keeps demo data always upcoming. */
  startInDays: number;
  endInDays?: number;
  isOnline: boolean;
  programSlug: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  locationFr: string;
  locationEn: string;
};

export const eventsContent: EventContent[] = [
  {
    slug: "webinar-pastoral-rights",
    type: "WEBINAR",
    startInDays: 14,
    isOnline: true,
    programSlug: "advocacy",
    titleFr: "Webinaire : les droits des communautés pastorales",
    titleEn: "Webinar: the rights of pastoralist communities",
    descriptionFr:
      "Un échange en ligne avec des juristes et des jeunes leaders sur la reconnaissance des droits pastoraux.",
    descriptionEn:
      "An online exchange with lawyers and young leaders on the recognition of pastoralist rights.",
    locationFr: "En ligne",
    locationEn: "Online",
  },
  {
    slug: "youth-forum-sahel",
    type: "FORUM",
    startInDays: 45,
    endInDays: 46,
    isOnline: false,
    programSlug: "leadership",
    titleFr: "Forum de la jeunesse pastorale du Sahel",
    titleEn: "Sahel Pastoralist Youth Forum",
    descriptionFr:
      "Deux jours de rencontres, d'ateliers et de plaidoyer réunissant des jeunes de toute la région.",
    descriptionEn:
      "Two days of meetings, workshops and advocacy bringing together youth from across the region.",
    locationFr: "Ouagadougou, Burkina Faso",
    locationEn: "Ouagadougou, Burkina Faso",
  },
  {
    slug: "digital-bootcamp",
    type: "WORKSHOP",
    startInDays: 70,
    endInDays: 75,
    isOnline: false,
    programSlug: "digital",
    titleFr: "Bootcamp numérique pour jeunes ruraux",
    titleEn: "Digital bootcamp for rural youth",
    descriptionFr:
      "Une semaine intensive pour s'initier au numérique et créer des solutions locales.",
    descriptionEn:
      "An intensive week to learn digital skills and build local solutions.",
    locationFr: "Niamey, Niger",
    locationEn: "Niamey, Niger",
  },
];

/** Resolve an event's absolute start/end dates from the demo offsets. */
export function eventDates(e: EventContent) {
  const day = 24 * 60 * 60 * 1000;
  const now = Date.now();
  return {
    start: new Date(now + e.startInDays * day),
    end: e.endInDays ? new Date(now + e.endInDays * day) : null,
  };
}
