import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="sobre" className="scroll-mt-28 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading
          eyebrow="Sobre a empresa"
          title="Obra com direção, não um somatório de tarefas."
          highlight="direção"
        />
        <div className="space-y-5 text-base leading-relaxed text-charcoal/80 sm:text-lg">
          <p>
            A Projeto Nexo é uma empresa de gestão de obras e projetos,
            focada em remodelação, construção e reabilitação de imóveis. A base
            de trabalho está em Lisboa e na Área Metropolitana; a atuação
            cobre o país inteiro, sempre com a mesma exigência de
            coordenação.
          </p>
          <p>
            O fundador está há mais de três anos à frente desta estrutura. O
            trabalho no terreno é feito com profissionais parceiros
            especializados — alguns com 5, 15 e mais de 20 anos de prática —
            o que permite tratar cada especialidade com critério próprio, sem
            diluir responsabilidades.
          </p>
          <p>
            O objetivo é simples: um interlocutor claro, um plano de obra
            legível e uma execução acompanhada até à entrega. Sem números
            inflacionados e sem promessas que a obra não possa sustentar.
          </p>
        </div>
      </div>
    </section>
  );
}
