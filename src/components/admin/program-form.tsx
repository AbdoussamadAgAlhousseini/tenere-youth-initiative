"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "@/lib/i18n/navigation";
import type { AdminActionState } from "@/server/actions/admin-articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initial: AdminActionState = { status: "idle" };

const themes = [
  "LEADERSHIP",
  "EDUCATION",
  "PASTORALISM",
  "CLIMATE",
  "DIGITAL",
  "WOMEN",
  "ENTREPRENEURSHIP",
  "ADVOCACY",
] as const;

// Lucide icon names available in the site's icon registry.
const icons = [
  "Compass",
  "GraduationCap",
  "Tent",
  "Sprout",
  "Laptop",
  "HeartHandshake",
  "Store",
  "Megaphone",
];

export type ProgramFormValues = {
  slug: string;
  theme: string;
  icon: string;
  titleFr: string;
  titleEn: string;
  summaryFr: string;
  summaryEn: string;
  descriptionFr: string;
  descriptionEn: string;
  order: number;
  published: boolean;
};

export function ProgramForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  defaults?: Partial<ProgramFormValues>;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (state.status === "success") router.push("/tenere/programs");
  }, [state.status, router]);

  const cls = "bg-background";
  const selectCls =
    "border-input bg-background h-11 w-full rounded-md border px-3 text-sm";

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required defaultValue={defaults?.slug} placeholder="leadership" className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="theme">Thème</Label>
          <select id="theme" name="theme" defaultValue={defaults?.theme ?? "LEADERSHIP"} className={selectCls}>
            {themes.map((th) => (
              <option key={th} value={th}>
                {th}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon">Icône</Label>
          <select id="icon" name="icon" defaultValue={defaults?.icon ?? "Sprout"} className={selectCls}>
            {icons.map((ic) => (
              <option key={ic} value={ic}>
                {ic}
              </option>
            ))}
          </select>
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
          <Label htmlFor="summaryFr">Résumé (FR)</Label>
          <Textarea id="summaryFr" name="summaryFr" required rows={2} defaultValue={defaults?.summaryFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="summaryEn">Résumé (EN)</Label>
          <Textarea id="summaryEn" name="summaryEn" required rows={2} defaultValue={defaults?.summaryEn} className={cls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="descriptionFr">Description (FR)</Label>
          <Textarea id="descriptionFr" name="descriptionFr" required rows={6} defaultValue={defaults?.descriptionFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="descriptionEn">Description (EN)</Label>
          <Textarea id="descriptionEn" name="descriptionEn" required rows={6} defaultValue={defaults?.descriptionEn} className={cls} />
        </div>
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
          {state.message === "slug_taken" ? "Ce slug est déjà utilisé." : "Veuillez vérifier les champs."}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Enregistrement…" : submitLabel}
      </Button>
    </form>
  );
}
