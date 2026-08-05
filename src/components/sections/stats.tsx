import { getTranslations } from "next-intl/server";

import { getImpactStats } from "@/server/repositories/misc";
import { StatCounter } from "./stat-counter";

export async function Stats() {
  const t = await getTranslations("home.impact");
  const impact = await getImpactStats();

  const items = [
    { target: impact.youth, label: t("youth") },
    { target: impact.programs, label: t("programs") },
    { target: impact.communities, label: t("communities") },
    { target: impact.countries, label: t("countries") },
  ];

  return (
    <section className="bg-primary/5 border-y">
      <div className="container py-16">
        <h2 className="mb-10 text-center text-2xl font-semibold">
          {t("title")}
        </h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((item) => (
            <StatCounter
              key={item.label}
              target={item.target}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
