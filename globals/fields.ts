import type { Field } from "payload";

export function mediaImageFields(options: {
  uploadName: string;
  urlName: string;
  altName?: string;
  uploadLabel?: string;
  urlLabel?: string;
  altLabel?: string;
}): Field[] {
  const fields: Field[] = [
    {
      name: options.uploadName,
      type: "upload",
      relationTo: "media",
      label: options.uploadLabel ?? "Imagem",
    },
    {
      name: options.urlName,
      type: "text",
      label: options.urlLabel ?? "URL da imagem (se não carregar Media)",
      admin: {
        description:
          "Usado só se a imagem Media estiver vazia. Preferir o carregamento acima.",
      },
    },
  ];

  if (options.altName) {
    fields.push({
      name: options.altName,
      type: "text",
      label: options.altLabel ?? "Texto alternativo",
    });
  }

  return fields;
}
