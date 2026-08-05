import { cn } from "@/lib/utils";

/** Consistent page header with an eyebrow, title and optional intro. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "border-b bg-gradient-to-b from-sand-100/60 to-background dark:from-stone-900/60",
        className,
      )}
    >
      <div className="container max-w-3xl py-16 text-center md:py-20">
        {eyebrow && (
          <p className="text-accent mb-3 text-sm font-semibold uppercase tracking-wide">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg text-pretty">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
