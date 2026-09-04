import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WORK_SERVICES, type ServiceItem } from "@/lib/services";
import { buildWhatsAppUrl } from "@/lib/site";

const SPOTLIGHT_SLUGS = [
  "wc-casa-de-banho",
  "apartamento",
  "cozinha",
  "reabilitacao-de-imoveis",
] as const;

const SPOTLIGHT: ServiceItem[] = SPOTLIGHT_SLUGS.flatMap((slug) => {
  const service = WORK_SERVICES.find((item) => item.slug === slug);
  return service ? [service] : [];
});

export function ServiceSpotlight() {
  return (
    <ul className="grid gap-3.5 sm:grid-cols-2">
      {SPOTLIGHT.map((service) => {
        if (service.cta.type !== "whatsapp") return null;

        const action = "Pedir orçamento no WhatsApp";

        return (
          <li key={service.slug}>
            <a
              href={buildWhatsAppUrl(service.cta.serviceLabel)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${service.title} — ${action}`}
              className="flex min-h-43 flex-col gap-2.5 rounded-2xl border border-cream/12 bg-cream/6 px-6 py-6 text-cream transition-colors hover:border-gold/50 hover:bg-gold/14"
            >
              <span className="text-lg font-medium tracking-tight">
                {service.title}
              </span>
              <span className="text-sm leading-relaxed text-cream/80">
                {service.description}
              </span>
              <span className="mt-auto inline-flex items-center gap-2 text-sm text-gold">
                <WhatsAppIcon punchColor="var(--color-ink)" className="size-3.5 shrink-0" />
                {action}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
