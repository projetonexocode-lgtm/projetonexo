import {
  Armchair,
  Bath,
  BrickWall,
  Briefcase,
  Building2,
  ClipboardCheck,
  Compass,
  CookingPot,
  Home,
  type LucideIcon,
  MessageSquare,
  Palette,
  Ruler,
  Store,
  Wrench,
} from "lucide-react";
import type { ServiceIconName } from "@/lib/services";

const ICONS: Record<ServiceIconName, LucideIcon> = {
  bath: Bath,
  kitchen: CookingPot,
  apartment: Building2,
  house: Home,
  store: Store,
  office: Briefcase,
  inspection: ClipboardCheck,
  engineering: Ruler,
  furniture: Armchair,
  decor: Palette,
  architecture: Compass,
  consulting: MessageSquare,
  rehab: BrickWall,
  repairs: Wrench,
};

type ServiceIconProps = {
  name: ServiceIconName;
  className?: string;
};

export function ServiceIcon({ name, className }: ServiceIconProps) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden strokeWidth={1.5} />;
}
