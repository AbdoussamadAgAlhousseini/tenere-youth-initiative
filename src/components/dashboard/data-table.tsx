import type { ReactNode } from "react";

export type Column<T> = {
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

/** Minimal responsive table for admin list views. */
export function DataTable<T>({
  columns,
  rows,
  empty,
  getKey,
}: {
  columns: Column<T>[];
  rows: T[];
  empty: string;
  getKey: (row: T, i: number) => string;
}) {
  if (rows.length === 0) {
    return (
      <div className="text-muted-foreground bg-card rounded-2xl border p-10 text-center">
        {empty}
      </div>
    );
  }

  return (
    <div className="bg-card overflow-x-auto rounded-2xl border shadow-sm">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="border-b">
          <tr className="text-muted-foreground">
            {columns.map((c, i) => (
              <th key={i} className={`px-4 py-3 font-medium ${c.className ?? ""}`}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((row, i) => (
            <tr key={getKey(row, i)} className="hover:bg-secondary/40">
              {columns.map((c, j) => (
                <td key={j} className={`px-4 py-3 ${c.className ?? ""}`}>
                  {c.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
