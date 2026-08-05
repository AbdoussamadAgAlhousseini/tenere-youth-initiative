import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { TeamForm } from "@/components/admin/team-form";
import { createTeamMember } from "@/server/actions/admin-team";

export default async function NewTeamMemberPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/team">
          <ArrowLeft />
          Équipe
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Nouveau membre</h1>
      <TeamForm action={createTeamMember} submitLabel="Créer" />
    </div>
  );
}
