import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Artigo",
    plural: "Blog",
  },
  admin: {
    useAsTitle: "title",
    group: "Blog",
    defaultColumns: ["title", "category", "publishedAt"],
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
      index: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Resumo",
    },
    {
      name: "category",
      type: "select",
      label: "Categoria",
      options: [
        { label: "Obras", value: "Obras" },
        { label: "Remodelações", value: "Remodelações" },
        { label: "Reabilitação", value: "Reabilitação" },
        { label: "Arquitetura", value: "Arquitetura" },
        { label: "Processo", value: "Processo" },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Data de publicação",
      admin: {
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      label: "Capa",
    },
    {
      name: "body",
      type: "richText",
      label: "Corpo",
    },
  ],
};
