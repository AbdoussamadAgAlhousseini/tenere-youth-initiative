"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ResourceItem = {
  slug: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  type: "REPORT" | "GUIDE" | "TOOLKIT" | "PUBLICATION";
  fileUrl: string;
  fileFormat: string | null;
  fileSize: number | null;
};

const types = ["all", "REPORT", "GUIDE", "TOOLKIT", "PUBLICATION"] as const;

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

export function ResourceList({ resources }: { resources: ResourceItem[] }) {
  const locale = useLocale();
  const isEn = locale === "en";
  const t = useTranslations("pages.resources");
  const [type, setType] = useState<(typeof types)[number]>("all");

  const filtered = resources.filter(
    (r) => type === "all" || r.type === type,
  );

  return (
    <div className="container py-16 md:py-20">
      <div className="mb-10 flex flex-wrap gap-2">
        {types.map((ty) => (
          <button
            key={ty}
            onClick={() => setType(ty)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              type === ty
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-secondary",
            )}
          >
            {ty === "all" ? t("types.all") : t(`types.${ty}`)}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((r) => (
          <article
            key={r.slug}
            className="bg-card flex items-start gap-4 rounded-2xl border p-6 shadow-sm"
          >
            <span className="bg-accent/10 text-accent flex size-12 shrink-0 items-center justify-center rounded-xl">
              <FileText className="size-6" />
            </span>
            <div className="flex-1">
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                {t(`types.${r.type}`)}
                {r.fileFormat ? ` · ${r.fileFormat}` : ""}
                {r.fileSize ? ` · ${formatSize(r.fileSize)}` : ""}
              </p>
              <h3 className="mt-1 font-semibold">
                {isEn ? r.titleEn : r.titleFr}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm text-pretty">
                {isEn ? r.descriptionEn : r.descriptionFr}
              </p>
              <Button asChild variant="outline" size="sm" className="mt-4">
                <a href={r.fileUrl} download>
                  <Download />
                  {t("download")}
                </a>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
