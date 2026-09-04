import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { HashScroll } from "@/components/layout/HashScroll";
import { Header } from "@/components/layout/Header";

export default function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="theme-nexo flex min-h-full flex-1 flex-col bg-cream font-sans text-charcoal">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-espresso focus:px-4 focus:py-2 focus:text-warm"
      >
        Saltar para o conteúdo
      </a>
      <HashScroll />
      <Header />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
