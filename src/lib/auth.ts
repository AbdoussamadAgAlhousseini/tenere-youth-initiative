import NextAuth, { type NextAuthConfig } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import type { Provider } from "next-auth/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/server/db";
import type { Role } from "@prisma/client";

const providers: Provider[] = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    allowDangerousEmailAccountLinking: true,
  }),
];

// Dev-only login: sign in as an existing (seeded) user by email, no password.
// Guarded to non-production so it can never be used on a live deployment.
if (process.env.NODE_ENV !== "production") {
  providers.push(
    Credentials({
      id: "dev",
      name: "Dev login",
      credentials: { email: { label: "Email", type: "email" } },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string" ? credentials.email : null;
        if (!email) return null;
        const user = await db.user.findUnique({ where: { email } });
        return user ?? null;
      },
    }),
  );
}

const config: NextAuthConfig = {
  // Cast bridges the duplicated @auth/core types between the adapter and
  // next-auth's bundled copy.
  adapter: PrismaAdapter(db) as Adapter,
  // Use the incoming request's host for callbacks/redirects (works on any
  // dev port and on the deployed domain without hardcoding AUTH_URL).
  trustHost: true,
  // JWT sessions let the Credentials (dev) provider coexist with Google.
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
