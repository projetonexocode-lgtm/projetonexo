import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Utilizador",
    plural: "Utilizadores",
  },
  admin: {
    useAsTitle: "email",
    group: "Sistema",
  },
  auth: true,
  fields: [],
};
