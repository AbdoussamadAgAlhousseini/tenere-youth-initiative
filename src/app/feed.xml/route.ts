import { siteConfig } from "@/config/site";
import { getRecentArticles } from "@/server/repositories/articles";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const base = siteConfig.url;
  const articles = await getRecentArticles(20);

  const items = articles
    .map((a) => {
      const link = `${base}/fr/news/${a.slug}`;
      const date = (a.publishedAt ?? a.createdAt).toUTCString();
      return `
    <item>
      <title>${escapeXml(a.titleFr)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${date}</pubDate>
      <description>${escapeXml(a.excerptFr)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${base}/fr/news</link>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(siteConfig.motto.fr)}</description>
    <language>fr</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
