import { Check, Circle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { listContactMessages } from "@/server/repositories/admin";
import { toggleContactHandled } from "@/server/actions/admin-status";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Row = Awaited<ReturnType<typeof listContactMessages>>[number];

export default async function AdminMessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const rows = await listContactMessages();

  const columns: Column<Row>[] = [
    {
      header: t("cols.name"),
      cell: (r) => (
        <span className={r.handled ? "text-muted-foreground" : "font-medium"}>
          {r.name}
        </span>
      ),
    },
    { header: t("cols.email"), cell: (r) => r.email },
    { header: t("cols.subject"), cell: (r) => r.subject },
    { header: t("cols.date"), cell: (r) => formatDate(r.createdAt, locale) },
    {
      header: "",
      className: "text-right",
      cell: (r) => (
        <form action={toggleContactHandled.bind(null, r.id)}>
          <Button
            type="submit"
            variant={r.handled ? "ghost" : "outline"}
            size="sm"
            className="gap-1.5"
          >
            {r.handled ? (
              <Check className="text-primary size-4" />
            ) : (
              <Circle className="size-4" />
            )}
            {r.handled ? "Traité" : "À traiter"}
          </Button>
        </form>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("nav.messages")}</h1>
      <DataTable columns={columns} rows={rows} empty={t("empty")} getKey={(r) => r.id} />
    </div>
  );
}
