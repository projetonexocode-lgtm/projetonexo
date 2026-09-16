import type { GlobalConfig } from "payload";
import { DEFAULT_ABOUT } from "@/lib/cms/defaults";
import { mediaImageFields } from "./fields";

export const About: GlobalConfig = {
  slug: "about",
  label: "Sobre",
  admin: {
    group: "Secções do site",
    description:
      "Página /sobre: textos e fotografias. Carregar imagens em Media.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "heroEyebrow",
              type: "text",
              label: "Linha pequena (acima do título)",
              defaultValue: DEFAULT_ABOUT.heroEyebrow,
            },
            {
              name: "heading",
              type: "text",
              label: "Título",
              required: true,
            },
            {
              name: "headingHighlight",
              type: "text",
              label: "Palavra em destaque no título",
            },
            {
              name: "heroLead",
              type: "textarea",
              label: "Texto de apoio",
              defaultValue: DEFAULT_ABOUT.heroLead,
            },
            ...mediaImageFields({
              uploadName: "heroImage",
              urlName: "heroImageUrl",
              altName: "heroImageAlt",
              uploadLabel: "Imagem de fundo",
              altLabel: "Texto alternativo da imagem de fundo",
            }),
          ],
        },
        {
          label: "História",
          fields: [
            {
              name: "storyTitle",
              type: "text",
              label: "Título da história",
              defaultValue: DEFAULT_ABOUT.storyTitle,
            },
            {
              name: "paragraphs",
              type: "array",
              label: "Parágrafos",
              labels: { singular: "Parágrafo", plural: "Parágrafos" },
              minRows: 1,
              fields: [
                {
                  name: "text",
                  type: "textarea",
                  label: "Texto",
                  required: true,
                },
              ],
            },
            {
              name: "placeholders",
              type: "array",
              label: "Fotografias",
              labels: { singular: "Fotografia", plural: "Fotografias" },
              admin: {
                description:
                  "Grelha ao lado da história. Preferir Media; o URL só serve se a imagem estiver vazia.",
              },
              fields: [
                {
                  name: "label",
                  type: "text",
                  label: "Rótulo",
                  required: true,
                },
                ...mediaImageFields({
                  uploadName: "image",
                  urlName: "imageUrl",
                  altName: "alt",
                  uploadLabel: "Imagem",
                }),
                {
                  name: "shape",
                  type: "select",
                  label: "Formato",
                  defaultValue: "wide",
                  options: [
                    { label: "Largo", value: "wide" },
                    { label: "Redondo", value: "round" },
                    { label: "Quadrado", value: "square" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Missão",
          fields: [
            {
              name: "missionTitle",
              type: "text",
              label: "Título",
              defaultValue: DEFAULT_ABOUT.missionTitle,
            },
            {
              name: "missionBody",
              type: "textarea",
              label: "Texto",
              defaultValue: DEFAULT_ABOUT.missionBody,
            },
          ],
        },
        {
          label: "Vertentes",
          fields: [
            {
              name: "valuesEyebrow",
              type: "text",
              label: "Linha pequena",
              defaultValue: DEFAULT_ABOUT.valuesEyebrow,
            },
            {
              name: "valuesTitle",
              type: "text",
              label: "Título",
              defaultValue: DEFAULT_ABOUT.valuesTitle,
            },
            {
              name: "valuesIntro",
              type: "textarea",
              label: "Introdução",
              defaultValue: DEFAULT_ABOUT.valuesIntro,
            },
            {
              name: "values",
              type: "array",
              label: "Vertentes",
              labels: { singular: "Vertente", plural: "Vertentes" },
              fields: [
                { name: "title", type: "text", label: "Título", required: true },
                { name: "body", type: "textarea", label: "Texto", required: true },
                { name: "href", type: "text", label: "Ligação" },
                { name: "linkLabel", type: "text", label: "Texto da ligação" },
              ],
            },
          ],
        },
        {
          label: "Processo",
          fields: [
            {
              name: "processTitle",
              type: "text",
              label: "Título",
              defaultValue: DEFAULT_ABOUT.processTitle,
            },
            {
              name: "processIntro",
              type: "textarea",
              label: "Introdução",
              defaultValue: DEFAULT_ABOUT.processIntro,
            },
            {
              name: "processSteps",
              type: "array",
              label: "Passos",
              labels: { singular: "Passo", plural: "Passos" },
              fields: [
                { name: "title", type: "text", label: "Título", required: true },
                { name: "body", type: "textarea", label: "Texto", required: true },
              ],
            },
          ],
        },
        {
          label: "Públicos",
          fields: [
            {
              name: "audiencesTitle",
              type: "text",
              label: "Título",
              defaultValue: DEFAULT_ABOUT.audiencesTitle,
            },
            {
              name: "audiencesIntro",
              type: "textarea",
              label: "Introdução",
              defaultValue: DEFAULT_ABOUT.audiencesIntro,
            },
            {
              name: "audiences",
              type: "array",
              label: "Públicos",
              labels: { singular: "Público", plural: "Públicos" },
              fields: [
                { name: "title", type: "text", label: "Título", required: true },
                { name: "body", type: "textarea", label: "Texto", required: true },
              ],
            },
          ],
        },
        {
          label: "CTA",
          fields: [
            {
              name: "ctaTitle",
              type: "text",
              label: "Título",
              defaultValue: DEFAULT_ABOUT.ctaTitle,
            },
            {
              name: "ctaBody",
              type: "textarea",
              label: "Texto",
              defaultValue: DEFAULT_ABOUT.ctaBody,
            },
            {
              name: "ctaLabel",
              type: "text",
              label: "Texto do botão principal",
              defaultValue: DEFAULT_ABOUT.ctaLabel,
            },
            {
              name: "ctaHref",
              type: "text",
              label: "Ligação do botão principal",
              defaultValue: DEFAULT_ABOUT.ctaHref,
            },
            {
              name: "ctaWhatsappLabel",
              type: "text",
              label: "Texto do botão WhatsApp",
              defaultValue: DEFAULT_ABOUT.ctaWhatsappLabel,
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "seoTitle",
              type: "text",
              label: "SEO — título",
              defaultValue: DEFAULT_ABOUT.seoTitle,
            },
            {
              name: "seoDescription",
              type: "textarea",
              label: "SEO — descrição",
              defaultValue: DEFAULT_ABOUT.seoDescription,
            },
          ],
        },
      ],
    },
  ],
};
