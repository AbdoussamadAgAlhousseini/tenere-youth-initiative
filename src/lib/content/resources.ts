// Canonical resource content — shared by the front-end and the database seed.

export type ResourceContent = {
  slug: string;
  type: "REPORT" | "GUIDE" | "TOOLKIT" | "PUBLICATION";
  fileUrl: string;
  fileFormat: string;
  fileSize: number; // bytes
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
};

export const resourcesContent: ResourceContent[] = [
  {
    slug: "annual-report-2025",
    type: "REPORT",
    fileUrl: "/resources/annual-report-2025.pdf",
    fileFormat: "PDF",
    fileSize: 2_400_000,
    titleFr: "Rapport annuel 2025",
    titleEn: "Annual Report 2025",
    descriptionFr:
      "Bilan complet de nos activités, de notre impact et de nos finances pour l'année écoulée.",
    descriptionEn:
      "A complete review of our activities, impact and finances for the past year.",
  },
  {
    slug: "guide-mobile-education",
    type: "GUIDE",
    fileUrl: "/resources/guide-mobile-education.pdf",
    fileFormat: "PDF",
    fileSize: 1_100_000,
    titleFr: "Guide de l'éducation en milieu mobile",
    titleEn: "Guide to education in mobile settings",
    descriptionFr:
      "Un guide pratique pour concevoir des dispositifs éducatifs adaptés aux familles nomades.",
    descriptionEn:
      "A practical guide to designing education programs adapted to nomadic families.",
  },
  {
    slug: "toolkit-youth-advocacy",
    type: "TOOLKIT",
    fileUrl: "/resources/toolkit-youth-advocacy.pdf",
    fileFormat: "PDF",
    fileSize: 900_000,
    titleFr: "Boîte à outils du plaidoyer jeunesse",
    titleEn: "Youth advocacy toolkit",
    descriptionFr:
      "Des modèles, méthodes et conseils pour mener des campagnes de plaidoyer efficaces.",
    descriptionEn: "Templates, methods and tips to run effective advocacy campaigns.",
  },
  {
    slug: "publication-pastoral-knowledge",
    type: "PUBLICATION",
    fileUrl: "/resources/publication-pastoral-knowledge.pdf",
    fileFormat: "PDF",
    fileSize: 1_800_000,
    titleFr: "Savoirs pastoraux et résilience climatique",
    titleEn: "Pastoral knowledge and climate resilience",
    descriptionFr:
      "Une publication documentant les savoirs traditionnels au service de l'adaptation climatique.",
    descriptionEn:
      "A publication documenting traditional knowledge for climate adaptation.",
  },
];
