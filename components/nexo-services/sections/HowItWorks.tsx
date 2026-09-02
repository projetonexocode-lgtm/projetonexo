import { SectionHeading } from "@/components/nexo-services/ui/SectionHeading";
import { STEPS } from "@/lib/nexo-services/content";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-28 px-4 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Como funciona"
          title="Três passos. Sem surpresas."
          highlight="Três passos"
        />
        <ol className="mt-10 grid gap-3 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="border border-bronze/20 bg-sand p-5 sm:p-6"
            >
              <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-bronze">
                {step.number}
              </p>
              <h3 className="mt-3 font-display text-2xl text-charcoal">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
