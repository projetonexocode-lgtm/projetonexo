import { SectionHeading } from "@/components/nexo-services/ui/SectionHeading";
import { FAQS } from "@/lib/nexo-services/faq";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 px-4 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Perguntas frequentes"
          title="Respostas diretas, sem letra pequena."
          highlight="diretas"
        />
        <div className="mt-10 divide-y divide-bronze/25 border-y border-bronze/25">
          {FAQS.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-lg text-charcoal marker:hidden [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  className="shrink-0 text-bronze transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-charcoal/75">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
