import type { Metadata } from "next";
import { AboutPage } from "@/components/sections/AboutPage";
import { getCmsContent } from "@/lib/cms/content";
import { SITE } from "@/lib/site";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getCmsContent();
  const title = about.seoTitle;
  const description = about.seoDescription || about.heroLead;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE.url}/sobre`,
    },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: `${SITE.url}/sobre`,
    },
  };
}

export default async function SobrePage() {
  const { about, site } = await getCmsContent();

  return (
    <AboutPage
      about={about}
      intro={site.whatsappIntro}
      e164={site.whatsappE164}
    />
  );
}
