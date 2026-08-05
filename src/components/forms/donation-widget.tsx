"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Heart } from "lucide-react";

import { createDonation } from "@/server/actions/donation";
import type { ActionState } from "@/server/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { cn, formatNumber } from "@/lib/utils";

const presets = [25, 50, 100, 250];
const initialState: ActionState = { status: "idle" };

export function DonationWidget() {
  const locale = useLocale();
  const t = useTranslations("pages.donate");
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"ONE_TIME" | "MONTHLY" | "YEARLY">(
    "ONE_TIME",
  );
  const [state, formAction, pending] = useActionState(
    createDonation,
    initialState,
  );

  const effectiveAmount = custom ? Number(custom) : amount;

  useEffect(() => {
    if (state.status === "success") {
      toast({ variant: "success", title: t("success") });
      formRef.current?.reset();
      setAmount(50);
      setCustom("");
      setFrequency("ONE_TIME");
    } else if (state.status === "error") {
      toast({ variant: "error", title: t("error") });
    }
  }, [state, t, toast]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="bg-card space-y-6 rounded-2xl border p-6 shadow-sm sm:p-8"
    >
      {/* Frequency */}
      <div className="space-y-2">
        <Label>{t("frequency")}</Label>
        <div className="grid grid-cols-3 gap-2">
          {(["ONE_TIME", "MONTHLY", "YEARLY"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFrequency(f)}
              className={cn(
                "rounded-md border py-2 text-sm font-medium transition-colors",
                frequency === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "hover:bg-secondary",
              )}
            >
              {f === "ONE_TIME"
                ? t("once")
                : f === "MONTHLY"
                  ? t("monthly")
                  : t("yearly")}
            </button>
          ))}
        </div>
      </div>

      {/* Amount presets */}
      <div className="space-y-2">
        <Label>{t("amount")}</Label>
        <div className="grid grid-cols-4 gap-2">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setAmount(p);
                setCustom("");
              }}
              className={cn(
                "rounded-md border py-3 text-sm font-semibold transition-colors",
                !custom && amount === p
                  ? "bg-primary text-primary-foreground border-primary"
                  : "hover:bg-secondary",
              )}
            >
              {formatNumber(p, locale)} €
            </button>
          ))}
        </div>
        <Input
          type="number"
          min={1}
          inputMode="numeric"
          placeholder={t("custom")}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="donorName">{t("donorName")}</Label>
          <Input id="donorName" name="donorName" autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="donate-email">{t("email")}</Label>
          <Input
            id="donate-email"
            name="email"
            type="email"
            autoComplete="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="donate-message">{t("message")}</Label>
        <Textarea id="donate-message" name="message" rows={3} />
      </div>

      {/* Hidden fields submitted to the action */}
      <input type="hidden" name="amount" value={effectiveAmount || 0} />
      <input type="hidden" name="currency" value="EUR" />
      <input type="hidden" name="frequency" value={frequency} />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={pending || !effectiveAmount}
      >
        <Heart className="size-4" />
        {pending
          ? t("processing")
          : `${t("submit")} ${formatNumber(effectiveAmount || 0, locale)} €`}
      </Button>

      <p className="text-muted-foreground text-center text-xs text-pretty">
        {t("note")}
      </p>
    </form>
  );
}
