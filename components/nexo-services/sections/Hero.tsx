import Image from "next/image";
import { CallButton } from "@/components/nexo-services/ui/CallButton";
import { WhatsAppButton } from "@/components/nexo-services/ui/WhatsAppButton";
import { URGENT_WHATSAPP_MESSAGE } from "@/lib/nexo-services/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-gold bg-sand px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-charcoal sm:tracking-[0.16em]">
            <span className="size-1.5 shrink-0 bg-gold" aria-hidden />
            Resposta rápida · Lisboa
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-[2.15rem] leading-[1.12] text-charcoal sm:text-5xl lg:text-[3.35rem]">
            Avaria em casa?{" "}
            <span className="italic text-bronze">Resolvemos hoje.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/80 sm:text-lg">
            Canalização, eletricidade, desentupimentos, esquentadores e mais de
            uma dezena de especialidades ao domicílio. Base em Lisboa, com
            atendimento imediato na Área Metropolitana e Margem Sul — cobertura
            nacional mediante disponibilidade.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CallButton className="w-full min-h-14 text-base sm:w-auto sm:min-w-[220px]">
              Ligar agora
            </CallButton>
            <WhatsAppButton
              message={URGENT_WHATSAPP_MESSAGE}
              className="w-full min-h-14 text-base sm:w-auto sm:min-w-[220px]"
            >
              Falar por WhatsApp
            </WhatsAppButton>
          </div>
          <p className="mt-4 text-sm text-charcoal/60">
            Telefone e WhatsApp com mensagem pronta — diga a avaria e a
            localidade.
          </p>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src="/nexo-services/canalizacao.jpg"
            alt="Técnico Nexo Services a resolver uma avaria de canalização ao domicílio"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-bronze/40" />
        </div>
      </div>
    </section>
  );
}
