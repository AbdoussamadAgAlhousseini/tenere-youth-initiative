import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Logo } from "@/components/layout/logo";
import { AdminLogin } from "@/components/auth/admin-login";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Connexion / Sign in",
  robots: { index: false },
};

export default async function SignInPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="bg-card w-full max-w-md space-y-8 rounded-2xl border p-8 shadow-sm">
        <div className="flex flex-col items-center gap-4 text-center">
          <Link href="/">
            <Logo />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">
              {en ? "Admin sign in" : "Connexion administration"}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              {en
                ? "Enter the admin password to manage the site."
                : "Saisissez le mot de passe administrateur pour gérer le site."}
            </p>
          </div>
        </div>

        <AdminLogin
          callbackUrl={`/${locale}/tenere`}
          label={en ? "Sign in" : "Se connecter"}
          placeholder={en ? "Password" : "Mot de passe"}
        />

        <p className="text-muted-foreground text-center text-xs">
          {siteConfig.motto[en ? "en" : "fr"]}
        </p>
      </div>
    </div>
  );
}
