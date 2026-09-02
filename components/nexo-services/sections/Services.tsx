import Image from "next/image";
import { SectionHeading } from "@/components/nexo-services/ui/SectionHeading";
import { ServiceIcon } from "@/components/nexo-services/ui/ServiceIcon";
import { WhatsAppButton } from "@/components/nexo-services/ui/WhatsAppButton";
import { SERVICES } from "@/lib/nexo-services/services";

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-28 px-4 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Serviços de reparação"
          title="O problema típico. O técnico certo."
          highlight="técnico certo"
          description="Cada cartão abre o WhatsApp com o serviço já identificado. Digite só a morada e siga."
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <article className="flex h-full flex-col overflow-hidden border border-bronze/20 bg-sand">
                {service.image ? (
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <span className="inline-flex size-11 items-center justify-center border border-bronze/40 bg-cream text-bronze">
                    <ServiceIcon name={service.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl text-charcoal">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/70">
                    {service.description}
                  </p>
                  <WhatsAppButton
                    message={service.whatsappMessage}
                    variant="card"
                    className="mt-5 w-full min-h-12 px-3 text-[0.9rem]"
                  >
                    Pedir por WhatsApp
                  </WhatsAppButton>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
