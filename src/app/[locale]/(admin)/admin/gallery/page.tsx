import { Pencil, Plus } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { listGalleryAdmin } from "@/server/repositories/admin";
import { deleteGalleryItem } from "@/server/actions/admin-gallery";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listGalleryAdmin>>[number];

export default async function AdminGalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const isEn = (await getLocale()) === "en";
  const rows = await listGalleryAdmin();

  const columns: Column<Row>[] = [
    {
      header: t("cols.title"),
      cell: (r) => (
        <span className="font-medium">
          {(isEn ? r.titleEn : r.titleFr) ?? "—"}
        </span>
      ),
    },
    { header: "Album", cell: (r) => r.album ?? "—" },
    {
      header: "Image",
      cell: (r) =>
        r.url ? (
          <span className="text-primary text-xs">✓</span>
        ) : (
          <span className="text-muted-foreground text-xs">placeholder</span>
        ),
    },
    {
      header: "",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="sm" aria-label="Edit">
            <Link href={`/admin/gallery/${r.id}/edit`}>
              <Pencil className="size-4" />
            </Link>
          </Button>
          <DeleteButton action={deleteGalleryItem.bind(null, r.id)} confirmLabel="Supprimer cette image ?" />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Galerie</h1>
        <Button asChild>
          <Link href="/admin/gallery/new">
            <Plus className="size-4" />
            Nouvelle image
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} rows={rows} empty={t("empty")} getKey={(r) => r.id} />
    </div>
  );
}
