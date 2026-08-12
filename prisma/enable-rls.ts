/**
 * Enable Row-Level Security on every table in the `public` schema.
 *
 * The app talks to Postgres through Prisma as the table **owner**, which is
 * exempt from RLS — so enabling RLS with **no policies** does not affect the
 * app, but it denies all access to Supabase's public REST API roles
 * (`anon` / `authenticated`), closing the "table publicly accessible" hole.
 *
 * Re-run after any `prisma db push` that adds new tables:
 *   npm run db:rls
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const tables = await db.$queryRawUnsafe<{ relname: string }[]>(
    `select c.relname
       from pg_class c
       join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relkind = 'r'
      order by c.relname`,
  );

  for (const { relname } of tables) {
    await db.$executeRawUnsafe(
      `ALTER TABLE public."${relname}" ENABLE ROW LEVEL SECURITY;`,
    );
  }

  const check = await db.$queryRawUnsafe<
    { relname: string; relrowsecurity: boolean }[]
  >(
    `select c.relname, c.relrowsecurity
       from pg_class c
       join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relkind = 'r'`,
  );
  const off = check.filter((c) => !c.relrowsecurity).map((c) => c.relname);

  console.log(`RLS enabled on ${check.length} tables.`);
  if (off.length) {
    console.error(`Still without RLS: ${off.join(", ")}`);
    process.exitCode = 1;
  } else {
    console.log("✓ All public tables have RLS enabled (public API denied).");
  }
}

main()
  .catch((e) => {
    console.error("Failed to enable RLS:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
