"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "@/lib/i18n/navigation";
import type { AdminActionState } from "@/server/actions/admin-articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/image-upload";

const initial: AdminActionState = { status: "idle" };

export type TeamFormValues = {
  name: string;
  roleFr: string;
  roleEn: string;
  bioFr: string;
  bioEn: string;
  photo: string;
  order: number;
  published: boolean;
};

export function TeamForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  defaults?: Partial<TeamFormValues>;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (state.status === "success") router.push("/tenere/team");
  }, [state.status, router]);

  const cls = "bg-background";

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nom complet</Label>
        <Input id="name" name="name" required defaultValue={defaults?.name} className={cls} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="roleFr">Fonction (FR)</Label>
          <Input id="roleFr" name="roleFr" required defaultValue={defaults?.roleFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="roleEn">Fonction (EN)</Label>
          <Input id="roleEn" name="roleEn" required defaultValue={defaults?.roleEn} className={cls} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="bioFr">Biographie (FR)</Label>
          <Textarea id="bioFr" name="bioFr" required rows={3} defaultValue={defaults?.bioFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bioEn">Biographie (EN)</Label>
          <Textarea id="bioEn" name="bioEn" required rows={3} defaultValue={defaults?.bioEn} className={cls} />
        </div>
      </div>
      <div className="space-y-2">
        <ImageUpload name="photo" defaultValue={defaults?.photo} label="Photo — optionnel" />
        <p className="text-muted-foreground text-xs">
          {"Laissez vide pour afficher les initiales sur un fond dégradé."}
        </p>
      </div>
      <div className="flex items-center gap-6">
        <div className="space-y-2">
          <Label htmlFor="order">Ordre</Label>
          <Input id="order" name="order" type="number" min={0} defaultValue={defaults?.order ?? 0} className={`w-24 ${cls}`} />
        </div>
        <label className="mt-6 flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={defaults?.published ?? true} className="accent-primary size-4" />
          Publié
        </label>
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
