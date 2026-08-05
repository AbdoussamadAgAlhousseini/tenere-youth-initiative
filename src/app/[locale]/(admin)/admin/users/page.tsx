import { getTranslations, setRequestLocale } from "next-intl/server";

import { listUsers } from "@/server/repositories/admin";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { formatDate } from "@/lib/utils";

type Row = Awaited<ReturnType<typeof listUsers>>[number];

export default async function AdminUsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const rows = await listUsers();

  const columns: Column<Row>[] = [
    { header: t("cols.name"), cell: (r) => <span className="font-medium">{r.name ?? "—"}</span> },
    { header: t("cols.email"), cell: (r) => r.email },
    {
      header: t("cols.role"),
      cell: (r) => (
        <span className="bg-secondary rounded-full px-2 py-0.5 text-xs font-medium">
          {r.role}
        </span>
      ),
    },
    { header: t("cols.date"), cell: (r) => formatDate(r.createdAt, locale) },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("nav.users")}</h1>
      <DataTable columns={columns} rows={rows} empty={t("empty")} getKey={(r) => r.id} />
    </div>
  );
}
