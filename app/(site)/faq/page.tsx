import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Garantias e FAQ",
  description:
    "Política de garantias da Projeto Nexo: 2 a 7 anos conforme o tipo de intervenção, e 6 meses em instalações com material do cliente.",
};

const FAQS = [
  {
    question: "Qual é a garantia das remodelações e obras?",
    answer:
      "Remodelações, obras, instalações e substituições têm garantia entre 2, 3, 5 e 7 anos. O prazo concreto varia conforme as características da intervenção e as normas técnicas em vigor.",
  },
  {
    question: "E se o material for fornecido pelo cliente?",
    answer:
      "Nas instalações com materiais fornecidos pelo próprio cliente, a garantia da Projeto Nexo sobre o serviço de instalação é de 6 meses. O material em si segue a garantia do fabricante ou fornecedor, não da Projeto Nexo.",
  },
  {
    question: "A empresa só trabalha em Lisboa?",
    answer:
      "A sede e a base operacional estão em Lisboa e Área Metropolitana. Atendemos também em todo o território nacional.",
  },
  {
    question: "Como peço um orçamento?",
    answer:
      "O caminho mais direto é o WhatsApp, com o serviço já identificado. Também pode usar o formulário de contacto ou o telefone fixo.",
  },
  {
    question: "As reparações são feitas pela Projeto Nexo?",
    answer:
      "Reparações e serviços especializados são encaminhados para a Nexo Services, para não misturar a obra de fundo com a manutenção pontual.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
        Condições claras, <span className="text-accent">por escrito</span>.
      </h1>
      <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-charcoal/75">
        Resumo no site: garantia de 2 a 7 anos. Abaixo, a política completa —
        sem cláusulas escondidas e sem prazos inventados.
      </p>

      <div className="mt-10 border border-card bg-card p-6">
        <h2 className="font-display text-2xl text-warm">
          Política de garantias
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-warm/80">
          <li>
            Remodelações, obras, instalações e substituições: garantias entre
            2, 3, 5 e 7 anos, variando conforme as características da
            intervenção e as normas técnicas em vigor.
          </li>
          <li>
            Instalações com materiais fornecidos pelo próprio cliente: 6 meses
            de garantia sobre o serviço de instalação. O material segue a
            garantia do fabricante ou fornecedor.
          </li>
        </ul>
      </div>

      <ul className="mt-10 space-y-6">
        {FAQS.map((item) => (
          <li key={item.question} className="border-t border-bronze/25 pt-6">
            <h2 className="font-display text-xl text-charcoal">
              {item.question}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
              {item.answer}
            </p>
          </li>
        ))}
      </ul>

      <WhatsAppButton serviceLabel="as vossas garantias" className="mt-10">
        Esclarecer no WhatsApp
      </WhatsAppButton>
    </div>
  );
}
