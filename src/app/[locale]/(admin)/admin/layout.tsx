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
      href: "/admin",
      label: t("nav.dashboard"),
      icon: <LayoutDashboard className="size-4" />,
      exact: true,
    },
    {
      href: "/admin/programs",
      label: "Programmes",
      icon: <BookOpen className="size-4" />,
    },
    {
      href: "/admin/articles",
      label: t("nav.articles"),
      icon: <FileText className="size-4" />,
    },
    {
      href: "/admin/events",
      label: t("nav.events"),
      icon: <Calendar className="size-4" />,
    },
    {
      href: "/admin/testimonials",
      label: "Témoignages",
      icon: <Quote className="size-4" />,
    },
    {
      href: "/admin/partners",
      label: "Partenaires",
      icon: <Handshake className="size-4" />,
    },
    {
      href: "/admin/resources",
      label: "Ressources",
      icon: <Library className="size-4" />,
    },
    {
      href: "/admin/gallery",
      label: "Galerie",
      icon: <ImageIcon className="size-4" aria-hidden />,
    },
    {
      href: "/admin/categories",
      label: "Catégories",
      icon: <FolderTree className="size-4" />,
    },
    {
      href: "/admin/tags",
      label: "Tags",
      icon: <Tags className="size-4" />,
    },
    {
      href: "/admin/volunteers",
      label: t("nav.volunteers"),
      icon: <Users className="size-4" />,
    },
    {
      href: "/admin/subscribers",
      label: t("nav.subscribers"),
      icon: <Mail className="size-4" />,
    },
    {
      href: "/admin/messages",
      label: t("nav.messages"),
      icon: <MessageSquare className="size-4" />,
    },
    {
      href: "/admin/donations",
      label: t("nav.donations"),
      icon: <Heart className="size-4" />,
    },
    {
      href: "/admin/users",
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
