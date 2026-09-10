import type { GlobalConfig } from "payload";

export const Contact: GlobalConfig = {
  slug: "contact",
  label: "Contacto",
  admin: {
    group: "Secções do site",
    description: "Textos da secção Contacto e do formulário.",
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
      name: "body",
      type: "textarea",
      label: "Introdução",
      required: true,
    },
    {
      name: "otherServiceOption",
      type: "text",
      label: "Opção extra no formulário",
      defaultValue: "Outro / ainda não sei",
    },
    {
      name: "submitLabel",
      type: "text",
      label: "Botão enviar",
      required: true,
    },
    {
      name: "submittingLabel",
      type: "text",
      label: "Botão a enviar",
      required: true,
    },
    {
      name: "successMessage",
      type: "textarea",
      label: "Mensagem de sucesso",
      required: true,
    },
    {
      name: "consent",
      type: "textarea",
      label: "Consentimento",
      required: true,
    },
    {
      name: "nameLabel",
      type: "text",
      label: "Rótulo nome",
      required: true,
    },
    {
      name: "phoneLabel",
      type: "text",
      label: "Rótulo telefone",
      required: true,
    },
    {
      name: "phoneHint",
      type: "text",
      label: "Ajuda telefone",
    },
    {
      name: "emailLabel",
      type: "text",
      label: "Rótulo e-mail",
      required: true,
    },
    {
      name: "emailHint",
      type: "text",
      label: "Ajuda e-mail",
    },
    {
      name: "serviceLabel",
      type: "text",
      label: "Rótulo tipo de serviço",
      required: true,
    },
    {
      name: "messageLabel",
      type: "text",
      label: "Rótulo mensagem",
      required: true,
    },
    {
      name: "namePlaceholder",
      type: "text",
      label: "Placeholder nome",
    },
    {
      name: "phonePlaceholder",
      type: "text",
      label: "Placeholder telefone",
    },
    {
      name: "emailPlaceholder",
      type: "text",
      label: "Placeholder e-mail",
    },
    {
      name: "servicePlaceholder",
      type: "text",
      label: "Placeholder serviço",
    },
    {
      name: "messagePlaceholder",
      type: "text",
      label: "Placeholder mensagem",
    },
  ],
};
