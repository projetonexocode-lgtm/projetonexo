export const SITE = {
  name: "Projeto Nexo",
  legalName: "Projeto Nexo — Gestão de Obras e Projetos",
  tagline: "Remodelação, construção e reabilitação de imóveis",
  url: "https://projetonexo.pt",
  locale: "pt_PT",
  language: "pt-PT",
  city: "Lisboa",
  region: "Lisboa e Área Metropolitana",
  country: "Portugal",
  whatsappE164: "351934900070",
  whatsappDisplay: "+351 934 900 070",
  phoneDisplay: "+351 214 062 942",
  phoneTel: "+351214062942",
  nexoServicesUrl: "/reparacoes",
  mapsQuery: "Lisboa, Portugal",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Lisboa%2C%20Portugal&hl=pt-PT&z=11&output=embed",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Lisboa%2C%20Portugal",
} as const;

export const WHATSAPP_INTRO =
  "Olá! Vi o site da Projeto Nexo e quero saber mais sobre";

export function buildWhatsAppUrl(serviceLabel: string): string {
  const text = `${WHATSAPP_INTRO} ${serviceLabel}`;
  return `https://wa.me/${SITE.whatsappE164}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppUrlFromMessage(message: string): string {
  return `https://wa.me/${SITE.whatsappE164}?text=${encodeURIComponent(message)}`;
}

export const NAV_ITEMS = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#galeria", label: "Galeria" },
  { href: "/#atuacao", label: "Área de atuação" },
  { href: "/#contacto", label: "Contacto" },
  { href: "/blog", label: "Blog" },
] as const;
