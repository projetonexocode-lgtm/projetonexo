import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

const SERVICE_PHOTOS: Record<string, { src: string; alt: string }> = {
  "wc-casa-de-banho": {
    src: "/galeria/wc-base-de-duche.jpg",
    alt: "Etapas reais de troca de banheira por base de duche",
  },
};

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICES.filter((service) => service.cta.type === "whatsapp").map(
    (service) => ({ slug: service.slug }),
  );
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);

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
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  if (service.cta.type === "external") {
    notFound();
  }

  const photo = SERVICE_PHOTOS[service.slug];

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
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
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
          Página pronta para fotografias reais deste serviço. O pedido segue
          para o WhatsApp da {SITE.name}.
        </p>
      )}
      <WhatsAppButton
        serviceLabel={service.cta.serviceLabel}
        className="mt-8"
      >
        Pedir este serviço no WhatsApp
      </WhatsAppButton>
    </div>
  );
}
