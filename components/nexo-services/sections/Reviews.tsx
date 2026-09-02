import { PlaceholderNote } from "@/components/nexo-services/ui/PlaceholderNote";
import { SectionHeading } from "@/components/nexo-services/ui/SectionHeading";
import { REVIEWS, REVIEWS_DISCLAIMER } from "@/lib/nexo-services/reviews";

export function Reviews() {
  return (
    <section id="avaliacoes" className="scroll-mt-28 px-4 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Prova social"
          title="Quem já precisou de nós."
          highlight="precisou"
        />
        <PlaceholderNote className="mt-4">{REVIEWS_DISCLAIMER}</PlaceholderNote>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {REVIEWS.map((review) => (
            <li
              key={`${review.name}-${review.location}`}
              className="border border-bronze/20 bg-sand p-5"
            >
              <p className="text-gold" aria-label="5 estrelas">
                {"★★★★★"}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
                “{review.quote}”
              </p>
              <p className="mt-4 text-sm font-medium text-charcoal">
                {review.name}
              </p>
              <p className="text-xs text-charcoal/60">{review.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
