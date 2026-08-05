"use client";

import { useActionState, useEffect } from "react";

import { useRouter } from "@/lib/i18n/navigation";
import type { AdminActionState } from "@/server/actions/admin-articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: AdminActionState = { status: "idle" };

const tiers = ["STRATEGIC", "FINANCIAL", "TECHNICAL", "COMMUNITY"] as const;

export type PartnerFormValues = {
  name: string;
  url: string;
  tier: string;
  order: number;
};

export function PartnerForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  defaults?: Partial<PartnerFormValues>;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (state.status === "success") router.push("/tenere/partners");
  }, [state.status, router]);

  const cls = "bg-background";
  const selectCls =
    "border-input bg-background h-11 w-full rounded-md border px-3 text-sm";

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>
        <Input id="name" name="name" required defaultValue={defaults?.name} className={cls} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="url">Site web (facultatif)</Label>
        <Input id="url" name="url" type="url" placeholder="https://…" defaultValue={defaults?.url} className={cls} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tier">Niveau</Label>
          <select id="tier" name="tier" defaultValue={defaults?.tier ?? "COMMUNITY"} className={selectCls}>
            {tiers.map((ti) => (
              <option key={ti} value={ti}>
                {ti}
              </option>
            ))}
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
