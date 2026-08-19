import type { Metadata } from "next";

/**
 * Self-referencing canonical + hreflang alternates for a page at `path`
 * (e.g. "/about"). Without this, pages inherit the root layout's homepage
 * canonical (`/{locale}`), which makes Google treat every sub-page as an
 * alternate of the homepage and skip indexing it.
 *
 * Relative URLs resolve against `metadataBase` (set in the locale layout).
 */
export function localeAlternates(
  locale: string,
  path: string,
): Metadata["alternates"] {
  const p = path === "" ? "" : path.startsWith("/") ? path : `/${path}`;
  return {
    canonical: `/${locale}${p}`,
    languages: {
      fr: `/fr${p}`,
      en: `/en${p}`,
      "x-default": `/fr${p}`,
    },
  };
}
