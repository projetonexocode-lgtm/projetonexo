"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  CONTACT_LIMITS,
  CONTACT_SUBMIT_TIMEOUT_MS,
  validateContactFields,
  type ContactFieldKey,
} from "@/lib/contact";
import { buildWhatsAppUrlFromMessage } from "@/lib/site";
import { DEFAULT_CONTACT, DEFAULT_SERVICES, DEFAULT_SITE } from "@/lib/cms/defaults";

type FormState = "idle" | "submitting" | "success" | "whatsapp" | "error";

type ContactResponse = {
  ok: boolean;
  error?: string;
  fields?: Partial<Record<ContactFieldKey, string>>;
  channel?: "email" | "whatsapp";
  url?: string;
};

const FIELD_ORDER: ContactFieldKey[] = [
  "name",
  "phone",
  "email",
  "service",
  "message",
];

type ContactFormProps = {
  heading?: string;
  body?: string;
  submitLabel?: string;
  submittingLabel?: string;
  successMessage?: string;
  consent?: string;
  nameLabel?: string;
  phoneLabel?: string;
  phoneHint?: string;
  emailLabel?: string;
  emailHint?: string;
  serviceLabel?: string;
  messageLabel?: string;
  namePlaceholder?: string;
  phonePlaceholder?: string;
  emailPlaceholder?: string;
  servicePlaceholder?: string;
  messagePlaceholder?: string;
  serviceOptions?: string[];
  whatsappDisplay?: string;
  phoneDisplay?: string;
  phoneTel?: string;
  e164?: string;
};

