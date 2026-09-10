import {
  Armchair,
  Bath,
  BrickWall,
  Briefcase,
  Building2,
  ClipboardCheck,
  Compass,
  CookingPot,
  Hammer,
  House,
  Palette,
  PenTool,
  Sofa,
  Store,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "wc-casa-de-banho": Bath,
  apartamento: Building2,
  cozinha: CookingPot,
  "reabilitacao-de-imoveis": BrickWall,
  "moradia-vivenda": House,
  "loja-estabelecimento": Store,
  escritorio: Briefcase,
  "acompanhamento-fiscalizacao": ClipboardCheck,
  engenharia: Compass,
  "mobiliario-a-medida": Armchair,
  "projeto-de-decoracao": Palette,
  "projeto-de-arquitetura": PenTool,
  "consultoria-de-interiores": Sofa,
  default: Hammer,
};

type ProjectServiceIconProps = {
  slug: string;
  className?: string;
};

export function ProjectServiceIcon({ slug, className }: ProjectServiceIconProps) {
  const Icon = SERVICE_ICONS[slug] ?? SERVICE_ICONS.default;
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}
