import { Pencil, Plus } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { listEventsAdmin } from "@/server/repositories/admin";
import { deleteEvent } from "@/server/actions/admin-events";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listEventsAdmin>>[number];

export default async function AdminEventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const isEn = (await getLocale()) === "en";
  const rows = await listEventsAdmin();

  const columns: Column<Row>[] = [
    {
      header: t("cols.title"),
      cell: (r) => (
        <span className="font-medium">{isEn ? r.titleEn : r.titleFr}</span>
      ),
    },
    { header: t("cols.type"), cell: (r) => r.type },
    { header: t("cols.date"), cell: (r) => formatDate(r.startDate, locale) },
    {
      header: "",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant="ghost" size="sm" aria-label="Edit">
            <Link href={`/admin/events/${r.id}/edit`}>
              <Pencil className="size-4" />
            </Link>
          </Button>
          <DeleteButton
            action={deleteEvent.bind(null, r.id)}
            confirmLabel="Supprimer cet événement ?"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("nav.events")}</h1>
        <Button asChild>
          <Link href="/admin/events/new">
            <Plus className="size-4" />
            Nouvel événement
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
