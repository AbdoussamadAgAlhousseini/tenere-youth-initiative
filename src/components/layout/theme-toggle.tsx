"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const t = useTranslations("common");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={t("toggleTheme")}
      title={t("toggleTheme")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "focus-visible:ring-ring relative inline-flex h-7 w-[52px] shrink-0 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDark
          ? "border-stone-700 bg-stone-800"
          : "border-sky-300 bg-sky-200/70",
      )}
    >
      {/* Faint track icons hint the two states. */}
      <Sun className="absolute left-1.5 size-3.5 text-amber-500/80" aria-hidden />
      <Moon
        className="absolute right-1.5 size-3.5 text-stone-300"
        aria-hidden
      />
      {/* Sliding thumb carries the active icon. */}
      <span
        className={cn(
          "relative z-10 flex size-6 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 ease-out",
          isDark ? "translate-x-[26px]" : "translate-x-0.5",
        )}
      >
        {isDark ? (
          <Moon className="size-3.5 text-stone-700" aria-hidden />
        ) : (
          <Sun className="size-3.5 text-amber-500" aria-hidden />
        )}
      </span>
    </button>
  );
}
