import type { CmsRichTextData } from "@/lib/cms/rich-text";

export type GalleryPanel = {
  src: string;
  alt: string;
};

export type GalleryProject = {
  title: string;
  titleLines?: string[];
  caption: CmsRichTextData;
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
  fit?: "cover" | "contain";
  isRealWork?: boolean;
  icon?: "shower";
  panels?: GalleryPanel[];
};

export function splitGallery(projects: GalleryProject[]) {
  const process = projects.find(
    (item) => Boolean(item.isRealWork) || Boolean(item.panels?.length),
  );
  const photos = projects.filter((item) => item !== process);
  return { items: projects, process, photos };
}
