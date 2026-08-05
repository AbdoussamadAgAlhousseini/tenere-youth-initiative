import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { getTeamMembers } from "@/server/repositories/misc";

/** Avatar gradient palette, assigned by position when a member has no photo. */
const TONES = [
  "from-oasis-400 to-oasis-700",
  "from-sand-400 to-sand-700",
  "from-sky-400 to-sky-700",
  "from-oasis-300 to-sky-600",
  "from-sand-500 to-oasis-600",
  "from-sky-500 to-oasis-600",
];

/** Initials for the avatar fallback (e.g. "Aïssata Ba" → "AB"). */
function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export async function Leadership() {
  const isEn = (await getLocale()) === "en";
  const t = await getTranslations("leadership");
  const members = await getTeamMembers();

  if (members.length === 0) return null;

  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-accent mb-3 text-sm font-semibold uppercase tracking-wide">
          {t("eyebrow")}
        </p>
        <h2 className="text-3xl font-semibold sm:text-4xl">{t("title")}</h2>
        <p className="text-muted-foreground mt-4 text-lg text-pretty">
          {t("statement")}
        </p>
        <span className="bg-primary/10 text-primary mt-6 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold">
          {t("badge")}
        </span>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((leader, i) => (
          <li
            key={leader.id}
            className="bg-card flex flex-col items-center gap-4 rounded-2xl border p-8 text-center shadow-sm"
          >
            <div
              className={`flex size-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${TONES[i % TONES.length]} ring-4 ring-background`}
            >
              {leader.photo ? (
                <Image
                  src={leader.photo}
                  alt={leader.name}
                  width={96}
                  height={96}
                  className="size-full object-cover"
                />
              ) : (
                <span className="font-serif text-2xl font-semibold text-white">
                  {initials(leader.name)}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{leader.name}</h3>
              <p className="text-primary text-sm font-medium">
                {isEn ? leader.roleEn : leader.roleFr}
              </p>
            </div>
            <p className="text-muted-foreground text-sm text-pretty">
              {isEn ? leader.bioEn : leader.bioFr}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
