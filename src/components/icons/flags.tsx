"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * Inline SVG flags — render identically across every OS (unlike emoji flags,
 * which don't display on Windows). Wrapped in a rounded, subtly ringed frame.
 */

function FlagFrame({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "inline-block h-4 w-[22px] shrink-0 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/10",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function FlagFR({ className }: { className?: string }) {
  return (
    <FlagFrame className={className} label="Français">
      <svg viewBox="0 0 3 2" className="h-full w-full" preserveAspectRatio="none">
        <rect width="1" height="2" x="0" fill="#0055A4" />
        <rect width="1" height="2" x="1" fill="#FFFFFF" />
        <rect width="1" height="2" x="2" fill="#EF4135" />
      </svg>
    </FlagFrame>
  );
}

export function FlagGB({ className }: { className?: string }) {
  const clip = useId();
  return (
    <FlagFrame className={className} label="English">
      <svg viewBox="0 0 60 30" className="h-full w-full" preserveAspectRatio="none">
        <clipPath id={clip}>
          <path d="M0 0h60v30H0z" />
        </clipPath>
        <g clipPath={`url(#${clip})`}>
          <path d="M0 0v30h60V0z" fill="#012169" />
          <path d="M0 0l60 30m0-30L0 30" stroke="#FFF" strokeWidth="6" />
          <path
            d="M0 0l60 30m0-30L0 30"
            stroke="#C8102E"
            strokeWidth="4"
            clipPath={`url(#${clip})`}
          />
          <path d="M30 0v30M0 15h60" stroke="#FFF" strokeWidth="10" />
          <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    </FlagFrame>
  );
}

export function LocaleFlag({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  return locale === "en" ? (
    <FlagGB className={className} />
  ) : (
    <FlagFR className={className} />
  );
}
