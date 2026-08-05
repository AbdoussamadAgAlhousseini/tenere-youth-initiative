import { Skeleton } from "@/components/ui/skeleton";

/** Header placeholder matching PageHeader's proportions. */
export function PageHeaderSkeleton() {
  return (
    <div className="border-b bg-gradient-to-b from-sand-100/60 to-background dark:from-stone-900/60">
      <div className="container flex max-w-3xl flex-col items-center gap-4 py-16 md:py-20">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-2/3" />
      </div>
    </div>
  );
}

/** Grid of card placeholders. */
export function CardGridSkeleton({
  count = 6,
  withMedia = false,
}: {
  count?: number;
  withMedia?: boolean;
}) {
  return (
    <div className="container py-16 md:py-20">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-card rounded-2xl border p-6 shadow-sm">
            {withMedia && <Skeleton className="mb-5 aspect-[16/10] w-full" />}
            <Skeleton className="mb-3 size-12 rounded-xl" />
            <Skeleton className="mb-2 h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1.5 h-4 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Detail-page placeholder (breadcrumb, title, body). */
export function ArticleSkeleton() {
  return (
    <>
      <div className="border-b bg-gradient-to-b from-sand-100/60 to-background dark:from-stone-900/60">
        <div className="container max-w-3xl py-14">
          <Skeleton className="mb-6 h-4 w-40" />
          <Skeleton className="mb-4 h-9 w-3/4" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="container max-w-3xl py-12">
        <Skeleton className="aspect-[16/8] w-full rounded-2xl" />
        <div className="mt-10 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-11/12" />
        </div>
      </div>
    </>
  );
}
