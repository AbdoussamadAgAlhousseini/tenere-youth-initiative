"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "@/lib/i18n/navigation";
import type { AdminActionState } from "@/server/actions/admin-articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: AdminActionState = { status: "idle" };

export type TaxonomyFormValues = {
  slug: string;
  nameFr: string;
  nameEn: string;
};

export function TaxonomyForm({
  action,
  basePath,
  defaults,
  submitLabel,
}: {
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  basePath: string;
  defaults?: Partial<TaxonomyFormValues>;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (state.status === "success") router.push(basePath);
  }, [state.status, router, basePath]);

  const cls = "bg-background";

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" required defaultValue={defaults?.slug} placeholder="actualites" className={cls} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nameFr">Nom (FR)</Label>
          <Input id="nameFr" name="nameFr" required defaultValue={defaults?.nameFr} className={cls} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nameEn">Nom (EN)</Label>
          <Input id="nameEn" name="nameEn" required defaultValue={defaults?.nameEn} className={cls} />
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
