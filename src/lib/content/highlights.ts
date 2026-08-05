// Curated front-end content for the home page — testimonials, partners and
// impact figures. These render without a database so the home page is always
// complete; the admin-managed versions live in the database (seed mirrors this).

export const impactStats = {
  youth: 2400,
  programs: 8,
  communities: 45,
  countries: 6,
};

export type Testimonial = {
  authorFr: string;
  authorEn: string;
  roleFr: string;
  roleEn: string;
  quoteFr: string;
  quoteEn: string;
};

export const testimonials: Testimonial[] = [
  {
    authorFr: "Aïcha M.",
    authorEn: "Aïcha M.",
    roleFr: "Jeune leader, programme Leadership",
    roleEn: "Young leader, Leadership program",
    quoteFr:
      "Tenere m'a appris que ma voix compte. Aujourd'hui, je défends les droits de ma communauté avec fierté.",
    quoteEn:
      "Tenere taught me that my voice matters. Today I defend my community's rights with pride.",
  },
  {
    authorFr: "Ibrahim D.",
    authorEn: "Ibrahim D.",
    roleFr: "Éleveur et formateur",
    roleEn: "Herder and trainer",
    quoteFr:
      "Grâce au programme pastoralisme, nos savoirs sont enfin reconnus et transmis aux plus jeunes.",
    quoteEn:
      "Thanks to the pastoralism program, our knowledge is finally recognized and passed on to the young.",
  },
  {
    authorFr: "Fatou S.",
    authorEn: "Fatou S.",
    roleFr: "Entrepreneure, coopérative laitière",
    roleEn: "Entrepreneur, dairy cooperative",
    quoteFr:
      "Le numérique a transformé notre coopérative. Nous sommes plus fortes, ensemble.",
    quoteEn:
      "Digital tools transformed our cooperative. We are stronger, together.",
  },
];

export const partners: string[] = [
  "Sahel Foundation",
  "Green Horizon Fund",
  "Nomad Tech Lab",
  "Pastoral Rights Network",
  "Desert Bloom Initiative",
  "United Youth Alliance",
];
