import { getTranslations, setRequestLocale } from "next-intl/server";

import { requireMember } from "@/lib/auth-guards";
import { getUserMessages } from "@/server/repositories/member";
import { formatDate } from "@/lib/utils";

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requireMember();
  const t = await getTranslations("member");
  const messages = await getUserMessages(session.user.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("nav.messages")}</h1>

      {messages.length === 0 ? (
        <div className="text-muted-foreground bg-card rounded-2xl border p-10 text-center">
          {t("empty")}
        </div>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li
              key={m.id}
              className="bg-card rounded-xl border p-4"
              data-unread={!m.read ? "" : undefined}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium">{m.subject}</p>
                <p className="text-muted-foreground text-xs">
                  {formatDate(m.createdAt, locale)}
                </p>
              </div>
              <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                {m.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
