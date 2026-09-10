import type { GlobalConfig } from "payload";
import { DEFAULT_SERVICES_PAGE } from "@/lib/cms/defaults";

export const ServicesPage: GlobalConfig = {
  slug: "servicesPage",
  label: "Serviços",
  admin: {
    group: "Secções do site",
    description:
      "Textos da secção Serviços. Os cartões em destaque vêm do catálogo, com «Em destaque na homepage».",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Título",
      required: true,
    },
    {
      name: "intro",
      type: "textarea",
      label: "Introdução",
      required: true,
    },
    {
      name: "contactLinkLabel",
      type: "text",
      label: "Ligação para o contacto",
      required: true,
    },
    {
      name: "cardCta",
      type: "text",
      label: "Acção nos cartões",
      required: true,
    },
    {
      name: "nexoKicker",
      type: "text",
      label: "Rótulo Nexo Services",
      required: true,
    },
    {
      name: "nexoHeading",
      type: "text",
      label: "Título Nexo Services",
      required: true,
    },
    {
      name: "nexoBody",
      type: "textarea",
      label: "Texto Nexo Services",
      required: true,
    },
    {
      name: "nexoCta",
      type: "text",
      label: "Botão Nexo Services",
      required: true,
    },
    {
      name: "serviceWhatsappCta",
      type: "text",
      label: "Botão WhatsApp na página do serviço",
      defaultValue: DEFAULT_SERVICES_PAGE.serviceWhatsappCta,
    },
  ],
};
