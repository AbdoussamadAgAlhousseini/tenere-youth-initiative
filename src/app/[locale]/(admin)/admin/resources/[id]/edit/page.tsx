import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ResourceForm } from "@/components/admin/resource-form";
import { updateResource } from "@/server/actions/admin-resources";
import { db } from "@/server/db";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const resource = await db.resource.findUnique({ where: { id } });
  if (!resource) notFound();

  const action = updateResource.bind(null, id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/admin/resources">
          <ArrowLeft />
          Ressources
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Modifier la ressource</h1>
      <ResourceForm
        action={action}
        defaults={{
          slug: resource.slug,
          titleFr: resource.titleFr,
          titleEn: resource.titleEn,
          descriptionFr: resource.descriptionFr,
          descriptionEn: resource.descriptionEn,
          type: resource.type,
          fileUrl: resource.fileUrl,
          fileFormat: resource.fileFormat ?? "",
          fileSize: resource.fileSize,
          published: resource.published,
        }}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
