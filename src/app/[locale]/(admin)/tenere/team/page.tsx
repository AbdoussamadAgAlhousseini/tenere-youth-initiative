import { Pencil, Plus } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { listTeamMembersAdmin } from "@/server/repositories/admin";
import { deleteTeamMember } from "@/server/actions/admin-team";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listTeamMembersAdmin>>[number];

export default async function AdminTeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const isEn = (await getLocale()) === "en";
  const rows = await listTeamMembersAdmin();

  const columns: Column<Row>[] = [
    {
      header: t("cols.name"),
      cell: (r) => <span className="font-medium">{r.name}</span>,
    },
    {
      header: t("cols.role"),
      cell: (r) => (isEn ? r.roleEn : r.roleFr),
    },
    {
      header: "",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="sm" aria-label="Edit">
            <Link href={`/tenere/team/${r.id}/edit`}>
              <Pencil className="size-4" />
            </Link>
          </Button>
          <DeleteButton
            action={deleteTeamMember.bind(null, r.id)}
            confirmLabel="Supprimer ce membre ?"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Équipe</h1>
        <Button asChild>
          <Link href="/tenere/team/new">
            <Plus className="size-4" />
            Nouveau membre
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} rows={rows} empty={t("empty")} getKey={(r) => r.id} />
    </div>
  );
}
