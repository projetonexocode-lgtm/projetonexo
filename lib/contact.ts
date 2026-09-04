export const CONTACT_LIMITS = {
  name: 120,
  phone: 40,
  email: 120,
  service: 160,
  message: 4000,
} as const;

export const CONTACT_SUBMIT_TIMEOUT_MS = 15_000;
export const WHATSAPP_TEXT_MAX = 1_400;

export function clipForWhatsApp(text: string): string {
  if (text.length <= WHATSAPP_TEXT_MAX) return text;
  return `${text.slice(0, WHATSAPP_TEXT_MAX).trimEnd()}\n\n[Pedido cortado para caber no WhatsApp.]`;
}

export type ContactFieldKey = "name" | "phone" | "email" | "service" | "message";

export type ContactValue = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export type ContactValidation =
  | { ok: true; value: ContactValue }
  | {
      ok: false;
      error: string;
      fields: Partial<Record<ContactFieldKey, string>>;
    };

function asTrimmed(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function phoneDigitCount(phone: string): number {
  return phone.replace(/\D/g, "").length;
}

export function validateContactFields(input: {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
}): ContactValidation {
  const name = asTrimmed(input.name);
  const phone = asTrimmed(input.phone);
  const email = asTrimmed(input.email);
  const service = asTrimmed(input.service);
  const message = asTrimmed(input.message);
  const fields: Partial<Record<ContactFieldKey, string>> = {};

  if (!name) fields.name = "Indique o seu nome.";
  else if (name.length > CONTACT_LIMITS.name) {
    fields.name = `O nome pode ter no máximo ${CONTACT_LIMITS.name} caracteres.`;
  }

  const digits = phoneDigitCount(phone);
  if (!phone) fields.phone = "Indique um telefone para retorno.";
  else if (digits < 9 || digits > 15) {
    fields.phone = "Use um telefone com 9 a 15 dígitos.";
  }

  if (email) {
    if (email.length > CONTACT_LIMITS.email) {
      fields.email = `O e-mail pode ter no máximo ${CONTACT_LIMITS.email} caracteres.`;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fields.email = "Use um e-mail válido, por exemplo nome@email.pt.";
    }
  }

  if (!service) fields.service = "Escolha o tipo de serviço.";
  else if (service.length > CONTACT_LIMITS.service) {
    fields.service = "O tipo de serviço é demasiado longo.";
  }

  if (!message) fields.message = "Descreva o imóvel, o âmbito e o prazo.";
  else if (message.length > CONTACT_LIMITS.message) {
    fields.message = `A mensagem pode ter no máximo ${CONTACT_LIMITS.message} caracteres.`;
  }

  if (Object.keys(fields).length > 0) {
    return {
      ok: false,
      error: "Corrija os campos assinalados e envie de novo.",
      fields,
    };
  }

  return { ok: true, value: { name, phone, email, service, message } };
}
