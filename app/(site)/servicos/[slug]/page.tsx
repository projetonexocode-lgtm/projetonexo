import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProjectServiceIcon } from "@/components/ui/ProjectServiceIcon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getCmsContent } from "@/lib/cms/content";
import { SERVICE_PHOTOS } from "@/lib/service-photos";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const content = await getCmsContent();
  return content.services
    .filter((service) => service.slug)
    .map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getCmsContent();
  const service = content.services.find((item) => item.slug === slug);

  if (!service) {
    return { title: "Serviço" };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const content = await getCmsContent();
  const service = content.services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const photo = service.imageUrl
    ? { src: service.imageUrl, alt: service.imageAlt || service.title }
    : SERVICE_PHOTOS[service.slug];

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="inline-flex size-12 items-center justify-center border border-gold/50 text-accent">
        <ProjectServiceIcon slug={service.slug} className="size-6" />
      </p>
      <h1 className="mt-5 font-display text-4xl text-charcoal sm:text-5xl">
        {service.title}
      </h1>
      <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-charcoal/75">
        {service.description}
      </p>
      {photo ? (
        <div className="relative mt-8 aspect-[16/10] overflow-hidden bg-sand">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      ) : null}
      <WhatsAppButton
        serviceLabel={service.whatsappLabel}
        intro={content.site.whatsappIntro}
        e164={content.site.whatsappE164}
        className="mt-8"
      >
        {content.servicesPage.serviceWhatsappCta}
      </WhatsAppButton>
    </div>
  );
}
