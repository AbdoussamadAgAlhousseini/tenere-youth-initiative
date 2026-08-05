import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/hero";
import { MissionVision } from "@/components/sections/mission-vision";
import { WomenLedBanner } from "@/components/sections/women-led-banner";
import { Stats } from "@/components/sections/stats";
import { ProgramsPreview } from "@/components/sections/programs-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { Partners } from "@/components/sections/partners";
import { CallToAction } from "@/components/sections/cta";
import { NewsletterSection } from "@/components/sections/newsletter";
import { Reveal } from "@/components/motion/reveal";

// Revalidate DB-backed content every 30s (ISR) so admin edits appear promptly.
export const revalidate = 30;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Reveal>
        <Stats />
      </Reveal>
      <Reveal>
        <MissionVision />
      </Reveal>
      <Reveal>
        <WomenLedBanner />
      </Reveal>
      <Reveal>
        <ProgramsPreview />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <Partners />
      </Reveal>
      <Reveal>
        <CallToAction />
      </Reveal>
      <Reveal>
        <NewsletterSection />
      </Reveal>
    </>
  );
}
