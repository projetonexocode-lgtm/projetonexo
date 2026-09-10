import type { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FloatingCta } from "@/components/nexo-services/layout/FloatingCta";
import { Footer } from "@/components/nexo-services/layout/Footer";
import { Header } from "@/components/nexo-services/layout/Header";
import { getCmsContent } from "@/lib/cms/content";
import { DEFAULT_SITE } from "@/lib/cms/defaults";
import { isNexoHost } from "@/lib/nexo-host";
import { SITE } from "@/lib/nexo-services/site";

export default async function NexoServicesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const host = (await headers()).get("host") ?? "";
  if (!isNexoHost(host)) {
    const { site } = await getCmsContent();
    redirect(site.nexoServicesUrl || DEFAULT_SITE.nexoServicesUrl);
  }

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
    logo: `${SITE.url}/assets/nexo-services-fundo-claro.svg`,
    image: `${SITE.url}/assets/nexo-services-fundo-claro.svg`,
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
