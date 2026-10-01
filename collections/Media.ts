import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Ficheiro",
    plural: "Media",
  },
  admin: {
    group: "Sistema",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Texto alternativo",
      required: true,
    },
  ],
  upload: {
    // Vercel has a read-only filesystem; local disk uploads only work in development.
    disableLocalStorage: Boolean(process.env.VERCEL),
  },
};
