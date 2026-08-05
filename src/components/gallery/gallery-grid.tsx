"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export type GalleryItemDTO = {
  id: string;
  titleFr: string | null;
  titleEn: string | null;
  album: string | null;
  url: string;
};

// Deterministic placeholder gradients when an item has no image URL yet.
const tones = [
  "from-oasis-300 to-oasis-600",
  "from-sand-300 to-sand-600",
  "from-sky-400 to-sky-700",
  "from-oasis-400 to-sky-600",
  "from-accent to-sand-500",
  "from-sky-500 to-oasis-600",
];

export function GalleryGrid({ items }: { items: GalleryItemDTO[] }) {
  const locale = useLocale();
  const isEn = locale === "en";
  const t = useTranslations("pages.gallery");
  const [album, setAlbum] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const albums = useMemo(
    () => Array.from(new Set(items.map((g) => g.album).filter(Boolean))),
    [items],
  ) as string[];

  const caption = (g: GalleryItemDTO) =>
    (isEn ? g.titleEn : g.titleFr) ?? g.titleFr ?? "";

  const filtered = items.filter((g) => !album || g.album === album);
  const activeItem = items.find((g) => g.id === active);

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center text-muted-foreground">
        {t("all")}
      </div>
    );
  }

  return (
    <div className="container py-16 md:py-20">
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setAlbum(null)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm transition-colors",
            !album
              ? "bg-primary text-primary-foreground border-primary"
              : "hover:bg-secondary",
          )}
        >
          {t("all")}
        </button>
        {albums.map((a) => (
          <button
            key={a}
            onClick={() => setAlbum(a)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              album === a
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-secondary",
            )}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setActive(g.id)}
            className={cn(
              "group focus-visible:ring-ring relative aspect-square overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              !g.url && `bg-gradient-to-br ${tones[i % tones.length]}`,
            )}
          >
            {g.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={g.url}
                alt={caption(g)}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-left text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {caption(g)}
            </span>
          </button>
        ))}
      </div>

      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-6 top-6 text-white"
            onClick={() => setActive(null)}
          >
            <X className="size-8" />
          </button>
          <figure className="max-w-2xl" onClick={(e) => e.stopPropagation()}>
            {activeItem.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeItem.url}
                alt={caption(activeItem)}
                className="max-h-[70vh] w-full rounded-2xl object-contain"
              />
            ) : (
              <div
                className={`aspect-[4/3] w-full rounded-2xl bg-gradient-to-br ${tones[0]}`}
              />
            )}
            <figcaption className="mt-4 text-center text-white">
              {caption(activeItem)}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
