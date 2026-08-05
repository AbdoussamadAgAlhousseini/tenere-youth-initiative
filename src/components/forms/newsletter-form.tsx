"use client";

import { useActionState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import { subscribeNewsletter } from "@/server/actions/newsletter";
import type { ActionState } from "@/server/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

const initialState: ActionState = { status: "idle" };

export function NewsletterForm() {
  const locale = useLocale();
  const t = useTranslations("home.newsletter");
  const tf = useTranslations("newsletterForm");
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast({ variant: "success", title: tf("success") });
      formRef.current?.reset();
    } else if (state.status === "error") {
      toast({
        variant: "error",
        title:
          state.message === "rate_limited"
            ? tf("rateLimited")
            : state.message === "invalid"
              ? tf("invalid")
              : tf("error"),
      });
    }
  }, [state, tf, toast]);

  return (
    <form ref={formRef} action={formAction} className="mx-auto max-w-md space-y-3">
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
          {pending ? tf("sending") : t("submit")}
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
    </form>
  );
}
