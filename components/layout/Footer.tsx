import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildWhatsAppUrl, SITE } from "@/lib/site";

const FOOTER_LINKS = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#galeria", label: "Galeria" },
  { href: "/#contacto", label: "Contacto" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "Garantias e FAQ" },
  { href: "/termos", label: "Termos" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-gold/35 bg-espresso">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
            Gestão de obras e projetos — remodelação, construção e reabilitação
            de imóveis. Sede em Lisboa e Área Metropolitana, com atendimento em
            todo o território nacional.
          </p>
        </div>

        <div>
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-gold">
            Navegação
          </p>
          <ul className="mt-4 space-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={SITE.nexoServicesUrl}
                className="text-sm text-cream/80 transition-colors hover:text-gold"
              >
                Reparações — Nexo Services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-gold">
            Contactos
          </p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              WhatsApp:{" "}
              <a
                href={buildWhatsAppUrl("os vossos serviços")}
                className="hover:text-gold"
              >
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              Telefone:{" "}
              <a href={`tel:${SITE.phoneTel}`} className="hover:text-gold">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>Lisboa, Portugal</li>
          </ul>
          <WhatsAppButton
            serviceLabel="os vossos serviços"
            variant="gold"
            className="mt-6 w-full border-gold text-cream hover:bg-bronze/40 sm:w-auto"
          >
            Falar no WhatsApp
          </WhatsAppButton>
        </div>
      </div>
      <div className="border-t border-gold/20 px-5 py-4 text-center text-xs text-cream/50 sm:px-8">
        © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
