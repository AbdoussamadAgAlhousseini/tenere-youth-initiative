"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type HeroSlideView = {
  id: string;
  title: string;
  subtitle: string;
  image: string | null;
};

type Cta = { label: string; href: string };

const INTERVAL = 6000;

export function HeroCarousel({
  slides,
  eyebrow,
  primary,
  secondary,
}: {
  slides: HeroSlideView[];
  eyebrow: string;
  primary: Cta;
  secondary: Cta;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((i: number) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    timer.current = setInterval(() => setIndex((p) => (p + 1) % count), INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [count, paused]);

  const active = slides[index] ?? slides[0];
  if (!active) return null;
  const hasImage = Boolean(active.image);

  return (
    <section
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Background layers (crossfade) */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              i === index ? "opacity-100" : "opacity-0",
            )}
          >
            {s.image ? (
              <>
                <Image
                  src={s.image}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                {/* Scrim for text legibility over any photo. */}
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/45" />
              </>
            ) : (
              <div className="from-sand-100 via-background to-background dark:from-stone-900 dark:via-background absolute inset-0 bg-gradient-to-b" />
            )}
          </div>
        ))}
      </div>

      <div className="container flex min-h-[32rem] flex-col items-center justify-center gap-6 py-24 text-center md:min-h-[36rem] md:py-32">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide",
            hasImage
              ? "bg-white/15 text-white backdrop-blur"
              : "bg-secondary text-secondary-foreground",
          )}
        >
          {eyebrow}
        </span>

        <h1
          key={`t-${active.id}`}
          className={cn(
            "hero-fade max-w-4xl text-4xl font-semibold text-balance sm:text-5xl md:text-6xl",
            hasImage && "text-white drop-shadow-md",
          )}
        >
          {active.title}
        </h1>

        {active.subtitle && (
          <p
            key={`s-${active.id}`}
            className={cn(
              "hero-fade max-w-2xl text-lg text-pretty",
              hasImage ? "text-white/90" : "text-muted-foreground",
            )}
          >
            {active.subtitle}
          </p>
        )}

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={primary.href}>
              {primary.label}
              <ArrowRight />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className={cn(
              hasImage &&
                "border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white",
            )}
          >
            <Link href={secondary.href}>{secondary.label}</Link>
          </Button>
        </div>

        {count > 1 && (
          <div className="mt-6 flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Slogan ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  i === index
                    ? hasImage
                      ? "w-6 bg-white"
                      : "bg-primary w-6"
                    : hasImage
                      ? "w-2.5 bg-white/50 hover:bg-white/80"
                      : "bg-primary/30 hover:bg-primary/60 w-2.5",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
