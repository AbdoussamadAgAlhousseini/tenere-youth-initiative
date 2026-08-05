import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ResourceForm } from "@/components/admin/resource-form";
import { createResource } from "@/server/actions/admin-resources";

export default async function NewResourcePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/admin/resources">
          <ArrowLeft />
          Ressources
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Nouvelle ressource</h1>
      <ResourceForm action={createResource} submitLabel="Créer la ressource" />
    </div>
  );
}
