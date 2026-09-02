import { MapPin } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SITE } from "@/lib/site";

export function WhatsAppMaps() {
  return (
    <section id="whatsapp-mapa" className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-between border border-card bg-card p-6 sm:p-10">
          <div>
            <p className="font-display text-[0.7rem] uppercase tracking-[0.28em] text-gold">
              Fale connosco
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-warm sm:text-4xl">
              O caminho mais direto é o{" "}
              <span className="gold-leaf">WhatsApp</span>.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-warm/75">
              Mensagem pronta, número {SITE.whatsappDisplay}. O telefone fixo{" "}
              {SITE.phoneDisplay} permanece disponível como alternativa.
            </p>
          </div>
          <WhatsAppButton
            serviceLabel="os vossos serviços"
            variant="gold"
            className="mt-8 min-h-14 w-full border-gold text-warm hover:bg-bronze/40 text-base"
          >
            Abrir WhatsApp
          </WhatsAppButton>
        </div>

        <div className="overflow-hidden border border-card bg-card">
          <div className="flex flex-col gap-2 border-b border-gold/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-center gap-2 text-sm text-warm">
              <MapPin className="size-4 shrink-0 text-gold" aria-hidden />
              Lisboa — área de base
            </p>
            <a
              href={SITE.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gold hover:text-warm"
            >
              Abrir no Maps
            </a>
          </div>
          <iframe
            title="Mapa de Lisboa — área de base da Projeto Nexo"
            src={SITE.mapsEmbedUrl}
            className="h-[280px] w-full max-w-full border-0 sm:h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
