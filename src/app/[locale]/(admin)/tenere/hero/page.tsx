import { Pencil, Plus } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { listHeroSlidesAdmin } from "@/server/repositories/admin";
import { deleteHeroSlide } from "@/server/actions/admin-hero";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listHeroSlidesAdmin>>[number];

export default async function AdminHeroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const isEn = (await getLocale()) === "en";
  const rows = await listHeroSlidesAdmin();

  const columns: Column<Row>[] = [
    {
      header: "Slogan",
      cell: (r) => (
        <span className="font-medium">{isEn ? r.titleEn : r.titleFr}</span>
      ),
    },
    {
      header: "Image",
      cell: (r) => (r.image ? "✓" : "—"),
    },
    {
      header: "Publié",
      cell: (r) => (r.published ? "✓" : "—"),
    },
    {
      header: "",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="sm" aria-label="Edit">
            <Link href={`/tenere/hero/${r.id}/edit`}>
              <Pencil className="size-4" />
            </Link>
          </Button>
          <DeleteButton
            action={deleteHeroSlide.bind(null, r.id)}
            confirmLabel="Supprimer cette slide ?"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Accueil — slogans</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {"Les slogans défilent en carrousel en haut de la page d'accueil."}
          </p>
        </div>
        <Button asChild>
          <Link href="/tenere/hero/new">
            <Plus className="size-4" />
            Nouvelle slide
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} rows={rows} empty={t("empty")} getKey={(r) => r.id} />
    </div>
  );
}
