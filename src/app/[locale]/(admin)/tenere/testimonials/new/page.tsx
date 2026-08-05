import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { createTestimonial } from "@/server/actions/admin-misc";

export default async function NewTestimonialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/testimonials">
          <ArrowLeft />
          Témoignages
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Nouveau témoignage</h1>
      <TestimonialForm action={createTestimonial} submitLabel="Créer" />
    </div>
  );
}
