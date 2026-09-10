import { DEFAULT_SITE } from "@/lib/cms/defaults";

type CoverageProps = {
  heading?: string;
  highlight?: string;
  subheading?: string;
  subheadingHighlight?: string;
  body?: string;
  regions?: { label: string }[];
  mapLabel?: string;
  mapsCta?: string;
  mapsEmbedUrl?: string;
  mapsLink?: string;
};

function withHighlight(
  text: string,
  highlight: string | undefined,
  className: string,
) {
  if (!highlight || !text.includes(highlight)) return text;
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <span className={className}>{highlight}</span>
      {after}
    </>
  );
}

export function Coverage({
  heading = DEFAULT_SITE.coverageHeading,
  highlight = DEFAULT_SITE.coverageHighlight,
  subheading = DEFAULT_SITE.coverageSubheading,
  subheadingHighlight = DEFAULT_SITE.coverageSubheadingHighlight,
  body = DEFAULT_SITE.coverageBody,
  regions = DEFAULT_SITE.coverageRegions,
  mapLabel = DEFAULT_SITE.coverageMapLabel,
  mapsCta = DEFAULT_SITE.coverageMapsCta,
  mapsEmbedUrl = DEFAULT_SITE.mapsEmbedUrl,
  mapsLink = DEFAULT_SITE.mapsLink,
}: CoverageProps) {
  return (
    <section id="atuacao" className="scroll-mt-32 bg-ochre px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="font-display text-pretty text-3xl leading-[1.08] text-charcoal sm:text-4xl lg:text-[2.75rem]">
            {withHighlight(heading, highlight, "text-accent")}
          </h2>
          {subheading ? (
            <p className="mt-4 max-w-[36ch] text-lg leading-[1.3] text-charcoal sm:max-w-[42ch] sm:text-xl">
              {withHighlight(
                subheading,
                subheadingHighlight,
                "font-semibold text-accent",
              )}
            </p>
          ) : null}
          <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-charcoal/70 sm:text-lg">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {regions.map((region) => (
              <span
                key={region.label}
                className="rounded-full border border-accent/35 bg-cream px-3.5 py-2 text-sm tracking-wide text-charcoal"
              >
                {region.label}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-none border border-accent/30">
          <div className="flex min-w-0 flex-col gap-2 border-b border-accent/20 bg-cream px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-charcoal">{mapLabel}</p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hit-link shrink-0 text-sm text-accent hover:text-charcoal"
            >
              {mapsCta}
            </a>
          </div>
          <iframe
            title={mapLabel}
            src={mapsEmbedUrl}
            className="h-[300px] w-full max-w-full border-0 sm:h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
