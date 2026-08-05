import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { MilestoneForm } from "@/components/admin/milestone-form";
import { createMilestone } from "@/server/actions/admin-milestones";

export default async function NewMilestonePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/timeline">
          <ArrowLeft />
          Chronologie
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Nouvelle étape</h1>
      <MilestoneForm action={createMilestone} submitLabel="Créer" />
    </div>
  );
}
