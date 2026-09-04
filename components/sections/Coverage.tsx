import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";

const REGIONS = ["Lisboa", "Área Metropolitana", "Território nacional"];

export function Coverage() {
  return (
    <section id="atuacao" className="scroll-mt-32 bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            title="Base em Lisboa, obra em todo o país."
            highlight="Lisboa"
          />
          <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-charcoal/70 sm:text-lg">
            Sediados em Lisboa e Área Metropolitana. Atendemos também em todo
            o território nacional.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {REGIONS.map((region) => (
              <span
                key={region}
                className="rounded-full border border-gold/45 bg-sand px-3.5 py-2 text-sm tracking-wide text-charcoal"
              >
                {region}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-none border border-gold/35">
          <div className="flex min-w-0 flex-col gap-2 border-b border-gold/25 bg-sand px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-charcoal">Lisboa — área de base</p>
            <a
              href={SITE.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hit-link shrink-0 text-sm text-accent hover:text-charcoal"
            >
              Abrir no Maps
            </a>
          </div>
          <iframe
            title="Mapa de Lisboa — área de base da Projeto Nexo"
            src={SITE.mapsEmbedUrl}
            className="h-[300px] w-full max-w-full border-0 sm:h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
