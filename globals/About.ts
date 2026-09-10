import type { GlobalConfig } from "payload";
import { mediaImageFields } from "./fields";

export const About: GlobalConfig = {
  slug: "about",
  label: "Sobre",
  admin: {
    group: "Secções do site",
    description:
      "Textos e fotografias da secção Sobre na homepage. Carregar imagens em Media.",
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
      name: "headingHighlight",
      type: "text",
      label: "Palavra em destaque no título",
    },
    {
      name: "paragraphs",
      type: "array",
      label: "Parágrafos",
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
      admin: {
        description:
          "Fotografias da secção Sobre. Podem ser de banco de imagens ou de obra.",
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
};
