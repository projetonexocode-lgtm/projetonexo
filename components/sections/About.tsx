import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="sobre" className="scroll-mt-32 bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
      <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="min-w-0">
          <SectionHeading
            title="Uma equipa que coordena tudo o que a obra exige."
            highlight="coordena"
          />
          <div className="mt-7 max-w-[65ch] space-y-5 text-base leading-relaxed text-charcoal/70 sm:text-lg">
            <p>
              A Projeto Nexo assegura a gestão integral da obra: planeamento,
              execução, fiscalização e entrega. Cada intervenção é
              acompanhada por profissionais especializados na área
              respetiva. Antes de começar, apresentamos o orçamento
              explicado ao detalhe; no final, a obra é entregue com
              garantia de 2 a 7 anos, conforme a intervenção.
            </p>
            <p>
              Trabalhamos para clientes particulares, condomínios e espaços
              comerciais — do apartamento à moradia, da loja ao escritório.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex aspect-[16/10] items-center justify-center bg-sand p-4 text-center text-sm text-charcoal/70">
            Foto · equipa em obra
          </div>
          <div className="flex aspect-square items-center justify-center rounded-full bg-cream p-4 text-center text-sm text-charcoal/70 ring-1 ring-inset ring-gold/40">
            Detalhe · mármore
          </div>
          <div className="flex aspect-square items-center justify-center bg-sand p-4 text-center text-sm text-charcoal/70">
            Antes / depois
          </div>
        </div>
      </div>
    </section>
  );
}
