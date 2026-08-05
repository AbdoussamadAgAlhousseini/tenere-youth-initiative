import { auth } from "@/lib/auth";
import { redirect } from "@/lib/i18n/navigation";
import { getLocale } from "next-intl/server";
import type { Role } from "@prisma/client";

/** Return the current session or redirect to sign-in. */
export async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    const locale = await getLocale();
    redirect({ href: "/sign-in", locale });
  }
  return session!;
}

/** Require one of the given roles, otherwise redirect home. */
export async function requireRole(...roles: Role[]) {
  const session = await requireUser();
  if (!roles.includes(session.user.role)) {
    const locale = await getLocale();
    redirect({ href: "/", locale });
  }
  return session;
}

export const requireAdmin = () => requireRole("ADMIN");
export const requireMember = () => requireRole("MEMBER", "ADMIN");
