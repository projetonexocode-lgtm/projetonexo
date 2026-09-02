"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CallButton } from "@/components/nexo-services/ui/CallButton";
import { WhatsAppButton } from "@/components/nexo-services/ui/WhatsAppButton";
import { SITE, URGENT_WHATSAPP_MESSAGE } from "@/lib/nexo-services/site";

type FormState = "idle" | "submitting" | "success" | "error";

export function FinalCta() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setState("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          need: data.get("need"),
          website: data.get("website"),
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        error?: string;
        channel?: "email" | "whatsapp";
        url?: string;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Não foi possível enviar o pedido.");
      }

      if (payload.channel === "whatsapp" && payload.url) {
        window.open(payload.url, "_blank", "noopener,noreferrer");
      }

      form.reset();
      setState("success");
    } catch (submitError) {
      console.error("Contact form failed", submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível enviar o pedido. Use o telefone ou o WhatsApp.",
      );
      setState("error");
    }
  }

  return (
    <section id="contacto" className="scroll-mt-28 px-4 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.28em] text-bronze">
            Pedido urgente
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
            Precisa de um técnico{" "}
            <span className="italic text-bronze">hoje</span>?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal/75">
            Ligue, envie WhatsApp ou deixe o pedido. Respondemos pelo mesmo
            canal. Se o e-mail ainda não estiver configurado, o formulário abre
            o WhatsApp com os seus dados já preenchidos.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <CallButton className="w-full min-h-14 px-4 text-base sm:w-auto">
                Ligar agora
              </CallButton>
              <WhatsAppButton
                message={URGENT_WHATSAPP_MESSAGE}
                className="w-full min-h-14 px-4 text-base sm:w-auto"
              >
                Falar por WhatsApp
              </WhatsAppButton>
            </div>
            <p className="text-sm leading-relaxed text-charcoal/70">
              <a href={`tel:${SITE.phoneTel}`} className="hover:text-bronze">
                {SITE.phoneDisplay}
              </a>
              {" · "}
              WhatsApp {SITE.whatsappDisplay}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-bronze/25 bg-sand p-5 sm:p-8"
          noValidate
        >
          <div className="hidden" aria-hidden>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-5">
            <Field label="Nome" htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={fieldClass}
              />
            </Field>
            <Field label="Telefone" htmlFor="phone">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                placeholder="+351 …"
                className={fieldClass}
              />
            </Field>
            <Field label="O que precisa" htmlFor="need">
              <textarea
                id="need"
                name="need"
                required
                rows={4}
                placeholder="Ex.: fuga na canalização, em Oeiras"
                className={`${fieldClass} resize-y`}
              />
            </Field>
          </div>

          {state === "success" ? (
            <p className="mt-5 text-sm text-charcoal" role="status">
              Pedido enviado. Se o WhatsApp abriu, basta confirmar o envio da
              mensagem. Caso contrário, ligamos em breve.
            </p>
          ) : null}
          {state === "error" ? (
            <p className="mt-5 text-sm text-red-800" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={state === "submitting"}
            className="mt-6 inline-flex min-h-14 w-full items-center justify-center bg-charcoal px-5 text-sm font-medium tracking-wide text-warm transition-colors hover:bg-charcoal/90 disabled:opacity-60 sm:w-auto"
          >
            {state === "submitting" ? "A enviar…" : "Pedir contacto"}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-charcoal/55">
            Ao enviar, autoriza o contacto da Nexo Services sobre este pedido.
            Não partilhamos os seus dados com terceiros.
          </p>
        </form>
      </div>
    </section>
  );
}

const fieldClass =
  "mt-2 min-h-12 w-full rounded-none border border-bronze/30 bg-cream px-3 text-base text-charcoal outline-none focus:border-bronze";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-charcoal">
      {label}
      {children}
    </label>
  );
}
