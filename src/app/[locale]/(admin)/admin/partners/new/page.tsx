import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PartnerForm } from "@/components/admin/partner-form";
import { createPartner } from "@/server/actions/admin-misc";

export default async function NewPartnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/admin/partners">
          <ArrowLeft />
          Partenaires
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Nouveau partenaire</h1>
      <PartnerForm action={createPartner} submitLabel="Créer" />
    </div>
  );
}
