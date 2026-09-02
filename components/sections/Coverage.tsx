import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COVERAGE_IMAGE } from "@/lib/images";

export function Coverage() {
  return (
    <section id="atuacao" className="scroll-mt-28 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Área de atuação"
            title="Sede em Lisboa. Obra em todo o país."
            highlight="Lisboa"
          />
          <p className="mt-6 text-base leading-relaxed text-charcoal/80 sm:text-lg">
            Sediados em Lisboa e Área Metropolitana. Atendemos também em todo o
            território nacional.
          </p>
          <p className="mt-4 text-base leading-relaxed text-charcoal/75">
            A base operacional — reuniões, coordenação e arranque de obra —
            está em Lisboa. Quando o projeto o justifica, deslocamo-nos a
            qualquer distrito, com o mesmo método de acompanhamento.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full border border-gold bg-cognac/25 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-charcoal">
              Lisboa
            </span>
            <span className="rounded-full border border-gold bg-cognac/25 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-charcoal">
              Área Metropolitana
            </span>
            <span className="rounded-full border border-gold bg-cognac/25 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-charcoal">
              Portugal inteiro
            </span>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={COVERAGE_IMAGE.src}
            alt={COVERAGE_IMAGE.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-bronze/40" />
          <p className="absolute left-4 top-4 rounded-full border border-gold bg-cream/95 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-charcoal">
            Base: Lisboa
          </p>
        </div>
      </div>
    </section>
  );
}
