import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { HashScroll } from "@/components/layout/HashScroll";
import { Header } from "@/components/layout/Header";
import { getCmsContent } from "@/lib/cms/content";

export const revalidate = 60;

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { site, services } = await getCmsContent();

  return (
    <div className="theme-nexo flex min-h-full flex-1 flex-col bg-cream font-sans text-charcoal">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-espresso focus:px-4 focus:py-2 focus:text-warm"
      >
        Saltar para o conteúdo
      </a>
      <HashScroll />
      <Header
        name={site.name}
        nav={site.nav}
        phoneDisplay={site.phoneDisplay}
        phoneTel={site.phoneTel}
        whatsappDisplay={site.whatsappDisplay}
        whatsappCta={site.whatsappCta}
        intro={site.whatsappIntro}
        e164={site.whatsappE164}
      />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer
        name={site.name}
        intro={site.footerIntro}
        locationLine={site.locationLine}
        whatsappDisplay={site.whatsappDisplay}
        phoneDisplay={site.phoneDisplay}
        phoneTel={site.phoneTel}
        contactEmail={site.contactEmail}
        e164={site.whatsappE164}
        whatsappIntro={site.whatsappIntro}
        nexoServicesUrl={site.nexoServicesUrl}
        footerNexoLabel={site.footerNexoLabel}
        footerGuarantees={site.footerGuarantees}
        footerGuaranteesCta={site.footerGuaranteesCta}
        footerServices={services.filter((item) => item.inFooter)}
        contactsHeading={site.footerContactsHeading}
        contactRequestLabel={site.footerContactRequestLabel}
        whatsappPrefix={site.footerWhatsappPrefix}
        phonePrefix={site.footerPhonePrefix}
        emailPrefix={site.footerEmailPrefix}
        blogLabel={site.footerBlogLabel}
        servicesHeading={site.footerServicesHeading}
        repairsLabel={site.footerRepairsLabel}
        guaranteesHeading={site.footerGuaranteesHeading}
        copyright={site.footerCopyright}
      />
    </div>
  );
}
