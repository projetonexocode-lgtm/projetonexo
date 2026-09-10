import { DEFAULT_SITE } from "@/lib/cms/defaults";

export const SITE = {
  name: DEFAULT_SITE.name,
  legalName: DEFAULT_SITE.legalName,
  tagline: DEFAULT_SITE.tagline,
  url: "https://projetonexo.pt",
  locale: "pt_PT",
  language: "pt-PT",
  city: "Lisboa",
  region: "Lisboa e Área Metropolitana",
  country: "Portugal",
  whatsappE164: DEFAULT_SITE.whatsappE164,
  whatsappDisplay: DEFAULT_SITE.whatsappDisplay,
  phoneDisplay: DEFAULT_SITE.phoneDisplay,
  phoneTel: DEFAULT_SITE.phoneTel,
  contactEmail: DEFAULT_SITE.contactEmail,
  nexoServicesUrl: DEFAULT_SITE.nexoServicesUrl,
  mapsQuery: "Lisboa, Portugal",
  mapsEmbedUrl: DEFAULT_SITE.mapsEmbedUrl,
  mapsLink: DEFAULT_SITE.mapsLink,
} as const;

export const WHATSAPP_INTRO = DEFAULT_SITE.whatsappIntro;

export function buildWhatsAppUrl(
  serviceLabel: string,
  intro: string = WHATSAPP_INTRO,
  e164: string = SITE.whatsappE164,
): string {
  const text = `${intro} ${serviceLabel}`;
  return `https://wa.me/${e164}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppUrlFromMessage(
  message: string,
  e164: string = SITE.whatsappE164,
): string {
  return `https://wa.me/${e164}?text=${encodeURIComponent(message)}`;
}
