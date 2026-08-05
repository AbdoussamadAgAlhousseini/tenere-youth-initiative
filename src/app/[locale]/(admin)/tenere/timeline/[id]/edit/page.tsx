import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { MilestoneForm } from "@/components/admin/milestone-form";
import { updateMilestone } from "@/server/actions/admin-milestones";
import { db } from "@/server/db";

export default async function EditMilestonePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const item = await db.milestone.findUnique({ where: { id } });
  if (!item) notFound();

  const action = updateMilestone.bind(null, id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/timeline">
          <ArrowLeft />
          Chronologie
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Modifier l&apos;étape</h1>
      <MilestoneForm
        action={action}
        defaults={{
          year: item.year,
          textFr: item.textFr,
          textEn: item.textEn,
          order: item.order,
          published: item.published,
        }}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
