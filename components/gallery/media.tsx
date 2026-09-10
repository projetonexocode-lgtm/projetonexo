import Image from "next/image";
import { ShowerHead } from "lucide-react";
import type { GalleryPanel, GalleryProject } from "@/lib/gallery";

export function TitleBlock({
  project,
  as: Tag = "h3",
  size = "card",
}: {
  project: GalleryProject;
  as?: "h1" | "h2" | "h3";
  size?: "feature" | "card";
}) {
  const lines = project.titleLines?.length ? project.titleLines : [project.title];
  const sizeClass =
    size === "feature"
      ? "text-3xl leading-[1.08] sm:text-4xl lg:text-[2.75rem]"
      : "text-xl leading-[1.1] sm:text-2xl";

  return (
    <Tag className={`flex items-end gap-3 font-display text-pretty text-charcoal ${sizeClass}`}>
      <span>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </span>
      {project.icon === "shower" ? (
        <ShowerHead
          className={`shrink-0 text-gold ${size === "feature" ? "mb-1 size-8 sm:size-9" : "mb-0.5 size-6"}`}
          strokeWidth={1.4}
          aria-hidden
        />
      ) : null}
    </Tag>
  );
}

export function MosaicPhoto({
  project,
  sizes,
}: {
  project: GalleryProject;
  sizes: string;
}) {
  return (
    <figure className="group relative aspect-4/3 overflow-hidden bg-sand">
      <Image
        src={project.imageUrl}
        alt={project.alt}
        fill
        sizes={sizes}
        className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
      />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/75 to-transparent px-4 pb-3.5 pt-10">
        <p className="font-display text-sm text-cream">{project.title}</p>
      </figcaption>
    </figure>
  );
}

export function ProcessGrid({ panels }: { panels: GalleryPanel[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {panels.map((panel) => (
        <li key={panel.src}>
          <figure>
            <div className="relative aspect-square overflow-hidden bg-sand">
              <Image
                src={panel.src}
                alt={panel.alt}
                fill
                sizes="(min-width: 1152px) 352px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2.5 text-sm text-charcoal/75">{panel.alt}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
