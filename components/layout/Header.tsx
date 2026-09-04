"use client";

import { ExternalLink, Menu, Phone, X } from "lucide-react";
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

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const closeOnWide = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", closeOnWide);
    return () => query.removeEventListener("change", closeOnWide);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/28 bg-cream pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex w-full min-w-0 max-w-6xl items-center gap-3 px-5 py-4 sm:gap-4 sm:px-8">
        <Link
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
          aria-label={`${SITE.name} — início`}
        >
          <Logo />
        </Link>

        <nav
          className="ml-auto hidden items-center gap-1 text-sm tracking-wide xl:flex xl:gap-2"
          aria-label="Secções"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hit-link px-2 text-charcoal/70 transition-colors hover:text-charcoal"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={SITE.nexoServicesUrl}
            className="hit-link gap-1.5 px-2 text-charcoal hover:text-accent"
          >
            Reparações
            <ExternalLink className="size-3.5 shrink-0" aria-hidden />
          </Link>
        </nav>

        <a
          href={`tel:${SITE.phoneTel}`}
          className="hidden min-h-11 shrink-0 items-center whitespace-nowrap border-l border-gold/30 pl-5 text-sm text-charcoal/70 hover:text-charcoal xl:inline-flex"
        >
          {SITE.phoneDisplay}
        </a>

        <div className="ml-auto flex shrink-0 items-center gap-1 xl:ml-0 sm:gap-2">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="hidden min-h-12 min-w-12 items-center justify-center text-charcoal sm:inline-flex xl:hidden"
            aria-label={`Ligar para ${SITE.phoneDisplay}`}
          >
            <Phone className="size-5" />
          </a>
          <WhatsAppButton
            serviceLabel="os vossos serviços"
            variant="dark"
            compact
            className="xl:hidden"
          >
            Falar por WhatsApp
          </WhatsAppButton>
          <div className="hidden xl:block">
            <WhatsAppButton serviceLabel="os vossos serviços" variant="dark">
              Falar por WhatsApp
            </WhatsAppButton>
          </div>
          <button
            type="button"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-gold/45 text-charcoal xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        className={`grid xl:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        } transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`}
      >
        <div className="min-h-0 overflow-hidden">
          <nav
            className="flex flex-col gap-1 border-t border-gold/22 px-5 py-4 sm:px-8"
            aria-label="Menu móvel"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center text-base text-charcoal"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={SITE.nexoServicesUrl}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center gap-2 text-base text-charcoal"
            >
              Reparações
              <ExternalLink className="size-3.5" aria-hidden />
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="mt-1 flex min-h-12 items-center border-t border-gold/22 pt-3 text-sm text-charcoal/70"
            >
              Telefone · {SITE.phoneDisplay}
            </a>
        </nav>
        </div>
      </div>
    </header>
  );
}
