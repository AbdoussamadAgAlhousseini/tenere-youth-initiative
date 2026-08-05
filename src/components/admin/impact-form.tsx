"use client";

import { useActionState } from "react";

import type { AdminActionState } from "@/server/actions/admin-articles";
import { updateImpactStats } from "@/server/actions/admin-settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: AdminActionState = { status: "idle" };

export type ImpactValues = {
  youth: number;
  programs: number;
  communities: number;
  countries: number;
};

const FIELDS: { name: keyof ImpactValues; label: string; hint: string }[] = [
  { name: "youth", label: "Jeunes accompagnés", hint: "Jeunes / bénéficiaires" },
  { name: "programs", label: "Programmes", hint: "Nombre de programmes" },
  { name: "communities", label: "Communautés", hint: "Communautés touchées" },
  { name: "countries", label: "Pays", hint: "Pays d'intervention" },
];

export function ImpactForm({ defaults }: { defaults: ImpactValues }) {
  const [state, formAction, pending] = useActionState(
    updateImpactStats,
    initial,
  );
  const cls = "bg-background";

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.name} className="space-y-2">
            <Label htmlFor={f.name}>{f.label}</Label>
            <Input
              id={f.name}
              name={f.name}
              type="number"
              min={0}
              required
              defaultValue={defaults[f.name]}
              className={cls}
            />
            <p className="text-muted-foreground text-xs">{f.hint}</p>
          </div>
        ))}
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-destructive text-sm">
          Veuillez saisir des nombres valides.
        </p>
      )}
      {state.status === "success" && (
        <p role="status" className="text-primary text-sm font-medium">
          {"Chiffres enregistrés. Ils apparaissent sur l'accueil sous ~30 s."}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Enregistrement…" : "Enregistrer"}
      </Button>
    </form>
  );
}
