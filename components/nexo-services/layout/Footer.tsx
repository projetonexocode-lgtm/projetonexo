import Link from "next/link";
import { Logo } from "@/components/nexo-services/ui/Logo";
import { COVERAGE_GROUPS } from "@/lib/nexo-services/coverage";
import { FOOTER_SERVICES } from "@/lib/nexo-services/services";
import { BASE_PATH, buildWhatsAppUrl, SITE, URGENT_WHATSAPP_MESSAGE } from "@/lib/nexo-services/site";

export function Footer() {
  return (
    <footer className="border-t border-bronze/30 bg-sand pb-[5.75rem] sm:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-charcoal/75">
            Reparações e serviços especializados ao domicílio. Base em Lisboa,
            atendimento imediato na Área Metropolitana e Margem Sul, cobertura
            nacional mediante disponibilidade.
          </p>
          <Link
            href={SITE.projetoNexoUrl}
            className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-bronze hover:text-charcoal"
          >
            Também fazemos obras e remodelações → projetonexo.pt
          </Link>
        </div>

        <div>
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-bronze">
            Contactos
          </p>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
            <li>
              Telefone:{" "}
              <a href={`tel:${SITE.phoneTel}`} className="hover:text-bronze">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a
                href={buildWhatsAppUrl(URGENT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-bronze"
              >
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li>Lisboa, Portugal</li>
          </ul>
          <p className="mt-6 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-bronze">
            Redes sociais
          </p>
          <p className="mt-2 text-xs leading-relaxed text-charcoal/60">
            [PLACEHOLDER] Instagram e Facebook — links a enviar pelo cliente.
          </p>
        </div>

        <div>
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-bronze">
            Serviços principais
          </p>
          <ul className="mt-4 space-y-2">
            {FOOTER_SERVICES.map((service) => (
              <li key={service}>
                <Link
                  href={`${BASE_PATH}#servicos`}
                  className="text-sm text-charcoal/80 hover:text-bronze"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-bronze">
            Áreas de atuação
          </p>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
            {COVERAGE_GROUPS.map((group) => (
              <li key={group.id}>{group.title}</li>
            ))}
            <li>Cobertura nacional mediante disponibilidade</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bronze/25 px-4 py-4 text-center text-xs text-charcoal/55 sm:px-8">
        © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
