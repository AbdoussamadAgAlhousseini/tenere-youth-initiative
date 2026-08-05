import { Pencil, Plus } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { listTestimonialsAdmin } from "@/server/repositories/admin";
import { deleteTestimonial } from "@/server/actions/admin-misc";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listTestimonialsAdmin>>[number];

export default async function AdminTestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const isEn = (await getLocale()) === "en";
  const rows = await listTestimonialsAdmin();

  const columns: Column<Row>[] = [
    {
      header: t("cols.name"),
      cell: (r) => (
        <span className="font-medium">{isEn ? r.authorEn : r.authorFr}</span>
      ),
    },
    {
      header: t("cols.role"),
      cell: (r) => (isEn ? r.roleEn : r.roleFr) ?? "—",
    },
    {
      header: "",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="sm" aria-label="Edit">
            <Link href={`/admin/testimonials/${r.id}/edit`}>
              <Pencil className="size-4" />
            </Link>
          </Button>
          <DeleteButton
            action={deleteTestimonial.bind(null, r.id)}
            confirmLabel="Supprimer ce témoignage ?"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Témoignages</h1>
        <Button asChild>
          <Link href="/admin/testimonials/new">
            <Plus className="size-4" />
            Nouveau témoignage
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} rows={rows} empty={t("empty")} getKey={(r) => r.id} />
    </div>
  );
}
