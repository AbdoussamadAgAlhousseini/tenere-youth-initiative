import {
  PrismaClient,
  ArticleStatus,
  EventType,
  ResourceType,
  PartnerTier,
  Role,
} from "@prisma/client";

import { programsContent } from "../src/lib/content/programs";
import { testimonials, impactStats } from "../src/lib/content/highlights";
import { galleryContent } from "../src/lib/content/gallery";

const db = new PrismaClient();

// ---------------------------------------------------------------------------
// Reference data
// ---------------------------------------------------------------------------

const countries = [
  { code: "BF", nameFr: "Burkina Faso", nameEn: "Burkina Faso" },
  { code: "NE", nameFr: "Niger", nameEn: "Niger" },
  { code: "ML", nameFr: "Mali", nameEn: "Mali" },
  { code: "TD", nameFr: "Tchad", nameEn: "Chad" },
  { code: "MR", nameFr: "Mauritanie", nameEn: "Mauritania" },
  { code: "SN", nameFr: "Sénégal", nameEn: "Senegal" },
];

const languages = [
  { code: "fr", nameFr: "Français", nameEn: "French" },
  { code: "en", nameFr: "Anglais", nameEn: "English" },
];

const settings = [
  { key: "impact.youth", value: String(impactStats.youth) },
  { key: "impact.programs", value: String(impactStats.programs) },
  { key: "impact.communities", value: String(impactStats.communities) },
  { key: "impact.countries", value: String(impactStats.countries) },
];

// ---------------------------------------------------------------------------
// Categories & tags
// ---------------------------------------------------------------------------

const categories = [
  { slug: "news", nameFr: "Actualités", nameEn: "News" },
  {
    slug: "field-stories",
    nameFr: "Histoires de terrain",
    nameEn: "Field stories",
  },
  { slug: "advocacy", nameFr: "Plaidoyer", nameEn: "Advocacy" },
  { slug: "press", nameFr: "Communiqués", nameEn: "Press" },
];

const tags = [
  { slug: "sahel", nameFr: "Sahel", nameEn: "Sahel" },
  { slug: "climate", nameFr: "Climat", nameEn: "Climate" },
  { slug: "youth", nameFr: "Jeunesse", nameEn: "Youth" },
  { slug: "education", nameFr: "Éducation", nameEn: "Education" },
  { slug: "women", nameFr: "Femmes", nameEn: "Women" },
];

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------

const articles = [
  {
    slug: "young-leaders-sahel-cop",
    categorySlug: "advocacy",
    tagSlugs: ["youth", "climate", "sahel"],
    titleFr:
      "De jeunes leaders pastoraux à la table des négociations climatiques",
    titleEn: "Young pastoralist leaders at the climate negotiation table",
    excerptFr:
      "Cinq jeunes de nos communautés ont porté la voix des éleveurs lors d'un sommet régional sur le climat.",
    excerptEn:
      "Five young people from our communities carried the voice of herders at a regional climate summit.",
    bodyFr:
      "Pendant trois jours, cinq jeunes formés par Tenere Youth Initiative ont représenté les communautés pastorales et nomades lors d'un sommet régional. Ils ont rappelé une vérité simple : les éleveurs, en première ligne du changement climatique, détiennent aussi des solutions. Leurs propositions sur la gestion des couloirs de transhumance ont été saluées par plusieurs délégations.",
    bodyEn:
      "For three days, five young people trained by Tenere Youth Initiative represented pastoralist and nomadic communities at a regional summit. They recalled a simple truth: herders, on the front line of climate change, also hold solutions. Their proposals on managing transhumance corridors were praised by several delegations.",
  },
  {
    slug: "mobile-school-reaches-100-children",
    categorySlug: "field-stories",
    tagSlugs: ["education", "youth"],
    titleFr: "Une école mobile rejoint 100 enfants nomades",
    titleEn: "A mobile school reaches 100 nomadic children",
    excerptFr:
      "Grâce à un dispositif éducatif itinérant, une centaine d'enfants suivent désormais une scolarité continue.",
    excerptEn:
      "Thanks to a travelling education program, a hundred children now follow continuous schooling.",
    bodyFr:
      "La mobilité des familles pastorales ne doit plus être un obstacle à l'éducation. Notre école mobile suit les campements au rythme des saisons, apportant enseignants, matériel et cantine. En un an, une centaine d'enfants ont retrouvé le chemin de l'apprentissage.",
    bodyEn:
      "The mobility of pastoralist families should no longer be a barrier to education. Our mobile school follows the camps with the rhythm of the seasons, bringing teachers, materials and meals. In one year, a hundred children found their way back to learning.",
  },
  {
    slug: "women-cooperative-digital",
    categorySlug: "news",
    tagSlugs: ["women", "youth"],
    titleFr: "Une coopérative de femmes passe au numérique",
    titleEn: "A women's cooperative goes digital",
    excerptFr:
      "Vingt femmes gèrent désormais leurs ventes de produits laitiers grâce à un outil numérique simple.",
    excerptEn:
      "Twenty women now manage their dairy sales with a simple digital tool.",
    bodyFr:
      "Formées par nos jeunes ambassadeurs du numérique, vingt femmes d'une coopérative laitière ont adopté un outil de gestion sur mobile. Résultat : des ventes mieux suivies, des revenus plus stables et une autonomie renforcée.",
    bodyEn:
      "Trained by our young digital ambassadors, twenty women from a dairy cooperative adopted a mobile management tool. The result: better-tracked sales, more stable income and strengthened autonomy.",
  },
];

