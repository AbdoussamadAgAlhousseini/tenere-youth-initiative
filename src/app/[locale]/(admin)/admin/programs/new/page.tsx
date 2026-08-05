import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ProgramForm } from "@/components/admin/program-form";
import { createProgram } from "@/server/actions/admin-programs";

export default async function NewProgramPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/admin/programs">
          <ArrowLeft />
          Programmes
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Nouveau programme</h1>
      <ProgramForm action={createProgram} submitLabel="Créer le programme" />
    </div>
  );
}
