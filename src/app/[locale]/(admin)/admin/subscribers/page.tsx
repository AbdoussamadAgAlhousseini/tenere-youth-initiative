import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check, X } from "lucide-react";

import { listSubscribers } from "@/server/repositories/admin";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { formatDate } from "@/lib/utils";

type Row = Awaited<ReturnType<typeof listSubscribers>>[number];

export default async function AdminSubscribersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const rows = await listSubscribers();

  const columns: Column<Row>[] = [
    { header: t("cols.email"), cell: (r) => <span className="font-medium">{r.email}</span> },
    { header: t("cols.locale"), cell: (r) => r.locale.toUpperCase() },
    {
      header: t("cols.confirmed"),
      cell: (r) =>
        r.confirmed ? (
          <Check className="text-primary size-4" />
        ) : (
          <X className="text-muted-foreground size-4" />
        ),
    },
    { header: t("cols.date"), cell: (r) => formatDate(r.createdAt, locale) },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("nav.subscribers")}</h1>
      <DataTable columns={columns} rows={rows} empty={t("empty")} getKey={(r) => r.id} />
    </div>
  );
}
