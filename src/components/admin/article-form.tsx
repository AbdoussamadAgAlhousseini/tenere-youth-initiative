"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "@/lib/i18n/navigation";
import type { AdminActionState } from "@/server/actions/admin-articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initial: AdminActionState = { status: "idle" };

export type ArticleFormValues = {
  slug: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  bodyFr: string;
  bodyEn: string;
  categoryId: string | null;
  status: string;
};

export type CategoryOption = { id: string; label: string };

export function ArticleForm({
  action,
  categories,
  defaults,
  submitLabel,
}: {
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  categories: CategoryOption[];
  defaults?: Partial<ArticleFormValues>;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (state.status === "success") {
      router.push("/admin/articles");
    }
  }, [state.status, router]);

  const inputClass = "bg-background";

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            required
            defaultValue={defaults?.slug}
            placeholder="mon-article"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <select
              id="status"
              name="status"
              defaultValue={defaults?.status ?? "DRAFT"}
              className="border-input bg-background h-11 w-full rounded-md border px-3 text-sm"
            >
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publié</option>
              <option value="ARCHIVED">Archivé</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryId">Catégorie</Label>
            <select
              id="categoryId"
              name="categoryId"
              defaultValue={defaults?.categoryId ?? ""}
              className="border-input bg-background h-11 w-full rounded-md border px-3 text-sm"
            >
              <option value="">—</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="titleFr">Titre (FR)</Label>
          <Input id="titleFr" name="titleFr" required defaultValue={defaults?.titleFr} className={inputClass} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="titleEn">Titre (EN)</Label>
          <Input id="titleEn" name="titleEn" required defaultValue={defaults?.titleEn} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="excerptFr">Extrait (FR)</Label>
          <Textarea id="excerptFr" name="excerptFr" required rows={2} defaultValue={defaults?.excerptFr} className={inputClass} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="excerptEn">Extrait (EN)</Label>
          <Textarea id="excerptEn" name="excerptEn" required rows={2} defaultValue={defaults?.excerptEn} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="bodyFr">Contenu (FR)</Label>
          <Textarea id="bodyFr" name="bodyFr" required rows={8} defaultValue={defaults?.bodyFr} className={inputClass} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bodyEn">Contenu (EN)</Label>
          <Textarea id="bodyEn" name="bodyEn" required rows={8} defaultValue={defaults?.bodyEn} className={inputClass} />
        </div>
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-destructive text-sm">
          {state.message === "slug_taken"
            ? "Ce slug est déjà utilisé."
            : "Veuillez vérifier les champs du formulaire."}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Enregistrement…" : submitLabel}
      </Button>
    </form>
  );
}
