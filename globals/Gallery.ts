import type { GlobalConfig } from "payload";
import { DEFAULT_GALLERY } from "@/lib/cms/defaults";
import { mediaImageFields } from "./fields";

export const Gallery: GlobalConfig = {
  slug: "gallery",
  label: "Galeria",
  admin: {
    group: "Secções do site",
    description:
      "Textos e fotografias da galeria na homepage e em /galeria. Carregar imagens em Media.",
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
      defaultValue: "Obras e interiores.",
    },
    {
      name: "intro",
      type: "textarea",
      label: "Introdução da página /galeria",
      defaultValue: DEFAULT_GALLERY.intro,
    },
    {
      name: "environmentsHeading",
      type: "text",
      label: "Título dos ambientes",
      defaultValue: DEFAULT_GALLERY.environmentsHeading,
    },
    {
      name: "environmentsIntro",
      type: "textarea",
      label: "Introdução dos ambientes",
      defaultValue: DEFAULT_GALLERY.environmentsIntro,
    },
    {
      name: "contactCta",
      type: "text",
      label: "Botão de contacto na página",
      defaultValue: DEFAULT_GALLERY.contactCta,
    },
    {
      type: "group",
      name: "mosaicContact",
      label: "Cartão Interiores (homepage)",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Título",
          defaultValue: DEFAULT_GALLERY.mosaicContact.title,
        },
        {
          name: "body",
          type: "textarea",
          label: "Texto",
          defaultValue: DEFAULT_GALLERY.mosaicContact.body,
        },
        {
          name: "cta",
          type: "text",
          label: "Botão",
          defaultValue: DEFAULT_GALLERY.mosaicContact.cta,
        },
        {
          name: "href",
          type: "text",
          label: "Ligação",
          defaultValue: DEFAULT_GALLERY.mosaicContact.href,
        },
      ],
    },
    {
      type: "group",
      name: "mosaicWork",
      label: "Cartão Obra real (homepage)",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Título",
          defaultValue: DEFAULT_GALLERY.mosaicWork.title,
        },
        {
          name: "cta",
          type: "text",
          label: "Botão",
          defaultValue: DEFAULT_GALLERY.mosaicWork.cta,
        },
        {
          name: "href",
          type: "text",
          label: "Ligação",
          defaultValue: DEFAULT_GALLERY.mosaicWork.href,
        },
        {
          name: "fallbackTitle",
          type: "text",
          label: "Título se não houver obra real",
          defaultValue: DEFAULT_GALLERY.mosaicWork.fallbackTitle,
        },
        {
          name: "fallbackBody",
          type: "textarea",
          label: "Texto se não houver obra real",
          defaultValue: DEFAULT_GALLERY.mosaicWork.fallbackBody,
        },
        {
          name: "fallbackCta",
          type: "text",
          label: "Botão se não houver obra real",
          defaultValue: DEFAULT_GALLERY.mosaicWork.fallbackCta,
        },
      ],
    },
    {
      name: "projects",
      type: "array",
      label: "Fotografias e obras",
      minRows: 1,
      labels: {
        singular: "Item",
        plural: "Itens",
      },
      fields: [
        {
          name: "title",
          type: "text",
          label: "Título",
          required: true,
        },
        {
          name: "titleLines",
          type: "array",
          label: "Linhas do título (opcional)",
          fields: [{ name: "line", type: "text", label: "Linha", required: true }],
        },
        {
          name: "caption",
          type: "textarea",
          label: "Legenda",
          required: true,
        },
        {
          name: "isRealWork",
          type: "checkbox",
          label: "Obra real",
          defaultValue: false,
        },
        ...mediaImageFields({
          uploadName: "image",
          urlName: "imageUrl",
        }),
        {
          name: "alt",
          type: "text",
          label: "Texto alternativo",
          required: true,
        },
        {
          name: "width",
          type: "number",
          label: "Largura",
          defaultValue: 1600,
        },
        {
          name: "height",
          type: "number",
          label: "Altura",
          defaultValue: 1066,
        },
        {
          name: "fit",
          type: "select",
          label: "Enquadramento",
          defaultValue: "cover",
          options: [
            { label: "Preencher", value: "cover" },
            { label: "Contém (colagem)", value: "contain" },
          ],
        },
        {
          name: "panels",
          type: "array",
          label: "Passos da obra",
          admin: {
            description: "Só para obra real. Cada passo é uma fotografia.",
          },
          fields: [
            ...mediaImageFields({
              uploadName: "image",
              urlName: "src",
              urlLabel: "URL da imagem (se não carregar Media)",
            }),
            {
              name: "alt",
              type: "text",
              label: "Texto alternativo",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
