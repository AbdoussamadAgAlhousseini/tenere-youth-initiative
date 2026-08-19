import Image from "next/image";

import { cn } from "@/lib/utils";

/** Tenere Youth Initiative logo — the desert emblem plus the wordmark. */
export function Logo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo-mark.png"
        alt="Tenere Youth Initiative"
        width={40}
        height={40}
        priority
        className="size-9 shrink-0 rounded-lg object-cover"
      />
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-base font-semibold tracking-tight">
            Tenere
          </span>
          <span className="text-muted-foreground text-[0.65rem] font-medium uppercase tracking-widest">
            Youth Initiative
          </span>
        </span>
      )}
    </span>
  );
}
