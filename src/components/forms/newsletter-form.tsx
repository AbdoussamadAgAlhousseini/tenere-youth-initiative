"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

import { subscribeNewsletter } from "@/server/actions/newsletter";
import type { ActionState } from "@/server/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: ActionState = { status: "idle" };

export function NewsletterForm() {
  const locale = useLocale();
  const t = useTranslations("home.newsletter");
  const tf = useTranslations("newsletterForm");
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialState,
  );

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="flex items-center justify-center gap-2 text-sm font-medium"
      >
        <CheckCircle2 className="text-primary size-5" />
        {tf("success")}
      </p>
    );
  }

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-3">
      <input type="hidden" name="locale" value={locale} />
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          {t("placeholder")}
        </label>
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder={t("placeholder")}
          className="bg-background"
        />
        <Button type="submit" disabled={pending}>
          {t("submit")}
        </Button>
      </div>
      <label className="text-muted-foreground flex items-start gap-2 text-left text-xs">
        <input
          type="checkbox"
          name="consent"
          required
          className="accent-primary mt-0.5 size-4"
        />
        <span>{t("consent")}</span>
      </label>
      {state.status === "error" && (
        <p role="alert" className="text-destructive text-sm">
          {state.message === "rate_limited"
            ? tf("rateLimited")
            : state.message === "invalid"
              ? tf("invalid")
              : tf("error")}
        </p>
      )}
    </form>
  );
}
