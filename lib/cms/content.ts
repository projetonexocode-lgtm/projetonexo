import { getPayload } from "payload";
import config from "@payload-config";
import {
  DEFAULT_ABOUT,
  DEFAULT_CONTACT,
  DEFAULT_GALLERY,
  DEFAULT_SERVICES,
  DEFAULT_SERVICES_PAGE,
  DEFAULT_SITE,
  isSocialNetwork,
  type SocialLink,
} from "@/lib/cms/defaults";
import { SERVICE_PHOTOS } from "@/lib/service-photos";

export type NavItem = { label: string; href: string };

export type CmsService = {
  title: string;
  slug: string;
  description: string;
  whatsappLabel: string;
  contactLabel: string;
  featured: boolean;
  inContactForm: boolean;
  inFooter: boolean;
  imageUrl?: string;
  imageAlt?: string;
};

export type CmsContent = {
  site: typeof DEFAULT_SITE;
  about: typeof DEFAULT_ABOUT;
  servicesPage: typeof DEFAULT_SERVICES_PAGE;
  gallery: typeof DEFAULT_GALLERY;
  contact: typeof DEFAULT_CONTACT;
  services: CmsService[];
};

export type CmsPost = {
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  coverUrl?: string;
  body: unknown;
};

export function contactServiceOptions(content: CmsContent): string[] {
  const labels = content.services
    .filter((item) => item.inContactForm)
    .map((item) => item.contactLabel)
    .filter((label) => label.trim().length > 0);
  const unique = [...new Set(labels)];
  const options = unique.length > 0
    ? unique
    : DEFAULT_SERVICES.filter((item) => item.inContactForm).map(
        (item) => item.contactLabel,
      );
  return [...options, content.contact.otherServiceOption];
}

function text(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function mediaUrl(value: unknown): string | undefined {
  if (value && typeof value === "object" && "url" in value) {
    const url = (value as { url?: unknown }).url;
    if (typeof url === "string" && url) return url;
  }
  return undefined;
}

function mapNav(value: unknown): NavItem[] {
  if (!Array.isArray(value) || value.length === 0) {
    return DEFAULT_SITE.nav;
  }
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as { label?: unknown; href?: unknown };
    if (typeof row.label !== "string" || typeof row.href !== "string") return [];
    return [{ label: row.label, href: row.href }];
  });
}

function mapSocialLinks(value: unknown): SocialLink[] {
  if (!Array.isArray(value)) return DEFAULT_SITE.socialLinks;
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as {
      network?: unknown;
      url?: unknown;
      enabled?: unknown;
    };
    if (!isSocialNetwork(row.network)) return [];
    return [
      {
        network: row.network,
        url: typeof row.url === "string" ? row.url : "",
        enabled: Boolean(row.enabled),
      },
    ];
  });
}

