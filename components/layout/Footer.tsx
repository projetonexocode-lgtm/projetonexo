import Link from "next/link";
import { Logo as NexoServicesLogo } from "@/components/nexo-services/ui/Logo";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import {
  DEFAULT_SITE,
  FOOTER_SERVICE_COLUMNS,
  type SocialLink,
} from "@/lib/cms/defaults";
import { buildWhatsAppUrl } from "@/lib/site";

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
  certificateHeading?: string;
  certificateIssuer?: string;
  certificateCompany?: string;
  certificateNipc?: string;
  certificateAlvara?: string;
  alsoDoTitle?: string;
  alsoDoBody?: string;
  socialLinks?: SocialLink[];
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
  certificateHeading = DEFAULT_SITE.footerCertificateHeading,
  certificateIssuer = DEFAULT_SITE.footerCertificateIssuer,
  certificateCompany = DEFAULT_SITE.footerCertificateCompany,
  certificateNipc = DEFAULT_SITE.footerCertificateNipc,
  certificateAlvara = DEFAULT_SITE.footerCertificateAlvara,
  alsoDoTitle = DEFAULT_SITE.footerAlsoDoTitle,
  alsoDoBody = DEFAULT_SITE.footerAlsoDoBody,
  socialLinks = DEFAULT_SITE.socialLinks,
}: FooterProps) {
  const certificateDetails = [certificateNipc, certificateAlvara].filter(
    (line): line is string => Boolean(line),
  );

  return (
    <footer className="bg-ink px-5 pt-14 text-cream/70 sm:px-8 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 border-b border-gold/28 pb-10 lg:grid-cols-[1.15fr_0.95fr_1.45fr] lg:gap-14">
          <div>
            <Link
              href="/"
              className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
              aria-label={`${name} — início`}
            >
              <Logo onDark size="footer" />
            </Link>
            <p className="mt-4 max-w-[32ch] text-sm leading-relaxed">{intro}</p>
            <SocialLinks links={socialLinks} />
          </div>

          <div>
            <p className="type-label mb-4 text-gold">{contactsHeading}</p>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/#contacto" className="hit-link hover:text-gold">
                  {contactRequestLabel}
                </Link>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl("os vossos serviços", whatsappIntro, e164)}
                  className="hit-link group gap-2 whitespace-nowrap"
                >
                  <span>{whatsappPrefix}</span>
                  <span className="text-gold group-hover:text-cream">
                    {whatsappDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phoneTel}`}
                  className="hit-link group gap-2 whitespace-nowrap"
                >
                  <span>{phonePrefix}</span>
                  <span className="text-gold group-hover:text-cream">
                    {phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="hit-link group gap-2 whitespace-nowrap"
                >
                  <span className="shrink-0">{emailPrefix}</span>
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
            <p className="type-label mb-4 text-gold">{servicesHeading}</p>
            <div className="grid grid-cols-1 gap-x-10 gap-y-2.5 sm:grid-cols-2">
              {FOOTER_SERVICE_COLUMNS.map((column) => (
                <ul key={column[0]?.slug} className="flex flex-col gap-2.5 text-sm">
                  {column.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/servicos/${service.slug}`}
                        className="hit-link hover:text-gold"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 border-b border-gold/28 py-8 sm:grid-cols-3 sm:gap-10">
          <div>
            <p className="type-label mb-3 text-gold">{guaranteesHeading}</p>
            <p className="max-w-[36ch] text-sm leading-relaxed">{footerGuarantees}</p>
            <Link
              href="/faq"
              className="hit-link mt-3 text-sm text-gold hover:text-cream"
            >
              {footerGuaranteesCta}
            </Link>
          </div>

          <div>
            {certificateHeading ? (
              <p className="type-label mb-3 text-gold">{certificateHeading}</p>
            ) : null}
            <ul className="flex flex-col gap-1.5 text-sm text-cream">
              {certificateIssuer ? <li>{certificateIssuer}</li> : null}
              {certificateCompany ? (
                <li className="font-medium">{certificateCompany}</li>
              ) : null}
            </ul>
            {certificateDetails.length > 0 ? (
              <div className="mt-2 flex flex-col gap-1 text-[13px] leading-snug text-cream/80 sm:text-sm">
                {certificateDetails.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col sm:items-center sm:text-center">
            {alsoDoTitle ? (
              <p className="type-label mb-3 text-gold">{alsoDoTitle}</p>
            ) : null}
            {alsoDoBody ? (
              <p className="mb-5 max-w-[28ch] text-sm leading-relaxed text-cream/75">
                {alsoDoBody}
              </p>
            ) : null}
            <Link
              href={nexoServicesUrl}
              aria-label={repairsLabel}
              className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
            >
              <NexoServicesLogo onDark size="compact" />
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-xs text-cream/60">
          <span>
            © {new Date().getFullYear()} {name}. {copyright}
          </span>
          <Link href={nexoServicesUrl} className="hit-link font-medium text-gold hover:text-cream">
            {footerNexoLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
