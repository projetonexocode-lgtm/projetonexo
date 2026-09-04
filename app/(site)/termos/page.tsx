import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos",
  description: "Termos de utilização do site da Projeto Nexo.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-display text-4xl text-charcoal">
        Termos de utilização
      </h1>
      <div className="mt-8 max-w-[65ch] space-y-5 text-base leading-relaxed text-charcoal/80">
        <p>
          Este site pertence à {SITE.legalName}, com base em Lisboa, Portugal.
          Os conteúdos institucionais destinam-se a informar sobre serviços de
          remodelação, construção e reabilitação.
        </p>
        <p>
          Os pedidos enviados pelo formulário ou pelo WhatsApp são usados
          apenas para responder ao contacto. Não vendemos nem cedemos dados a
          terceiros.
        </p>
        <p>
          As fotografias da galeria inicial são imagens de banco, claramente
          identificadas como temporárias, até à substituição por projetos
          reais.
        </p>
        <p>
          A política de garantias está descrita na página{" "}
          <a href="/faq" className="text-accent underline">
            Garantias e FAQ
          </a>
          .
        </p>
        <p>
          Reparações e serviços especializados são prestados através da{" "}
          <a href={SITE.nexoServicesUrl} className="text-accent underline">
            Nexo Services
          </a>
          .
        </p>
      </div>
    </div>
  );
}
