import { Download, FileText } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { requireMember } from "@/lib/auth-guards";
import { getUserDocuments } from "@/server/repositories/member";
import { formatDate } from "@/lib/utils";

export default async function DocumentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requireMember();
  const t = await getTranslations("member");
  const documents = await getUserDocuments(session.user.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("nav.documents")}</h1>

      {documents.length === 0 ? (
        <div className="text-muted-foreground bg-card rounded-2xl border p-10 text-center">
          {t("empty")}
        </div>
      ) : (
        <ul className="space-y-3">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="bg-card flex items-center justify-between gap-4 rounded-xl border p-4"
            >
              <div className="flex items-center gap-3">
                <FileText className="text-primary size-5" />
                <div>
                  <p className="font-medium">{doc.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {formatDate(doc.createdAt, locale)}
                  </p>
                </div>
              </div>
              <a
                href={doc.fileUrl}
                className="text-muted-foreground hover:text-foreground"
                aria-label={doc.title}
              >
                <Download className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