// ---------------------------------------------------------------------------
// Events, partners, resources
// ---------------------------------------------------------------------------

const now = new Date();
const inDays = (d: number) => new Date(now.getTime() + d * 24 * 60 * 60 * 1000);

const events = [
  {
    slug: "webinar-pastoral-rights",
    type: EventType.WEBINAR,
    titleFr: "Webinaire : les droits des communautés pastorales",
    titleEn: "Webinar: the rights of pastoralist communities",
    descriptionFr:
      "Un échange en ligne avec des juristes et des jeunes leaders sur la reconnaissance des droits pastoraux.",
    descriptionEn:
      "An online exchange with lawyers and young leaders on the recognition of pastoralist rights.",
    startDate: inDays(14),
    isOnline: true,
    locationFr: "En ligne",
    locationEn: "Online",
    programSlug: "advocacy",
  },
  {
    slug: "youth-forum-sahel",
    type: EventType.FORUM,
    titleFr: "Forum de la jeunesse pastorale du Sahel",
    titleEn: "Sahel Pastoralist Youth Forum",
    descriptionFr:
      "Deux jours de rencontres, d'ateliers et de plaidoyer réunissant des jeunes de toute la région.",
    descriptionEn:
      "Two days of meetings, workshops and advocacy bringing together youth from across the region.",
    startDate: inDays(45),
    endDate: inDays(46),
    isOnline: false,
    locationFr: "Ouagadougou, Burkina Faso",
    locationEn: "Ouagadougou, Burkina Faso",
    programSlug: "leadership",
  },
  {
    slug: "digital-bootcamp",
    type: EventType.WORKSHOP,
    titleFr: "Bootcamp numérique pour jeunes ruraux",
    titleEn: "Digital bootcamp for rural youth",
    descriptionFr:
      "Une semaine intensive pour s'initier au numérique et créer des solutions locales.",
    descriptionEn:
      "An intensive week to learn digital skills and build local solutions.",
    startDate: inDays(70),
    endDate: inDays(75),
    isOnline: false,
    locationFr: "Niamey, Niger",
    locationEn: "Niamey, Niger",
    programSlug: "digital",
  },
];

const partners = [
  { name: "Sahel Foundation", tier: PartnerTier.STRATEGIC, order: 1 },
  { name: "Green Horizon Fund", tier: PartnerTier.FINANCIAL, order: 2 },
  { name: "Nomad Tech Lab", tier: PartnerTier.TECHNICAL, order: 3 },
  { name: "Pastoral Rights Network", tier: PartnerTier.COMMUNITY, order: 4 },
  { name: "Desert Bloom Initiative", tier: PartnerTier.COMMUNITY, order: 5 },
  { name: "United Youth Alliance", tier: PartnerTier.STRATEGIC, order: 6 },
];

const resources = [
  {
    slug: "annual-report-2025",
    type: ResourceType.REPORT,
    titleFr: "Rapport annuel 2025",
    titleEn: "Annual Report 2025",
    descriptionFr:
      "Bilan complet de nos activités, de notre impact et de nos finances pour l'année écoulée.",
    descriptionEn:
      "A complete review of our activities, impact and finances for the past year.",
    fileUrl: "/resources/annual-report-2025.pdf",
    fileFormat: "PDF",
    fileSize: 2_400_000,
  },
  {
    slug: "guide-mobile-education",
    type: ResourceType.GUIDE,
    titleFr: "Guide de l'éducation en milieu mobile",
    titleEn: "Guide to education in mobile settings",
    descriptionFr:
      "Un guide pratique pour concevoir des dispositifs éducatifs adaptés aux familles nomades.",
    descriptionEn:
      "A practical guide to designing education programs adapted to nomadic families.",
    fileUrl: "/resources/guide-mobile-education.pdf",
    fileFormat: "PDF",
    fileSize: 1_100_000,
  },
  {
    slug: "toolkit-youth-advocacy",
    type: ResourceType.TOOLKIT,
    titleFr: "Boîte à outils du plaidoyer jeunesse",
    titleEn: "Youth advocacy toolkit",
    descriptionFr:
      "Des modèles, méthodes et conseils pour mener des campagnes de plaidoyer efficaces.",
    descriptionEn: "Templates, methods and tips to run effective advocacy campaigns.",
    fileUrl: "/resources/toolkit-youth-advocacy.pdf",
    fileFormat: "PDF",
    fileSize: 900_000,
  },
  {
    slug: "publication-pastoral-knowledge",
    type: ResourceType.PUBLICATION,
    titleFr: "Savoirs pastoraux et résilience climatique",
    titleEn: "Pastoral knowledge and climate resilience",
    descriptionFr:
      "Une publication documentant les savoirs traditionnels au service de l'adaptation climatique.",
    descriptionEn:
      "A publication documenting traditional knowledge for climate adaptation.",
    fileUrl: "/resources/publication-pastoral-knowledge.pdf",
    fileFormat: "PDF",
    fileSize: 1_800_000,
  },
];

