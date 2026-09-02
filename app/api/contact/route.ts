import { NextResponse } from "next/server";
import { buildWhatsAppUrlFromMessage, SITE } from "@/lib/site";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
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

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Pedido inválido." },
      { status: 400 },
    );
  }

  if (asNonEmptyString(payload.website)) {
    return NextResponse.json({ ok: true, channel: "email" });
  }

  const name = asNonEmptyString(payload.name);
  const phone = asNonEmptyString(payload.phone);
  const need = asNonEmptyString(payload.need);
  const service =
    asNonEmptyString(payload.service) ??
    (need ? "Assistência técnica urgente" : null);
  const message = asNonEmptyString(payload.message) ?? need;

  if (!name || !phone || !service || !message) {
    return NextResponse.json(
      { ok: false, error: "Preencha nome, telefone e o pedido." },
      { status: 400 },
    );
  }

  const text = [
    `${name} pediu contacto através do site.`,
    `Serviço: ${service}`,
    `Telefone: ${phone}`,
    "",
    message,
  ].join("\n");

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
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "Projeto Nexo <noreply@projetonexo.pt>",
          to: [toEmail],
          subject: `Novo contacto — ${service}`,
          text: `Nome: ${name}\nTelefone: ${phone}\nServiço: ${service}\n\n${message}`,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error(`Resend status ${emailResponse.status}`);
      }

      return NextResponse.json({ ok: true, channel: "email" });
    } catch (error) {
      console.error("Email delivery failed", error);
      return NextResponse.json({
        ok: true,
        channel: "whatsapp",
        url: buildWhatsAppUrlFromMessage(
          `Olá! Vi o site da ${SITE.name} e quero saber mais sobre ${service.toLowerCase()}.\n\n${text}`,
        ),
      });
    }
  }

  return NextResponse.json({
    ok: true,
    channel: "whatsapp",
    url: buildWhatsAppUrlFromMessage(
      `Olá! Vi o site da ${SITE.name} e quero saber mais sobre ${service.toLowerCase()}.\n\nNome: ${name}\nTelefone: ${phone}\nMensagem: ${message}`,
    ),
  });
}
