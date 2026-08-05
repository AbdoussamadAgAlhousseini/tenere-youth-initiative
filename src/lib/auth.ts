import { timingSafeEqual } from "node:crypto";

import NextAuth, { type NextAuthConfig } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import type { Provider } from "next-auth/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/server/db";
import type { Role } from "@prisma/client";

// The single admin account the password login maps to.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@tenereyouth.org";

// Constant-time password check against the ADMIN_PASSWORD env var.
function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  // timingSafeEqual requires equal lengths; guard first, then compare.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

const providers: Provider[] = [
  // Password-only admin login: no email to type, just the shared password
  // (stored in the ADMIN_PASSWORD env var). Signs in as the seeded admin user.
  Credentials({
    id: "admin",
    name: "Admin",
    credentials: { password: { label: "Mot de passe", type: "password" } },
    async authorize(credentials) {
      const password =
        typeof credentials?.password === "string" ? credentials.password : "";
      if (!passwordMatches(password)) return null;
      const user = await db.user.findUnique({ where: { email: ADMIN_EMAIL } });
      return user ?? null;
    },
  }),
];

const config: NextAuthConfig = {
  // Cast bridges the duplicated @auth/core types between the adapter and
  // next-auth's bundled copy.
  adapter: PrismaAdapter(db) as Adapter,
  // Use the incoming request's host for callbacks/redirects (works on any
  // dev port and on the deployed domain without hardcoding AUTH_URL).
  trustHost: true,
  // JWT sessions are required by the Credentials provider.
  session: { strategy: "jwt" },
  pages: { signIn: "/fr/sign-in" },
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role?: Role }).role ?? "USER";
      } else if (token.email) {
        // Re-sync id/role from the DB so the session stays valid even if the
        // underlying database changed (e.g. dev → Supabase).
        const dbUser = await db.user.findUnique({
          where: { email: token.email },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) ?? session.user.id;
        session.user.role = (token.role as Role) ?? "USER";
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
