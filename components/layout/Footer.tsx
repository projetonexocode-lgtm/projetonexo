import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { buildWhatsAppUrl } from "@/lib/site";
import type { CmsService } from "@/lib/cms/content";
import { DEFAULT_SERVICES, DEFAULT_SITE } from "@/lib/cms/defaults";

type FooterProps = {
  name?: string;
  intro?: string;
  locationLine?: string;
  whatsappDisplay?: string;
  phoneDisplay?: string;
  phoneTel?: string;
  contactEmail?: string;
  e164?: string;
  whatsappIntro?: string;
  nexoServicesUrl?: string;
  footerNexoLabel?: string;
  footerGuarantees?: string;
  footerGuaranteesCta?: string;
  footerServices?: CmsService[];
  contactsHeading?: string;
  contactRequestLabel?: string;
  whatsappPrefix?: string;
  phonePrefix?: string;
  emailPrefix?: string;
  blogLabel?: string;
  servicesHeading?: string;
  repairsLabel?: string;
  guaranteesHeading?: string;
  copyright?: string;
};

export function Footer({
  name = DEFAULT_SITE.name,
  intro = DEFAULT_SITE.footerIntro,
  locationLine = DEFAULT_SITE.locationLine,
  whatsappDisplay = DEFAULT_SITE.whatsappDisplay,
  phoneDisplay = DEFAULT_SITE.phoneDisplay,
  phoneTel = DEFAULT_SITE.phoneTel,
  contactEmail = DEFAULT_SITE.contactEmail,
  e164,
  whatsappIntro,
  nexoServicesUrl = DEFAULT_SITE.nexoServicesUrl,
  footerNexoLabel = DEFAULT_SITE.footerNexoLabel,
  footerGuarantees = DEFAULT_SITE.footerGuarantees,
  footerGuaranteesCta = DEFAULT_SITE.footerGuaranteesCta,
  footerServices = [],
  contactsHeading = DEFAULT_SITE.footerContactsHeading,
  contactRequestLabel = DEFAULT_SITE.footerContactRequestLabel,
  whatsappPrefix = DEFAULT_SITE.footerWhatsappPrefix,
  phonePrefix = DEFAULT_SITE.footerPhonePrefix,
  emailPrefix = DEFAULT_SITE.footerEmailPrefix,
  blogLabel = DEFAULT_SITE.footerBlogLabel,
  servicesHeading = DEFAULT_SITE.footerServicesHeading,
  repairsLabel = DEFAULT_SITE.footerRepairsLabel,
  guaranteesHeading = DEFAULT_SITE.footerGuaranteesHeading,
  copyright = DEFAULT_SITE.footerCopyright,
}: FooterProps) {
  const serviceLinks =
    footerServices.length > 0
      ? footerServices
      : DEFAULT_SERVICES.filter((item) => item.inFooter).map((item) => ({
          ...item,
        }));

  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto grid max-w-6xl gap-10 border-b border-gold/28 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Link
            href="/"
            className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
            aria-label={`${name} — início`}
          >
            <Logo onDark size="footer" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{intro}</p>
        </div>

        <div>
          <p className="type-label text-gold">{contactsHeading}</p>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <Link href="/#contacto" className="hit-link hover:text-gold">
                {contactRequestLabel}
              </Link>
            </li>
            <li>
              <a
                href={buildWhatsAppUrl("os vossos serviços", whatsappIntro, e164)}
                className="hit-link group"
              >
                {whatsappPrefix} ·{" "}
                <span className="text-gold group-hover:text-cream">
                  {whatsappDisplay}
                </span>
              </a>
            </li>
            <li>
              <a href={`tel:${phoneTel}`} className="hit-link group">
                {phonePrefix} ·{" "}
                <span className="text-gold group-hover:text-cream">
                  {phoneDisplay}
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contactEmail}`} className="hit-link group">
                {emailPrefix} -{" "}
                <span className="text-gold group-hover:text-cream">
                  {contactEmail}
                </span>
              </a>
            </li>
            <li className="flex min-h-6 items-center">{locationLine}</li>
            <li>
              <Link href="/blog" className="hit-link hover:text-gold">
                {blogLabel}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="type-label text-gold">{servicesHeading}</p>
          <ul className="mt-4 space-y-1 text-sm">
            {serviceLinks.map((service) => (
              <li key={service.slug}>
                <Link href="/#servicos" className="hit-link hover:text-gold">
                  {service.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={nexoServicesUrl}
                className="hit-link gap-1.5 text-gold hover:text-cream"
              >
                {repairsLabel}
                <ExternalLink className="size-3.5 shrink-0" aria-hidden />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="type-label text-gold">{guaranteesHeading}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{footerGuarantees}</p>
          <Link href="/faq" className="hit-link mt-3 text-sm text-gold hover:text-cream">
            {footerGuaranteesCta}
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 pt-4 text-xs text-cream/80 sm:px-8 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <span>
          © {new Date().getFullYear()} {name}. {copyright}
        </span>
        <Link href={nexoServicesUrl} className="hit-link hover:text-cream">
          {footerNexoLabel}
        </Link>
      </div>
    </footer>
  );
}
