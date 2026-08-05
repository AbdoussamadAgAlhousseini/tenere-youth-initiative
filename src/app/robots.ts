import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep private/authenticated areas out of the index.
      disallow: ["/api/", "/fr/admin", "/en/admin", "/fr/dashboard", "/en/dashboard", "/fr/sign-in", "/en/sign-in"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
