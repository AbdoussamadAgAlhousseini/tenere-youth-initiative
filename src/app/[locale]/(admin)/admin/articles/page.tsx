import { Pencil, Plus } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { listArticlesAdmin } from "@/server/repositories/admin";
import { deleteArticle } from "@/server/actions/admin-articles";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listArticlesAdmin>>[number];

export default async function AdminArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const isEn = (await getLocale()) === "en";
  const rows = await listArticlesAdmin();

  const columns: Column<Row>[] = [
    {
      header: t("cols.title"),
      cell: (r) => (
        <span className="font-medium">{isEn ? r.titleEn : r.titleFr}</span>
      ),
    },
    {
      header: t("cols.status"),
      cell: (r) => (
        <span className="bg-secondary rounded-full px-2 py-0.5 text-xs font-medium">
          {r.status}
        </span>
      ),
    },
    {
      header: t("cols.date"),
      cell: (r) => (r.publishedAt ? formatDate(r.publishedAt, locale) : "—"),
    },
    {
      header: "",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="sm" aria-label="Edit">
            <Link href={`/admin/articles/${r.id}/edit`}>
              <Pencil className="size-4" />
            </Link>
          </Button>
          <DeleteButton
            action={deleteArticle.bind(null, r.id)}
            confirmLabel="Supprimer cet article ?"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("nav.articles")}</h1>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Plus className="size-4" />
            Nouvel article
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
