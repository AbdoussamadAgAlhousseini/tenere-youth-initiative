import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { updateTestimonial } from "@/server/actions/admin-misc";
import { db } from "@/server/db";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const item = await db.testimonial.findUnique({ where: { id } });
  if (!item) notFound();

  const action = updateTestimonial.bind(null, id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/testimonials">
          <ArrowLeft />
          Témoignages
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Modifier le témoignage</h1>
      <TestimonialForm
        action={action}
        defaults={{
          authorFr: item.authorFr,
          authorEn: item.authorEn,
          roleFr: item.roleFr ?? "",
          roleEn: item.roleEn ?? "",
          quoteFr: item.quoteFr,
          quoteEn: item.quoteEn,
          order: item.order,
          published: item.published,
        }}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
