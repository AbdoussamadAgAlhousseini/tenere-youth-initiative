import {
  Compass,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Megaphone,
  Sprout,
  Store,
  Tent,
  type LucideIcon,
} from "lucide-react";

// Named icon registry so program/theme data can reference icons by string.
const icons: Record<string, LucideIcon> = {
  Compass,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Megaphone,
  Sprout,
  Store,
  Tent,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const LucideComp = icons[name] ?? Sprout;
  return <LucideComp className={className} aria-hidden />;
}
