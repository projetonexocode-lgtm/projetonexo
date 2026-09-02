import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DIFFERENTIALS } from "@/lib/differentials";

export function Differentials() {
  return (
    <section id="diferenciais" className="scroll-mt-28 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Porquê a Nexo"
          title="Critérios concretos, sem recorte de catálogo."
          highlight="concretos"
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {DIFFERENTIALS.map((item) => (
            <li
              key={item.title}
              className="border border-card bg-card p-6"
            >
              {"placeholder" in item && item.placeholder ? (
                <p className="mb-2 text-[0.65rem] uppercase tracking-[0.16em] text-gold">
                  A preencher pelo cliente
                </p>
              ) : null}
              <h3 className="font-display text-2xl text-warm">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-warm/75">
                {item.body}
              </p>
              {"href" in item && item.href ? (
                <Link
                  href={item.href}
                  className="mt-4 inline-flex min-h-11 items-center text-sm text-gold hover:text-warm"
                >
                  Ver política de garantias
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