// ---------------------------------------------------------------------------
// Seed runner
// ---------------------------------------------------------------------------

async function main() {
  console.log("🌱 Seeding Tenere Youth Initiative…");

  for (const c of countries) {
    await db.country.upsert({ where: { code: c.code }, update: c, create: c });
  }

  for (const l of languages) {
    await db.language.upsert({ where: { code: l.code }, update: l, create: l });
  }

  for (const s of settings) {
    await db.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  const admin = await db.user.upsert({
    where: { email: "admin@tenereyouth.org" },
    update: { role: Role.ADMIN },
    create: {
      email: "admin@tenereyouth.org",
      name: "TYI Admin",
      role: Role.ADMIN,
    },
  });

  for (const [i, p] of programsContent.entries()) {
    await db.program.upsert({
      where: { slug: p.slug },
      update: { ...p, order: i },
      create: { ...p, order: i },
    });
  }

  for (const c of categories) {
    await db.category.upsert({ where: { slug: c.slug }, update: c, create: c });
  }

  for (const tag of tags) {
    await db.tag.upsert({ where: { slug: tag.slug }, update: tag, create: tag });
  }

  for (const a of articles) {
    const { categorySlug, tagSlugs, ...data } = a;
    const category = await db.category.findUnique({
      where: { slug: categorySlug },
    });
    await db.article.upsert({
      where: { slug: a.slug },
      update: {
        ...data,
        status: ArticleStatus.PUBLISHED,
        publishedAt: now,
        authorId: admin.id,
        categoryId: category?.id,
        tags: { set: tagSlugs.map((slug) => ({ slug })) },
      },
      create: {
        ...data,
        status: ArticleStatus.PUBLISHED,
        publishedAt: now,
        authorId: admin.id,
        categoryId: category?.id,
        tags: { connect: tagSlugs.map((slug) => ({ slug })) },
      },
    });
  }

  for (const e of events) {
    const { programSlug, ...data } = e;
    const program = await db.program.findUnique({
      where: { slug: programSlug },
    });
    await db.event.upsert({
      where: { slug: e.slug },
      update: { ...data, programId: program?.id },
      create: { ...data, programId: program?.id },
    });
  }

  for (const p of partners) {
    const existing = await db.partner.findFirst({ where: { name: p.name } });
    if (existing) {
      await db.partner.update({ where: { id: existing.id }, data: p });
    } else {
      await db.partner.create({ data: p });
    }
  }

  for (const r of resources) {
    await db.resource.upsert({ where: { slug: r.slug }, update: r, create: r });
  }

  for (const [i, item] of testimonials.entries()) {
    const existing = await db.testimonial.findFirst({
      where: { authorFr: item.authorFr },
    });
    if (existing) {
      await db.testimonial.update({
        where: { id: existing.id },
        data: { ...item, order: i },
      });
    } else {
      await db.testimonial.create({ data: { ...item, order: i } });
    }
  }

  const heroU = "https://images.unsplash.com/photo-";
  const heroQ = "?w=1920&q=70&auto=format&fit=crop";
  const heroSlides = [
    {
      titleFr:
        "Renforcer le pouvoir des jeunes des communautés pastorales et nomades",
      titleEn: "Empowering youth from pastoralist and nomadic communities",
      subtitleFr:
        "Nous formons une génération de jeunes leaders capables de transformer leurs communautés — par le leadership, l'éducation, le climat et le numérique.",
      subtitleEn:
        "We nurture a generation of young leaders able to transform their communities — through leadership, education, climate and digital.",
      image: heroU + "1473580044384-7ba9967e16a0" + heroQ,
    },
    {
      titleFr: "Le désert n'est pas vide",
      titleEn: "The desert is not empty",
      subtitleFr:
        "Personne ne traverse le Ténéré seul. Ensemble, nous faisons grandir les savoirs, la solidarité et l'avenir des communautés.",
      subtitleEn:
        "No one crosses the Ténéré alone. Together we grow knowledge, solidarity and the future of communities.",
      image: heroU + "1489749798305-4fea3ae63d43" + heroQ,
    },
    {
      titleFr: "Rejoignez un mouvement de jeunesse enraciné",
      titleEn: "Join a rooted youth movement",
      subtitleFr:
        "Du Sahel au reste du monde, des jeunes agissent pour leurs territoires. Prenez part au changement.",
      subtitleEn:
        "From the Sahel outward, young people act for their lands. Be part of the change.",
      image: heroU + "1489493887464-892be6d1daae" + heroQ,
    },
  ];

  for (const [i, s] of heroSlides.entries()) {
    const existing = await db.heroSlide.findFirst({
      where: { titleFr: s.titleFr },
    });
    if (existing) {
      await db.heroSlide.update({
        where: { id: existing.id },
        data: { ...s, order: i },
      });
    } else {
      await db.heroSlide.create({ data: { ...s, order: i } });
    }
  }

  const milestones = [
    {
      year: "2017",
      textFr: "Création du collectif par de jeunes bénévoles pastoraux.",
      textEn: "The collective is created by young pastoralist volunteers.",
    },
    {
      year: "2024",
      textFr: "Officialisation de l'association.",
      textEn: "The organization is officially registered.",
    },
    {
      year: "2025",
      textFr: "Expansion à travers tout le Ténéré (Tinariwen) du Mali.",
      textEn: "Expansion across the whole Ténéré (Tinariwen) in Mali.",
    },
    {
      year: "2026",
      textFr: "Un réseau régional au service des communautés.",
      textEn: "A regional network serving communities.",
    },
  ];

  for (const [i, m] of milestones.entries()) {
    const existing = await db.milestone.findFirst({ where: { year: m.year } });
    if (existing) {
      await db.milestone.update({
        where: { id: existing.id },
        data: { ...m, order: i },
      });
    } else {
      await db.milestone.create({ data: { ...m, order: i } });
    }
  }

  const teamMembers = [
    {
      name: "Aïssata Ba",
      roleFr: "Présidente",
      roleEn: "President",
      bioFr: "Militante des droits pastoraux, elle porte la vision de l'organisation.",
      bioEn: "A pastoral-rights advocate, she carries the organization's vision.",
    },
    {
      name: "Mariama Touré",
      roleFr: "Directrice exécutive",
      roleEn: "Executive Director",
      bioFr: "Elle pilote la stratégie et les opérations au quotidien.",
      bioEn: "She leads day-to-day strategy and operations.",
    },
    {
      name: "Hawa Diallo",
      roleFr: "Secrétaire générale",
      roleEn: "Secretary General",
      bioFr: "Garante de la gouvernance et de la vie associative.",
      bioEn: "Guardian of governance and organizational life.",
    },
    {
      name: "Ramata Sow",
      roleFr: "Trésorière",
      roleEn: "Treasurer",
      bioFr: "Elle assure la transparence et la solidité financières.",
      bioEn: "She ensures financial transparency and solidity.",
    },
    {
      name: "Zeinabou Maïga",
      roleFr: "Responsable des programmes",
      roleEn: "Head of Programs",
      bioFr: "Elle conçoit et coordonne les programmes sur le terrain.",
      bioEn: "She designs and coordinates programs in the field.",
    },
    {
      name: "Fatoumata Cissé",
      roleFr: "Responsable du plaidoyer",
      roleEn: "Head of Advocacy",
      bioFr: "Elle porte la voix des communautés dans les espaces de décision.",
      bioEn: "She carries communities' voice into decision-making spaces.",
    },
  ];

  for (const [i, m] of teamMembers.entries()) {
    const existing = await db.teamMember.findFirst({ where: { name: m.name } });
    if (existing) {
      await db.teamMember.update({
        where: { id: existing.id },
        data: { ...m, order: i },
      });
    } else {
      await db.teamMember.create({ data: { ...m, order: i } });
    }
  }

  for (const [i, g] of galleryContent.entries()) {
    const existing = await db.galleryItem.findFirst({
      where: { titleFr: g.captionFr },
    });
    const data = {
      titleFr: g.captionFr,
      titleEn: g.captionEn,
      album: g.albumFr,
      url: "",
      order: i,
    };
    if (existing) {
      await db.galleryItem.update({ where: { id: existing.id }, data });
    } else {
      await db.galleryItem.create({ data });
    }
  }

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
