import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { TaxonomyForm } from "@/components/admin/taxonomy-form";
import { createTag } from "@/server/actions/admin-taxonomy";

export default async function NewTagPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/tags">
          <ArrowLeft />
          Tags
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Nouveau tag</h1>
      <TaxonomyForm action={createTag} basePath="/tenere/tags" submitLabel="Créer" />
    </div>
  );
}
