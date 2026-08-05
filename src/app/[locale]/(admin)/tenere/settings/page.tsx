import { setRequestLocale } from "next-intl/server";

import { getImpactStats } from "@/server/repositories/misc";
import { ImpactForm } from "@/components/admin/impact-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const impact = await getImpactStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Réglages</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Contenus globaux du site.
        </p>
      </div>

      <section className="bg-card space-y-4 rounded-2xl border p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold">
            {"Chiffres d'impact (page d'accueil)"}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            {"Les compteurs affichés dans la section « Notre impact »."}
          </p>
        </div>
        <ImpactForm defaults={impact} />
      </section>
    </div>
  );
}
