export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQS: FaqItem[] = [
  {
    question: "Qual é o horário de atendimento?",
    answer:
      "[PLACEHOLDER — horário exacto a confirmar pelo cliente.] Atendimento com foco em urgência, com prioridade na Região Metropolitana de Lisboa e Margem Sul. Fora da área imediata, o horário depende da disponibilidade da equipa.",
  },
  {
    question: "Em quanto tempo chega o técnico?",
    answer:
      "[PLACEHOLDER — prazo médio de chegada a confirmar.] Na Área Metropolitana de Lisboa e Margem Sul o objetivo é intervir no próprio dia, sempre que a agenda e o tipo de avaria o permitam. No resto do país, o prazo depende da disponibilidade e da distância.",
  },
  {
    question: "Atendem só em Lisboa?",
    answer:
      "A base de operação é Lisboa. O foco imediato de atendimento é a Região Metropolitana de Lisboa e a Margem Sul. Há cobertura nacional mediante disponibilidade — confirme a sua localidade por telefone ou WhatsApp.",
  },
  {
    question: "Como funciona o preço?",
    answer:
      "[PLACEHOLDER — confirmar se a deslocação e o orçamento são cobrados.] O técnico avalia no local e explica o orçamento antes de começar. Só avançamos com o seu acordo. Não há valores publicados neste site porque cada avaria é diferente.",
  },
  {
    question: "Os serviços têm garantia?",
    answer:
      "Sim. Nas reparações e serviços especializados, a garantia é de 6 meses, 1 ano ou 2 anos, conforme o tipo de serviço. Nas instalações com materiais fornecidos pelo próprio cliente (equipamento ou material comprado por sua conta), a garantia é de 6 meses sobre o serviço de instalação — o material segue a garantia do fabricante ou fornecedor.",
  },
  {
    question: "Atendem ao fim de semana?",
    answer:
      "[PLACEHOLDER — confirmar fins de semana e feriados.] Para urgências na Área Metropolitana de Lisboa e Margem Sul, contacte por telefone ou WhatsApp. Confirmamos disponibilidade no momento.",
  },
];
