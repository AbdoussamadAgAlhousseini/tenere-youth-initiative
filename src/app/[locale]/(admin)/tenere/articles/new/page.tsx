import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArticleForm } from "@/components/admin/article-form";
import { createArticle } from "@/server/actions/admin-articles";
import { getCategories } from "@/server/repositories/articles";

export default async function NewArticlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const categories = await getCategories();
  const isEn = locale === "en";

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/articles">
          <ArrowLeft />
          Articles
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">Nouvel article</h1>
      <ArticleForm
        action={createArticle}
        categories={categories.map((c) => ({
          id: c.id,
          label: isEn ? c.nameEn : c.nameFr,
        }))}
        submitLabel="Créer l'article"
      />
    </div>
  );
}
