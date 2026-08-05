import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { NewsletterForm } from "@/components/forms/newsletter-form";

export function NewsletterSection() {
  const t = useTranslations("home.newsletter");

  return (
    <section className="bg-secondary/40 border-t">
      <div className="container max-w-3xl py-20 text-center">
        <span className="bg-primary/10 text-primary mx-auto mb-5 flex size-12 items-center justify-center rounded-xl">
          <Mail className="size-6" aria-hidden />
        </span>
        <h2 className="text-3xl font-semibold">{t("title")}</h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-lg">
          {t("body")}
        </p>
        <div className="mt-8">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
