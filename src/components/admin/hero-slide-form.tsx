"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "@/lib/i18n/navigation";
import type { AdminActionState } from "@/server/actions/admin-articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initial: AdminActionState = { status: "idle" };

export type HeroSlideFormValues = {
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  image: string;
  order: number;
  published: boolean;
};

export function HeroSlideForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  defaults?: Partial<HeroSlideFormValues>;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (state.status === "success") router.push("/tenere/hero");
  }, [state.status, router]);

  const cls = "bg-background";

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="titleFr">Titre / slogan (FR)</Label>
          <Textarea id="titleFr" name="titleFr" required rows={2} defaultValue={defaults?.titleFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="titleEn">Titre / slogan (EN)</Label>
          <Textarea id="titleEn" name="titleEn" required rows={2} defaultValue={defaults?.titleEn} className={cls} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="subtitleFr">Sous-titre (FR) — optionnel</Label>
          <Textarea id="subtitleFr" name="subtitleFr" rows={3} defaultValue={defaults?.subtitleFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtitleEn">Sous-titre (EN) — optionnel</Label>
          <Textarea id="subtitleEn" name="subtitleEn" rows={3} defaultValue={defaults?.subtitleEn} className={cls} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image de fond (URL) — optionnel</Label>
        <Input id="image" name="image" type="url" placeholder="https://…/desert.jpg" defaultValue={defaults?.image} className={cls} />
        <p className="text-muted-foreground text-xs">
          {"Photo du Ténéré (désert, chameau, puits…). Sans image, un dégradé sable est utilisé."}
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
