export type ServiceIconName =
  | "plumbing"
  | "electrical"
  | "drain"
  | "heater"
  | "blinds"
  | "garage"
  | "glass"
  | "locksmith"
  | "ac"
  | "frames"
  | "doors"
  | "damp"
  | "roof";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: ServiceIconName;
  whatsappMessage: string;
  image?: {
    src: string;
    alt: string;
  };
};

export const SERVICES: Service[] = [
  {
    slug: "canalizacao",
    title: "Canalização",
    description:
      "Fuga, torneira a pingar, autoclismo avariado ou cano rebentado — o canalizador vai ao local.",
    icon: "plumbing",
    whatsappMessage: "Olá! Preciso de um canalizador urgente.",
    image: {
      src: "/nexo-services/canalizacao.jpg",
      alt: "Técnico Nexo Services a intervir na canalização sob um lava-loiças",
    },
  },
  {
    slug: "eletricidade",
    title: "Eletricidade",
    description:
      "Quadro a disparar, tomada sem corrente ou avaria elétrica em casa — intervenção imediata.",
    icon: "electrical",
    whatsappMessage: "Olá! Preciso de um eletricista urgente.",
    image: {
      src: "/nexo-services/eletricidade.jpg",
      alt: "Técnico Nexo Services a trabalhar num quadro elétrico",
    },
  },
  {
    slug: "desentupimentos",
    title: "Desentupimentos",
    description:
      "Sanita, ralo, caleira ou caixa de visita entupida. Desobstrução no próprio dia, quando possível.",
    icon: "drain",
    whatsappMessage: "Olá! Preciso de um desentupimento urgente.",
  },
  {
    slug: "esquentadores-caldeiras",
    title: "Esquentadores, caldeiras e termoacumuladores",
    description:
      "Sem água quente, aparelho em erro ou substituição. Diagnóstico e reparação no domicílio.",
    icon: "heater",
    whatsappMessage:
      "Olá! Preciso de assistência urgente a esquentador, caldeira ou termoacumulador.",
  },
  {
    slug: "estores-persianas",
    title: "Estores e persianas",
    description:
      "Estore preso, fita partida ou motor avariado. Reparação de estores manuais e elétricos.",
    icon: "blinds",
    whatsappMessage: "Olá! Preciso de reparação urgente de estores ou persianas.",
    image: {
      src: "/nexo-services/estores.jpg",
      alt: "Técnico Nexo Services a reparar um estore de enrolar",
    },
  },
  {
    slug: "portoes-garagem",
    title: "Portões de garagem",
    description:
      "Portão que não abre, comando sem resposta, motor ou calha. Assistência a portões seccionados e basculantes.",
    icon: "garage",
    whatsappMessage: "Olá! Preciso de assistência urgente a portão de garagem.",
  },
  {
    slug: "vidros-espelhos",
    title: "Vidros e espelhos",
    description:
      "Vidro partido, substituição de vidro ou espelho. Corte e instalação no local.",
    icon: "glass",
    whatsappMessage: "Olá! Preciso de assistência urgente a vidros ou espelhos.",
  },
  {
    slug: "serralharia",
    title: "Serralharia",
    description:
      "Fechadura avariada, porta emperrada ou chave partida. Abertura e substituição com identificação.",
    icon: "locksmith",
    whatsappMessage: "Olá! Preciso de um serralheiro urgente.",
  },
  {
    slug: "ar-condicionado",
    title: "Ar condicionado",
    description:
      "Sem frio nem calor, ruído, fuga ou manutenção. Assistência a unidades interiores e exteriores.",
    icon: "ac",
    whatsappMessage: "Olá! Preciso de assistência urgente a ar condicionado.",
    image: {
      src: "/nexo-services/ar-condicionado.jpg",
      alt: "Técnico Nexo Services a fazer manutenção de um aparelho de ar condicionado",
    },
  },
  {
    slug: "caixilharia",
    title: "Caixilharia",
    description:
      "Caixilho danificado, vedação falhada ou ajuste de alumínio e PVC. Reparação pontual ao domicílio.",
    icon: "frames",
    whatsappMessage: "Olá! Preciso de assistência urgente a caixilharia.",
    image: {
      src: "/nexo-services/caixilharia.jpg",
      alt: "Técnico Nexo Services a instalar caixilharia de janela",
    },
  },
  {
    slug: "portas-janelas",
    title: "Portas e janelas",
    description:
      "Porta desencaixada, fecho avariado, vedante gasto ou janela que não fecha bem.",
    icon: "doors",
    whatsappMessage: "Olá! Preciso de assistência urgente a portas ou janelas.",
    image: {
      src: "/nexo-services/portas.jpg",
      alt: "Técnico Nexo Services a trabalhar no fecho de uma porta",
    },
  },
  {
    slug: "infiltracao-humidade",
    title: "Deteção de infiltração e humidade",
    description:
      "Parede húmida, teto a pingar ou origem da infiltração por identificar. Avaliação no local.",
    icon: "damp",
    whatsappMessage: "Olá! Preciso de deteção de infiltração ou humidade.",
    image: {
      src: "/nexo-services/infiltracao-humidade.jpg",
      alt: "Técnico Nexo Services a verificar infiltração e humidade numa parede",
    },
  },
  {
    slug: "telhados-coberturas",
    title: "Telhados e coberturas",
    description:
      "Telha partida, goteira ou impermeabilização pontual. Intervenção em coberturas com segurança.",
    icon: "roof",
    whatsappMessage: "Olá! Preciso de assistência urgente a telhados ou coberturas.",
  },
];

export const FOOTER_SERVICES = [
  "Canalização",
  "Eletricidade",
  "Desentupimentos",
  "Esquentadores e caldeiras",
  "Estores e persianas",
  "Portões de garagem",
] as const;
