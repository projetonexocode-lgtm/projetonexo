import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Fraunces, IBM_Plex_Mono, Jost, Outfit } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const naville = localFont({
  src: "./fonts/Naville-Regular.ttf",
  variable: "--font-naville",
  display: "swap",
  weight: "400",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Gestão de Obras e Projetos em Lisboa`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "Remodelação, construção e reabilitação de imóveis. Sediados em Lisboa e Área Metropolitana, com atendimento em todo o território nacional.",
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Gestão de Obras e Projetos`,
    description:
      "Obras e remodelações com critério. Base em Lisboa, atendimento em todo o país.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Gestão de Obras e Projetos`,
    description:
      "Remodelação, construção e reabilitação de imóveis. Lisboa e território nacional.",
  },
  alternates: {
    canonical: SITE.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#E5DBD2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: SITE.name,
    url: SITE.url,
    telephone: [SITE.whatsappDisplay, SITE.phoneDisplay],
    areaServed: [
      { "@type": "City", name: "Lisboa" },
      { "@type": "Country", name: "Portugal" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lisboa",
      addressCountry: "PT",
    },
    description:
      "Gestão de obras e projetos: remodelação, construção e reabilitação de imóveis.",
  };

  return (
    <html
      lang="pt-PT"
      className={`${outfit.variable} ${fraunces.variable} ${jost.variable} ${ibmPlexMono.variable} ${naville.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
