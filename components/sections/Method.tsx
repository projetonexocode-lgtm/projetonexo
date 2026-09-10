import Image from "next/image";
import { DEFAULT_SITE } from "@/lib/cms/defaults";

type MethodProps = {
  heading?: string;
  steps?: { title: string; body: string }[];
  imageSrc?: string;
  imageAlt?: string;
};

function headingLines(heading: string): string[] {
  const trimmed = heading.trim();
  if (trimmed.includes("\n")) {
    return trimmed
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  const withoutPeriod = trimmed.replace(/\.+$/, "");
  const match = withoutPeriod.match(/^(.*?)\s+à\s+(.*)$/i);
  if (match) {
    return [match[1], `À ${match[2]}`];
  }

  return [heading];
}

export function Method({
  heading = DEFAULT_SITE.methodHeading,
  steps = DEFAULT_SITE.methodSteps,
  imageSrc = DEFAULT_SITE.methodImage.src,
  imageAlt = DEFAULT_SITE.methodImage.alt,
}: MethodProps) {
  const lines = headingLines(heading);

  return (
    <section
      id="metodo"
      className="scroll-mt-32 bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:py-36"
    >
      <div className="mx-auto min-w-0 max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
          <h2 className="font-display text-3xl leading-[1.08] text-charcoal sm:text-4xl lg:text-[2.75rem]">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <figure className="relative aspect-[16/10] overflow-hidden bg-sand">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 560px, calc(100vw - 2.5rem)"
              className="object-cover"
            />
          </figure>
        </div>
        <ol className="mt-12 grid list-none gap-10 border-t border-charcoal/15 p-0 pt-12 md:grid-cols-3 md:gap-12">
          {steps.map((step, index) => (
            <li key={step.title}>
              <p className="text-sm font-medium tabular-nums text-charcoal">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-lg font-medium text-charcoal">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-charcoal sm:text-lg">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
