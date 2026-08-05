// Canonical program definitions — the single source of truth shared by the
// front-end (home preview, programs list) and the database seed.

export type ProgramContent = {
  slug: string;
  theme:
    | "LEADERSHIP"
    | "EDUCATION"
    | "PASTORALISM"
    | "CLIMATE"
    | "DIGITAL"
    | "WOMEN"
    | "ENTREPRENEURSHIP"
    | "ADVOCACY";
  /** Lucide icon name. */
  icon: string;
  titleFr: string;
  titleEn: string;
  summaryFr: string;
  summaryEn: string;
  descriptionFr: string;
  descriptionEn: string;
};

export const programsContent: ProgramContent[] = [
  {
    slug: "leadership",
    theme: "LEADERSHIP",
    icon: "Compass",
    titleFr: "Leadership des jeunes",
    titleEn: "Youth Leadership",
    summaryFr:
      "Former une nouvelle génération de leaders issus des communautés pastorales et nomades.",
    summaryEn:
      "Training a new generation of leaders from pastoralist and nomadic communities.",
    descriptionFr:
      "Notre programme de leadership accompagne les jeunes à travers des ateliers, du mentorat et des projets communautaires. Ils apprennent à porter la voix de leurs communautés, à mobiliser et à conduire le changement dans leurs territoires.",
    descriptionEn:
      "Our leadership program supports young people through workshops, mentorship and community projects. They learn to carry the voice of their communities, to mobilize and to drive change in their territories.",
  },
  {
    slug: "education",
    theme: "EDUCATION",
    icon: "GraduationCap",
    titleFr: "Éducation & alphabétisation",
    titleEn: "Education & Literacy",
    summaryFr:
      "Un accès à une éducation de qualité adaptée à la mobilité des familles pastorales.",
    summaryEn:
      "Access to quality education adapted to the mobility of pastoralist families.",
    descriptionFr:
      "Nous soutenons des écoles mobiles, des cours de rattrapage et des bourses pour que les enfants et jeunes nomades ne soient pas laissés de côté. L'éducation est la première clé de l'autonomie.",
    descriptionEn:
      "We support mobile schools, catch-up classes and scholarships so nomadic children and youth are not left behind. Education is the first key to autonomy.",
  },
  {
    slug: "pastoralism",
    theme: "PASTORALISM",
    icon: "Tent",
    titleFr: "Pastoralisme & droits",
    titleEn: "Pastoralism & Rights",
    summaryFr:
      "Défendre les droits et les savoirs des éleveurs face aux mutations du Sahel.",
    summaryEn:
      "Defending the rights and knowledge of herders amid the Sahel's transformations.",
    descriptionFr:
      "Le pastoralisme nourrit des millions de personnes et façonne des cultures millénaires. Nous documentons les savoirs traditionnels, sécurisons les couloirs de transhumance et plaidons pour la reconnaissance des droits des communautés.",
    descriptionEn:
      "Pastoralism feeds millions and shapes age-old cultures. We document traditional knowledge, secure transhumance corridors and advocate for the recognition of community rights.",
  },
  {
    slug: "climate",
    theme: "CLIMATE",
    icon: "Sprout",
    titleFr: "Climat & environnement",
    titleEn: "Climate & Environment",
    summaryFr:
      "Renforcer la résilience des communautés face à la désertification.",
    summaryEn: "Building community resilience to desertification.",
    descriptionFr:
      "Reforestation, gestion de l'eau, agroécologie : nos jeunes agissent en première ligne pour protéger la biodiversité et adapter leurs territoires au changement climatique.",
    descriptionEn:
      "Reforestation, water management, agroecology: our youth act on the front line to protect biodiversity and adapt their territories to climate change.",
  },
  {
    slug: "digital",
    theme: "DIGITAL",
    icon: "Laptop",
    titleFr: "Numérique & innovation",
    titleEn: "Digital & Innovation",
    summaryFr:
      "Réduire la fracture numérique et outiller les jeunes pour l'économie de demain.",
    summaryEn:
      "Closing the digital divide and equipping youth for tomorrow's economy.",
    descriptionFr:
      "Nous formons les jeunes au numérique, du premier contact avec un ordinateur jusqu'à la création de solutions locales. La technologie devient un levier au service des communautés.",
    descriptionEn:
      "We train young people in digital skills, from a first contact with a computer to building local solutions. Technology becomes a lever in service of communities.",
  },
  {
    slug: "women",
    theme: "WOMEN",
    icon: "HeartHandshake",
    titleFr: "Femmes & filles",
    titleEn: "Women & Girls",
    summaryFr:
      "Promouvoir l'égalité et l'autonomisation des femmes et des filles.",
    summaryEn: "Promoting equality and the empowerment of women and girls.",
    descriptionFr:
      "À travers l'éducation, la santé et l'entrepreneuriat, nous soutenons le leadership des femmes et des filles, actrices essentielles de la transformation de leurs communautés.",
    descriptionEn:
      "Through education, health and entrepreneurship, we support the leadership of women and girls, essential actors in transforming their communities.",
  },
  {
    slug: "entrepreneurship",
    theme: "ENTREPRENEURSHIP",
    icon: "Store",
    titleFr: "Entrepreneuriat",
    titleEn: "Entrepreneurship",
    summaryFr:
      "Accompagner les jeunes vers l'autonomie économique par l'entrepreneuriat.",
    summaryEn:
      "Guiding young people toward economic autonomy through entrepreneurship.",
    descriptionFr:
      "Formation, micro-financement et incubation : nous aidons les jeunes à créer des activités durables, ancrées dans les ressources et les besoins de leurs territoires.",
    descriptionEn:
      "Training, micro-financing and incubation: we help young people build sustainable businesses rooted in the resources and needs of their territories.",
  },
  {
    slug: "advocacy",
    theme: "ADVOCACY",
    icon: "Megaphone",
    titleFr: "Plaidoyer",
    titleEn: "Advocacy",
    summaryFr:
      "Porter la voix des communautés pastorales dans les espaces de décision.",
    summaryEn:
      "Carrying the voice of pastoralist communities into decision-making spaces.",
    descriptionFr:
      "Nous formons les jeunes au plaidoyer et les connectons aux instances locales, nationales et internationales pour que leurs droits soient entendus et respectés.",
    descriptionEn:
      "We train young people in advocacy and connect them to local, national and international bodies so their rights are heard and respected.",
  },
];
