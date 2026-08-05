// Gallery content. Images use a solid brand-tinted placeholder (data URI) so
// the gallery is complete without external assets; swap `url` for real photos.

export type GalleryItemContent = {
  id: string;
  albumFr: string;
  albumEn: string;
  captionFr: string;
  captionEn: string;
  /** Tailwind gradient classes used as a placeholder tile. */
  tone: string;
};

export const galleryContent: GalleryItemContent[] = [
  {
    id: "g1",
    albumFr: "Forum jeunesse",
    albumEn: "Youth forum",
    captionFr: "Atelier de leadership à Ouagadougou",
    captionEn: "Leadership workshop in Ouagadougou",
    tone: "from-oasis-300 to-oasis-600",
  },
  {
    id: "g2",
    albumFr: "Terrain",
    albumEn: "Field",
    captionFr: "École mobile dans le campement",
    captionEn: "Mobile school at the camp",
    tone: "from-sand-300 to-sand-600",
  },
  {
    id: "g3",
    albumFr: "Climat",
    albumEn: "Climate",
    captionFr: "Reboisement communautaire",
    captionEn: "Community reforestation",
    tone: "from-oasis-400 to-sky-600",
  },
  {
    id: "g4",
    albumFr: "Femmes",
    albumEn: "Women",
    captionFr: "Coopérative laitière",
    captionEn: "Dairy cooperative",
    tone: "from-accent to-sand-500",
  },
  {
    id: "g5",
    albumFr: "Numérique",
    albumEn: "Digital",
    captionFr: "Bootcamp numérique à Niamey",
    captionEn: "Digital bootcamp in Niamey",
    tone: "from-sky-400 to-sky-700",
  },
  {
    id: "g6",
    albumFr: "Pastoralisme",
    albumEn: "Pastoralism",
    captionFr: "Transhumance au lever du jour",
    captionEn: "Transhumance at dawn",
    tone: "from-sand-400 to-oasis-500",
  },
  {
    id: "g7",
    albumFr: "Plaidoyer",
    albumEn: "Advocacy",
    captionFr: "Rencontre avec les autorités locales",
    captionEn: "Meeting with local authorities",
    tone: "from-sky-500 to-oasis-600",
  },
  {
    id: "g8",
    albumFr: "Forum jeunesse",
    albumEn: "Youth forum",
    captionFr: "Panel des jeunes leaders",
    captionEn: "Young leaders panel",
    tone: "from-oasis-500 to-sand-500",
  },
];
