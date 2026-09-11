import Link from "next/link";
import { MosaicPhoto, ProcessGrid, TitleBlock } from "@/components/gallery/media";
import { DEFAULT_GALLERY } from "@/lib/cms/defaults";
import { splitGallery, type GalleryProject } from "@/lib/gallery";

const PHOTO_SIZES = "(min-width: 1152px) 352px, (min-width: 640px) 50vw, 100vw";

type WorksGalleryProps = {
  heading: string;
  intro?: string;
  environmentsHeading?: string;
  environmentsIntro?: string;
  contactCta?: string;
  projects: GalleryProject[];
};

function workCaption(caption?: string): string {
  return (caption ?? "").replace(/^Obra real\.\s*/i, "").trim();
}

export function WorksGallery({
  heading,
  intro = DEFAULT_GALLERY.intro,
  environmentsHeading = DEFAULT_GALLERY.environmentsHeading,
  environmentsIntro = DEFAULT_GALLERY.environmentsIntro,
  contactCta = DEFAULT_GALLERY.contactCta,
  projects,
}: WorksGalleryProps) {
  const { process, photos } = splitGallery(projects);
  const kicker = heading.replace(/\.+$/, "");

  return (
    <div className="overflow-x-clip pb-20 sm:pb-28 lg:pb-36">
      <header className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
        <p className="type-label text-gold">{kicker}</p>

        {process ? (
          <div className="mt-5 flex flex-col gap-6 lg:mt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <TitleBlock project={process} as="h1" size="feature" />
            <aside className="max-w-[34ch] border-l-2 border-gold pl-5">
              <p className="type-label text-gold">Obra real</p>
              <p className="mt-2 text-base leading-relaxed text-charcoal sm:text-lg">
                {workCaption(process.caption)}
              </p>
            </aside>
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-6 lg:mt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <h1 className="max-w-[16ch] font-display text-pretty text-4xl leading-[1.08] text-charcoal sm:text-5xl">
              {heading}
            </h1>
            <p className="max-w-[42ch] text-base leading-relaxed text-charcoal/75 sm:text-lg">
              {intro}
            </p>
          </div>
        )}
      </header>

      {process ? (
        <article
          id="obra-real"
          className="mx-auto mt-8 max-w-6xl scroll-mt-32 px-5 sm:mt-10 sm:px-8"
        >
          <ProcessGrid panels={process.panels ?? []} />
        </article>
      ) : null}

      {photos.length > 0 ? (
        <section className="mt-16 sm:mt-24">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <h2 className="font-display text-3xl leading-[1.08] text-charcoal sm:text-4xl">
              {environmentsHeading}
            </h2>
            <p className="max-w-[42ch] text-base leading-relaxed text-charcoal/75">
              {environmentsIntro}
            </p>
          </div>
          <div className="relative mt-8">
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 hidden h-18 w-screen -translate-x-1/2 -translate-y-1/2 bg-gold lg:block"
            />
            <ul className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-3 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
              {photos.map((project) => (
                <li key={project.imageUrl}>
                  <MosaicPhoto project={project} sizes={PHOTO_SIZES} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <div className="mx-auto mt-16 max-w-6xl px-5 sm:mt-20 sm:px-8">
        <Link
          href="/#contacto"
          className="hit-link w-fit rounded-full border border-charcoal px-5 text-sm tracking-wide text-charcoal transition-colors hover:bg-charcoal hover:text-cream"
        >
          {contactCta}
        </Link>
      </div>
    </div>
  );
}
