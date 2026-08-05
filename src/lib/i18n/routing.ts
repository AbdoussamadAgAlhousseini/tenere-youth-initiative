import { defineRouting } from "next-intl/routing";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Explicit locale prefixes for every language (/fr, /en) — clean, distinct
  // URLs per language (better for SEO); the root redirects to the negotiated
  // locale via middleware.
  localePrefix: "always",
});

/** Type-safe check that a string is a supported locale. */
export function isValidLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
