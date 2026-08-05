import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { requireMember } from "@/lib/auth-guards";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requireMember();
  const t = await getTranslations("member");
  const { user } = session;

  const rows = [
    { label: t("nav.profile"), value: user.name ?? "—" },
    { label: "Email", value: user.email ?? "—" },
    { label: t("role"), value: user.role },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("nav.profile")}</h1>

      <div className="bg-card max-w-xl space-y-6 rounded-2xl border p-6 shadow-sm">
        <div className="flex items-center gap-4">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? ""}
              width={64}
              height={64}
              className="size-16 rounded-full object-cover"
            />
          ) : (
            <div className="bg-primary/10 text-primary flex size-16 items-center justify-center rounded-full font-serif text-xl font-semibold">
              {(user.name ?? user.email ?? "?").charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-semibold">{user.name ?? "—"}</p>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>

        <dl className="divide-y">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-4 py-3 text-sm">
              <dt className="text-muted-foreground">{r.label}</dt>
              <dd className="font-medium">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
