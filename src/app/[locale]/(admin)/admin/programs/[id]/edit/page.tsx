import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ProgramForm } from "@/components/admin/program-form";
import { updateProgram } from "@/server/actions/admin-programs";
import { db } from "@/server/db";

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const program = await db.program.findUnique({ where: { id } });
  if (!program) notFound();

  const action = updateProgram.bind(null, id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/admin/programs">
          <ArrowLeft />
          Programmes
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">{"Modifier le programme"}</h1>
      <ProgramForm
        action={action}
        defaults={{
          slug: program.slug,
          theme: program.theme,
          icon: program.icon ?? "Sprout",
          titleFr: program.titleFr,
          titleEn: program.titleEn,
          summaryFr: program.summaryFr,
          summaryEn: program.summaryEn,
          descriptionFr: program.descriptionFr,
          descriptionEn: program.descriptionEn,
          order: program.order,
          published: program.published,
        }}
        submitLabel="Enregistrer les modifications"
      />
    </div>
  );
}
