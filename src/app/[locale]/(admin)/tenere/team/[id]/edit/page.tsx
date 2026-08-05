import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { TeamForm } from "@/components/admin/team-form";
import { updateTeamMember } from "@/server/actions/admin-team";
import { db } from "@/server/db";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const item = await db.teamMember.findUnique({ where: { id } });
  if (!item) notFound();

  const action = updateTeamMember.bind(null, id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/team">
          <ArrowLeft />
          Équipe
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Modifier le membre</h1>
      <TeamForm
        action={action}
        defaults={{
          name: item.name,
          roleFr: item.roleFr,
          roleEn: item.roleEn,
          bioFr: item.bioFr,
          bioEn: item.bioEn,
          photo: item.photo ?? "",
          order: item.order,
          published: item.published,
        }}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
