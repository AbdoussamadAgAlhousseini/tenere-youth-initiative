import type { ReactNode } from "react";
import {
  Bell,
  FileText,
  LayoutDashboard,
  MessageSquare,
  User,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { requireMember } from "@/lib/auth-guards";
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/dashboard/dashboard-layout";

export default async function MemberLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requireMember();
  const t = await getTranslations("member");

  const items: DashboardNavItem[] = [
    {
      href: "/dashboard",
      label: t("nav.dashboard"),
      icon: <LayoutDashboard className="size-4" />,
      exact: true,
    },
    {
      href: "/profile",
      label: t("nav.profile"),
      icon: <User className="size-4" />,
    },
    {
      href: "/documents",
      label: t("nav.documents"),
      icon: <FileText className="size-4" />,
    },
    {
      href: "/messages",
      label: t("nav.messages"),
      icon: <MessageSquare className="size-4" />,
    },
    {
      href: "/notifications",
      label: t("nav.notifications"),
      icon: <Bell className="size-4" />,
    },
  ];

  return (
    <DashboardLayout
      title={t("title")}
      subtitle={session.user.name ?? session.user.email ?? undefined}
      items={items}
    >
      {children}
    </DashboardLayout>
  );
}
