import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { TaxonomyForm } from "@/components/admin/taxonomy-form";
import { createCategory } from "@/server/actions/admin-taxonomy";

export default async function NewCategoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/admin/categories">
          <ArrowLeft />
          Catégories
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Nouvelle catégorie</h1>
      <TaxonomyForm
        action={createCategory}
        basePath="/admin/categories"
        submitLabel="Créer"
      />
    </div>
  );
}
