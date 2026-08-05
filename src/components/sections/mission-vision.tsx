import { Compass, Sprout } from "lucide-react";
import { useTranslations } from "next-intl";

export function MissionVision() {
  const t = useTranslations("home");

  const blocks = [
    {
      Icon: Sprout,
      eyebrow: t("mission.eyebrow"),
      title: t("mission.title"),
      body: t("mission.body"),
    },
    {
      Icon: Compass,
      eyebrow: t("vision.eyebrow"),
      title: t("vision.title"),
      body: t("vision.body"),
    },
  ];

  return (
    <section className="container grid gap-6 py-20 md:grid-cols-2">
      {blocks.map(({ Icon, eyebrow, title, body }) => (
        <article
          key={eyebrow}
          className="bg-card flex flex-col gap-4 rounded-2xl border p-8 shadow-sm"
        >
          <span className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
            <Icon className="size-6" />
          </span>
          <p className="text-accent text-sm font-semibold uppercase tracking-wide">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-muted-foreground text-pretty">{body}</p>
        </article>
      ))}
    </section>
  );
}
