export const DEFAULT_NAV: { label: string; href: string }[] = [
  { label: "Método", href: "/#metodo" },
  { label: "Galeria", href: "/galeria" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Atuação", href: "/#atuacao" },
  { label: "Blog", href: "/#blog" },
  { label: "Contacto", href: "/#contacto" },
];

export const DEFAULT_SERVICES = [
  {
    title: "WC / Casa de Banho",
    slug: "wc-casa-de-banho",
    description:
      "Remodelação completa ou parcial, com impermeabilização e acabamentos duradouros.",
    whatsappLabel: "remodelação de WC / casa de banho",
    contactLabel: "Remodelação de WC / casa de banho",
    featured: true,
    inContactForm: true,
    inFooter: true,
  },
  {
    title: "Apartamento",
    slug: "apartamento",
    description:
      "Remodelação integral ou por fases, com coordenação de todas as especialidades.",
    whatsappLabel: "remodelação de apartamento",
    contactLabel: "Remodelação de apartamento",
    featured: true,
    inContactForm: true,
    inFooter: true,
  },
  {
    title: "Cozinha",
    slug: "cozinha",
    description:
      "Layout, bancadas, instalações e acabamentos pensados para o dia-a-dia.",
    whatsappLabel: "remodelação de cozinha",
    contactLabel: "Remodelação de cozinha",
    featured: true,
    inContactForm: true,
    inFooter: true,
  },
  {
    title: "Reabilitação de Imóveis",
    slug: "reabilitacao-de-imoveis",
    description:
      "Recuperação de edifícios e fracções, da estrutura aos acabamentos.",
    whatsappLabel: "reabilitação de imóveis",
    contactLabel: "Reabilitação de imóveis",
    featured: true,
    inContactForm: true,
    inFooter: true,
  },
  {
    title: "Moradia / Vivenda",
    slug: "moradia-vivenda",
    description:
      "Obras em moradias, da atualização de interiores à intervenção no conjunto.",
    whatsappLabel: "obras em moradia / vivenda",
    contactLabel: "Obras em moradia / vivenda",
    featured: false,
    inContactForm: true,
    inFooter: false,
  },
  {
    title: "Loja / Estabelecimento",
    slug: "loja-estabelecimento",
    description:
      "Adequação de espaços comerciais, com prazos e funcionamento em mente.",
    whatsappLabel: "obras em loja / estabelecimento",
    contactLabel: "Loja / estabelecimento",
    featured: false,
    inContactForm: true,
    inFooter: true,
  },
  {
    title: "Escritório",
    slug: "escritorio",
    description:
      "Reorganização e remodelação de espaços de trabalho, com conforto e eficiência.",
    whatsappLabel: "remodelação de escritório",
    contactLabel: "Escritório",
    featured: false,
    inContactForm: true,
    inFooter: false,
  },
  {
    title: "Acompanhamento e Fiscalização",
    slug: "acompanhamento-fiscalizacao",
    description:
      "Seguimento técnico da obra, controlo de qualidade e de execução em obra.",
    whatsappLabel: "acompanhamento e fiscalização de obra",
    contactLabel: "Acompanhamento e fiscalização",
    featured: false,
    inContactForm: true,
    inFooter: true,
  },
  {
    title: "Engenharia",
    slug: "engenharia",
    description:
      "Apoio técnico de engenharia para decisões de obra com fundamento.",
    whatsappLabel: "serviços de engenharia",
    contactLabel: "Engenharia",
    featured: false,
    inContactForm: true,
    inFooter: false,
  },
  {
    title: "Mobiliário à Medida",
    slug: "mobiliario-a-medida",
    description:
      "Carpintaria e peças desenhadas para o espaço, sem soluções genéricas.",
    whatsappLabel: "mobiliário à medida",
    contactLabel: "Mobiliário à medida",
    featured: false,
    inContactForm: true,
    inFooter: false,
  },
  {
    title: "Projeto de Decoração",
    slug: "projeto-de-decoracao",
    description:
      "Composição de interiores: paleta, materiais, iluminação e mobiliário.",
    whatsappLabel: "projeto de decoração",
    contactLabel: "Projeto de decoração",
    featured: false,
    inContactForm: true,
    inFooter: false,
  },
  {
    title: "Projeto de Arquitetura",
    slug: "projeto-de-arquitetura",
    description:
      "Projeto de arquitetura para remodelar, ampliar ou reabilitar com método.",
    whatsappLabel: "projeto de arquitetura",
    contactLabel: "Projeto de arquitetura",
    featured: false,
    inContactForm: true,
    inFooter: true,
  },
  {
    title: "Consultoria de Interiores",
    slug: "consultoria-de-interiores",
    description:
      "Orientação pontual para escolhas de materiais, layout e ambiente.",
    whatsappLabel: "consultoria de interiores",
    contactLabel: "Consultoria de interiores",
    featured: false,
    inContactForm: true,
    inFooter: true,
  },
  {
    title: "Troca de Banheira por Base de Duche",
    slug: "troca-de-banheira-por-base-de-duche",
    description:
      "Substituição da banheira por base de duche, com impermeabilização e acabamento contínuo.",
    whatsappLabel: "troca de banheira por base de duche",
    contactLabel: "Troca de banheira por base de duche",
    featured: false,
    inContactForm: true,
    inFooter: true,
  },
  {
    title: "Gestão de Projetos",
    slug: "gestao-de-projetos",
    description:
      "Um interlocutor, calendário e coordenação das especialidades, do projeto à entrega.",
    whatsappLabel: "gestão de projetos",
    contactLabel: "Gestão de projetos",
    featured: false,
    inContactForm: true,
    inFooter: true,
  },
] as const;

export const FOOTER_SERVICE_COLUMNS: { slug: string; title: string }[][] = [
  [
    {
      slug: "apartamento",
      title: "Remodelação de Vivendas e Apartamentos",
    },
    {
      slug: "wc-casa-de-banho",
      title: "Remodelação de Casa de Banho",
    },
    {
      slug: "cozinha",
      title: "Modernização de Cozinhas",
    },
    {
      slug: "reabilitacao-de-imoveis",
      title: "Reabilitação de Ruínas",
    },
    {
      slug: "troca-de-banheira-por-base-de-duche",
      title: "Troca de Banheira por Base de Duche",
    },
  ],
  [
    {
      slug: "gestao-de-projetos",
      title: "Gestão de Projetos",
    },
    {
      slug: "projeto-de-arquitetura",
      title: "Projeto de Arquiteturas",
    },
    {
      slug: "consultoria-de-interiores",
      title: "Consultoria de Interiores",
    },
    {
      slug: "loja-estabelecimento",
      title: "Criação e Transformação de Espaços Comerciais",
    },
    {
      slug: "acompanhamento-fiscalizacao",
      title: "Acompanhamento e Fiscalização de Obras",
    },
  ],
];

export const DEFAULT_SITE = {
  name: "Projeto Nexo",
  legalName: "Projeto Nexo — Gestão de Obras e Projetos",
  tagline: "Remodelação, construção e reabilitação de imóveis",
  seoDescription:
    "Remodelação, construção e reabilitação de imóveis. Sediados em Lisboa e Área Metropolitana, com atendimento em todo o território nacional.",
  whatsappE164: "351934900070",
  whatsappDisplay: "+351 934 900 070",
  phoneDisplay: "+351 214 062 942",
  phoneTel: "+351214062942",
  contactEmail: "contacto@projetonexo.pt",
  nexoServicesUrl: "https://nexoservices.vercel.app",
  nexoServicesLabel: "Reparações",
  whatsappCta: "Falar por WhatsApp",
  whatsappIntro: "Olá! Vi o site da Projeto Nexo e quero saber mais sobre",
  nav: DEFAULT_NAV.map((item) => ({ ...item })),
  heroHeading: "Gestão de Obras:",
  heroHeadingHighlight: "Com Rigor de Projeto",
  heroLede:
    "Remodelação, construção e reabilitação de imóveis. Sede em Lisboa e Área Metropolitana, com obras em todo o território nacional.",
  heroSecondaryCta: "Ver a obra",
  heroSecondaryHref: "#galeria",
  heroSlides: [
    {
      src: "/hero/interior.jpg",
      alt: "Sala contemporânea com luz natural, madeira e zona de estar",
      label: "Interior · estar e circulação",
    },
    {
      src: "/hero/cozinha.jpg",
      alt: "Cozinha contemporânea com bancada em pedra e carpintaria",
      label: "Cozinha · bancada e carpintaria",
    },
    {
      src: "/hero/moradia.jpg",
      alt: "Moradia com jardim e vãos amplos",
      label: "Moradia · volume e vãos",
    },
    {
      src: "/hero/escritorio.jpg",
      alt: "Escritório contemporâneo com zona de trabalho e circulação",
      label: "Escritório · espaço comercial",
    },
  ],
  methodHeading: "Do primeiro contacto à entrega da obra.",
  methodImage: {
    src: "/metodo/vivenda.jpg",
    alt: "Moradia contemporânea com piscina e terraço, sob céu azul",
  },
  methodSteps: [
    {
      title: "Contacto",
      body: "Um interlocutor. WhatsApp, telefone ou o formulário — o pedido chega a quem acompanha a obra.",
    },
    {
      title: "Plano e orçamento",
      body: "Âmbito e valor explicados antes de começar. Só se avança com o seu acordo.",
    },
    {
      title: "Obra e entrega",
      body: "Acompanhamento até à chave na mão, com garantia conforme a intervenção.",
    },
  ],
  coverageHeading: "Sediados em Lisboa,",
  coverageHighlight: "Lisboa",
  coverageSubheading:
    "Execução e gestão de projetos em todo o território nacional",
  coverageSubheadingHighlight: "Execução e gestão de projetos",
  coverageBody:
    "A nossa estrutura central permite-nos coordenar projetos complexos de construção, remodelação e reabilitação com o mesmo rigor, seja na capital, no norte ou no sul do país. Pautamo-nos pela excelência na gestão de recursos e pela proximidade com o cliente, assegurando soluções de engenharia e arquitetura perfeitamente adaptadas ao local da obra.",
  coverageRegions: [
    { label: "Lisboa" },
    { label: "Área Metropolitana" },
    { label: "Território nacional" },
  ],
  coverageMapLabel: "Lisboa — área de base",
  coverageMapsCta: "Abrir no Maps",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Lisboa%2C%20Portugal&hl=pt-PT&z=11&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Lisboa%2C%20Portugal",
  faqHeading: "Condições claras, por escrito.",
  faqHeadingHighlight: "por escrito",
  faqIntro:
    "Resumo no site: garantia de 2 a 7 anos. Abaixo, a política completa — sem cláusulas escondidas e sem prazos inventados.",
  faqPolicyHeading: "Política de garantias",
  faqPolicyItems: [
    {
      text: "Remodelações, obras, instalações e substituições: garantias entre 2, 3, 5 e 7 anos, variando conforme as características da intervenção e as normas técnicas em vigor.",
    },
    {
      text: "Instalações com materiais fornecidos pelo próprio cliente: 6 meses de garantia sobre o serviço de instalação. O material segue a garantia do fabricante ou fornecedor.",
    },
  ],
  faqs: [
    {
      question: "Qual é a garantia das remodelações e obras?",
      answer:
        "Remodelações, obras, instalações e substituições têm garantia entre 2, 3, 5 e 7 anos. O prazo concreto varia conforme as características da intervenção e as normas técnicas em vigor.",
    },
    {
      question: "E se o material for fornecido pelo cliente?",
      answer:
        "Nas instalações com materiais fornecidos pelo próprio cliente, a garantia da Projeto Nexo sobre o serviço de instalação é de 6 meses. O material em si segue a garantia do fabricante ou fornecedor, não da Projeto Nexo.",
    },
    {
      question: "A empresa só trabalha em Lisboa?",
      answer:
        "A sede e a base operacional estão em Lisboa e Área Metropolitana. Atendemos também em todo o território nacional.",
    },
    {
      question: "Como peço um orçamento?",
      answer:
        "O caminho mais direto é o WhatsApp, com o serviço já identificado. Também pode usar o formulário de contacto ou o telefone fixo.",
    },
    {
      question: "As reparações são feitas pela Projeto Nexo?",
      answer:
        "Reparações e serviços especializados são encaminhados para a Nexo Services, para não misturar a obra de fundo com a manutenção pontual.",
    },
  ],
  faqWhatsappCta: "Esclarecer no WhatsApp",
  footerIntro:
    "Gestão de obras e projetos. Remodelação, construção e reabilitação de imóveis.",
  footerGuarantees:
    "Remodelações, obras, instalações e substituições: 2, 3, 5 ou 7 anos, conforme a intervenção e as normas técnicas em vigor.",
  footerGuaranteesCta: "Ver política de garantias",
  footerNexoLabel: "Reparações pela Nexo Services",
  locationLine: "Lisboa · Área Metropolitana",
  footerContactsHeading: "Contactos",
  footerContactRequestLabel: "Pedido de contacto",
  footerWhatsappPrefix: "WhatsApp",
  footerPhonePrefix: "Telefone",
  footerEmailPrefix: "E-mail",
  footerBlogLabel: "Blog",
  footerServicesHeading: "Serviços",
  footerRepairsLabel: "Reparações",
  footerGuaranteesHeading: "Garantias",
  footerCopyright: "Todos os direitos reservados.",
  blogHeading: "Notas de obra",
  blogHeadingHighlight: "obra",
  blogIntro:
    "Notas sobre processo, remodelação e reabilitação. Sem artigos inventados — o que estiver aqui foi publicado.",
  blogAllCta: "Ver todas as notas",
  blogReadCta: "Ler artigo",
  blogEmptyTitle: "Em breve",
  blogEmptyBody:
    "O primeiro artigo aparece aqui quando for escrito. Até lá, este espaço permanece vazio de propósito.",
  blogEmptyAside:
    "Enquanto isso, o pedido de contacto chega a quem acompanha a obra.",
  blogEmptyCta: "Pedir contacto",
  blogPageIntro:
    "Notas sobre processo, remodelação e reabilitação. Enquanto não houver artigos publicados, esta listagem permanece vazia.",
  blogPageEmptyTitle: "Ainda sem artigos",
  blogPageEmptyBody: "O primeiro artigo aparece aqui quando for publicado.",
  blogPageEmptyAside:
    "Para um pedido de obra, o formulário de contacto é o caminho directo.",
  termsHeading: "Termos de utilização",
  termsParagraphs: [
    {
      text: "Este site pertence à Projeto Nexo — Gestão de Obras e Projetos, com base em Lisboa, Portugal. Os conteúdos institucionais destinam-se a informar sobre serviços de remodelação, construção e reabilitação.",
    },
    {
      text: "Os pedidos enviados pelo formulário ou pelo WhatsApp são usados apenas para responder ao contacto. Não vendemos nem cedemos dados a terceiros.",
    },
    {
      text: "Parte das fotografias do site são imagens de banco, usadas como referência de ambiente. A colagem da troca de banheira por base de duche é uma obra real. Nenhuma fotografia de banco é apresentada como trabalho concluído da Projeto Nexo.",
    },
    {
      text: "A política de garantias está descrita na página",
      linkHref: "/faq",
      linkLabel: "Garantias e FAQ",
    },
    {
      text: "Reparações e serviços especializados são prestados através da",
      linkHref: "https://nexoservices.vercel.app",
      linkLabel: "Nexo Services",
    },
  ] as { text: string; linkHref?: string; linkLabel?: string }[],
};

export const DEFAULT_ABOUT = {
  heading: "Uma equipa que coordena tudo o que a obra exige.",
  headingHighlight: "coordena",
  paragraphs: [
    {
      text: "A Projeto Nexo assegura a gestão integral da obra: planeamento, execução, fiscalização e entrega. Cada intervenção é acompanhada por profissionais especializados na área respetiva. Antes de começar, apresentamos o orçamento explicado ao detalhe; no final, a obra é entregue com garantia de 2 a 7 anos, conforme a intervenção.",
    },
    {
      text: "Trabalhamos para clientes particulares, condomínios e espaços comerciais — do apartamento à moradia, da loja ao escritório.",
    },
  ],
  placeholders: [
    {
      label: "Equipa em obra",
      imageUrl: "/sobre/equipa-obra.jpg",
      alt: "Profissional de obra com capacete a trabalhar no estaleiro",
      shape: "wide" as const,
    },
    {
      label: "Acabamento",
      imageUrl: "/sobre/detalhe-material.jpg",
      alt: "Casa de banho contemporânea com banheira e base de duche",
      shape: "round" as const,
    },
    {
      label: "Interior acabado",
      imageUrl: "/sobre/interior-acabado.jpg",
      alt: "Sala contemporânea com luz natural e carpintaria",
      shape: "square" as const,
    },
  ],
};

export const DEFAULT_SERVICES_PAGE = {
  heading: "Do projeto à chave na mão.",
  intro:
    "Quatro especialidades que costumamos coordenar. As restantes estão no pedido de contacto. Cada cartão abre o WhatsApp já com o serviço identificado.",
  contactLinkLabel: "Ver todas as especialidades no pedido de contacto",
  cardCta: "Pedir orçamento no WhatsApp",
  nexoKicker: "Nexo Services",
  nexoHeading: "Reparações e serviços especializados",
  nexoBody:
    "Canalização, eletricidade, desentupimentos, esquentadores, estores e muito mais. Assistência técnica ao domicílio, num site próprio.",
  nexoCta: "Ir para Nexo Services",
  serviceWhatsappCta: "Pedir este serviço no WhatsApp",
};

type DefaultGalleryProject = {
  title: string;
  titleLines?: string[];
  caption: string;
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
  fit: "cover" | "contain";
  icon?: "shower";
  isRealWork?: boolean;
  panels?: { src: string; alt: string }[];
};

export const DEFAULT_GALLERY = {
  heading: "Obras e interiores.",
  intro:
    "A colagem da troca de banheira por base de duche é obra real da Projeto Nexo. As restantes imagens são referências de ambiente, para pensar remodelação e reabilitação.",
  environmentsHeading: "Ambientes",
  environmentsIntro:
    "Referências de interiores e edificado. Não são um portefólio de obras concluídas.",
  contactCta: "Pedir contacto",
  mosaicContact: {
    title: "Interiores",
    body: "Referências de ambiente para pensar a remodelação e a reabilitação.",
    cta: "Pedir contacto",
    href: "/#contacto",
  },
  mosaicWork: {
    title: "Obra real",
    cta: "Ver o processo",
    href: "/galeria",
    fallbackTitle: "Obra e entrega",
    fallbackBody:
      "Um interlocutor, um plano legível e acompanhamento até à chave na mão.",
    fallbackCta: "Ver a galeria",
  },
  projects: [
    {
      title: "Casa de banho contemporânea",
      caption:
        "Referência de remodelação: base de duche, bancada e iluminação pensadas para o uso diário.",
      imageUrl: "/galeria/casa-de-banho.jpg",
      alt: "Casa de banho contemporânea com base de duche em vidro e bancada",
      width: 1600,
      height: 1066,
      fit: "cover" as const,
    },
    {
      title: "Troca de banheira por base de duche",
      titleLines: ["Troca de banheira", "por base de duche"],
      caption: "Obra real. Seis etapas, da demolição à instalação do chuveiro.",
      imageUrl: "/galeria/wc-base-de-duche.jpg",
      alt: "Seis etapas reais da troca de uma banheira por base de duche: demolição, preparação do chão, impermeabilização, colocação da base, instalação da cabine e do chuveiro.",
      width: 1600,
      height: 1066,
      fit: "contain" as const,
      icon: "shower" as const,
      isRealWork: true,
      panels: [
        {
          src: "/galeria/wc-passos/01-retirada.jpg",
          alt: "Retirada da banheira",
        },
        {
          src: "/galeria/wc-passos/02-preparacao.jpg",
          alt: "Preparação do chão",
        },
        {
          src: "/galeria/wc-passos/03-impermeabilizacao.jpg",
          alt: "Impermeabilização",
        },
        {
          src: "/galeria/wc-passos/04-base.jpg",
          alt: "Colocação da base de duche",
        },
        {
          src: "/galeria/wc-passos/05-cabine.jpg",
          alt: "Instalação da cabine",
        },
        {
          src: "/galeria/wc-passos/06-chuveiro.jpg",
          alt: "Instalação do chuveiro",
        },
      ],
    },
    {
      title: "Cozinha",
      caption:
        "Referência de ambiente: bancada, fogão e arrumação alinhados com o dia-a-dia.",
      imageUrl: "/galeria/cozinha.jpg",
      alt: "Cozinha contemporânea com ilha, fogão e bancada em pedra",
      width: 1600,
      height: 1066,
      fit: "cover" as const,
    },
    {
      title: "Apartamento",
      caption:
        "Estar, cozinha e circulação no mesmo plano — referência para remodelação integral.",
      imageUrl: "/galeria/apartamento.jpg",
      alt: "Apartamento contemporâneo com sala, cozinha aberta e vãos para o exterior",
      width: 1600,
      height: 1066,
      fit: "cover" as const,
    },
    {
      title: "Moradia",
      caption:
        "Volume, vãos e relação com o jardim. Referência para obras em moradia.",
      imageUrl: "/galeria/moradia-interior.jpg",
      alt: "Moradia contemporânea com madeira, grandes vãos e jardim",
      width: 1600,
      height: 1066,
      fit: "cover" as const,
    },
    {
      title: "Reabilitação",
      caption:
        "Referência de edifício existente: vãos, caixilharia e estores de enrolar.",
      imageUrl: "/galeria/reabilitacao.jpg",
      alt: "Fachada de edifício de habitação com vãos e estores de enrolar",
      width: 1600,
      height: 1066,
      fit: "cover" as const,
    },
  ] as DefaultGalleryProject[],
};

export const DEFAULT_CONTACT = {
  heading: "Diga-nos o que precisa na obra.",
  body: "Um responsável responde em horário de trabalho. O orçamento é explicado antes de qualquer obra começar.",
  otherServiceOption: "Outro / ainda não sei",
  submitLabel: "Enviar pedido",
  submittingLabel: "A enviar…",
  successMessage:
    "Pedido recebido. Um responsável responde em horário de trabalho. O orçamento é explicado antes de qualquer obra.",
  consent: "Ao enviar, autoriza o contacto da Projeto Nexo sobre este pedido.",
  nameLabel: "Nome",
  phoneLabel: "Telefone",
  phoneHint: "Com indicativo, por exemplo +351 934 900 070.",
  emailLabel: "E-mail",
  emailHint: "Serve para respondermos por escrito.",
  serviceLabel: "Tipo de serviço",
  messageLabel: "Mensagem",
  namePlaceholder: "O seu nome",
  phonePlaceholder: "O seu telefone",
  emailPlaceholder: "nome@email.pt",
  servicePlaceholder: "Selecione…",
  messagePlaceholder: "Imóvel, âmbito da obra e prazo pretendido.",
};
