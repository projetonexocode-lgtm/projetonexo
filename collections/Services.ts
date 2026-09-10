import type { CollectionConfig } from "payload";
import { mediaImageFields } from "../globals/fields";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Serviço",
    plural: "Catálogo de serviços",
  },
  admin: {
    useAsTitle: "title",
    group: "Serviços",
    defaultColumns: ["title", "featured", "inContactForm"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Título",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        description: "Usado no URL e na identificação interna.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Descrição",
      required: true,
    },
    {
      name: "whatsappLabel",
      type: "text",
      label: "Serviço no WhatsApp",
      required: true,
      admin: {
        description:
          "Texto que entra na mensagem pronta do WhatsApp, por exemplo «remodelação de cozinha».",
      },
    },
    {
      name: "contactLabel",
      type: "text",
      label: "Opção no formulário",
      admin: {
        description:
          "Se vazio, usa o título. Aparece no select de Contacto quando «No formulário» está activo.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Em destaque na homepage",
      defaultValue: false,
    },
    {
      name: "inContactForm",
      type: "checkbox",
      label: "No formulário de contacto",
      defaultValue: true,
    },
    {
      name: "inFooter",
      type: "checkbox",
      label: "No rodapé",
      defaultValue: false,
    },
    ...mediaImageFields({
      uploadName: "image",
      urlName: "imageUrl",
      altName: "imageAlt",
      uploadLabel: "Fotografia",
      altLabel: "Texto alternativo da fotografia",
    }),
  ],
};
