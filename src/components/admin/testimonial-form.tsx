"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "@/lib/i18n/navigation";
import type { AdminActionState } from "@/server/actions/admin-articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initial: AdminActionState = { status: "idle" };

export type TestimonialFormValues = {
  authorFr: string;
  authorEn: string;
  roleFr: string;
  roleEn: string;
  quoteFr: string;
  quoteEn: string;
  order: number;
  published: boolean;
};

export function TestimonialForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  defaults?: Partial<TestimonialFormValues>;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (state.status === "success") router.push("/tenere/testimonials");
  }, [state.status, router]);

  const cls = "bg-background";

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="authorFr">Auteur (FR)</Label>
          <Input id="authorFr" name="authorFr" required defaultValue={defaults?.authorFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="authorEn">Auteur (EN)</Label>
          <Input id="authorEn" name="authorEn" required defaultValue={defaults?.authorEn} className={cls} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="roleFr">Rôle (FR)</Label>
          <Input id="roleFr" name="roleFr" defaultValue={defaults?.roleFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="roleEn">Rôle (EN)</Label>
          <Input id="roleEn" name="roleEn" defaultValue={defaults?.roleEn} className={cls} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="quoteFr">Citation (FR)</Label>
          <Textarea id="quoteFr" name="quoteFr" required rows={3} defaultValue={defaults?.quoteFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quoteEn">Citation (EN)</Label>
          <Textarea id="quoteEn" name="quoteEn" required rows={3} defaultValue={defaults?.quoteEn} className={cls} />
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
          Veuillez vérifier les champs.
        </p>
      )}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Enregistrement…" : submitLabel}
      </Button>
    </form>
  );
}
