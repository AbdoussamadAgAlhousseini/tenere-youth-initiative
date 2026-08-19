import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { routing, isValidLocale } from "@/lib/i18n/routing";
import { fontSans, fontSerif } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en", "x-default": "/fr" },
      types: {
        "application/rss+xml": `${siteConfig.url}/feed.xml`,
      },
    },
    openGraph: {
      type: "website",
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: `${siteConfig.url}/${locale}`,
    logo: `${siteConfig.url}/logo.png`,
    email: siteConfig.email,
    description: tMeta("description"),
    slogan: locale === "en" ? siteConfig.motto.en : siteConfig.motto.fr,
    foundingDate: "2017",
    areaServed: "Sahel",
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "customer support",
      availableLanguage: ["French", "English"],
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(fontSans.variable, fontSerif.variable)}
    >
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
