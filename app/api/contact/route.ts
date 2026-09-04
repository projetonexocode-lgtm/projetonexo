import { NextResponse } from "next/server";
import { clipForWhatsApp, validateContactFields } from "@/lib/contact";
import { buildWhatsAppUrlFromMessage, SITE } from "@/lib/site";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  need?: unknown;
  website?: unknown;
};

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function whatsappPayload(text: string, service: string) {
  return {
    ok: true as const,
    channel: "whatsapp" as const,
    url: buildWhatsAppUrlFromMessage(
      clipForWhatsApp(
        `Olá! Vi o site da ${SITE.name} e quero saber mais sobre ${service.toLowerCase()}.\n\n${text}`,
      ),
    ),
  };
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Pedido inválido. Recarregue a página e tente de novo." },
      { status: 400 },
    );
  }

  if (asNonEmptyString(payload.website)) {
    return NextResponse.json({ ok: true, channel: "email" });
  }

  const need = asNonEmptyString(payload.need);
  const parsed = validateContactFields({
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    service: payload.service ?? (need ? "Assistência técnica urgente" : ""),
    message: payload.message ?? need ?? "",
  });

  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, error: parsed.error, fields: parsed.fields },
      { status: 400 },
    );
  }

  const { name, phone, email, service, message } = parsed.value;

  const text = [
    `${name} pediu contacto através do site.`,
    `Serviço: ${service}`,
    `Telefone: ${phone}`,
    email ? `E-mail: ${email}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  if (resendKey && toEmail) {
    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(8_000),
        body: JSON.stringify({
          from:
            process.env.CONTACT_FROM_EMAIL ||
            "Projeto Nexo <noreply@projetonexo.pt>",
          to: [toEmail],
          ...(email ? { reply_to: email } : {}),
          subject: `Novo contacto — ${service}`,
          text,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error(`Resend status ${emailResponse.status}`);
      }

      return NextResponse.json({ ok: true, channel: "email" });
    } catch (error) {
      console.error("Email delivery failed", error);
      return NextResponse.json(whatsappPayload(text, service));
    }
  }

  return NextResponse.json(whatsappPayload(text, service));
}
