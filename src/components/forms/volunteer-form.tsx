"use client";

import { useActionState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import { submitVolunteer } from "@/server/actions/volunteer";
import type { ActionState } from "@/server/actions/newsletter";
import { programThemes } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";

const initialState: ActionState = { status: "idle" };

export function VolunteerForm() {
  const locale = useLocale();
  const t = useTranslations("pages.volunteer");
  const themes = useTranslations("programThemes");
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    submitVolunteer,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast({ variant: "success", title: t("success") });
      formRef.current?.reset();
    } else if (state.status === "error") {
      toast({
        variant: "error",
        title: state.message === "invalid" ? t("selectExpertise") : t("error"),
      });
    }
  }, [state, t, toast]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="bg-card space-y-5 rounded-2xl border p-6 shadow-sm sm:p-8"
      noValidate
    >
      <input type="hidden" name="locale" value={locale} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t("fullName")}</Label>
          <Input id="fullName" name="fullName" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vol-email">{t("email")}</Label>
          <Input
            id="vol-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t("phone")}</Label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">{t("expertise")}</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {programThemes.map((th) => (
            <label
              key={th}
              className="hover:bg-secondary flex cursor-pointer items-center gap-2 rounded-md border p-2.5 text-sm"
            >
              <input
                type="checkbox"
                name="expertise"
                value={th}
                className="accent-primary size-4"
              />
              {themes(th)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="availability">{t("availability")}</Label>
        <Input id="availability" name="availability" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivation">{t("motivation")}</Label>
        <Textarea id="motivation" name="motivation" required rows={5} />
      </div>

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
