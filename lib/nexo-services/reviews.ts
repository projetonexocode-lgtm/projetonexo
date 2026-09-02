export type Review = {
  name: string;
  location: string;
  stars: 5;
  quote: string;
};

export const REVIEWS_DISCLAIMER =
  "Exemplos ilustrativos — a substituir por avaliações reais do cliente.";

export const REVIEWS: Review[] = [
  {
    name: "Ana R.",
    location: "Cascais",
    stars: 5,
    quote:
      "Fuga na canalização ao fim da tarde. Vieram no próprio dia e deixaram tudo a funcionar.",
  },
  {
    name: "João M.",
    location: "Almada",
    stars: 5,
    quote:
      "Quadro a disparar. O eletricista identificou o problema, explicou o orçamento e resolveu.",
  },
  {
    name: "Sofia P.",
    location: "Oeiras",
    stars: 5,
    quote:
      "Estore eléctrico avariado. Chegaram identificados, trabalho limpo e com garantia.",
  },
  {
    name: "Ricardo T.",
    location: "Setúbal",
    stars: 5,
    quote:
      "Portão de garagem que não abria. Diagnóstico claro e reparação no mesmo dia.",
  },
  {
    name: "Marta L.",
    location: "Lisboa",
    stars: 5,
    quote:
      "Sem água quente. Intervenção ao esquentador rápida e preço explicado antes de avançar.",
  },
  {
    name: "Pedro C.",
    location: "Seixal",
    stars: 5,
    quote:
      "Desentupimento urgente. Contacto por WhatsApp, técnico no local e problema resolvido.",
  },
];
