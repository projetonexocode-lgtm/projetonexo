import {
  CloudRain,
  DoorOpen,
  Droplets,
  Fan,
  Flame,
  Frame,
  House,
  KeyRound,
  PanelTop,
  Square,
  Warehouse,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconName } from "@/lib/nexo-services/services";

const ICONS: Record<ServiceIconName, LucideIcon> = {
  plumbing: Droplets,
  electrical: Zap,
  drain: Waves,
  heater: Flame,
  blinds: PanelTop,
  garage: Warehouse,
  glass: Square,
  locksmith: KeyRound,
  ac: Fan,
  frames: Frame,
  doors: DoorOpen,
  damp: CloudRain,
  roof: House,
};

type ServiceIconProps = {
  name: ServiceIconName;
  className?: string;
};

export function ServiceIcon({ name, className }: ServiceIconProps) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden strokeWidth={1.5} />;
}
