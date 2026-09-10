import type { Metadata } from "next";
import { WorksGallery } from "@/components/gallery/WorksGallery";
import { getCmsContent } from "@/lib/cms/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Galeria da Projeto Nexo: obra real da troca de banheira por base de duche e referências de interiores para remodelação e reabilitação.",
};

export default async function GalleryPage() {
  const { gallery } = await getCmsContent();

  return (
    <WorksGallery
      heading={gallery.heading}
      intro={gallery.intro}
      environmentsHeading={gallery.environmentsHeading}
      environmentsIntro={gallery.environmentsIntro}
      contactCta={gallery.contactCta}
      projects={gallery.projects}
    />
  );
}
