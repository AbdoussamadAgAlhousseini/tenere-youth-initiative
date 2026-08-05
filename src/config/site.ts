export const siteConfig = {
  name: "Tenere Youth Initiative",
  shortName: "TYI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  motto: {
    fr: "Le désert n'est pas vide. Personne ne traverse le Ténéré seul.",
    en: "The desert is not empty. No one crosses the Ténéré alone.",
  },
  email: "contact@tenere-youth.org",
  social: {
    facebook: "https://facebook.com/tenereyouth",
    instagram: "https://instagram.com/tenereyouth",
    linkedin: "https://linkedin.com/company/tenereyouth",
    x: "https://x.com/tenereyouth",
    youtube: "https://youtube.com/@tenereyouth",
  },
} as const;

export type SiteConfig = typeof siteConfig;
