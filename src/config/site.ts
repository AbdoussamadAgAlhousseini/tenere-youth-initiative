export const siteConfig = {
  name: "Tenere Youth Initiative",
  shortName: "TYI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  motto: {
    fr: "Le désert n'est pas vide. Personne ne traverse le Ténéré seul.",
    en: "The desert is not empty. No one crosses the Ténéré alone.",
  },
  email: "contact@tenere-youth.org",
  // Fill these in once the pages exist. Empty channels are hidden in the UI
  // and excluded from structured data. WhatsApp is a full wa.me URL.
  social: {
    linkedin: "https://www.linkedin.com/company/tenere-youth-initiative/",
    facebook: "",
    whatsapp: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
