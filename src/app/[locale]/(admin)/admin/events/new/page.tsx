import { ArrowLeft } from "lucide-react";
import { getLocale, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { EventForm } from "@/components/admin/event-form";
import { createEvent } from "@/server/actions/admin-events";
import { listProgramsAdmin } from "@/server/repositories/admin";

export default async function NewEventPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = (await getLocale()) === "en";
  const programs = await listProgramsAdmin();

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/admin/events">
          <ArrowLeft />
          Événements
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Nouvel événement</h1>
      <EventForm
        action={createEvent}
        programs={programs.map((p) => ({
          id: p.id,
          label: isEn ? p.titleEn : p.titleFr,
        }))}
        submitLabel="Créer l'événement"
      />
    </div>
  );
}
