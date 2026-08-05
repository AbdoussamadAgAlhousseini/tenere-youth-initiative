import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getLocale, setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { EventForm } from "@/components/admin/event-form";
import { updateEvent } from "@/server/actions/admin-events";
import { listProgramsAdmin } from "@/server/repositories/admin";
import { db } from "@/server/db";

const toLocalInput = (d: Date | null | undefined) =>
  d ? d.toISOString().slice(0, 16) : "";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const isEn = (await getLocale()) === "en";

  const [event, programs] = await Promise.all([
    db.event.findUnique({ where: { id } }),
    listProgramsAdmin(),
  ]);
  if (!event) notFound();

  const action = updateEvent.bind(null, id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/admin/events">
          <ArrowLeft />
          Événements
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">{"Modifier l'événement"}</h1>
      <EventForm
        action={action}
        programs={programs.map((p) => ({
          id: p.id,
          label: isEn ? p.titleEn : p.titleFr,
        }))}
        defaults={{
          slug: event.slug,
          titleFr: event.titleFr,
          titleEn: event.titleEn,
          descriptionFr: event.descriptionFr,
          descriptionEn: event.descriptionEn,
          type: event.type,
          startDate: toLocalInput(event.startDate),
          endDate: toLocalInput(event.endDate),
          locationFr: event.locationFr ?? "",
          locationEn: event.locationEn ?? "",
          isOnline: event.isOnline,
          programId: event.programId,
        }}
        submitLabel="Enregistrer les modifications"
      />
    </div>
  );
}
