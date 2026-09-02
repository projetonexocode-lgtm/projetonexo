import { defineType, defineField } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Artigo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Capa",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Obras", value: "Obras" },
          { title: "Remodelações", value: "Remodelações" },
          { title: "Reabilitação", value: "Reabilitação" },
          { title: "Arquitetura", value: "Arquitetura" },
          { title: "Processo", value: "Processo" },
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Corpo",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "cover",
    },
  },
});
