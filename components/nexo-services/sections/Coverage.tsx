import { SectionHeading } from "@/components/nexo-services/ui/SectionHeading";
import { COVERAGE_GROUPS, COVERAGE_INTRO } from "@/lib/nexo-services/coverage";

export function Coverage() {
  return (
    <section id="cobertura" className="scroll-mt-28 px-4 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Área de cobertura"
          title="Base em Lisboa. Atendimento onde precisa."
          highlight="Lisboa"
          description={COVERAGE_INTRO}
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {COVERAGE_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="border-l-2 border-gold pl-4 font-display text-2xl text-charcoal">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.cities.map((city) => (
                  <li
                    key={city}
                    className="rounded-full border border-gold bg-sand px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-charcoal"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-charcoal/70">
          Fora destas localidades, confirmamos deslocação no momento — cobertura
          nacional mediante disponibilidade da equipa.
        </p>
      </div>
    </section>
  );
}
