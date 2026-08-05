"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "@/lib/i18n/navigation";
import type { AdminActionState } from "@/server/actions/admin-articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/image-upload";

const initial: AdminActionState = { status: "idle" };

export type GalleryFormValues = {
  titleFr: string;
  titleEn: string;
  url: string;
  type: string;
  album: string;
  order: number;
};

export function GalleryForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  defaults?: Partial<GalleryFormValues>;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (state.status === "success") router.push("/tenere/gallery");
  }, [state.status, router]);

  const cls = "bg-background";
  const selectCls =
    "border-input bg-background h-11 w-full rounded-md border px-3 text-sm";

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="titleFr">Légende (FR)</Label>
          <Input id="titleFr" name="titleFr" defaultValue={defaults?.titleFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="titleEn">Légende (EN)</Label>
          <Input id="titleEn" name="titleEn" defaultValue={defaults?.titleEn} className={cls} />
        </div>
      </div>
      <div className="space-y-2">
        <ImageUpload name="url" defaultValue={defaults?.url} label="Image (facultatif)" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="album">Album</Label>
          <Input id="album" name="album" defaultValue={defaults?.album} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <select id="type" name="type" defaultValue={defaults?.type ?? "IMAGE"} className={selectCls}>
            <option value="IMAGE">Image</option>
            <option value="VIDEO">Vidéo</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="order">Ordre</Label>
          <Input id="order" name="order" type="number" min={0} defaultValue={defaults?.order ?? 0} className={cls} />
        </div>
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-destructive text-sm">
          Veuillez vérifier les champs.
        </p>
      )}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Enregistrement…" : submitLabel}
      </Button>
    </form>
  );
}
