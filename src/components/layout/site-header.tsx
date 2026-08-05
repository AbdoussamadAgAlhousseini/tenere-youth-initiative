"use client";

import * as React from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Sticky header shell that deepens (background + shadow) once the page is
 * scrolled, adding a sense of depth. Children are server-rendered.
 */
export function SiteHeader({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-background/60",
        scrolled
          ? "bg-background/90 border-border shadow-sm"
          : "bg-background/80 border-transparent",
      )}
    >
      {children}
    </header>
  );
}
