"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "@/lib/i18n/navigation";
import type { AdminActionState } from "@/server/actions/admin-articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initial: AdminActionState = { status: "idle" };

export type EventFormValues = {
  slug: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  type: string;
  startDate: string; // datetime-local
  endDate: string;
  locationFr: string;
  locationEn: string;
  isOnline: boolean;
  programId: string | null;
};

export function EventForm({
  action,
  programs,
  defaults,
  submitLabel,
}: {
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  programs: { id: string; label: string }[];
  defaults?: Partial<EventFormValues>;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (state.status === "success") router.push("/tenere/events");
  }, [state.status, router]);

  const cls = "bg-background";
  const selectCls =
    "border-input bg-background h-11 w-full rounded-md border px-3 text-sm";

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required defaultValue={defaults?.slug} placeholder="mon-evenement" className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <select id="type" name="type" defaultValue={defaults?.type ?? "WEBINAR"} className={selectCls}>
            <option value="WEBINAR">Webinaire</option>
            <option value="FORUM">Forum</option>
            <option value="CONFERENCE">Conférence</option>
            <option value="WORKSHOP">Atelier</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">Début</Label>
          <Input id="startDate" name="startDate" type="datetime-local" required defaultValue={defaults?.startDate} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Fin (facultatif)</Label>
          <Input id="endDate" name="endDate" type="datetime-local" defaultValue={defaults?.endDate} className={cls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="titleFr">Titre (FR)</Label>
          <Input id="titleFr" name="titleFr" required defaultValue={defaults?.titleFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="titleEn">Titre (EN)</Label>
          <Input id="titleEn" name="titleEn" required defaultValue={defaults?.titleEn} className={cls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="descriptionFr">Description (FR)</Label>
          <Textarea id="descriptionFr" name="descriptionFr" required rows={4} defaultValue={defaults?.descriptionFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="descriptionEn">Description (EN)</Label>
          <Textarea id="descriptionEn" name="descriptionEn" required rows={4} defaultValue={defaults?.descriptionEn} className={cls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="locationFr">Lieu (FR)</Label>
          <Input id="locationFr" name="locationFr" defaultValue={defaults?.locationFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="locationEn">Lieu (EN)</Label>
          <Input id="locationEn" name="locationEn" defaultValue={defaults?.locationEn} className={cls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="programId">Programme lié (facultatif)</Label>
          <select id="programId" name="programId" defaultValue={defaults?.programId ?? ""} className={selectCls}>
            <option value="">—</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <label className="mt-8 flex items-center gap-2 text-sm">
          <input type="checkbox" name="isOnline" defaultChecked={defaults?.isOnline} className="accent-primary size-4" />
          En ligne
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-destructive text-sm">
          {state.message === "slug_taken" ? "Ce slug est déjà utilisé." : "Veuillez vérifier les champs."}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Enregistrement…" : submitLabel}
      </Button>
    </form>
  );
}
