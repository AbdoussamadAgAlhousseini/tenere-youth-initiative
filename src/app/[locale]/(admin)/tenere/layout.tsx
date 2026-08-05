import type { ReactNode } from "react";
import {
  BookOpen,
  Calendar,
  FileText,
  FolderTree,
  Handshake,
  Heart,
  ImageIcon,
  LayoutDashboard,
  Library,
  Mail,
  MessageSquare,
  Quote,
  Tags,
  UserCog,
  Users,
  UsersRound,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { requireAdmin } from "@/lib/auth-guards";
import {
  DashboardLayout,
  type DashboardNavItem,
} from "@/components/dashboard/dashboard-layout";

export default async function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requireAdmin();
  const t = await getTranslations("admin");

  const items: DashboardNavItem[] = [
    {
      href: "/tenere",
      label: t("nav.dashboard"),
      icon: <LayoutDashboard className="size-4" />,
      exact: true,
    },
    {
      href: "/tenere/programs",
      label: "Programmes",
      icon: <BookOpen className="size-4" />,
    },
    {
      href: "/tenere/team",
      label: "Équipe",
      icon: <UsersRound className="size-4" />,
    },
    {
      href: "/tenere/articles",
      label: t("nav.articles"),
      icon: <FileText className="size-4" />,
    },
    {
      href: "/tenere/events",
      label: t("nav.events"),
      icon: <Calendar className="size-4" />,
    },
    {
      href: "/tenere/testimonials",
      label: "Témoignages",
      icon: <Quote className="size-4" />,
    },
    {
      href: "/tenere/partners",
      label: "Partenaires",
      icon: <Handshake className="size-4" />,
    },
    {
      href: "/tenere/resources",
      label: "Ressources",
      icon: <Library className="size-4" />,
    },
    {
      href: "/tenere/gallery",
      label: "Galerie",
      icon: <ImageIcon className="size-4" aria-hidden />,
    },
    {
      href: "/tenere/categories",
      label: "Catégories",
      icon: <FolderTree className="size-4" />,
    },
    {
      href: "/tenere/tags",
      label: "Tags",
      icon: <Tags className="size-4" />,
    },
    {
      href: "/tenere/volunteers",
      label: t("nav.volunteers"),
      icon: <Users className="size-4" />,
    },
    {
      href: "/tenere/subscribers",
      label: t("nav.subscribers"),
      icon: <Mail className="size-4" />,
    },
    {
      href: "/tenere/messages",
      label: t("nav.messages"),
      icon: <MessageSquare className="size-4" />,
    },
    {
      href: "/tenere/donations",
      label: t("nav.donations"),
      icon: <Heart className="size-4" />,
    },
    {
      href: "/tenere/users",
      label: t("nav.users"),
      icon: <UserCog className="size-4" />,
    },
  ];

  return (
    <DashboardLayout
      title={t("title")}
      subtitle={session.user.email ?? undefined}
      items={items}
    >
      {children}
    </DashboardLayout>
  );
}
