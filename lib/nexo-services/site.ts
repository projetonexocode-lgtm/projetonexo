export const BASE_PATH = "/reparacoes";

export const SITE = {
  name: "Nexo Services",
  legalName: "Nexo Services — Reparações e Serviços Especializados",
  tagline: "Reparações e serviços especializados ao domicílio",
  url: "https://nexoservices.pt",
  locale: "pt_PT",
  language: "pt-PT",
  city: "Lisboa",
  region: "Lisboa e Área Metropolitana",
  country: "Portugal",
  whatsappE164: "351934900070",
  whatsappDisplay: "+351 934 900 070",
  phoneDisplay: "+351 214 062 942",
  phoneTel: "+351214062942",
  projetoNexoUrl: "/",
} as const;

export const URGENT_WHATSAPP_MESSAGE =
  "Olá! Preciso de assistência técnica urgente.";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE.whatsappE164}?text=${encodeURIComponent(message)}`;
}

export const NAV_ITEMS = [
  { href: `${BASE_PATH}#servicos`, label: "Serviços" },
  { href: `${BASE_PATH}#como-funciona`, label: "Como funciona" },
  { href: `${BASE_PATH}#cobertura`, label: "Área" },
  { href: `${BASE_PATH}#faq`, label: "FAQ" },
  { href: `${BASE_PATH}#contacto`, label: "Contacto" },
] as const;
