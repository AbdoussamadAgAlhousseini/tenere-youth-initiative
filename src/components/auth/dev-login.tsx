import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Development-only login: sign in as a seeded user by email (no password).
 * Renders nothing in production.
 */
export function DevLogin({ callbackUrl = "/" }: { callbackUrl?: string }) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="border-dashed border-amber-400/60 bg-amber-50/50 rounded-xl border p-4 dark:bg-amber-950/20">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
        Dev login (développement uniquement)
      </p>
      <form
        action={async (formData) => {
          "use server";
          const email =
            String(formData.get("email") || "").trim() ||
            "admin@tenereyouth.org";
          await signIn("dev", { email, redirectTo: callbackUrl });
        }}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <Input
          name="email"
          type="email"
          defaultValue="admin@tenereyouth.org"
          aria-label="Dev email"
          className="bg-background"
        />
        <Button type="submit" variant="secondary" className="shrink-0">
          Se connecter
        </Button>
      </form>
      <p className="text-muted-foreground mt-2 text-xs">
        Comptes seedés : admin@tenereyouth.org (ADMIN)
      </p>
    </div>
  );
}
