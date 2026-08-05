import { Check, Pencil, Plus, X } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { listProgramsAdmin } from "@/server/repositories/admin";
import { deleteProgram } from "@/server/actions/admin-programs";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listProgramsAdmin>>[number];

export default async function AdminProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const isEn = (await getLocale()) === "en";
  const rows = await listProgramsAdmin();

  const columns: Column<Row>[] = [
    {
      header: t("cols.title"),
      cell: (r) => (
        <span className="font-medium">{isEn ? r.titleEn : r.titleFr}</span>
      ),
    },
    { header: t("cols.type"), cell: (r) => r.theme },
    {
      header: "Publié",
      cell: (r) =>
        r.published ? (
          <Check className="text-primary size-4" />
        ) : (
          <X className="text-muted-foreground size-4" />
        ),
    },
    {
      header: "",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="sm" aria-label="Edit">
            <Link href={`/admin/programs/${r.id}/edit`}>
              <Pencil className="size-4" />
            </Link>
          </Button>
          <DeleteButton
            action={deleteProgram.bind(null, r.id)}
            confirmLabel="Supprimer ce programme ?"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Programmes</h1>
        <Button asChild>
          <Link href="/admin/programs/new">
            <Plus className="size-4" />
            Nouveau programme
          </Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        rows={rows}
        empty={t("empty")}
        getKey={(r) => r.id}
      />
    </div>
  );
}
