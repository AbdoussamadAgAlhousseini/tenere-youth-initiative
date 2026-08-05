"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImageIcon, Loader2, UploadCloud, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const uploadEnabled = Boolean(CLOUD && PRESET);

/**
 * Image field: upload to Cloudinary (when configured) or paste a URL.
 * The current URL is submitted via a hidden input named `name`.
 */
export function ImageUpload({
  name,
  defaultValue = "",
  label,
}: {
  name: string;
  defaultValue?: string;
  label?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!uploadEnabled) return;
    setError(null);
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("upload_preset", PRESET as string);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`,
        { method: "POST", body },
      );
      if (!res.ok) throw new Error("upload_failed");
      const data = (await res.json()) as { secure_url?: string };
      if (!data.secure_url) throw new Error("no_url");
      setUrl(data.secure_url);
    } catch {
      setError("Échec de l'envoi. Réessayez ou collez une URL.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      {label && <span className="text-sm font-medium">{label}</span>}

      <input type="hidden" name={name} value={url} />

      <div className="flex items-start gap-4">
        {/* Preview */}
        <div className="bg-muted relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border">
          {url ? (
            <Image
              src={url}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <ImageIcon className="text-muted-foreground size-8" aria-hidden />
          )}
        </div>

        <div className="flex-1 space-y-2">
          {uploadEnabled && (
            <>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={uploading}
                onClick={() => fileRef.current?.click()}
              >
                {uploading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Envoi…
                  </>
                ) : (
                  <>
                    <UploadCloud className="size-4" />
                    Téléverser une image
                  </>
                )}
              </Button>
              {url && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={() => setUrl("")}
                >
                  <X className="size-4" />
                  Retirer
                </Button>
              )}
            </>
          )}

          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://… (ou collez une URL d'image)"
            className={cn("bg-background", uploadEnabled && "mt-1")}
          />
          {!uploadEnabled && (
            <p className="text-muted-foreground text-xs">
              {"Collez l'URL d'une image. (Téléversement direct : à configurer.)"}
            </p>
          )}
          {error && <p className="text-destructive text-xs">{error}</p>}
        </div>
      </div>
    </div>
  );
}
