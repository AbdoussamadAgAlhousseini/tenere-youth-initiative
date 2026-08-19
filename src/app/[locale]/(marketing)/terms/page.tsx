import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Link } from "@/lib/i18n/navigation";
import { siteConfig } from "@/config/site";
import { localeAlternates } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.legal" });
  return {
    title: t("termsTitle"),
    description:
      locale === "en"
        ? "The terms that govern your use of the Tenere Youth Initiative website."
        : "Les conditions régissant votre utilisation du site de Tenere Youth Initiative.",
    alternates: localeAlternates(locale, "/terms"),
  };
}

type Section = { title: string; body?: string[]; list?: string[] };

function getContent(locale: string, email: string) {
  const en = locale === "en";
  const updated = en
    ? "Last updated: 12 August 2026"
    : "Dernière mise à jour : 12 août 2026";

  const lead = en
    ? "These terms govern your use of the Tenere Youth Initiative website. By using this site, you agree to them."
    : "Ces conditions régissent votre utilisation du site de Tenere Youth Initiative. En utilisant ce site, vous les acceptez.";

  const sections: Section[] = en
    ? [
        {
          title: "1. Acceptance of the terms",
          body: [
            "By accessing or using this website, you agree to be bound by these terms. If you do not agree, please do not use the site.",
          ],
        },
        {
          title: "2. About this site",
          body: [
            "This is the official website of Tenere Youth Initiative (“TYI”), a youth-led non-profit serving pastoralist and nomadic communities. It provides information about our mission, programmes, news and events, and lets you contact us, subscribe to our newsletter, apply to volunteer or become a member, and support our work.",
          ],
        },
        {
          title: "3. Acceptable use",
          body: ["When using the site, you agree not to:"],
          list: [
            "use it for any unlawful, harmful or fraudulent purpose;",
            "attempt to gain unauthorised access to the site, its data or its systems;",
            "disrupt or overload the site, or introduce malicious code;",
            "collect data from the site by automated means without our permission.",
          ],
        },
        {
          title: "4. Forms and submissions",
          body: [
            "When you submit a form (contact, newsletter, volunteer or membership), you confirm that the information you provide is accurate and that you are entitled to share it. Volunteer and membership applications are reviewed by our team; submitting one does not guarantee acceptance.",
          ],
        },
        {
          title: "5. Donations",
          body: [
            "Donations are voluntary. The donation form lets you express your support; online card payments are not currently processed through the site and no charge is made through it. We may contact you to arrange your contribution.",
          ],
        },
        {
          title: "6. Intellectual property",
          body: [
            "The content of this site — including text, logos, graphics and images — belongs to Tenere Youth Initiative or its licensors and is protected by applicable laws. You may not reuse it without our prior permission. Any content you submit remains yours, but you grant us the right to use it for the purpose for which you provided it.",
          ],
        },
        {
          title: "7. Third-party links",
          body: [
            "The site may link to external websites we do not control. We are not responsible for their content or practices, and following such links is at your own risk.",
          ],
        },
        {
          title: "8. Availability and accuracy",
          body: [
            "We work to keep the site available and its information accurate, but we provide it “as is”, without warranty of any kind. We may change, suspend or discontinue any part of the site at any time.",
          ],
        },
        {
          title: "9. Limitation of liability",
          body: [
            "To the fullest extent permitted by law, Tenere Youth Initiative shall not be liable for any indirect or consequential loss arising from your use of, or inability to use, the site.",
          ],
        },
        {
          title: "10. Privacy",
          body: [
            "Your use of the site is also governed by our Privacy Policy, which explains how we handle your personal data.",
          ],
        },
        {
          title: "11. Changes to these terms",
          body: [
            "We may update these terms from time to time. The date at the top of this page shows when they were last revised; continued use of the site means you accept the updated terms.",
          ],
        },
        {
          title: "12. Governing law and contact",
          body: [
            `These terms are governed by the laws applicable where Tenere Youth Initiative is registered. For any question about them, write to ${email}.`,
          ],
        },
      ]
    : [
        {
          title: "1. Acceptation des conditions",
          body: [
            "En accédant à ce site ou en l'utilisant, vous acceptez d'être lié par les présentes conditions. Si vous ne les acceptez pas, veuillez ne pas utiliser le site.",
          ],
        },
        {
          title: "2. À propos de ce site",
          body: [
            "Ceci est le site officiel de Tenere Youth Initiative (« TYI »), une organisation à but non lucratif dirigée par des jeunes au service des communautés pastorales et nomades. Il présente notre mission, nos programmes, nos actualités et événements, et vous permet de nous contacter, de vous abonner à notre newsletter, de candidater comme bénévole ou membre, et de soutenir notre action.",
          ],
        },
        {
          title: "3. Utilisation acceptable",
          body: ["En utilisant le site, vous vous engagez à ne pas :"],
          list: [
            "l'utiliser à des fins illégales, nuisibles ou frauduleuses ;",
            "tenter d'accéder sans autorisation au site, à ses données ou à ses systèmes ;",
            "perturber ou surcharger le site, ou y introduire du code malveillant ;",
            "collecter des données du site par des moyens automatisés sans notre autorisation.",
          ],
        },
        {
          title: "4. Formulaires et envois",
          body: [
            "Lorsque vous soumettez un formulaire (contact, newsletter, bénévolat ou adhésion), vous confirmez que les informations fournies sont exactes et que vous êtes en droit de les partager. Les candidatures de bénévolat et d'adhésion sont examinées par notre équipe ; leur envoi ne garantit pas leur acceptation.",
          ],
        },
        {
          title: "5. Dons",
          body: [
            "Les dons sont volontaires. Le formulaire de don vous permet d'exprimer votre soutien ; les paiements par carte en ligne ne sont pas encore traités sur le site et aucun prélèvement n'y est effectué. Nous pourrons vous contacter pour organiser votre contribution.",
          ],
        },
        {
          title: "6. Propriété intellectuelle",
          body: [
            "Le contenu de ce site — textes, logos, éléments graphiques et images — appartient à Tenere Youth Initiative ou à ses concédants et est protégé par les lois applicables. Vous ne pouvez pas le réutiliser sans notre autorisation préalable. Tout contenu que vous nous transmettez reste le vôtre, mais vous nous autorisez à l'utiliser aux fins pour lesquelles vous l'avez fourni.",
          ],
        },
        {
          title: "7. Liens vers des tiers",
          body: [
            "Le site peut renvoyer vers des sites externes que nous ne contrôlons pas. Nous ne sommes pas responsables de leur contenu ni de leurs pratiques, et vous suivez ces liens à vos propres risques.",
          ],
        },
        {
          title: "8. Disponibilité et exactitude",
          body: [
            "Nous nous efforçons de maintenir le site disponible et ses informations exactes, mais nous le fournissons « en l'état », sans garantie d'aucune sorte. Nous pouvons modifier, suspendre ou interrompre toute partie du site à tout moment.",
          ],
        },
        {
          title: "9. Limitation de responsabilité",
          body: [
            "Dans toute la mesure permise par la loi, Tenere Youth Initiative ne saurait être tenue responsable des dommages indirects ou consécutifs résultant de votre utilisation, ou de votre impossibilité d'utiliser, le site.",
          ],
        },
        {
          title: "10. Confidentialité",
          body: [
            "Votre utilisation du site est également régie par notre Politique de confidentialité, qui explique comment nous traitons vos données personnelles.",
          ],
        },
        {
          title: "11. Modification des conditions",
          body: [
            "Nous pouvons mettre à jour ces conditions. La date en haut de cette page indique leur dernière révision ; en continuant à utiliser le site, vous acceptez les conditions mises à jour.",
          ],
        },
        {
          title: "12. Droit applicable et contact",
          body: [
            `Les présentes conditions sont régies par les lois applicables au lieu d'enregistrement de Tenere Youth Initiative. Pour toute question à leur sujet, écrivez à ${email}.`,
          ],
        },
      ];

  return { lead, updated, sections };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.legal");
  const en = locale === "en";
  const { lead, updated, sections } = getContent(locale, siteConfig.email);

  return (
    <>
      <PageHeader title={t("termsTitle")} intro={lead} />
      <section className="container max-w-3xl space-y-10 py-16">
        <p className="text-muted-foreground text-sm">{updated}</p>

        {sections.map((s) => (
          <div key={s.title} className="space-y-3">
            <h2 className="text-xl font-semibold">{s.title}</h2>
            {s.body?.map((p, i) => (
              <p key={i} className="text-muted-foreground text-pretty">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="text-muted-foreground list-disc space-y-1.5 pl-5 text-pretty">
                {s.list.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <p className="text-muted-foreground text-sm">
          {en ? "See also our " : "Voir aussi notre "}
          <Link href="/privacy" className="hover:text-foreground underline">
            {en ? "Privacy Policy" : "Politique de confidentialité"}
          </Link>
          .
        </p>
      </section>
    </>
  );
}
