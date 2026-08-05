import { Pencil, Plus } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { listMilestonesAdmin } from "@/server/repositories/admin";
import { deleteMilestone } from "@/server/actions/admin-milestones";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listMilestonesAdmin>>[number];

export default async function AdminTimelinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const isEn = (await getLocale()) === "en";
  const rows = await listMilestonesAdmin();

  const columns: Column<Row>[] = [
    {
      header: "Année",
      cell: (r) => <span className="font-medium">{r.year}</span>,
    },
    {
      header: "Étape",
      cell: (r) => (isEn ? r.textEn : r.textFr),
    },
    {
      header: "",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="sm" aria-label="Edit">
            <Link href={`/tenere/timeline/${r.id}/edit`}>
              <Pencil className="size-4" />
            </Link>
          </Button>
          <DeleteButton
            action={deleteMilestone.bind(null, r.id)}
            confirmLabel="Supprimer cette étape ?"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Chronologie</h1>
        <Button asChild>
          <Link href="/tenere/timeline/new">
            <Plus className="size-4" />
            Nouvelle étape
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} rows={rows} empty={t("empty")} getKey={(r) => r.id} />
    </div>
  );
}
