import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number | string;
  icon?: ReactNode;
}) {
  return (
    <div className="bg-card flex items-center gap-4 rounded-2xl border p-5 shadow-sm">
      {icon && (
        <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
          {icon}
        </span>
      )}
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-muted-foreground text-sm">{label}</p>
      </div>
    </div>
  );
}
