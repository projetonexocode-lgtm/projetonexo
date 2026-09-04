import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ServiceSpotlight } from "@/components/sections/ServiceSpotlight";
import { SITE } from "@/lib/site";

export function Services() {
  return (
    <section
      id="servicos"
      className="scroll-mt-32 bg-ink px-5 py-20 sm:px-8 sm:py-28 lg:py-36"
    >
      <div className="mx-auto min-w-0 max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[18ch] font-display text-3xl leading-[1.1] text-cream sm:text-4xl lg:text-[2.75rem]">
            Do projeto à chave na mão.
          </h2>
          <p className="max-w-[46ch] text-base leading-[1.7] tracking-[0.01em] text-cream">
            Quatro especialidades que costumamos coordenar. As restantes estão
            no pedido de contacto. Cada cartão abre o WhatsApp já com o
            serviço identificado.
          </p>
        </div>

        <ServiceSpotlight />

        <p className="mt-8 text-sm text-cream/70">
          <a
            href="#contacto"
            className="hit-link underline decoration-gold/60 underline-offset-4 hover:text-cream"
          >
            Ver todas as especialidades no pedido de contacto
          </a>
        </p>

        <Link
          href={SITE.nexoServicesUrl}
          className="mt-14 grid min-w-0 gap-6 rounded-2xl bg-sand p-5 text-charcoal transition-colors hover:bg-cream sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:items-center sm:gap-8 sm:p-12"
        >
          <div className="min-w-0">
            <span className="type-label inline-block rounded-full border border-gold/50 px-3.5 py-1.5 text-accent">
              Nexo Services
            </span>
            <h3 className="mt-5 max-w-[24ch] font-display text-[clamp(1.35rem,6.2vw,2.25rem)] leading-tight sm:text-4xl">
              Reparações e serviços especializados
            </h3>
            <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-charcoal">
              Canalização, eletricidade, desentupimentos, esquentadores,
              estores e muito mais. Assistência técnica ao domicílio, num
              site próprio.
            </p>
          </div>
          <div className="flex min-w-0 sm:justify-end">
            <span className="inline-flex min-h-12 w-full max-w-full items-center justify-center gap-3 rounded-full bg-charcoal px-5 py-4 text-center text-sm tracking-wide text-cream sm:w-auto sm:px-8 sm:py-5">
              Ir para Nexo Services
              <ExternalLink className="size-3.5 shrink-0 text-gold" aria-hidden />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
