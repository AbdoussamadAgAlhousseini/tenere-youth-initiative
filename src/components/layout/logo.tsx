import { cn } from "@/lib/utils";

/** Tenere Youth Initiative wordmark — a dune horizon under a rising sun. */
export function Logo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        className="size-9 shrink-0"
        role="img"
        aria-label="Tenere Youth Initiative"
      >
        <circle cx="20" cy="20" r="20" className="fill-primary/10" />
        <circle cx="20" cy="17" r="6" className="fill-accent" />
        <path
          d="M4 28c4-3 7-1 10 0s6 2 9-1 8-2 13 1v11H4z"
          className="fill-primary"
        />
        <path
          d="M4 31c5-2 8 0 12 1s7 1 10-1 8-1 14 1"
          className="fill-none stroke-sand-200"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
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
