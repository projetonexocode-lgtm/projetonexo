import { ProjectServiceIcon } from "@/components/ui/ProjectServiceIcon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import type { CmsService } from "@/lib/cms/content";
import { DEFAULT_SERVICES, DEFAULT_SERVICES_PAGE } from "@/lib/cms/defaults";
import { buildWhatsAppUrl } from "@/lib/site";

type ServiceSpotlightProps = {
  services?: CmsService[];
  cardCta?: string;
  intro?: string;
  e164?: string;
};

export function ServiceSpotlight({
  services,
  cardCta = DEFAULT_SERVICES_PAGE.cardCta,
  intro,
  e164,
}: ServiceSpotlightProps) {
  const items: CmsService[] =
    services && services.length > 0
      ? services
      : DEFAULT_SERVICES.filter((item) => item.featured);

  return (
    <ul className="grid gap-3.5 sm:grid-cols-2">
      {items.map((service) => (
        <li key={service.slug}>
          <a
            href={buildWhatsAppUrl(service.whatsappLabel, intro, e164)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${service.title} — ${cardCta}`}
            className="flex min-h-43 flex-col overflow-hidden rounded-2xl border border-cream/12 bg-cream/6 px-6 py-6 text-cream transition-colors hover:border-gold/50 hover:bg-gold/14"
          >
            <span className="inline-flex size-11 items-center justify-center border border-gold/45 text-gold">
              <ProjectServiceIcon slug={service.slug} className="size-5" />
            </span>
            <span className="mt-2.5 text-lg font-medium tracking-tight">
              {service.title}
            </span>
            <span className="mt-2.5 text-sm leading-relaxed text-cream/80">
              {service.description}
            </span>
            <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm text-gold">
              <WhatsAppIcon punchColor="var(--color-ink)" className="size-3.5 shrink-0" />
              {cardCta}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
