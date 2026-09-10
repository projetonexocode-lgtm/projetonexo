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
  image: {
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
      alt: "Torneira de banheira em cromado — referência de canalização doméstica",
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
      alt: "Quadro elétrico com disjuntores e cablagem",
    },
  },
  {
    slug: "desentupimentos",
    title: "Desentupimentos",
    description:
      "Sanita, ralo, caleira ou caixa de visita entupida. Desobstrução no próprio dia, quando possível.",
    icon: "drain",
    whatsappMessage: "Olá! Preciso de um desentupimento urgente.",
    image: {
      src: "/nexo-services/desentupimentos.jpg",
      alt: "Lava-loiças com torneira e água a correr",
    },
  },
  {
    slug: "esquentadores-caldeiras",
    title: "Esquentadores, caldeiras e termoacumuladores",
    description:
      "Sem água quente, aparelho em erro ou substituição. Diagnóstico e reparação no domicílio.",
    icon: "heater",
    whatsappMessage:
      "Olá! Preciso de assistência urgente a esquentador, caldeira ou termoacumulador.",
    image: {
      src: "/nexo-services/esquentadores.jpg",
      alt: "Tubagem de gás e válvulas numa instalação técnica",
    },
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
      alt: "Sala com estores de madeira nas janelas",
    },
  },
  {
    slug: "portoes-garagem",
    title: "Portões de garagem",
    description:
      "Portão que não abre, comando sem resposta, motor ou calha. Assistência a portões seccionados e basculantes.",
    icon: "garage",
    whatsappMessage: "Olá! Preciso de assistência urgente a portão de garagem.",
    image: {
      src: "/nexo-services/portoes.jpg",
      alt: "Moradia com portões de garagem seccionados",
    },
  },
  {
    slug: "vidros-espelhos",
    title: "Vidros e espelhos",
    description:
      "Vidro partido, substituição de vidro ou espelho. Corte e instalação no local.",
    icon: "glass",
    whatsappMessage: "Olá! Preciso de assistência urgente a vidros ou espelhos.",
    image: {
      src: "/nexo-services/vidros.jpg",
      alt: "Grandes vãos envidraçados numa sala contemporânea",
    },
  },
  {
    slug: "serralharia",
    title: "Serralharia",
    description:
      "Fechadura avariada, porta emperrada ou chave partida. Abertura e substituição com identificação.",
    icon: "locksmith",
    whatsappMessage: "Olá! Preciso de um serralheiro urgente.",
    image: {
      src: "/nexo-services/serralharia.jpg",
      alt: "Fechadura e puxador de porta com chave",
    },
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
      alt: "Unidades exteriores de ar condicionado na fachada",
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
      alt: "Caixilharia de alumínio e vidro em vãos amplos",
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
      alt: "Porta de entrada em madeira com caixilho",
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
      alt: "Técnico a medir humidade numa parede com manchas",
    },
  },
  {
    slug: "telhados-coberturas",
    title: "Telhados e coberturas",
    description:
      "Telha partida, goteira ou impermeabilização pontual. Intervenção em coberturas com segurança.",
    icon: "roof",
    whatsappMessage: "Olá! Preciso de assistência urgente a telhados ou coberturas.",
    image: {
      src: "/nexo-services/telhados.jpg",
      alt: "Telhado de telha vermelha com beiral e caleira",
    },
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
