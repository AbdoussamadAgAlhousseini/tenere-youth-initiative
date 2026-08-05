import { Pencil, Plus } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { listTagsAdmin } from "@/server/repositories/admin";
import { deleteTag } from "@/server/actions/admin-taxonomy";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listTagsAdmin>>[number];

export default async function AdminTagsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const isEn = (await getLocale()) === "en";
  const rows = await listTagsAdmin();

  const columns: Column<Row>[] = [
    { header: t("cols.name"), cell: (r) => <span className="font-medium">{isEn ? r.nameEn : r.nameFr}</span> },
    { header: "Slug", cell: (r) => <span className="text-muted-foreground">{r.slug}</span> },
    {
      header: "",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="sm" aria-label="Edit">
            <Link href={`/admin/tags/${r.id}/edit`}>
              <Pencil className="size-4" />
            </Link>
          </Button>
          <DeleteButton action={deleteTag.bind(null, r.id)} confirmLabel="Supprimer ce tag ?" />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tags</h1>
        <Button asChild>
          <Link href="/admin/tags/new">
            <Plus className="size-4" />
            Nouveau tag
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} rows={rows} empty={t("empty")} getKey={(r) => r.id} />
    </div>
  );
}
