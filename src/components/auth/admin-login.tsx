import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Password-only admin login. No email — just the shared admin password
 * (checked server-side against the ADMIN_PASSWORD env var).
 */
export function AdminLogin({
  callbackUrl = "/",
  label = "Se connecter",
  placeholder = "Mot de passe",
}: {
  callbackUrl?: string;
  label?: string;
  placeholder?: string;
}) {
  return (
    <form
      action={async (formData) => {
        "use server";
        const password = String(formData.get("password") || "");
        await signIn("admin", { password, redirectTo: callbackUrl });
      }}
      className="flex flex-col gap-3"
    >
      <Input
        name="password"
        type="password"
        required
        autoComplete="current-password"
        placeholder={placeholder}
        aria-label={placeholder}
        className="bg-background"
      />
      <Button type="submit" className="w-full">
        {label}
      </Button>
    </form>
  );
}
