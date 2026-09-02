import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-28 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Serviços"
          title="Do pormenor da casa de banho ao imóvel completo."
          highlight="completo"
          description="Cada cartão abre uma conversa no WhatsApp com o serviço já identificado — excepto Reparações, que encaminha para a Nexo Services."
        />

        <div className="mt-12 space-y-14">
          {SERVICE_CATEGORIES.map((category) => {
            const items = SERVICES.filter((service) => service.category === category.id);

            return (
              <div key={category.id}>
                <div className="mb-6 flex flex-col gap-2 border-l-2 border-gold pl-4">
                  <h3 className="font-display text-2xl text-charcoal">
                    {category.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-charcoal/70">
                    {category.intro}
                  </p>
                </div>

                <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((service) => (
                    <li key={service.slug}>
                      <article
                        className={`flex h-full flex-col border bg-card p-5 ${
                          service.featured
                            ? "border-gold"
                            : "border-card"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="inline-flex size-11 items-center justify-center border border-gold/50 bg-cream text-gold">
                            <ServiceIcon name={service.icon} className="size-5" />
                          </span>
                          {service.featured ? (
                            <span className="rounded-full border border-gold bg-cream px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-espresso">
                              Nexo Services
                            </span>
                          ) : null}
                        </div>
                        <h4 className="mt-4 font-display text-xl text-warm">
                          {service.title}
                        </h4>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-warm/75">
                          {service.description}
                        </p>
                        <div className="mt-5">
                          {service.cta.type === "external" ? (
                            <Link
                              href={SITE.nexoServicesUrl}
                              className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-gold/50 bg-cream px-4 text-sm font-medium text-espresso transition-colors hover:border-gold hover:bg-warm"
                            >
                              Saber mais
                              <ArrowUpRight className="size-3.5" aria-hidden />
                            </Link>
                          ) : (
                            <WhatsAppButton
                              serviceLabel={service.cta.serviceLabel}
                              variant="card"
                              showIcon={false}
                              className="w-full"
                            >
                              Saber mais
                            </WhatsAppButton>
                          )}
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
