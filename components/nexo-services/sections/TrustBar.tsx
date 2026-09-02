import { PlaceholderNote } from "@/components/nexo-services/ui/PlaceholderNote";
import { TRUST_ITEMS } from "@/lib/nexo-services/content";

export function TrustBar() {
  return (
    <section aria-label="Indicadores de confiança" className="px-4 pb-10 sm:px-8">
      <ul className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3">
        {TRUST_ITEMS.map((item) => (
          <li
            key={item.label}
            className="border border-bronze/20 bg-sand px-4 py-5 sm:px-5 sm:py-6"
          >
            {item.placeholder ? (
              <PlaceholderNote>Placeholder — cliente a enviar</PlaceholderNote>
            ) : null}
            <p className="font-display text-2xl leading-tight text-charcoal sm:text-[1.75rem]">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-charcoal/75">{item.label}</p>
            <p className="mt-3 text-xs leading-relaxed text-charcoal/60">
              {item.note}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
