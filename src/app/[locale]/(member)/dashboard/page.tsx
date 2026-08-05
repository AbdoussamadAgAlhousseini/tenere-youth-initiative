import { Bell, FileText, MessageSquare } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { requireMember } from "@/lib/auth-guards";
import { getMemberOverview } from "@/server/repositories/member";
import { StatCard } from "@/components/dashboard/stat-card";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function MemberDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requireMember();
  const t = await getTranslations("member");
  const overview = await getMemberOverview(session.user.id);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            {t("welcome")}
            {session.user.name ? `, ${session.user.name}` : ""} 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {t("role")}: {session.user.role}
          </p>
        </div>
        <SignOutButton label={t("signOut")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label={t("nav.documents")}
          value={overview.documents}
          icon={<FileText className="size-5" />}
        />
        <StatCard
          label={t("nav.messages")}
          value={overview.messages}
          icon={<MessageSquare className="size-5" />}
        />
        <StatCard
          label={t("nav.notifications")}
          value={overview.notifications}
          icon={<Bell className="size-5" />}
        />
      </div>
    </div>
  );
}
