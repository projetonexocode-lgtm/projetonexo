"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CONTACT_SERVICE_OPTIONS } from "@/lib/services";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
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
          service: data.get("service"),
          message: data.get("message"),
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
          : "Não foi possível enviar o pedido. Use o WhatsApp.",
      );
      setState("error");
    }
  }

  return (
    <section id="contacto" className="scroll-mt-28 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="font-display text-[0.7rem] uppercase tracking-[0.28em] text-bronze">
            Pedido de contacto
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
            Conte-nos o{" "}
            <span className="gold-leaf">espaço</span> e o que precisa.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal/75">
            Respondemos pelo WhatsApp ou por telefone. Se o envio por e-mail
            ainda não estiver configurado, o formulário abre a conversa no
            WhatsApp com os seus dados já preenchidos.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-card bg-card p-5 sm:p-8"
          noValidate
        >
          <div className="hidden" aria-hidden>
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
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
            <Field label="Tipo de serviço" htmlFor="service">
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className={fieldClass}
              >
                <option value="" disabled>
                Selecione…
                </option>
                {CONTACT_SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Mensagem" htmlFor="message">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className={`${fieldClass} resize-y`}
              />
            </Field>
          </div>

          {state === "success" ? (
            <p className="mt-5 text-sm text-warm" role="status">
              Pedido enviado. Se o WhatsApp abriu, basta confirmar o envio da
              mensagem. Caso contrário, entraremos em contacto em breve.
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
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center bg-cream px-5 text-sm font-medium tracking-wide text-espresso transition-colors hover:bg-warm disabled:opacity-60 sm:w-auto"
          >
            {state === "submitting" ? "A enviar…" : "Enviar pedido"}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-warm/60">
            Ao enviar, autoriza o contacto da Projeto Nexo sobre este pedido.
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
    <label htmlFor={htmlFor} className="block text-sm font-medium text-warm">
      {label}
      {children}
    </label>
  );
}
