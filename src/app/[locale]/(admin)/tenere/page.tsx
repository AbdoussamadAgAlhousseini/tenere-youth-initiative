import {
  BookOpen,
  Calendar,
  FileText,
  Heart,
  Mail,
  MessageSquare,
  Users,
  UsersRound,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getAdminStats } from "@/server/repositories/admin";
import { StatCard } from "@/components/dashboard/stat-card";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const stats = await getAdminStats();

  const cards = [
    { label: t("nav.articles"), value: stats.articles, icon: <FileText className="size-5" /> },
    { label: t("nav.events"), value: stats.events, icon: <Calendar className="size-5" /> },
    { label: t("nav.volunteers"), value: stats.volunteers, icon: <Users className="size-5" /> },
    { label: t("nav.subscribers"), value: stats.subscribers, icon: <Mail className="size-5" /> },
    { label: t("nav.messages"), value: stats.contactMessages, icon: <MessageSquare className="size-5" /> },
    { label: t("nav.donations"), value: stats.donations, icon: <Heart className="size-5" /> },
    { label: "Programmes", value: stats.programs, icon: <BookOpen className="size-5" /> },
    { label: "Membres", value: stats.members, icon: <UsersRound className="size-5" /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("welcome")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <StatCard key={c.label} label={c.label} value={c.value} icon={c.icon} />
        ))}
      </div>
    </div>
  );
}
