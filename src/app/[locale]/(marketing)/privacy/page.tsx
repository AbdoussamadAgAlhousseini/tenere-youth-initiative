import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.legal" });
  return {
    title: t("privacyTitle"),
    description:
      locale === "en"
        ? "How Tenere Youth Initiative collects, uses and protects your personal data."
        : "Comment Tenere Youth Initiative collecte, utilise et protège vos données personnelles.",
  };
}

type Section = { title: string; body?: string[]; list?: string[] };

function getContent(locale: string, email: string) {
  const en = locale === "en";
  const updated = en ? "Last updated: 12 August 2026" : "Dernière mise à jour : 12 août 2026";

  const lead = en
    ? "Tenere Youth Initiative (“TYI”, “we”) is committed to protecting your privacy. This policy explains what personal data we collect through this website, why we collect it, and the rights you have over it."
    : "Tenere Youth Initiative (« TYI », « nous ») s'engage à protéger votre vie privée. Cette politique explique quelles données personnelles nous collectons sur ce site, pourquoi, et les droits dont vous disposez.";

  const sections: Section[] = en
    ? [
        {
          title: "1. Who is responsible for your data",
          body: [
            `The data controller is Tenere Youth Initiative, a youth-led non-profit serving pastoralist and nomadic communities. For any question about this policy or your data, contact us at ${email}.`,
          ],
        },
        {
          title: "2. Data we collect",
          body: ["We only collect the information you choose to provide through our forms:"],
          list: [
            "Contact form: your name, email, subject and message.",
            "Newsletter: your email address, preferred language and consent.",
            "Volunteer / membership: your name, email, phone (optional), areas of expertise, availability and motivation.",
            "Donations: the name, email, amount and message you provide.",
            "Administration: sign-in credentials of site administrators only.",
            "Technical data strictly necessary to operate the site. We do not use advertising or third-party tracking.",
          ],
        },
        {
          title: "3. Why we use it (legal bases)",
          list: [
            "To answer your messages and requests (our legitimate interest / your request).",
            "To send our newsletter (your consent, which you can withdraw at any time).",
            "To process volunteer and membership applications (your request).",
            "To acknowledge and record donations you make.",
          ],
        },
        {
          title: "4. Cookies",
          body: [
            "We use only essential cookies and local storage — to keep administrators signed in and to remember your display preferences (theme, language). We do not use advertising cookies or third-party trackers.",
          ],
        },
        {
          title: "5. Who we share it with",
          body: [
            "We never sell your data. We rely on a small number of trusted service providers who process data on our behalf and under our instructions:",
          ],
          list: [
            "Vercel — website hosting.",
            "Supabase — database hosting.",
            "Zoho — professional email.",
          ],
        },
        {
          title: "6. International transfers",
          body: [
            "Some providers may process data outside your country (e.g. in the European Union or the United States). Where that happens, appropriate safeguards are in place to protect your data.",
          ],
        },
        {
          title: "7. How long we keep it",
          body: [
            "We keep your data only for as long as necessary for the purposes above, after which it is deleted or anonymised.",
          ],
        },
        {
          title: "8. Security",
          body: [
            "Your data is transmitted over encrypted connections (HTTPS) and stored with access controls; database access is restricted at the row level.",
          ],
        },
        {
          title: "9. Your rights",
          body: [
            `You have the right to access, correct, delete, restrict or port your data, to object to its processing, and to withdraw your consent at any time. To exercise these rights, email us at ${email}. You may also lodge a complaint with your local data-protection authority.`,
          ],
        },
        {
          title: "10. Minors",
          body: [
            "Our programmes are aimed at young people. Where a user is a minor, a parent or guardian's consent may be required before sharing personal data.",
          ],
        },
        {
          title: "11. Changes to this policy",
          body: [
            "We may update this policy from time to time. The date at the top of this page shows when it was last revised.",
          ],
        },
        {
          title: "12. Contact",
          body: [`For any privacy question or request, write to ${email}.`],
        },
      ]
    : [
        {
          title: "1. Responsable du traitement",
          body: [
            `Le responsable du traitement est Tenere Youth Initiative, une organisation à but non lucratif dirigée par des jeunes au service des communautés pastorales et nomades. Pour toute question sur cette politique ou vos données, écrivez-nous à ${email}.`,
          ],
        },
        {
          title: "2. Données que nous collectons",
          body: ["Nous collectons uniquement les informations que vous choisissez de fournir via nos formulaires :"],
          list: [
            "Formulaire de contact : nom, e-mail, sujet et message.",
            "Newsletter : adresse e-mail, langue préférée et consentement.",
            "Bénévolat / adhésion : nom, e-mail, téléphone (facultatif), domaines d'expertise, disponibilités et motivation.",
            "Dons : le nom, l'e-mail, le montant et le message que vous renseignez.",
            "Administration : identifiants de connexion des administrateurs du site uniquement.",
            "Données techniques strictement nécessaires au fonctionnement du site. Nous n'utilisons ni publicité ni traceur tiers.",
          ],
        },
        {
          title: "3. Finalités et bases légales",
          list: [
            "Répondre à vos messages et demandes (intérêt légitime / votre demande).",
            "Envoyer notre newsletter (votre consentement, révocable à tout moment).",
            "Traiter les candidatures de bénévolat et d'adhésion (votre demande).",
            "Accuser réception et enregistrer les dons que vous effectuez.",
          ],
        },
        {
          title: "4. Cookies",
          body: [
            "Nous utilisons uniquement des cookies et un stockage local essentiels — pour maintenir la connexion des administrateurs et mémoriser vos préférences d'affichage (thème, langue). Aucun cookie publicitaire ni traceur tiers.",
          ],
        },
        {
          title: "5. Partage des données",
          body: [
            "Nous ne vendons jamais vos données. Nous faisons appel à quelques prestataires de confiance qui traitent les données pour notre compte et selon nos instructions :",
          ],
          list: [
            "Vercel — hébergement du site web.",
            "Supabase — hébergement de la base de données.",
            "Zoho — messagerie professionnelle.",
          ],
        },
        {
          title: "6. Transferts internationaux",
          body: [
            "Certains prestataires peuvent traiter des données hors de votre pays (par ex. dans l'Union européenne ou aux États-Unis). Le cas échéant, des garanties appropriées protègent vos données.",
          ],
        },
        {
          title: "7. Durée de conservation",
          body: [
            "Nous conservons vos données uniquement le temps nécessaire aux finalités ci-dessus, après quoi elles sont supprimées ou anonymisées.",
          ],
        },
        {
          title: "8. Sécurité",
          body: [
            "Vos données transitent par des connexions chiffrées (HTTPS) et sont stockées avec des contrôles d'accès ; l'accès à la base est restreint au niveau des lignes.",
          ],
        },
        {
          title: "9. Vos droits",
          body: [
            `Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de vos données, d'un droit d'opposition, et du droit de retirer votre consentement à tout moment. Pour exercer ces droits, écrivez-nous à ${email}. Vous pouvez également introduire une réclamation auprès de votre autorité de protection des données.`,
          ],
        },
        {
          title: "10. Mineurs",
          body: [
            "Nos programmes s'adressent aux jeunes. Lorsqu'un utilisateur est mineur, le consentement d'un parent ou tuteur peut être requis avant tout partage de données personnelles.",
          ],
        },
        {
          title: "11. Modifications",
          body: [
            "Nous pouvons mettre à jour cette politique. La date en haut de cette page indique sa dernière révision.",
          ],
        },
        {
          title: "12. Contact",
          body: [`Pour toute question ou demande relative à vos données, écrivez à ${email}.`],
        },
      ];

  return { lead, updated, sections };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.legal");
  const { lead, updated, sections } = getContent(locale, siteConfig.email);

  return (
    <>
      <PageHeader title={t("privacyTitle")} intro={lead} />
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
      </section>
    </>
  );
}
