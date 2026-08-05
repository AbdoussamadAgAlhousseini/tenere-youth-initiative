import { getTranslations, setRequestLocale } from "next-intl/server";

import { listDonations } from "@/server/repositories/admin";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { formatDate, formatNumber } from "@/lib/utils";

type Row = Awaited<ReturnType<typeof listDonations>>[number];

export default async function AdminDonationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const rows = await listDonations();

  const columns: Column<Row>[] = [
    {
      header: t("cols.amount"),
      cell: (r) => (
        <span className="font-medium">
          {formatNumber(r.amount, locale)} {r.currency}
        </span>
      ),
    },
    { header: t("cols.name"), cell: (r) => r.donorName ?? "—" },
    {
      header: t("cols.status"),
      cell: (r) => (
        <span className="bg-secondary rounded-full px-2 py-0.5 text-xs font-medium">
          {r.status}
        </span>
      ),
    },
    { header: t("cols.date"), cell: (r) => formatDate(r.createdAt, locale) },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("nav.donations")}</h1>
      <DataTable columns={columns} rows={rows} empty={t("empty")} getKey={(r) => r.id} />
    </div>
  );
}
