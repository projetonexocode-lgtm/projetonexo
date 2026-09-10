import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DEFAULT_ABOUT } from "@/lib/cms/defaults";

type AboutPhoto = {
  label: string;
  shape: "wide" | "round" | "square";
  imageUrl?: string;
  alt?: string;
};

type AboutProps = {
  heading?: string;
  highlight?: string;
  paragraphs?: { text: string }[];
  placeholders?: AboutPhoto[];
};

export function About({
  heading = DEFAULT_ABOUT.heading,
  highlight = DEFAULT_ABOUT.headingHighlight,
  paragraphs = DEFAULT_ABOUT.paragraphs,
  placeholders = DEFAULT_ABOUT.placeholders,
}: AboutProps) {
  return (
    <section id="sobre" className="scroll-mt-32 bg-plaster px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
      <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="min-w-0">
          <SectionHeading title={heading} highlight={highlight} />
          <div className="mt-7 max-w-[65ch] space-y-5 text-base leading-relaxed text-charcoal/70 sm:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.text}>{paragraph.text}</p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {placeholders.map((item) => {
            const frameClass =
              item.shape === "wide"
                ? "col-span-2 aspect-[16/10]"
                : item.shape === "round"
                  ? "aspect-square overflow-hidden rounded-full ring-1 ring-inset ring-gold/40"
                  : "aspect-square";

            if (!item.imageUrl) {
              return (
                <div
                  key={item.label}
                  className={`${frameClass} flex items-center justify-center bg-sand p-4 text-center text-sm text-charcoal/70`}
                >
                  {item.label}
                </div>
              );
            }

            return (
              <figure key={item.label} className={`relative overflow-hidden bg-sand ${frameClass}`}>
                <Image
                  src={item.imageUrl}
                  alt={item.alt || item.label}
                  fill
                  sizes={item.shape === "wide" ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 270px, 50vw"}
                  className="object-cover"
                />
                <figcaption className="sr-only">{item.label}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
