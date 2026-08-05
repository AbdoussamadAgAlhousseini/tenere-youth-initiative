import { Check, X } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { listVolunteers } from "@/server/repositories/admin";
import { setVolunteerStatus } from "@/server/actions/admin-status";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listVolunteers>>[number];

const statusTone: Record<string, string> = {
  PENDING: "bg-secondary",
  REVIEWING: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  ACCEPTED: "bg-oasis-500/15 text-oasis-700 dark:text-oasis-300",
  DECLINED: "bg-destructive/15 text-destructive",
};

export default async function AdminVolunteersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const rows = await listVolunteers();

  const columns: Column<Row>[] = [
    { header: t("cols.name"), cell: (r) => <span className="font-medium">{r.fullName}</span> },
    { header: t("cols.email"), cell: (r) => r.email },
    { header: t("cols.expertise"), cell: (r) => r.expertise.join(", ") },
    {
      header: t("cols.status"),
      cell: (r) => (
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusTone[r.status]}`}>
          {r.status}
        </span>
      ),
    },
    { header: t("cols.date"), cell: (r) => formatDate(r.createdAt, locale) },
    {
      header: "",
      className: "text-right",
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <form action={setVolunteerStatus.bind(null, r.id, "ACCEPTED")}>
            <Button type="submit" variant="ghost" size="sm" className="text-oasis-600" aria-label="Accepter">
              <Check className="size-4" />
            </Button>
          </form>
          <form action={setVolunteerStatus.bind(null, r.id, "DECLINED")}>
            <Button type="submit" variant="ghost" size="sm" className="text-destructive" aria-label="Refuser">
              <X className="size-4" />
            </Button>
          </form>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("nav.volunteers")}</h1>
      <DataTable columns={columns} rows={rows} empty={t("empty")} getKey={(r) => r.id} />
    </div>
  );
}
