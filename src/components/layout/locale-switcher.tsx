"use client";

import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { locales } from "@/lib/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheck,
} from "@/components/ui/dropdown-menu";
import { LocaleFlag } from "@/components/icons/flags";
import { cn } from "@/lib/utils";

const localeNames: Record<string, string> = {
  fr: "Français",
  en: "English",
};

export function LocaleSwitcher({ align = "end" }: { align?: "start" | "end" }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("changeLanguage")}
        disabled={isPending}
        className={cn(
          "hover:bg-secondary focus-visible:ring-ring inline-flex h-10 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          isPending && "opacity-60",
        )}
      >
        <LocaleFlag locale={locale} />
        <span className="hidden uppercase sm:inline">{locale}</span>
        <ChevronDown className="text-muted-foreground size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onSelect={() => switchTo(l)}
            aria-current={l === locale ? "true" : undefined}
          >
            <LocaleFlag locale={l} />
            <span className="flex-1">{localeNames[l]}</span>
            {l === locale && (
              <DropdownMenuCheck className="text-primary size-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
