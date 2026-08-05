"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "@/lib/i18n/navigation";
import type { AdminActionState } from "@/server/actions/admin-articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initial: AdminActionState = { status: "idle" };

export type MilestoneFormValues = {
  year: string;
  textFr: string;
  textEn: string;
  order: number;
  published: boolean;
};

export function MilestoneForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  defaults?: Partial<MilestoneFormValues>;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (state.status === "success") router.push("/tenere/timeline");
  }, [state.status, router]);

  const cls = "bg-background";

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <div className="flex items-end gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Année</Label>
          <Input id="year" name="year" required defaultValue={defaults?.year} placeholder="2017" className={`w-32 ${cls}`} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="order">Ordre</Label>
          <Input id="order" name="order" type="number" min={0} defaultValue={defaults?.order ?? 0} className={`w-24 ${cls}`} />
        </div>
        <label className="mb-2.5 flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={defaults?.published ?? true} className="accent-primary size-4" />
          Publié
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="textFr">Étape (FR)</Label>
          <Textarea id="textFr" name="textFr" required rows={3} defaultValue={defaults?.textFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="textEn">Étape (EN)</Label>
          <Textarea id="textEn" name="textEn" required rows={3} defaultValue={defaults?.textEn} className={cls} />
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
