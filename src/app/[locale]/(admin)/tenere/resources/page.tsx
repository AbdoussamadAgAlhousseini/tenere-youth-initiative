import { Pencil, Plus } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { listResourcesAdmin } from "@/server/repositories/admin";
import { deleteResource } from "@/server/actions/admin-resources";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listResourcesAdmin>>[number];

export default async function AdminResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const isEn = (await getLocale()) === "en";
  const rows = await listResourcesAdmin();

  const columns: Column<Row>[] = [
    {
      header: t("cols.title"),
      cell: (r) => <span className="font-medium">{isEn ? r.titleEn : r.titleFr}</span>,
    },
    { header: t("cols.type"), cell: (r) => r.type },
    {
      header: "",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="sm" aria-label="Edit">
            <Link href={`/tenere/resources/${r.id}/edit`}>
              <Pencil className="size-4" />
            </Link>
          </Button>
          <DeleteButton action={deleteResource.bind(null, r.id)} confirmLabel="Supprimer cette ressource ?" />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Ressources</h1>
        <Button asChild>
          <Link href="/tenere/resources/new">
            <Plus className="size-4" />
            Nouvelle ressource
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} rows={rows} empty={t("empty")} getKey={(r) => r.id} />
    </div>
  );
}
