import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { buildWhatsAppUrl, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto grid max-w-6xl gap-10 border-b border-gold/28 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Gestão de obras e projetos. Remodelação, construção e reabilitação
            de imóveis.
          </p>
        </div>

        <div>
          <p className="type-label text-gold">
            Contactos
          </p>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <Link href="/#contacto" className="hit-link hover:text-gold">
                Pedido de contacto
              </Link>
            </li>
            <li>
              <a
                href={buildWhatsAppUrl("os vossos serviços")}
                className="hit-link hover:text-gold"
              >
                WhatsApp · {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.phoneTel}`} className="hit-link hover:text-gold">
                Telefone · {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex min-h-6 items-center">Lisboa · Área Metropolitana</li>
            <li>
              <Link href="/blog" className="hit-link hover:text-gold">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="type-label text-gold">
            Serviços
          </p>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <Link href="/#servicos" className="hit-link hover:text-gold">
                WC / Casa de banho
              </Link>
            </li>
            <li>
              <Link href="/#servicos" className="hit-link hover:text-gold">
                Apartamento
              </Link>
            </li>
            <li>
              <Link href="/#servicos" className="hit-link hover:text-gold">
                Cozinha
              </Link>
            </li>
            <li>
              <Link href="/#servicos" className="hit-link hover:text-gold">
                Reabilitação de imóveis
              </Link>
            </li>
            <li>
              <Link
                href={SITE.nexoServicesUrl}
                className="hit-link gap-1.5 text-gold hover:text-cream"
              >
                Reparações
                <ExternalLink className="size-3.5 shrink-0" aria-hidden />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="type-label text-gold">
            Garantias
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Remodelações, obras, instalações e substituições: 2, 3, 5 ou 7
            anos, conforme a intervenção e as normas técnicas em vigor.
          </p>
          <Link href="/faq" className="hit-link mt-3 text-sm text-gold hover:text-cream">
            Ver política de garantias
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 pt-4 text-xs text-cream/80 sm:px-8 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <span>
          © {new Date().getFullYear()} {SITE.name}. Todos os direitos
          reservados.
        </span>
        <Link href={SITE.nexoServicesUrl} className="hit-link hover:text-cream">
          Reparações pela Nexo Services
        </Link>
      </div>
    </footer>
  );
}
