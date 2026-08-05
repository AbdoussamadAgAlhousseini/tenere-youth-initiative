import { getTranslations } from "next-intl/server";

import { getPartners } from "@/server/repositories/misc";

export async function Partners() {
  const t = await getTranslations("home.partners");
  const partners = await getPartners();

  if (partners.length === 0) return null;

  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...partners, ...partners];

  return (
    <section className="container py-16">
      <h2 className="text-muted-foreground mb-8 text-center text-sm font-semibold uppercase tracking-widest">
        {t("title")}
      </h2>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-4">
          {loop.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="bg-card text-muted-foreground flex h-16 min-w-[180px] items-center justify-center rounded-xl border px-6 text-sm font-semibold"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
