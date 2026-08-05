import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number with locale-aware grouping. */
export function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(value);
}

/** Format a date in a readable, locale-aware long form. */
export function formatDate(date: Date | string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
