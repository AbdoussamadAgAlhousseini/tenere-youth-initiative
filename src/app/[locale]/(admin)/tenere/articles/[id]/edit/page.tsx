import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArticleForm } from "@/components/admin/article-form";
import { updateArticle } from "@/server/actions/admin-articles";
import { getCategories } from "@/server/repositories/articles";
import { db } from "@/server/db";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  const [article, categories] = await Promise.all([
    db.article.findUnique({ where: { id } }),
    getCategories(),
  ]);
  if (!article) notFound();

  // Bind the article id to the update action.
  const action = updateArticle.bind(null, id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/tenere/articles">
          <ArrowLeft />
          Articles
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold">{"Modifier l'article"}</h1>
      <ArticleForm
        action={action}
        categories={categories.map((c) => ({
          id: c.id,
          label: isEn ? c.nameEn : c.nameFr,
        }))}
        defaults={{
          slug: article.slug,
          titleFr: article.titleFr,
          titleEn: article.titleEn,
          excerptFr: article.excerptFr,
          excerptEn: article.excerptEn,
          bodyFr: article.bodyFr,
          bodyEn: article.bodyEn,
          categoryId: article.categoryId,
          status: article.status,
        }}
        submitLabel="Enregistrer les modifications"
      />
    </div>
  );
}
