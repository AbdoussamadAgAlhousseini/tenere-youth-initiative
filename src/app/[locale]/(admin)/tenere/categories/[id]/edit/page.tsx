import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { TaxonomyForm } from "@/components/admin/taxonomy-form";
import { updateCategory } from "@/server/actions/admin-taxonomy";
import { db } from "@/server/db";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const category = await db.category.findUnique({ where: { id } });
  if (!category) notFound();

  const action = updateCategory.bind(null, id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/categories">
          <ArrowLeft />
          Catégories
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Modifier la catégorie</h1>
      <TaxonomyForm
        action={action}
        basePath="/tenere/categories"
        defaults={{ slug: category.slug, nameFr: category.nameFr, nameEn: category.nameEn }}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
