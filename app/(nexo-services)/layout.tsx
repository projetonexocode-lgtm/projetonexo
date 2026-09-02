import type { ReactNode } from "react";
import { FloatingCta } from "@/components/nexo-services/layout/FloatingCta";
import { Footer } from "@/components/nexo-services/layout/Footer";
import { Header } from "@/components/nexo-services/layout/Header";
import { SITE } from "@/lib/nexo-services/site";

export default function NexoServicesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.name,
    url: SITE.url,
    telephone: [SITE.phoneDisplay, SITE.whatsappDisplay],
    areaServed: [
      { "@type": "City", name: "Lisboa" },
      { "@type": "AdministrativeArea", name: "Área Metropolitana de Lisboa" },
      { "@type": "Country", name: "Portugal" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lisboa",
      addressCountry: "PT",
    },
    description: SITE.tagline,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#conteudo-servicos"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-charcoal focus:px-4 focus:py-2 focus:text-warm"
      >
        Saltar para o conteúdo
      </a>
      <Header />
      <main id="conteudo-servicos" className="flex-1 pb-24 sm:pb-28">
        {children}
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
