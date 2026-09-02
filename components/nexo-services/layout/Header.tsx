"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CallButton } from "@/components/nexo-services/ui/CallButton";
import { Logo } from "@/components/nexo-services/ui/Logo";
import { WhatsAppButton } from "@/components/nexo-services/ui/WhatsAppButton";
import { BASE_PATH, NAV_ITEMS, SITE, URGENT_WHATSAPP_MESSAGE } from "@/lib/nexo-services/site";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-bronze/25 bg-cream/95 backdrop-blur-md">
      <div className="border-b border-bronze/20 bg-sand/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-charcoal/70 sm:px-8 sm:tracking-[0.16em]">
          <p className="min-w-0 truncate">
            <span className="sm:hidden">Lisboa · AML</span>
            <span className="hidden sm:inline">
              Base em Lisboa · atendimento imediato na AML e Margem Sul
            </span>
          </p>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold bg-sand px-2.5 py-1 text-[0.62rem] font-medium tracking-[0.12em] text-charcoal">
            <span className="size-1.5 shrink-0 bg-gold" aria-hidden />
            Disponível agora
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <Link
          href={BASE_PATH}
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
          aria-label={`${SITE.name} — início`}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Secções">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-charcoal/80 transition-colors hover:text-bronze"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden sm:inline-flex">
            <CallButton className="min-h-11 px-4">Ligar agora</CallButton>
          </span>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex min-h-11 min-w-11 items-center justify-center bg-charcoal text-warm sm:hidden"
            aria-label={`Ligar para ${SITE.phoneDisplay}`}
          >
            <Phone className="size-5" />
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-charcoal lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="menu-mobile"
          className="border-t border-bronze/25 bg-cream px-4 py-6 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Menu móvel">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-bronze/15 font-display text-xl text-charcoal"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <CallButton className="w-full min-h-14">Ligar agora</CallButton>
            <WhatsAppButton
              message={URGENT_WHATSAPP_MESSAGE}
              className="w-full min-h-14"
            >
              Falar por WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
