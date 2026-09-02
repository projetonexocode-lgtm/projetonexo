import { BlogPreview } from "@/components/sections/BlogPreview";
import { About } from "@/components/sections/About";
import { ContactForm } from "@/components/sections/ContactForm";
import { Coverage } from "@/components/sections/Coverage";
import { Differentials } from "@/components/sections/Differentials";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhatsAppMaps } from "@/components/sections/WhatsAppMaps";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Differentials />
      <SectionDivider />
      <Gallery />
      <SectionDivider />
      <Coverage />
      <SectionDivider />
      <ContactForm />
      <SectionDivider />
      <WhatsAppMaps />
      <SectionDivider />
      <BlogPreview />
    </>
  );
}
