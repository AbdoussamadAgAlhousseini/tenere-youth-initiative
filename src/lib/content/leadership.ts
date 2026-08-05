// Leadership team — every key position at Tenere Youth Initiative is held by a
// woman. NAMES AND BIOS ARE PLACEHOLDERS: replace with the real team (and add
// photo URLs to `photo`) before going live.

export type Leader = {
  name: string;
  roleFr: string;
  roleEn: string;
  bioFr: string;
  bioEn: string;
  /** Optional photo URL; when absent, an initials avatar is shown. */
  photo?: string;
  /** Avatar gradient (Tailwind classes) used behind the initials. */
  tone: string;
};

export const leadership: Leader[] = [
  {
    name: "Aïssata Ba",
    roleFr: "Présidente",
    roleEn: "President",
    bioFr: "Militante des droits pastoraux, elle porte la vision de l'organisation.",
    bioEn: "A pastoral-rights advocate, she carries the organization's vision.",
    tone: "from-oasis-400 to-oasis-700",
  },
  {
    name: "Mariama Touré",
    roleFr: "Directrice exécutive",
    roleEn: "Executive Director",
    bioFr: "Elle pilote la stratégie et les opérations au quotidien.",
    bioEn: "She leads day-to-day strategy and operations.",
    tone: "from-sand-400 to-sand-700",
  },
  {
    name: "Hawa Diallo",
    roleFr: "Secrétaire générale",
    roleEn: "Secretary General",
    bioFr: "Garante de la gouvernance et de la vie associative.",
    bioEn: "Guardian of governance and organizational life.",
    tone: "from-sky-400 to-sky-700",
  },
  {
    name: "Ramata Sow",
    roleFr: "Trésorière",
    roleEn: "Treasurer",
    bioFr: "Elle assure la transparence et la solidité financières.",
    bioEn: "She ensures financial transparency and solidity.",
    tone: "from-oasis-300 to-sky-600",
  },
  {
    name: "Zeinabou Maïga",
    roleFr: "Responsable des programmes",
    roleEn: "Head of Programs",
    bioFr: "Elle conçoit et coordonne les programmes sur le terrain.",
    bioEn: "She designs and coordinates programs in the field.",
    tone: "from-sand-500 to-oasis-600",
  },
  {
    name: "Fatoumata Cissé",
    roleFr: "Responsable du plaidoyer",
    roleEn: "Head of Advocacy",
    bioFr: "Elle porte la voix des communautés dans les espaces de décision.",
    bioEn: "She carries communities' voice into decision-making spaces.",
    tone: "from-sky-500 to-oasis-600",
  },
];

/** Initials for the avatar fallback (e.g. "Aïssata Ba" → "AB"). */
export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
