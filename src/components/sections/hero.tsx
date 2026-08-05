import { getLocale, getTranslations } from "next-intl/server";

import { getHeroSlides } from "@/server/repositories/misc";
import { HeroCarousel, type HeroSlideView } from "./hero-carousel";

export async function Hero() {
  const t = await getTranslations("home.hero");
  const isEn = (await getLocale()) === "en";
  const rows = await getHeroSlides();

  const slides: HeroSlideView[] = rows.map((s) => ({
    id: s.id,
    title: isEn ? s.titleEn : s.titleFr,
    subtitle: (isEn ? s.subtitleEn : s.subtitleFr) ?? "",
    image: s.image,
  }));

  // Fall back to the i18n slogan when no slides are configured.
  const finalSlides: HeroSlideView[] =
    slides.length > 0
      ? slides
      : [
          {
            id: "default",
            title: t("title"),
            subtitle: t("subtitle"),
            image: null,
          },
        ];

  return (
    <HeroCarousel
      slides={finalSlides}
      eyebrow={t("eyebrow")}
      primary={{ label: t("ctaPrimary"), href: "/membership" }}
      secondary={{ label: t("ctaSecondary"), href: "/programs" }}
    />
  );
}
