import { DIFFERENTIALS } from "@/lib/differentials";

export function Differentials() {
  return (
    <section
      id="diferenciais"
      className="scroll-mt-32 bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:py-36"
    >
      <div className="mx-auto min-w-0 max-w-6xl">
        <h2 className="max-w-[20ch] font-display text-3xl leading-[1.1] text-charcoal sm:text-4xl lg:text-[2.75rem]">
          Um responsável, do orçamento à entrega.
        </h2>
        <dl className="mt-12 grid gap-10 border-t border-charcoal/15 pt-12 sm:grid-cols-2 sm:gap-16">
          {DIFFERENTIALS.map((item) => (
            <div key={item.title}>
              <dt className="text-lg font-medium text-charcoal">{item.title}</dt>
              <dd className="mt-3 max-w-[65ch] text-base leading-relaxed text-charcoal sm:text-lg">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
