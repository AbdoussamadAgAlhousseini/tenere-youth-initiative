import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { TaxonomyForm } from "@/components/admin/taxonomy-form";
import { updateTag } from "@/server/actions/admin-taxonomy";
import { db } from "@/server/db";

export default async function EditTagPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const tag = await db.tag.findUnique({ where: { id } });
  if (!tag) notFound();

  const action = updateTag.bind(null, id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/tags">
          <ArrowLeft />
          Tags
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Modifier le tag</h1>
      <TaxonomyForm
        action={action}
        basePath="/tenere/tags"
        defaults={{ slug: tag.slug, nameFr: tag.nameFr, nameEn: tag.nameEn }}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
