import Image from "next/image";
import { GALLERY_PROJECT } from "@/lib/images";

export function Gallery() {
  return (
    <section id="galeria" className="scroll-mt-32 bg-sand py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-[18ch] font-display text-3xl leading-[1.1] text-charcoal sm:text-4xl lg:text-[2.75rem]">
          {GALLERY_PROJECT.title}
        </h2>
        <figure className="mt-10 sm:mt-12">
          <Image
            src={GALLERY_PROJECT.src}
            alt={GALLERY_PROJECT.alt}
            width={GALLERY_PROJECT.width}
            height={GALLERY_PROJECT.height}
            sizes="(min-width: 1152px) 1088px, calc(100vw - 2.5rem)"
            className="h-auto w-full object-contain"
          />
          <figcaption className="mt-5 sm:mt-6">
            <p className="max-w-[65ch] text-base leading-relaxed text-charcoal sm:text-lg">
              {GALLERY_PROJECT.caption}
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
