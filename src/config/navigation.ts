/** Navigation model — labels resolved via i18n keys under `nav`. */

export type NavItem = {
  /** i18n key under the `nav` namespace. */
  key: string;
  /** Locale-agnostic href (next-intl Link localizes it). */
  href: string;
};

export const mainNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "programs", href: "/programs" },
  { key: "news", href: "/news" },
  { key: "resources", href: "/resources" },
  { key: "events", href: "/events" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
];

export const getInvolvedNav: NavItem[] = [
  { key: "donate", href: "/donate" },
  { key: "volunteer", href: "/volunteer" },
  { key: "membership", href: "/membership" },
];
