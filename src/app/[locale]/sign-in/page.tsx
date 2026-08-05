import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { Link } from "@/lib/i18n/navigation";
import { Logo } from "@/components/layout/logo";
import { GoogleSignIn } from "@/components/auth/google-sign-in";
import { DevLogin } from "@/components/auth/dev-login";
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
  const t = await getTranslations("auth");

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="bg-card w-full max-w-md space-y-8 rounded-2xl border p-8 shadow-sm">
        <div className="flex flex-col items-center gap-4 text-center">
          <Link href="/">
            <Logo />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">{t("title")}</h1>
            <p className="text-muted-foreground mt-2 text-sm">{t("subtitle")}</p>
          </div>
        </div>

        <GoogleSignIn label={t("google")} callbackUrl={`/${locale}/dashboard`} />

        <DevLogin callbackUrl={`/${locale}/dashboard`} />

        <p className="text-muted-foreground text-center text-xs text-balance">
          {t("legal")}{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            {t("privacy")}
          </Link>
          .
        </p>

        <p className="text-muted-foreground text-center text-xs">
          {siteConfig.motto[locale === "en" ? "en" : "fr"]}
        </p>
      </div>
    </div>
  );
}
