import { PlaceholderNote } from "@/components/nexo-services/ui/PlaceholderNote";
import { SectionHeading } from "@/components/nexo-services/ui/SectionHeading";
import { DIFFERENTIALS } from "@/lib/nexo-services/content";

export function Differentials() {
  return (
    <section id="diferenciais" className="scroll-mt-28 px-4 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Porquê a Nexo Services"
          title="Clareza antes de qualquer intervenção."
          highlight="Clareza"
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {DIFFERENTIALS.map((item) => (
            <li
              key={item.title}
              className="border border-bronze/20 bg-sand p-5 sm:p-6"
            >
              {item.placeholder ? (
                <PlaceholderNote className="mb-2">
                  A confirmar com o cliente
                </PlaceholderNote>
              ) : null}
              <h3 className="font-display text-2xl text-charcoal">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
