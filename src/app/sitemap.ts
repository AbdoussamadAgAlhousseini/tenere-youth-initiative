import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { routing } from "@/lib/i18n/routing";
import { getProgramSlugs } from "@/server/repositories/programs";
import { getArticleSlugs } from "@/server/repositories/articles";

export const revalidate = 3600;

const staticPaths = [
  "",
  "/about",
  "/programs",
  "/news",
  "/resources",
  "/events",
  "/gallery",
  "/contact",
  "/donate",
  "/volunteer",
  "/membership",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const [programSlugs, articleSlugs] = await Promise.all([
    getProgramSlugs(),
    getArticleSlugs(),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  const add = (path: string, priority = 0.7) => {
    // One URL per locale, with hreflang alternates.
    const languages: Record<string, string> = {
      "x-default": `${base}/${routing.defaultLocale}${path}`,
    };
    for (const locale of routing.locales) {
      languages[locale] = `${base}/${locale}${path}`;
    }
    for (const locale of routing.locales) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority,
        alternates: { languages },
      });
    }
  };

  staticPaths.forEach((p) => add(p, p === "" ? 1 : 0.7));
  programSlugs.forEach((slug) => add(`/programs/${slug}`, 0.6));
  articleSlugs.forEach((slug) => add(`/news/${slug}`, 0.6));

  return entries;
}