export async function getCmsContent(): Promise<CmsContent> {
  try {
    const payload = await getPayload({ config });
    const [site, about, servicesPage, gallery, contact, services] =
      await Promise.all([
        payload.findGlobal({ slug: "site", depth: 1 }),
        payload.findGlobal({ slug: "about", depth: 1 }),
        payload.findGlobal({ slug: "servicesPage", depth: 1 }),
        payload.findGlobal({ slug: "gallery", depth: 3 }),
        payload.findGlobal({ slug: "contact", depth: 1 }),
        payload.find({
          collection: "services",
          limit: 100,
          depth: 1,
        }),
      ]);

    const mappedServices: CmsService[] =
      services.docs.length > 0
        ? services.docs.map((doc) => {
            const fallbackPhoto = SERVICE_PHOTOS[text(doc.slug, "")];
            return {
              title: text(doc.title, ""),
              slug: text(doc.slug, ""),
              description: text(doc.description, ""),
              whatsappLabel: text(doc.whatsappLabel, ""),
              contactLabel: text(doc.contactLabel, text(doc.title, "")),
              featured: Boolean(doc.featured),
              inContactForm: doc.inContactForm !== false,
              inFooter: Boolean(doc.inFooter),
              imageUrl:
                mediaUrl(doc.image) ||
                text(
                  (doc as { imageUrl?: string | null }).imageUrl,
                  fallbackPhoto?.src ?? "",
                ) ||
                undefined,
              imageAlt: text(
                (doc as { imageAlt?: string | null }).imageAlt,
                fallbackPhoto?.alt ?? "",
              ),
            };
          })
        : DEFAULT_SERVICES.map((item) => {
            const photo = SERVICE_PHOTOS[item.slug];
            return {
              ...item,
              imageUrl: photo?.src,
              imageAlt: photo?.alt,
            };
          });

    return {
      site: {
        ...DEFAULT_SITE,
        name: text(site.name, DEFAULT_SITE.name),
        legalName: text(site.legalName, DEFAULT_SITE.legalName),
        tagline: text(site.tagline, DEFAULT_SITE.tagline),
        seoDescription: text(site.seoDescription, DEFAULT_SITE.seoDescription),
        whatsappE164: text(site.whatsappE164, DEFAULT_SITE.whatsappE164),
        whatsappDisplay: text(site.whatsappDisplay, DEFAULT_SITE.whatsappDisplay),
        phoneDisplay: text(site.phoneDisplay, DEFAULT_SITE.phoneDisplay),
        phoneTel: text(site.phoneTel, DEFAULT_SITE.phoneTel),
        contactEmail: text(site.contactEmail, DEFAULT_SITE.contactEmail),
        nexoServicesUrl: text(site.nexoServicesUrl, DEFAULT_SITE.nexoServicesUrl),
        nexoServicesLabel: text(
          site.nexoServicesLabel,
          DEFAULT_SITE.nexoServicesLabel,
        ),
        whatsappCta: text(site.whatsappCta, DEFAULT_SITE.whatsappCta),
        whatsappIntro: text(site.whatsappIntro, DEFAULT_SITE.whatsappIntro),
        nav: mapNav(site.nav),
        heroHeading: text(site.heroHeading, DEFAULT_SITE.heroHeading),
        heroHeadingHighlight: text(
          site.heroHeadingHighlight,
          DEFAULT_SITE.heroHeadingHighlight,
        ),
        heroLede: text(site.heroLede, DEFAULT_SITE.heroLede),
        heroSecondaryCta: text(
          site.heroSecondaryCta,
          DEFAULT_SITE.heroSecondaryCta,
        ),
        heroSecondaryHref: text(
          site.heroSecondaryHref,
          DEFAULT_SITE.heroSecondaryHref,
        ),
        heroSlides:
          Array.isArray(site.heroSlides) && site.heroSlides.length > 0
            ? site.heroSlides.map((slide, index) => {
                const fallback = DEFAULT_SITE.heroSlides[index] ?? DEFAULT_SITE.heroSlides[0];
                return {
                  src: mediaUrl(slide.image) || text(slide.src, fallback.src),
                  alt: text(slide.alt, fallback.alt),
                  label: text(slide.label, fallback.label),
                };
              })
            : DEFAULT_SITE.heroSlides,
        methodHeading: text(site.methodHeading, DEFAULT_SITE.methodHeading),
        methodImage: {
          src:
            mediaUrl(
              (site as { methodPhoto?: unknown }).methodPhoto,
            ) ||
            text(
              (site as { methodPhotoUrl?: string | null }).methodPhotoUrl,
              DEFAULT_SITE.methodImage.src,
            ),
          alt: text(
            (site as { methodPhotoAlt?: string | null }).methodPhotoAlt,
            DEFAULT_SITE.methodImage.alt,
          ),
        },
        methodSteps:
          Array.isArray(site.methodSteps) && site.methodSteps.length > 0
            ? site.methodSteps.map((step, index) => ({
                title: text(step.title, DEFAULT_SITE.methodSteps[index]?.title ?? ""),
                body: text(step.body, DEFAULT_SITE.methodSteps[index]?.body ?? ""),
              }))
            : DEFAULT_SITE.methodSteps,
        coverageHeading: text(site.coverageHeading, DEFAULT_SITE.coverageHeading),
        coverageHighlight: text(
          site.coverageHighlight,
          DEFAULT_SITE.coverageHighlight,
        ),
        coverageSubheading: text(
          site.coverageSubheading,
          DEFAULT_SITE.coverageSubheading,
        ),
        coverageSubheadingHighlight: text(
          site.coverageSubheadingHighlight,
          DEFAULT_SITE.coverageSubheadingHighlight,
        ),
        coverageBody: text(site.coverageBody, DEFAULT_SITE.coverageBody),
        coverageRegions:
          Array.isArray(site.coverageRegions) && site.coverageRegions.length > 0
            ? site.coverageRegions.map((region) => ({
                label: text(region.label, ""),
              }))
            : DEFAULT_SITE.coverageRegions,
        coverageMapLabel: text(
          site.coverageMapLabel,
          DEFAULT_SITE.coverageMapLabel,
        ),
        coverageMapsCta: text(site.coverageMapsCta, DEFAULT_SITE.coverageMapsCta),
        mapsEmbedUrl: text(site.mapsEmbedUrl, DEFAULT_SITE.mapsEmbedUrl),
        mapsLink: text(site.mapsLink, DEFAULT_SITE.mapsLink),
        faqHeading: text(site.faqHeading, DEFAULT_SITE.faqHeading),
        faqHeadingHighlight: text(
          site.faqHeadingHighlight,
          DEFAULT_SITE.faqHeadingHighlight,
        ),
        faqIntro: text(site.faqIntro, DEFAULT_SITE.faqIntro),
        faqPolicyHeading: text(
          site.faqPolicyHeading,
          DEFAULT_SITE.faqPolicyHeading,
        ),
        faqPolicyItems:
          Array.isArray(site.faqPolicyItems) && site.faqPolicyItems.length > 0
            ? site.faqPolicyItems.map((item) => ({
                text: text(item.text, ""),
              }))
            : DEFAULT_SITE.faqPolicyItems,
        faqs:
          Array.isArray(site.faqs) && site.faqs.length > 0
            ? site.faqs.map((item) => ({
                question: text(item.question, ""),
                answer: text(item.answer, ""),
              }))
            : DEFAULT_SITE.faqs,
        faqWhatsappCta: text(site.faqWhatsappCta, DEFAULT_SITE.faqWhatsappCta),
        footerIntro: text(site.footerIntro, DEFAULT_SITE.footerIntro),
        footerGuarantees: text(
          site.footerGuarantees,
          DEFAULT_SITE.footerGuarantees,
        ),
        footerGuaranteesCta: text(
          site.footerGuaranteesCta,
          DEFAULT_SITE.footerGuaranteesCta,
        ),
        footerNexoLabel: text(site.footerNexoLabel, DEFAULT_SITE.footerNexoLabel),
        locationLine: text(site.locationLine, DEFAULT_SITE.locationLine),
        footerContactsHeading: text(
          (site as { footerContactsHeading?: string | null }).footerContactsHeading,
          DEFAULT_SITE.footerContactsHeading,
        ),
        footerContactRequestLabel: text(
          (site as { footerContactRequestLabel?: string | null })
            .footerContactRequestLabel,
          DEFAULT_SITE.footerContactRequestLabel,
        ),
        footerWhatsappPrefix: text(
          (site as { footerWhatsappPrefix?: string | null }).footerWhatsappPrefix,
          DEFAULT_SITE.footerWhatsappPrefix,
        ),
        footerPhonePrefix: text(
          (site as { footerPhonePrefix?: string | null }).footerPhonePrefix,
          DEFAULT_SITE.footerPhonePrefix,
        ),
        footerEmailPrefix: text(
          (site as { footerEmailPrefix?: string | null }).footerEmailPrefix,
          DEFAULT_SITE.footerEmailPrefix,
        ),
        footerBlogLabel: text(
          (site as { footerBlogLabel?: string | null }).footerBlogLabel,
          DEFAULT_SITE.footerBlogLabel,
        ),
        footerServicesHeading: text(
          (site as { footerServicesHeading?: string | null }).footerServicesHeading,
          DEFAULT_SITE.footerServicesHeading,
        ),
        footerRepairsLabel: text(
          (site as { footerRepairsLabel?: string | null }).footerRepairsLabel,
          DEFAULT_SITE.footerRepairsLabel,
        ),
        footerGuaranteesHeading: text(
          (site as { footerGuaranteesHeading?: string | null })
            .footerGuaranteesHeading,
          DEFAULT_SITE.footerGuaranteesHeading,
        ),
        footerCopyright: text(
          (site as { footerCopyright?: string | null }).footerCopyright,
          DEFAULT_SITE.footerCopyright,
        ),
        socialLinks: mapSocialLinks(
          (site as { socialLinks?: unknown }).socialLinks,
        ),
        blogHeading: text(
          (site as { blogHeading?: string | null }).blogHeading,
          DEFAULT_SITE.blogHeading,
        ),
        blogHeadingHighlight: text(
          (site as { blogHeadingHighlight?: string | null }).blogHeadingHighlight,
          DEFAULT_SITE.blogHeadingHighlight,
        ),
        blogIntro: text(
          (site as { blogIntro?: string | null }).blogIntro,
          DEFAULT_SITE.blogIntro,
        ),
        blogAllCta: text(
          (site as { blogAllCta?: string | null }).blogAllCta,
          DEFAULT_SITE.blogAllCta,
        ),
        blogReadCta: text(
          (site as { blogReadCta?: string | null }).blogReadCta,
          DEFAULT_SITE.blogReadCta,
        ),
        blogEmptyTitle: text(
          (site as { blogEmptyTitle?: string | null }).blogEmptyTitle,
          DEFAULT_SITE.blogEmptyTitle,
        ),
        blogEmptyBody: text(
          (site as { blogEmptyBody?: string | null }).blogEmptyBody,
          DEFAULT_SITE.blogEmptyBody,
        ),
        blogEmptyAside: text(
          (site as { blogEmptyAside?: string | null }).blogEmptyAside,
          DEFAULT_SITE.blogEmptyAside,
        ),
        blogEmptyCta: text(
          (site as { blogEmptyCta?: string | null }).blogEmptyCta,
          DEFAULT_SITE.blogEmptyCta,
        ),
        blogPageIntro: text(
          (site as { blogPageIntro?: string | null }).blogPageIntro,
          DEFAULT_SITE.blogPageIntro,
        ),
        blogPageEmptyTitle: text(
          (site as { blogPageEmptyTitle?: string | null }).blogPageEmptyTitle,
          DEFAULT_SITE.blogPageEmptyTitle,
        ),
        blogPageEmptyBody: text(
          (site as { blogPageEmptyBody?: string | null }).blogPageEmptyBody,
          DEFAULT_SITE.blogPageEmptyBody,
        ),
        blogPageEmptyAside: text(
          (site as { blogPageEmptyAside?: string | null }).blogPageEmptyAside,
          DEFAULT_SITE.blogPageEmptyAside,
        ),
        termsHeading: text(
          (site as { termsHeading?: string | null }).termsHeading,
          DEFAULT_SITE.termsHeading,
        ),
        termsParagraphs: Array.isArray(
          (site as { termsParagraphs?: { text?: string; linkHref?: string; linkLabel?: string }[] })
            .termsParagraphs,
        ) &&
        ((site as { termsParagraphs?: { text?: string }[] }).termsParagraphs?.length ??
          0) > 0
          ? (
              site as {
                termsParagraphs: {
                  text?: string | null;
                  linkHref?: string | null;
                  linkLabel?: string | null;
                }[];
              }
            ).termsParagraphs.map((item, index) => ({
              text: text(item.text, DEFAULT_SITE.termsParagraphs[index]?.text ?? ""),
              linkHref:
                text(
                  item.linkHref,
                  DEFAULT_SITE.termsParagraphs[index]?.linkHref ?? "",
                ) || undefined,
              linkLabel:
                text(
                  item.linkLabel,
                  DEFAULT_SITE.termsParagraphs[index]?.linkLabel ?? "",
                ) || undefined,
            })) as typeof DEFAULT_SITE.termsParagraphs
          : DEFAULT_SITE.termsParagraphs,
      },
      about: {
        heading: text(about.heading, DEFAULT_ABOUT.heading),
        headingHighlight: text(
          about.headingHighlight,
          DEFAULT_ABOUT.headingHighlight,
        ),
        paragraphs:
          Array.isArray(about.paragraphs) && about.paragraphs.length > 0
            ? about.paragraphs.map((item) => ({
                text: text(item.text, ""),
              }))
            : DEFAULT_ABOUT.paragraphs,
        placeholders:
          Array.isArray(about.placeholders) && about.placeholders.length > 0
            ? about.placeholders.map((item, index) => {
                const fallback = DEFAULT_ABOUT.placeholders[index];
                return {
                  label: text(item.label, fallback?.label ?? ""),
                  imageUrl:
                    mediaUrl(item.image) ||
                    text(item.imageUrl, fallback?.imageUrl ?? ""),
                  alt: text(item.alt, fallback?.alt ?? fallback?.label ?? ""),
                  shape:
                    item.shape === "round" || item.shape === "square" || item.shape === "wide"
                      ? item.shape
                      : fallback?.shape ?? "wide",
                };
              })
            : DEFAULT_ABOUT.placeholders,
      },
      servicesPage: {
        heading: text(servicesPage.heading, DEFAULT_SERVICES_PAGE.heading),
        intro: text(servicesPage.intro, DEFAULT_SERVICES_PAGE.intro),
        contactLinkLabel: text(
          servicesPage.contactLinkLabel,
          DEFAULT_SERVICES_PAGE.contactLinkLabel,
        ),
        cardCta: text(servicesPage.cardCta, DEFAULT_SERVICES_PAGE.cardCta),
        nexoKicker: text(servicesPage.nexoKicker, DEFAULT_SERVICES_PAGE.nexoKicker),
        nexoHeading: text(servicesPage.nexoHeading, DEFAULT_SERVICES_PAGE.nexoHeading),
        nexoBody: text(servicesPage.nexoBody, DEFAULT_SERVICES_PAGE.nexoBody),
        nexoCta: text(servicesPage.nexoCta, DEFAULT_SERVICES_PAGE.nexoCta),
        serviceWhatsappCta: text(
          (servicesPage as { serviceWhatsappCta?: string | null }).serviceWhatsappCta,
          DEFAULT_SERVICES_PAGE.serviceWhatsappCta,
        ),
      },
      gallery: {
        heading: text(gallery.heading, DEFAULT_GALLERY.heading),
        intro: text(
          (gallery as { intro?: string | null }).intro,
          DEFAULT_GALLERY.intro,
        ),
        environmentsHeading: text(
          (gallery as { environmentsHeading?: string | null }).environmentsHeading,
          DEFAULT_GALLERY.environmentsHeading,
        ),
        environmentsIntro: text(
          (gallery as { environmentsIntro?: string | null }).environmentsIntro,
          DEFAULT_GALLERY.environmentsIntro,
        ),
        contactCta: text(
          (gallery as { contactCta?: string | null }).contactCta,
          DEFAULT_GALLERY.contactCta,
        ),
        mosaicContact: {
          title: text(
            (gallery as { mosaicContact?: { title?: string | null } }).mosaicContact
              ?.title,
            DEFAULT_GALLERY.mosaicContact.title,
          ),
          body: text(
            (gallery as { mosaicContact?: { body?: string | null } }).mosaicContact
              ?.body,
            DEFAULT_GALLERY.mosaicContact.body,
          ),
          cta: text(
            (gallery as { mosaicContact?: { cta?: string | null } }).mosaicContact
              ?.cta,
            DEFAULT_GALLERY.mosaicContact.cta,
          ),
          href: text(
            (gallery as { mosaicContact?: { href?: string | null } }).mosaicContact
              ?.href,
            DEFAULT_GALLERY.mosaicContact.href,
          ),
        },
        mosaicWork: {
          title: text(
            (gallery as { mosaicWork?: { title?: string | null } }).mosaicWork?.title,
            DEFAULT_GALLERY.mosaicWork.title,
          ),
          cta: text(
            (gallery as { mosaicWork?: { cta?: string | null } }).mosaicWork?.cta,
            DEFAULT_GALLERY.mosaicWork.cta,
          ),
          href: text(
            (gallery as { mosaicWork?: { href?: string | null } }).mosaicWork?.href,
            DEFAULT_GALLERY.mosaicWork.href,
          ),
          fallbackTitle: text(
            (gallery as { mosaicWork?: { fallbackTitle?: string | null } }).mosaicWork
              ?.fallbackTitle,
            DEFAULT_GALLERY.mosaicWork.fallbackTitle,
          ),
          fallbackBody: text(
            (gallery as { mosaicWork?: { fallbackBody?: string | null } }).mosaicWork
              ?.fallbackBody,
            DEFAULT_GALLERY.mosaicWork.fallbackBody,
          ),
          fallbackCta: text(
            (gallery as { mosaicWork?: { fallbackCta?: string | null } }).mosaicWork
              ?.fallbackCta,
            DEFAULT_GALLERY.mosaicWork.fallbackCta,
          ),
        },
        projects:
          Array.isArray(gallery.projects) && gallery.projects.length > 0
            ? gallery.projects.map((project, index) => {
                const fallback =
                  DEFAULT_GALLERY.projects[index] ?? DEFAULT_GALLERY.projects[0];
                const imageUrl =
                  mediaUrl(project.image) ||
                  text(project.imageUrl, fallback.imageUrl);
                const fit =
                  project.fit === "contain" || project.fit === "cover"
                    ? project.fit
                    : fallback.fit ??
                      (imageUrl.includes("wc-base-de-duche") ? "contain" : "cover");
                const cms = project as {
                  isRealWork?: boolean | null;
                  titleLines?: { line?: string | null }[] | null;
                  panels?: {
                    src?: string | null;
                    alt?: string | null;
                    image?: unknown;
                  }[] | null;
                };
                const titleLines = Array.isArray(cms.titleLines)
                  ? cms.titleLines
                      .map((row) => text(row.line, ""))
                      .filter(Boolean)
                  : fallback.titleLines;
                const cmsPanels =
                  Array.isArray(cms.panels) && cms.panels.length > 0
                    ? cms.panels.map((panel, panelIndex) => {
                        const panelFallback = fallback.panels?.[panelIndex];
                        return {
                          src:
                            mediaUrl(panel.image) ||
                            text(panel.src, panelFallback?.src ?? ""),
                          alt: text(panel.alt, panelFallback?.alt ?? ""),
                        };
                      })
                    : fallback.panels;
                return {
                  title: text(project.title, fallback.title),
                  titleLines,
                  caption: text(project.caption, fallback.caption),
                  imageUrl,
                  alt: text(project.alt, fallback.alt),
                  width:
                    typeof project.width === "number"
                      ? project.width
                      : fallback.width,
                  height:
                    typeof project.height === "number"
                      ? project.height
                      : fallback.height,
                  fit,
                  isRealWork: Boolean(cms.isRealWork) || Boolean(cmsPanels?.length),
                  icon: fallback.icon,
                  panels: cmsPanels,
                };
              }) as typeof DEFAULT_GALLERY.projects
            : DEFAULT_GALLERY.projects,
      },
      contact: {
        heading: text(contact.heading, DEFAULT_CONTACT.heading),
        body: text(contact.body, DEFAULT_CONTACT.body),
        otherServiceOption: text(
          contact.otherServiceOption,
          DEFAULT_CONTACT.otherServiceOption,
        ),
        submitLabel: text(contact.submitLabel, DEFAULT_CONTACT.submitLabel),
        submittingLabel: text(
          contact.submittingLabel,
          DEFAULT_CONTACT.submittingLabel,
        ),
        successMessage: text(contact.successMessage, DEFAULT_CONTACT.successMessage),
        consent: text(contact.consent, DEFAULT_CONTACT.consent),
        nameLabel: text(contact.nameLabel, DEFAULT_CONTACT.nameLabel),
        phoneLabel: text(contact.phoneLabel, DEFAULT_CONTACT.phoneLabel),
        phoneHint: text(contact.phoneHint ?? "", DEFAULT_CONTACT.phoneHint),
        emailLabel: text(contact.emailLabel, DEFAULT_CONTACT.emailLabel),
        emailHint: text(contact.emailHint ?? "", DEFAULT_CONTACT.emailHint),
        serviceLabel: text(contact.serviceLabel, DEFAULT_CONTACT.serviceLabel),
        messageLabel: text(contact.messageLabel, DEFAULT_CONTACT.messageLabel),
        namePlaceholder: text(
          contact.namePlaceholder ?? "",
          DEFAULT_CONTACT.namePlaceholder,
        ),
        phonePlaceholder: text(
          contact.phonePlaceholder ?? "",
          DEFAULT_CONTACT.phonePlaceholder,
        ),
        emailPlaceholder: text(
          contact.emailPlaceholder ?? "",
          DEFAULT_CONTACT.emailPlaceholder,
        ),
        servicePlaceholder: text(
          contact.servicePlaceholder ?? "",
          DEFAULT_CONTACT.servicePlaceholder,
        ),
        messagePlaceholder: text(
          contact.messagePlaceholder ?? "",
          DEFAULT_CONTACT.messagePlaceholder,
        ),
      },
      services: mappedServices,
    };
  } catch (error) {
    console.error("Failed to load Payload content", error);
    return {
      site: DEFAULT_SITE,
      about: DEFAULT_ABOUT,
      servicesPage: DEFAULT_SERVICES_PAGE,
      gallery: DEFAULT_GALLERY,
      contact: DEFAULT_CONTACT,
      services: DEFAULT_SERVICES.map((item) => ({ ...item })),
    };
  }
}

export async function getAllPosts(): Promise<CmsPost[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      limit: 100,
      depth: 1,
      sort: "-publishedAt",
      where: {
        publishedAt: { exists: true },
      },
    });
    return result.docs
      .map((post) => ({
        title: text(post.title, ""),
        slug: text(post.slug, ""),
        excerpt: typeof post.excerpt === "string" ? post.excerpt : undefined,
        category: typeof post.category === "string" ? post.category : undefined,
        publishedAt:
          typeof post.publishedAt === "string" ? post.publishedAt : undefined,
        coverUrl: mediaUrl(post.cover),
        body: post.body,
      }))
      .filter((post) => post.slug);
  } catch (error) {
    console.error("Failed to load posts", error);
    return [];
  }
}

export async function getLatestPosts(limit = 3): Promise<CmsPost[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<CmsPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
