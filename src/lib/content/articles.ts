// Canonical article content — shared by the front-end (news list/detail) and
// the database seed.

export type ArticleContent = {
  slug: string;
  categorySlug: string;
  tagSlugs: string[];
  date: string; // ISO date
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  bodyFr: string;
  bodyEn: string;
};

export const categoriesContent = [
  { slug: "news", nameFr: "Actualités", nameEn: "News" },
  {
    slug: "field-stories",
    nameFr: "Histoires de terrain",
    nameEn: "Field stories",
  },
  { slug: "advocacy", nameFr: "Plaidoyer", nameEn: "Advocacy" },
  { slug: "press", nameFr: "Communiqués", nameEn: "Press" },
];

export const tagsContent = [
  { slug: "sahel", nameFr: "Sahel", nameEn: "Sahel" },
  { slug: "climate", nameFr: "Climat", nameEn: "Climate" },
  { slug: "youth", nameFr: "Jeunesse", nameEn: "Youth" },
  { slug: "education", nameFr: "Éducation", nameEn: "Education" },
  { slug: "women", nameFr: "Femmes", nameEn: "Women" },
];

export const articlesContent: ArticleContent[] = [
  {
    slug: "young-leaders-sahel-cop",
    categorySlug: "advocacy",
    tagSlugs: ["youth", "climate", "sahel"],
    date: "2025-06-18",
    titleFr:
      "De jeunes leaders pastoraux à la table des négociations climatiques",
    titleEn: "Young pastoralist leaders at the climate negotiation table",
    excerptFr:
      "Cinq jeunes de nos communautés ont porté la voix des éleveurs lors d'un sommet régional sur le climat.",
    excerptEn:
      "Five young people from our communities carried the voice of herders at a regional climate summit.",
    bodyFr:
      "Pendant trois jours, cinq jeunes formés par Tenere Youth Initiative ont représenté les communautés pastorales et nomades lors d'un sommet régional. Ils ont rappelé une vérité simple : les éleveurs, en première ligne du changement climatique, détiennent aussi des solutions. Leurs propositions sur la gestion des couloirs de transhumance ont été saluées par plusieurs délégations, et un groupe de travail régional a été lancé dans la foulée pour les approfondir.",
    bodyEn:
      "For three days, five young people trained by Tenere Youth Initiative represented pastoralist and nomadic communities at a regional summit. They recalled a simple truth: herders, on the front line of climate change, also hold solutions. Their proposals on managing transhumance corridors were praised by several delegations, and a regional working group was launched in their wake to take them further.",
  },
  {
    slug: "mobile-school-reaches-100-children",
    categorySlug: "field-stories",
    tagSlugs: ["education", "youth"],
    date: "2025-05-02",
    titleFr: "Une école mobile rejoint 100 enfants nomades",
    titleEn: "A mobile school reaches 100 nomadic children",
    excerptFr:
      "Grâce à un dispositif éducatif itinérant, une centaine d'enfants suivent désormais une scolarité continue.",
    excerptEn:
      "Thanks to a travelling education program, a hundred children now follow continuous schooling.",
    bodyFr:
      "La mobilité des familles pastorales ne doit plus être un obstacle à l'éducation. Notre école mobile suit les campements au rythme des saisons, apportant enseignants, matériel et cantine. En un an, une centaine d'enfants ont retrouvé le chemin de l'apprentissage. Les familles, d'abord prudentes, sont devenues les premières ambassadrices du projet.",
    bodyEn:
      "The mobility of pastoralist families should no longer be a barrier to education. Our mobile school follows the camps with the rhythm of the seasons, bringing teachers, materials and meals. In one year, a hundred children found their way back to learning. Families, cautious at first, became the project's first ambassadors.",
  },
  {
    slug: "women-cooperative-digital",
    categorySlug: "news",
    tagSlugs: ["women", "youth"],
    date: "2025-03-21",
    titleFr: "Une coopérative de femmes passe au numérique",
    titleEn: "A women's cooperative goes digital",
    excerptFr:
      "Vingt femmes gèrent désormais leurs ventes de produits laitiers grâce à un outil numérique simple.",
    excerptEn:
      "Twenty women now manage their dairy sales with a simple digital tool.",
    bodyFr:
      "Formées par nos jeunes ambassadeurs du numérique, vingt femmes d'une coopérative laitière ont adopté un outil de gestion sur mobile. Résultat : des ventes mieux suivies, des revenus plus stables et une autonomie renforcée. La coopérative prévoit déjà de former d'autres groupements voisins.",
    bodyEn:
      "Trained by our young digital ambassadors, twenty women from a dairy cooperative adopted a mobile management tool. The result: better-tracked sales, more stable income and strengthened autonomy. The cooperative already plans to train other neighbouring groups.",
  },
];
