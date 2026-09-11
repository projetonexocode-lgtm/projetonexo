import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactForm } from "@/components/sections/ContactForm";
import { Coverage } from "@/components/sections/Coverage";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { Services } from "@/components/sections/Services";
import { contactServiceOptions, getCmsContent } from "@/lib/cms/content";

export const revalidate = 60;

export default async function HomePage() {
  const content = await getCmsContent();
  const { site, servicesPage, gallery, contact } = content;
  const featured = content.services.filter((item) => item.featured);

  return (
    <>
      <Hero
        heading={site.heroHeading}
        highlight={site.heroHeadingHighlight}
        lede={site.heroLede}
        whatsappCta={site.whatsappCta}
        secondaryCta={site.heroSecondaryCta}
        secondaryHref={site.heroSecondaryHref}
        slides={site.heroSlides}
        intro={site.whatsappIntro}
        e164={site.whatsappE164}
      />
      <Method
        heading={site.methodHeading}
        steps={site.methodSteps}
        imageSrc={site.methodImage.src}
        imageAlt={site.methodImage.alt}
      />
      <Gallery
        heading={gallery.heading}
        projects={gallery.projects}
        mosaicContact={gallery.mosaicContact}
        mosaicWork={gallery.mosaicWork}
      />
      <Services
        heading={servicesPage.heading}
        intro={servicesPage.intro}
        contactLinkLabel={servicesPage.contactLinkLabel}
        cardCta={servicesPage.cardCta}
        nexoKicker={servicesPage.nexoKicker}
        nexoHeading={servicesPage.nexoHeading}
        nexoBody={servicesPage.nexoBody}
        nexoCta={servicesPage.nexoCta}
        nexoServicesUrl={site.nexoServicesUrl}
        featured={featured}
        introWhatsapp={site.whatsappIntro}
        e164={site.whatsappE164}
      />
      <Coverage
        heading={site.coverageHeading}
        highlight={site.coverageHighlight}
        subheading={site.coverageSubheading}
        subheadingHighlight={site.coverageSubheadingHighlight}
        body={site.coverageBody}
        regions={site.coverageRegions}
        mapLabel={site.coverageMapLabel}
        mapsCta={site.coverageMapsCta}
        mapsEmbedUrl={site.mapsEmbedUrl}
        mapsLink={site.mapsLink}
      />
      <BlogPreview
        heading={site.blogHeading}
        highlight={site.blogHeadingHighlight}
        intro={site.blogIntro}
        allCta={site.blogAllCta}
        readCta={site.blogReadCta}
        emptyTitle={site.blogEmptyTitle}
        emptyBody={site.blogEmptyBody}
        emptyAside={site.blogEmptyAside}
        emptyCta={site.blogEmptyCta}
      />
      <ContactForm
        heading={contact.heading}
        body={contact.body}
        submitLabel={contact.submitLabel}
        submittingLabel={contact.submittingLabel}
        successMessage={contact.successMessage}
        consent={contact.consent}
        nameLabel={contact.nameLabel}
        phoneLabel={contact.phoneLabel}
        phoneHint={contact.phoneHint}
        emailLabel={contact.emailLabel}
        emailHint={contact.emailHint}
        serviceLabel={contact.serviceLabel}
        messageLabel={contact.messageLabel}
        namePlaceholder={contact.namePlaceholder}
        phonePlaceholder={contact.phonePlaceholder}
        emailPlaceholder={contact.emailPlaceholder}
        servicePlaceholder={contact.servicePlaceholder}
        messagePlaceholder={contact.messagePlaceholder}
        serviceOptions={contactServiceOptions(content)}
        whatsappDisplay={site.whatsappDisplay}
        phoneDisplay={site.phoneDisplay}
        phoneTel={site.phoneTel}
        e164={site.whatsappE164}
      />
    </>
  );
}
