"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { NavItem } from "@/lib/cms/content";
import { DEFAULT_SITE } from "@/lib/cms/defaults";

type HeaderProps = {
  name?: string;
  nav?: NavItem[];
  phoneDisplay?: string;
  phoneTel?: string;
  whatsappDisplay?: string;
  whatsappCta?: string;
  intro?: string;
  e164?: string;
};

export function Header({
  name = DEFAULT_SITE.name,
  nav = DEFAULT_SITE.nav,
  phoneDisplay = DEFAULT_SITE.phoneDisplay,
  phoneTel = DEFAULT_SITE.phoneTel,
  whatsappDisplay = DEFAULT_SITE.whatsappDisplay,
  whatsappCta = DEFAULT_SITE.whatsappCta,
  intro,
  e164 = DEFAULT_SITE.whatsappE164,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const whatsappTel = `+${e164}`;

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
    <header className="sticky top-0 z-40 border-b border-gold/28 bg-ink pt-[env(safe-area-inset-top)] text-gold">
      <div className="mx-auto flex w-full min-w-0 max-w-6xl items-center gap-3 px-5 py-[1.1rem] sm:gap-4 sm:px-8">
        <Link
          href="/"
          className="inline-flex min-h-12 shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
          aria-label={`${name} — início`}
        >
          <Logo onDark />
        </Link>

        <nav
          className="ml-auto hidden items-center gap-1 text-sm uppercase tracking-wide xl:flex xl:gap-2"
          aria-label="Secções"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`hit-link px-2 hover:text-cream ${
                pathname === item.href ? "text-cream" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 flex-col justify-center gap-0.5 border-l border-gold/30 pl-5 text-sm leading-snug xl:flex">
          <a
            href={`tel:${phoneTel}`}
            className="hit-link whitespace-nowrap hover:text-cream"
          >
            {phoneDisplay}
          </a>
          <a
            href={`tel:${whatsappTel}`}
            className="hit-link whitespace-nowrap hover:text-cream"
          >
            {whatsappDisplay}
          </a>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 xl:ml-0 sm:gap-2">
          <a
            href={`tel:${phoneTel}`}
            className="hidden min-h-12 min-w-12 items-center justify-center text-gold sm:inline-flex xl:hidden"
            aria-label={`Ligar para ${phoneDisplay}`}
          >
            <Phone className="size-5" />
          </a>
          <WhatsAppButton
            serviceLabel="os vossos serviços"
            variant="cream"
            compact
            className="xl:hidden"
            intro={intro}
            e164={e164}
          >
            {whatsappCta}
          </WhatsAppButton>
          <div className="hidden xl:block">
            <WhatsAppButton
              serviceLabel="os vossos serviços"
              variant="cream"
              intro={intro}
              e164={e164}
            >
              {whatsappCta}
            </WhatsAppButton>
          </div>
          <button
            type="button"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-gold/45 text-gold xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">
              {open ? "Fechar menu" : "Abrir menu"}
            </span>
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
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`flex min-h-12 items-center text-sm uppercase tracking-wide hover:text-cream ${
                  pathname === item.href ? "text-cream" : "text-gold"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${phoneTel}`}
              className="mt-1 flex min-h-12 items-center border-t border-gold/22 pt-3 text-sm text-gold hover:text-cream"
            >
              {phoneDisplay}
            </a>
            <a
              href={`tel:${whatsappTel}`}
              className="flex min-h-12 items-center text-sm text-gold hover:text-cream"
            >
              {whatsappDisplay}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
