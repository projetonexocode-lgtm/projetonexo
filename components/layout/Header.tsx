"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { NAV_ITEMS, SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/35 bg-cream/95 backdrop-blur-md">
      <div className="border-b border-gold/25 bg-cognac/20">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2 text-[0.7rem] uppercase tracking-[0.16em] text-charcoal/70 sm:px-8">
          <p className="truncate">
            <span className="sm:hidden">Lisboa · atendimento nacional</span>
            <span className="hidden sm:inline">
              Lisboa e Área Metropolitana · atendemos em todo o país
            </span>
          </p>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="hidden min-h-8 shrink-0 items-center gap-1.5 text-charcoal hover:text-bronze sm:inline-flex"
          >
            <Phone className="size-3" aria-hidden />
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link
          href="/"
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

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-charcoal lg:hidden"
            aria-label={`Ligar para ${SITE.phoneDisplay}`}
          >
            <Phone className="size-5" />
          </a>
          <div className="hidden sm:block">
            <WhatsAppButton serviceLabel="os vossos serviços">
              WhatsApp
            </WhatsAppButton>
          </div>
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
          className="border-t border-bronze/25 bg-cream px-5 py-6 lg:hidden"
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
            <WhatsAppButton serviceLabel="os vossos serviços" className="w-full">
              Falar no WhatsApp
            </WhatsAppButton>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex min-h-12 items-center justify-center text-sm text-charcoal/80"
            >
              Telefone: {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
