import Link from "next/link";
import { MosaicPhoto } from "@/components/gallery/media";
import { DEFAULT_GALLERY } from "@/lib/cms/defaults";
import { splitGallery, type GalleryProject } from "@/lib/gallery";

const PHOTO_SIZES = "(min-width: 1152px) 352px, (min-width: 640px) 50vw, 100vw";

type GalleryProps = {
  heading?: string;
  projects?: GalleryProject[];
  mosaicContact?: typeof DEFAULT_GALLERY.mosaicContact;
  mosaicWork?: typeof DEFAULT_GALLERY.mosaicWork;
};

function MosaicCopy({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="flex aspect-auto min-h-64 flex-col justify-center bg-cream px-7 py-8 sm:aspect-4/3 sm:px-8">
      <h3 className="font-display text-2xl leading-[1.1] text-charcoal sm:text-[1.65rem]">
        {title}
      </h3>
      <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-charcoal/75 sm:text-base">
        {body}
      </p>
      <Link
        href={href}
        className="hit-link mt-6 w-fit rounded-full border border-charcoal px-5 text-sm tracking-wide text-charcoal transition-colors hover:bg-charcoal hover:text-cream"
      >
        {cta}
      </Link>
    </article>
  );
}

export function Gallery({
  heading = DEFAULT_GALLERY.heading,
  projects = DEFAULT_GALLERY.projects,
  mosaicContact = DEFAULT_GALLERY.mosaicContact,
  mosaicWork = DEFAULT_GALLERY.mosaicWork,
}: GalleryProps) {
  const { process, photos } = splitGallery(projects);
  const mosaicPhotos = photos.slice(0, 4);

  return (
    <section
      id="galeria"
      className="relative scroll-mt-32 overflow-x-clip bg-sand py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-[16ch] font-display text-pretty text-3xl leading-[1.08] text-charcoal sm:text-4xl lg:text-[2.75rem]">
          {heading}
        </h2>
      </div>

      <div className="relative mt-10 sm:mt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 hidden h-18 w-screen -translate-x-1/2 -translate-y-1/2 bg-gold lg:block"
        />
        <ul className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-3 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          <li>
            <MosaicCopy
              title={mosaicContact.title}
              body={mosaicContact.body}
              href={mosaicContact.href}
              cta={mosaicContact.cta}
            />
          </li>
          {mosaicPhotos.map((project) => (
            <li key={project.imageUrl}>
              <Link href={mosaicWork.href} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze">
                <MosaicPhoto project={project} sizes={PHOTO_SIZES} />
              </Link>
            </li>
          ))}
          {process ? (
            <li>
              <MosaicCopy
                title={mosaicWork.title}
                body={process.caption}
                href={mosaicWork.href}
                cta={mosaicWork.cta}
              />
            </li>
          ) : (
            <li>
              <MosaicCopy
                title={mosaicWork.fallbackTitle}
                body={mosaicWork.fallbackBody}
                href={mosaicWork.href}
                cta={mosaicWork.fallbackCta}
              />
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

