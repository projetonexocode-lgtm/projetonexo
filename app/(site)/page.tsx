import { About } from "@/components/sections/About";
import { ContactForm } from "@/components/sections/ContactForm";
import { Coverage } from "@/components/sections/Coverage";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Method />
      <Gallery />
      <About />
      <Services />
      <Coverage />
      <ContactForm />
    </>
  );
}
