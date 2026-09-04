import { METHOD_STEPS } from "@/lib/method";

export function Method() {
  return (
    <section
      id="metodo"
      className="scroll-mt-32 bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:py-36"
    >
      <div className="mx-auto min-w-0 max-w-6xl">
        <h2 className="max-w-[22ch] font-display text-3xl leading-[1.1] text-charcoal sm:text-4xl lg:text-[2.75rem]">
          Do primeiro contacto à entrega da obra.
        </h2>
        <ol className="mt-12 grid list-none gap-10 border-t border-charcoal/15 p-0 pt-12 md:grid-cols-3 md:gap-12">
          {METHOD_STEPS.map((step, index) => (
            <li key={step.title}>
              <p className="text-sm font-medium tabular-nums text-charcoal">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-lg font-medium text-charcoal">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-charcoal sm:text-lg">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
