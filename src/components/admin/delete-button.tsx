"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Submits a bound server action after a confirmation prompt. */
export function DeleteButton({
  action,
  confirmLabel,
}: {
  action: () => Promise<void>;
  confirmLabel: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmLabel)) e.preventDefault();
      }}
    >
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="text-destructive hover:text-destructive"
        aria-label={confirmLabel}
      >
        <Trash2 className="size-4" />
      </Button>
    </form>
  );
}