export function ContactForm({
  heading = DEFAULT_CONTACT.heading,
  body = DEFAULT_CONTACT.body,
  submitLabel = DEFAULT_CONTACT.submitLabel,
  submittingLabel = DEFAULT_CONTACT.submittingLabel,
  successMessage = DEFAULT_CONTACT.successMessage,
  consent = DEFAULT_CONTACT.consent,
  nameLabel = DEFAULT_CONTACT.nameLabel,
  phoneLabel = DEFAULT_CONTACT.phoneLabel,
  phoneHint = DEFAULT_CONTACT.phoneHint,
  emailLabel = DEFAULT_CONTACT.emailLabel,
  emailHint = DEFAULT_CONTACT.emailHint,
  serviceLabel = DEFAULT_CONTACT.serviceLabel,
  messageLabel = DEFAULT_CONTACT.messageLabel,
  namePlaceholder = DEFAULT_CONTACT.namePlaceholder,
  phonePlaceholder = DEFAULT_CONTACT.phonePlaceholder,
  emailPlaceholder = DEFAULT_CONTACT.emailPlaceholder,
  servicePlaceholder = DEFAULT_CONTACT.servicePlaceholder,
  messagePlaceholder = DEFAULT_CONTACT.messagePlaceholder,
  serviceOptions,
  whatsappDisplay = DEFAULT_SITE.whatsappDisplay,
  phoneDisplay = DEFAULT_SITE.phoneDisplay,
  phoneTel = DEFAULT_SITE.phoneTel,
  e164,
}: ContactFormProps) {
  const options =
    serviceOptions && serviceOptions.length > 0
      ? serviceOptions
      : [
          ...DEFAULT_SERVICES.filter((item) => item.inContactForm).map(
            (item) => item.contactLabel,
          ),
          DEFAULT_CONTACT.otherServiceOption,
        ];
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<ContactFieldKey, string>>
  >({});
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  function clearFieldError(key: ContactFieldKey) {
    setFieldErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function focusField(key: ContactFieldKey) {
    const field = formRef.current?.elements.namedItem(key);
    if (field instanceof HTMLElement) field.focus();
  }

  function describedBy(key: ContactFieldKey, hint?: boolean) {
    const parts = [
      fieldErrors[key] ? `${key}-error` : null,
      hint ? `${key}-hint` : null,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(" ") : undefined;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlightRef.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = validateContactFields({
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      service: data.get("service"),
      message: data.get("message"),
    });

    if (!parsed.ok) {
      setFieldErrors(parsed.fields);
      setError("");
      setState("idle");
      const first = FIELD_ORDER.find((key) => parsed.fields[key]);
      if (first) focusField(first);
      return;
    }

    setError("");
    setFieldErrors({});
    setWhatsappUrl("");
    setState("submitting");
    inFlightRef.current = true;

    abortRef.current?.abort();
    const abort = new AbortController();
    abortRef.current = abort;
    let timedOut = false;
    const timer = window.setTimeout(() => {
      timedOut = true;
      abort.abort();
    }, CONTACT_SUBMIT_TIMEOUT_MS);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: parsed.value.name,
          phone: parsed.value.phone,
          email: parsed.value.email,
          service: parsed.value.service,
          message: parsed.value.message,
          website: data.get("website"),
        }),
        signal: abort.signal,
      });

      let payload: ContactResponse;
      try {
        payload = (await response.json()) as ContactResponse;
      } catch {
        throw new Error(
          "A resposta do servidor não chegou completa. Tente de novo ou use o WhatsApp.",
        );
      }

      if (response.status === 429) {
        throw new Error(
          "Demasiados pedidos seguidos. Espere um minuto ou use o WhatsApp.",
        );
      }

      if (!response.ok || !payload.ok) {
        if (payload.fields) {
          setFieldErrors(payload.fields);
          const first = FIELD_ORDER.find((key) => payload.fields?.[key]);
          if (first) focusField(first);
        }
        throw new Error(payload.error || "Não foi possível enviar o pedido.");
      }

      if (payload.channel === "whatsapp" && payload.url) {
        setWhatsappUrl(payload.url);
        setState("whatsapp");
        return;
      }

      form.reset();
      setState("success");
    } catch (submitError) {
      if (submitError instanceof DOMException && submitError.name === "AbortError") {
        if (!timedOut) return;
        setError(
          "O envio demorou demasiado. Tente de novo ou use o WhatsApp ao lado.",
        );
        setState("error");
        return;
      }
      console.error("Contact form failed", submitError);
      const offline = typeof navigator !== "undefined" && navigator.onLine === false;
      setError(
        offline
          ? "Sem ligação à internet. Reconecte e tente de novo, ou use o WhatsApp ao lado."
          : submitError instanceof Error
            ? submitError.message
            : "Não foi possível enviar o pedido. Use o WhatsApp ao lado.",
      );
      setState("error");
    } finally {
      window.clearTimeout(timer);
      inFlightRef.current = false;
    }
  }

  return (
    <section id="contacto" className="scroll-mt-32 bg-ink px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="min-w-0">
          <h2 className="max-w-[20ch] wrap-break-word font-display text-3xl leading-[1.1] text-cream sm:text-4xl lg:text-[2.75rem]">
            {heading}
          </h2>
          <p className="mt-6 max-w-[65ch] wrap-break-word text-base leading-[1.7] tracking-[0.01em] text-cream">
            {body}
          </p>
          <div className="mt-9 flex max-w-[420px] flex-col gap-3.5">
            <a
              href={buildWhatsAppUrlFromMessage(
                "Olá! Vi o site da Projeto Nexo e quero saber mais sobre os vossos serviços.",
                e164,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-cream px-6 text-base wrap-break-word text-charcoal transition-colors hover:bg-gold"
            >
              <WhatsAppIcon punchColor="var(--color-cream)" className="size-4.5 shrink-0" />
              {whatsappDisplay} · WhatsApp
            </a>
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-gold/50 px-6 text-base wrap-break-word text-cream transition-colors hover:bg-gold/15"
            >
              {phoneDisplay} · Telefone
            </a>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          aria-busy={state === "submitting"}
          className="min-w-0 rounded-2xl border border-cream/12 bg-cream/6 p-6 sm:p-11"
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
            <Field
              label={nameLabel}
              htmlFor="name"
              error={fieldErrors.name}
              required
            >
              <input
                id="name"
                name="name"
                type="text"
                required
                dir="auto"
                maxLength={CONTACT_LIMITS.name}
                autoComplete="name"
                autoCapitalize="words"
                placeholder={namePlaceholder}
                aria-invalid={fieldErrors.name ? true : undefined}
                aria-describedby={describedBy("name")}
                onInput={() => clearFieldError("name")}
                className={fieldClass}
              />
            </Field>
            <Field
              label={phoneLabel}
              htmlFor="phone"
              error={fieldErrors.phone}
              hint={phoneHint}
              required
            >
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                dir="ltr"
                maxLength={CONTACT_LIMITS.phone}
                autoComplete="tel"
                inputMode="tel"
                placeholder={phonePlaceholder}
                aria-invalid={fieldErrors.phone ? true : undefined}
                aria-describedby={describedBy("phone", true)}
                onInput={() => clearFieldError("phone")}
                className={fieldClass}
              />
            </Field>
            <Field
              label={emailLabel}
              htmlFor="email"
              error={fieldErrors.email}
              hint={emailHint}
            >
              <input
                id="email"
                name="email"
                type="email"
                dir="ltr"
                maxLength={CONTACT_LIMITS.email}
                autoComplete="email"
                placeholder={emailPlaceholder}
                aria-invalid={fieldErrors.email ? true : undefined}
                aria-describedby={describedBy("email", true)}
                onInput={() => clearFieldError("email")}
                className={fieldClass}
              />
            </Field>
            <Field
              label={serviceLabel}
              htmlFor="service"
              error={fieldErrors.service}
              required
            >
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                aria-invalid={fieldErrors.service ? true : undefined}
                aria-describedby={describedBy("service")}
                onChange={() => clearFieldError("service")}
                className={`${fieldClass} scheme-light`}
              >
                <option value="" disabled>
                  {servicePlaceholder}
                </option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label={messageLabel}
              htmlFor="message"
              error={fieldErrors.message}
              required
            >
              <textarea
                id="message"
                name="message"
                required
                dir="auto"
                maxLength={CONTACT_LIMITS.message}
                rows={4}
                enterKeyHint="send"
                placeholder={messagePlaceholder}
                aria-invalid={fieldErrors.message ? true : undefined}
                aria-describedby={describedBy("message")}
                onInput={() => clearFieldError("message")}
                className={`${fieldClass} min-h-24 resize-y wrap-break-word`}
              />
            </Field>
          </div>

          {state === "success" ? (
            <p
              className="mt-5 text-sm leading-relaxed wrap-break-word text-cream"
              role="status"
              aria-live="polite"
            >
              {successMessage}
            </p>
          ) : null}
          {state === "whatsapp" ? (
            <div className="mt-5 space-y-3" role="status" aria-live="polite">
              <p className="text-sm leading-relaxed wrap-break-word text-cream">
                O e-mail não está disponível neste momento. O formulário ficou
                preenchido. Envie o mesmo pedido no WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cream px-6 text-sm text-charcoal hover:bg-gold"
              >
                <WhatsAppIcon punchColor="var(--color-cream)" className="size-4 shrink-0" />
                Abrir WhatsApp com o pedido
              </a>
            </div>
          ) : null}
          {state === "error" ? (
            <p
              className="mt-5 text-sm leading-relaxed wrap-break-word text-[#e8b4a4]"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-7">
            <button
              type="submit"
              disabled={state === "submitting"}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-7 text-sm tracking-wide text-charcoal transition-colors hover:bg-cream disabled:opacity-60"
            >
              {state === "submitting" ? submittingLabel : submitLabel}
            </button>
          </div>
          <p className="mt-5 text-sm leading-relaxed wrap-break-word text-cream/80">
            {consent}
          </p>
        </form>
      </div>
    </section>
  );
}

const fieldClass =
  "mt-2 min-h-12 w-full min-w-0 scroll-mt-32 wrap-break-word rounded-none border-0 border-b border-cream/25 bg-transparent px-0.5 text-base text-cream caret-gold outline-none placeholder:text-cream/70 focus-visible:border-gold aria-[invalid=true]:border-[#e8b4a4]";

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="block wrap-break-word text-sm text-cream">
        {label}
        {required ? (
          <span className="sr-only"> (obrigatório)</span>
        ) : (
          <span className="font-normal text-cream/70"> · opcional</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm leading-relaxed wrap-break-word text-[#e8b4a4]">
          {error}
        </p>
      ) : null}
      {hint ? (
        <p id={`${htmlFor}-hint`} className="mt-1.5 text-sm leading-relaxed wrap-break-word text-cream/70">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
