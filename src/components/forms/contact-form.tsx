"use client";

import { useActionState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import { sendContactMessage } from "@/server/actions/contact";
import type { ActionState } from "@/server/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";

const initialState: ActionState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("contact.form");
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast({ variant: "success", title: t("success") });
      formRef.current?.reset();
    } else if (state.status === "error") {
      toast({
        variant: "error",
        title: state.message === "rate_limited" ? t("rateLimited") : t("error"),
      });
    }
  }, [state, t, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5" noValidate>
      {/* Honeypot: hidden from users, catches bots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">{t("subject")}</Label>
        <Input id="subject" name="subject" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea id="message" name="message" required rows={6} />
      </div>

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
