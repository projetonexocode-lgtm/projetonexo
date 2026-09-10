import { DEFAULT_GALLERY } from "@/lib/cms/defaults";

export type GalleryPanel = {
  src: string;
  alt: string;
};

export type GalleryProject = {
  title: string;
  titleLines?: string[];
  caption: string;
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
  fit?: "cover" | "contain";
  isRealWork?: boolean;
  icon?: "shower";
  panels?: GalleryPanel[];
};

export function withGalleryExtras(project: GalleryProject): GalleryProject {
  const match = DEFAULT_GALLERY.projects.find(
    (item) => item.imageUrl === project.imageUrl,
  );
  return match
    ? {
        ...match,
        ...project,
        panels: project.panels ?? match.panels,
        titleLines: project.titleLines ?? match.titleLines,
        icon: project.icon ?? match.icon,
        isRealWork: project.isRealWork || match.isRealWork,
      }
    : project;
}

export function splitGallery(projects: GalleryProject[]) {
  const items = projects.map(withGalleryExtras);
  const process = items.find((item) => item.isRealWork || item.panels?.length);
  const photos = items.filter((item) => item !== process);
  return { items, process, photos };
}
