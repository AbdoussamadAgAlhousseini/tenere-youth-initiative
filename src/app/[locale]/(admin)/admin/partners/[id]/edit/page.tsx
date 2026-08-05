import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PartnerForm } from "@/components/admin/partner-form";
import { updatePartner } from "@/server/actions/admin-misc";
import { db } from "@/server/db";

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const partner = await db.partner.findUnique({ where: { id } });
  if (!partner) notFound();

  const action = updatePartner.bind(null, id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/admin/partners">
          <ArrowLeft />
          Partenaires
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Modifier le partenaire</h1>
      <PartnerForm
        action={action}
        defaults={{
          name: partner.name,
          url: partner.url ?? "",
          tier: partner.tier,
          order: partner.order,
        }}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
