import type { Metadata } from "next";
import { Coverage } from "@/components/nexo-services/sections/Coverage";
import { Differentials } from "@/components/nexo-services/sections/Differentials";
import { Faq } from "@/components/nexo-services/sections/Faq";
import { FinalCta } from "@/components/nexo-services/sections/FinalCta";
import { Hero } from "@/components/nexo-services/sections/Hero";
import { HowItWorks } from "@/components/nexo-services/sections/HowItWorks";
import { Reviews } from "@/components/nexo-services/sections/Reviews";
import { Services } from "@/components/nexo-services/sections/Services";
import { TrustBar } from "@/components/nexo-services/sections/TrustBar";
import { SectionDivider } from "@/components/nexo-services/ui/SectionDivider";
import { SITE } from "@/lib/nexo-services/site";

export const metadata: Metadata = {
  title: {
    absolute: "Nexo Services — Reparações urgentes ao domicílio em Lisboa",
  },
  description:
    "Avaria em casa? Canalização, eletricidade, desentupimentos e serviços especializados ao domicílio. Base em Lisboa, atendimento imediato na Área Metropolitana e Margem Sul, cobertura nacional mediante disponibilidade.",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: `${SITE.name} — Avaria em casa? Resolvemos hoje.`,
    description:
      "Reparações e serviços especializados ao domicílio. Base em Lisboa, foco na AML e Margem Sul.",
    url: SITE.url,
    siteName: SITE.name,
  },
};

export default function NexoServicesPage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Differentials />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <Reviews />
      <SectionDivider />
      <Coverage />
      <SectionDivider />
      <Faq />
      <SectionDivider />
      <FinalCta />
    </>
  );
}
