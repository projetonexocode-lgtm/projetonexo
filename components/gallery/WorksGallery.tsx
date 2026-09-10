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

export function WorksGallery({
  heading,
  intro = DEFAULT_GALLERY.intro,
  environmentsHeading = DEFAULT_GALLERY.environmentsHeading,
  environmentsIntro = DEFAULT_GALLERY.environmentsIntro,
  contactCta = DEFAULT_GALLERY.contactCta,
  projects,
}: WorksGalleryProps) {
  const { process, photos } = splitGallery(projects);

  return (
    <div className="overflow-x-clip pb-20 sm:pb-28 lg:pb-36">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
        <h1 className="max-w-[16ch] font-display text-pretty text-4xl leading-[1.08] text-charcoal sm:text-5xl">
          {heading}
        </h1>
        <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-charcoal/75 sm:text-lg">
          {intro}
        </p>
      </div>

      {process ? (
        <article
          id="obra-real"
          className="mx-auto mt-12 max-w-6xl scroll-mt-32 px-5 sm:mt-16 sm:px-8"
        >
          <TitleBlock project={process} as="h2" size="feature" />
          <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-charcoal sm:text-lg">
            {process.caption}
          </p>
          <div className="mt-8">
            <ProcessGrid panels={process.panels ?? []} />
          </div>
        </article>
      ) : null}

      {photos.length > 0 ? (
        <section className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="font-display text-3xl leading-[1.08] text-charcoal sm:text-4xl">
              {environmentsHeading}
            </h2>
            <p className="mt-3 max-w-[55ch] text-base leading-relaxed text-charcoal/75">
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
