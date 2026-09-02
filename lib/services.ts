export const SERVICE_CATEGORIES = [
  {
    id: "obras",
    title: "Obras e Remodelações",
    intro:
      "Intervenções completas ou parciais, com coordenação de especialidades e acompanhamento até à entrega.",
  },
  {
    id: "decoracao",
    title: "Decoração e Arquitetura",
    intro:
      "Projecto, materialidade e mobiliário alinhados com o uso real do espaço.",
  },
  {
    id: "reabilitacao",
    title: "Reabilitação de Imóveis",
    intro:
      "Recuperação estrutural e contemporânea de edifícios, com respeito pelo existente.",
  },
  {
    id: "reparacoes",
    title: "Reparações e Serviços Especializados",
    intro: "Manutenção e serviços técnicos através da Nexo Services.",
  },
] as const;

export type ServiceCategoryId = (typeof SERVICE_CATEGORIES)[number]["id"];

export type ServiceCta =
  | { type: "whatsapp"; serviceLabel: string }
  | { type: "external"; href: string };

export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  category: ServiceCategoryId;
  icon: ServiceIconName;
  cta: ServiceCta;
  featured?: boolean;
};

export type ServiceIconName =
  | "bath"
  | "kitchen"
  | "apartment"
  | "house"
  | "store"
  | "office"
  | "inspection"
  | "engineering"
  | "furniture"
  | "decor"
  | "architecture"
  | "consulting"
  | "rehab"
  | "repairs";

export const SERVICES: ServiceItem[] = [
  {
    slug: "wc-casa-de-banho",
    title: "WC / Casa de Banho",
    description:
      "Remodelação completa ou parcial, com impermeabilização e acabamentos duradouros.",
    category: "obras",
    icon: "bath",
    cta: {
      type: "whatsapp",
      serviceLabel: "remodelação de WC / casa de banho",
    },
  },
  {
    slug: "cozinha",
    title: "Cozinha",
    description:
      "Layout, bancadas, instalações e acabamentos pensados para o dia-a-dia.",
    category: "obras",
    icon: "kitchen",
    cta: { type: "whatsapp", serviceLabel: "remodelação de cozinha" },
  },
  {
    slug: "apartamento",
    title: "Apartamento",
    description:
      "Remodelação integral ou por fases, com coordenação de todas as especialidades.",
    category: "obras",
    icon: "apartment",
    cta: { type: "whatsapp", serviceLabel: "remodelação de apartamento" },
  },
  {
    slug: "moradia-vivenda",
    title: "Moradia / Vivenda",
    description:
      "Obras em moradias, da atualização de interiores à intervenção no conjunto.",
    category: "obras",
    icon: "house",
    cta: { type: "whatsapp", serviceLabel: "obras em moradia / vivenda" },
  },
  {
    slug: "loja-estabelecimento",
    title: "Loja / Estabelecimento",
    description:
      "Adequação de espaços comerciais, com prazos e funcionamento em mente.",
    category: "obras",
    icon: "store",
    cta: {
      type: "whatsapp",
      serviceLabel: "obras em loja / estabelecimento",
    },
  },
  {
    slug: "escritorio",
    title: "Escritório",
    description:
      "Reorganização e remodelação de espaços de trabalho, com conforto e eficiência.",
    category: "obras",
    icon: "office",
    cta: { type: "whatsapp", serviceLabel: "remodelação de escritório" },
  },
  {
    slug: "acompanhamento-fiscalizacao",
    title: "Acompanhamento e Fiscalização",
    description:
      "Seguimento técnico da obra, controlo de qualidade e de execução em obra.",
    category: "obras",
    icon: "inspection",
    cta: {
      type: "whatsapp",
      serviceLabel: "acompanhamento e fiscalização de obra",
    },
  },
  {
    slug: "engenharia",
    title: "Engenharia",
    description:
      "Apoio técnico de engenharia para decisões de obra com fundamento.",
    category: "obras",
    icon: "engineering",
    cta: { type: "whatsapp", serviceLabel: "serviços de engenharia" },
  },
  {
    slug: "mobiliario-a-medida",
    title: "Mobiliário à Medida",
    description:
      "Carpintaria e peças desenhadas para o espaço, sem soluções genéricas.",
    category: "decoracao",
    icon: "furniture",
    cta: { type: "whatsapp", serviceLabel: "mobiliário à medida" },
  },
  {
    slug: "projeto-de-decoracao",
    title: "Projeto de Decoração",
    description:
      "Composição de interiores: paleta, materiais, iluminação e mobiliário.",
    category: "decoracao",
    icon: "decor",
    cta: { type: "whatsapp", serviceLabel: "projeto de decoração" },
  },
  {
    slug: "projeto-de-arquitetura",
    title: "Projeto de Arquitetura",
    description:
      "Projeto de arquitetura para remodelar, ampliar ou reabilitar com método.",
    category: "decoracao",
    icon: "architecture",
    cta: { type: "whatsapp", serviceLabel: "projeto de arquitetura" },
  },
  {
    slug: "consultoria-de-interiores",
    title: "Consultoria de Interiores",
    description:
      "Orientação pontual para escolhas de materiais, layout e ambiente.",
    category: "decoracao",
    icon: "consulting",
    cta: { type: "whatsapp", serviceLabel: "consultoria de interiores" },
  },
  {
    slug: "reabilitacao-de-imoveis",
    title: "Reabilitação de Imóveis",
    description:
      "Recuperação de edifícios e fracções, da estrutura aos acabamentos.",
    category: "reabilitacao",
    icon: "rehab",
    cta: { type: "whatsapp", serviceLabel: "reabilitação de imóveis" },
  },
  {
    slug: "reparacoes",
    title: "Reparações e Serviços Especializados",
    description:
      "Reparações, manutenção e serviços técnicos — encaminhamento para a Nexo Services.",
    category: "reparacoes",
    icon: "repairs",
    featured: true,
    cta: {
      type: "external",
      href: "/reparacoes",
    },
  },
];

export const CONTACT_SERVICE_OPTIONS = [
  "Remodelação de WC / casa de banho",
  "Remodelação de cozinha",
  "Remodelação de apartamento",
  "Obras em moradia / vivenda",
  "Loja / estabelecimento",
  "Escritório",
  "Acompanhamento e fiscalização",
  "Engenharia",
  "Mobiliário à medida",
  "Projeto de decoração",
  "Projeto de arquitetura",
  "Consultoria de interiores",
  "Reabilitação de imóveis",
  "Outro / ainda não sei",
] as const;
