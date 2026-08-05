"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "@/lib/i18n/navigation";
import type { AdminActionState } from "@/server/actions/admin-articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initial: AdminActionState = { status: "idle" };

const types = ["REPORT", "GUIDE", "TOOLKIT", "PUBLICATION"] as const;

export type ResourceFormValues = {
  slug: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  type: string;
  fileUrl: string;
  fileFormat: string;
  fileSize: number | null;
  published: boolean;
};

export function ResourceForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  defaults?: Partial<ResourceFormValues>;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (state.status === "success") router.push("/admin/resources");
  }, [state.status, router]);

  const cls = "bg-background";
  const selectCls =
    "border-input bg-background h-11 w-full rounded-md border px-3 text-sm";

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required defaultValue={defaults?.slug} placeholder="rapport-annuel-2025" className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <select id="type" name="type" defaultValue={defaults?.type ?? "REPORT"} className={selectCls}>
            {types.map((ty) => (
              <option key={ty} value={ty}>
                {ty}
              </option>
            ))}
          </select>
        </div>
        <label className="mt-8 flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={defaults?.published ?? true} className="accent-primary size-4" />
          Publié
        </label>
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
          <Textarea id="descriptionFr" name="descriptionFr" required rows={3} defaultValue={defaults?.descriptionFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="descriptionEn">Description (EN)</Label>
          <Textarea id="descriptionEn" name="descriptionEn" required rows={3} defaultValue={defaults?.descriptionEn} className={cls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="fileUrl">URL du fichier</Label>
          <Input id="fileUrl" name="fileUrl" required defaultValue={defaults?.fileUrl} placeholder="/resources/…pdf" className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fileFormat">Format</Label>
          <Input id="fileFormat" name="fileFormat" defaultValue={defaults?.fileFormat} placeholder="PDF" className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fileSize">Taille (octets)</Label>
          <Input id="fileSize" name="fileSize" type="number" min={0} defaultValue={defaults?.fileSize ?? undefined} className={cls} />
        </div>
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
