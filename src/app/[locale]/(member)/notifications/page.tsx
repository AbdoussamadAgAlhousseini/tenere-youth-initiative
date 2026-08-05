import { Bell } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { requireMember } from "@/lib/auth-guards";
import { getUserNotifications } from "@/server/repositories/member";
import { formatDate } from "@/lib/utils";

export default async function NotificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requireMember();
  const t = await getTranslations("member");
  const isEn = (await getLocale()) === "en";
  const notifications = await getUserNotifications(session.user.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("nav.notifications")}</h1>

      {notifications.length === 0 ? (
        <div className="text-muted-foreground bg-card rounded-2xl border p-10 text-center">
          {t("empty")}
        </div>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="bg-card flex items-start gap-3 rounded-xl border p-4"
            >
              <span className="bg-primary/10 text-primary mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full">
                <Bell className="size-4" />
              </span>
              <div>
                <p className="font-medium">{isEn ? n.titleEn : n.titleFr}</p>
                <p className="text-muted-foreground text-xs">
                  {formatDate(n.createdAt, locale)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
