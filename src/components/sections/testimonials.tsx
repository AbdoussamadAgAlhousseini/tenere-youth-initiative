import { Quote } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { getTestimonials } from "@/server/repositories/misc";

export async function Testimonials() {
  const t = await getTranslations("home.testimonials");
  const isEn = (await getLocale()) === "en";
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-secondary/40 border-y">
      <div className="container py-20">
        <h2 className="mb-10 text-center text-3xl font-semibold">
          {t("title")}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.id}
              className="bg-card flex flex-col gap-4 rounded-2xl border p-6 shadow-sm"
            >
              <Quote className="text-accent size-8" aria-hidden />
              <blockquote className="text-pretty">
                {isEn ? item.quoteEn : item.quoteFr}
              </blockquote>
              <figcaption className="mt-auto">
                <p className="font-semibold">
                  {isEn ? item.authorEn : item.authorFr}
                </p>
                <p className="text-muted-foreground text-sm">
                  {isEn ? item.roleEn : item.roleFr}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
