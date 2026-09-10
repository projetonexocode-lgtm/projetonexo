import Link from "next/link";
import { ServiceSpotlight } from "@/components/sections/ServiceSpotlight";
import type { CmsService } from "@/lib/cms/content";
import { DEFAULT_SERVICES_PAGE, DEFAULT_SITE } from "@/lib/cms/defaults";

type ServicesProps = {
  heading?: string;
  intro?: string;
  contactLinkLabel?: string;
  cardCta?: string;
  nexoKicker?: string;
  nexoHeading?: string;
  nexoBody?: string;
  nexoCta?: string;
  nexoServicesUrl?: string;
  featured?: CmsService[];
  introWhatsapp?: string;
  e164?: string;
};

export function Services({
  heading = DEFAULT_SERVICES_PAGE.heading,
  intro = DEFAULT_SERVICES_PAGE.intro,
  contactLinkLabel = DEFAULT_SERVICES_PAGE.contactLinkLabel,
  cardCta = DEFAULT_SERVICES_PAGE.cardCta,
  nexoKicker = DEFAULT_SERVICES_PAGE.nexoKicker,
  nexoHeading = DEFAULT_SERVICES_PAGE.nexoHeading,
  nexoBody = DEFAULT_SERVICES_PAGE.nexoBody,
  nexoCta = DEFAULT_SERVICES_PAGE.nexoCta,
  nexoServicesUrl = DEFAULT_SITE.nexoServicesUrl,
  featured = [],
  introWhatsapp,
  e164,
}: ServicesProps) {
  return (
    <section
      id="servicos"
      className="scroll-mt-32 bg-ink px-5 py-20 sm:px-8 sm:py-28 lg:py-36"
    >
      <div className="mx-auto min-w-0 max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[18ch] font-display text-3xl leading-[1.1] text-cream sm:text-4xl lg:text-[2.75rem]">
            {heading}
          </h2>
          <p className="max-w-[46ch] text-base leading-[1.7] tracking-[0.01em] text-cream">
            {intro}
          </p>
        </div>

        <ServiceSpotlight
          services={featured}
          cardCta={cardCta}
          intro={introWhatsapp}
          e164={e164}
        />

        <p className="mt-8 text-sm text-cream/70">
          <a
            href="#contacto"
            className="hit-link underline decoration-gold/60 underline-offset-4 hover:text-cream"
          >
            {contactLinkLabel}
          </a>
        </p>

        <Link
          href={nexoServicesUrl}
          aria-label={nexoCta}
          className="mt-14 grid min-w-0 gap-6 rounded-2xl bg-sand p-5 text-charcoal transition-colors hover:bg-cream sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:items-center sm:gap-8 sm:p-12"
        >
          <div className="min-w-0">
            <span className="type-label inline-block rounded-full border border-gold/50 px-3.5 py-1.5 text-accent">
              {nexoKicker}
            </span>
            <h3 className="mt-5 max-w-[24ch] font-display text-[clamp(1.35rem,6.2vw,2.25rem)] leading-tight sm:text-4xl">
              {nexoHeading}
            </h3>
            <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-charcoal">
              {nexoBody}
            </p>
          </div>
          <div className="flex min-w-0 items-center sm:justify-end">
            <img
              src="/assets/nexo-services-fundo-claro.svg"
              alt=""
              width={680}
              height={400}
              className="h-16 w-auto max-w-[16rem] sm:h-[5.5rem] sm:max-w-[20rem]"
              decoding="async"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
