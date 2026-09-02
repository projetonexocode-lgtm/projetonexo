import Image from "next/image";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { HERO_IMAGE } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14 lg:pt-16">
        <div>
          <p className="inline-flex items-center rounded-full border border-gold/80 bg-cognac/25 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-espresso sm:text-[0.68rem] sm:tracking-[0.2em]">
            Gestão de obras e projetos
          </p>
          <h1 className="mt-6 font-display text-[2.1rem] leading-[1.12] text-charcoal sm:text-5xl lg:text-[3.35rem]">
            Remodelar com{" "}
            <span className="gold-leaf">critério</span>.
            <span className="mt-1 block">Construir com método.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/75 sm:text-lg">
            A Projeto Nexo trata da remodelação, construção e reabilitação de
            imóveis. Sede em Lisboa e Área Metropolitana — e atendimento em todo
            o território nacional.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton
              serviceLabel="os vossos serviços"
              className="w-full sm:w-auto sm:min-w-[220px]"
            >
              Falar no WhatsApp
            </WhatsAppButton>
            <a
              href="#servicos"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-none border border-gold px-5 text-sm font-medium tracking-wide text-espresso transition-colors hover:bg-cognac/20 sm:w-auto"
            >
              Ver serviços
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/50" />
          <p className="absolute bottom-0 left-0 right-0 bg-espresso/70 px-4 py-2 text-[0.65rem] uppercase tracking-[0.16em] text-warm">
            Fotografia temporária · a substituir por projetos reais
          </p>
        </div>
      </div>
    </section>
  );
}
