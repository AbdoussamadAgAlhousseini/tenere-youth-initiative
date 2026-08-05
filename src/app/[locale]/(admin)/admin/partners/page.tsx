import { Pencil, Plus } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { listPartnersAdmin } from "@/server/repositories/admin";
import { deletePartner } from "@/server/actions/admin-misc";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listPartnersAdmin>>[number];

export default async function AdminPartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const rows = await listPartnersAdmin();

  const columns: Column<Row>[] = [
    { header: t("cols.name"), cell: (r) => <span className="font-medium">{r.name}</span> },
    { header: "Niveau", cell: (r) => r.tier },
    {
      header: "",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="sm" aria-label="Edit">
            <Link href={`/admin/partners/${r.id}/edit`}>
              <Pencil className="size-4" />
            </Link>
          </Button>
          <DeleteButton
            action={deletePartner.bind(null, r.id)}
            confirmLabel="Supprimer ce partenaire ?"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Partenaires</h1>
        <Button asChild>
          <Link href="/admin/partners/new">
            <Plus className="size-4" />
            Nouveau partenaire
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} rows={rows} empty={t("empty")} getKey={(r) => r.id} />
    </div>
  );
}
