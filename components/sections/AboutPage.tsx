import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { DEFAULT_ABOUT } from "@/lib/cms/defaults";

type AboutPageProps = {
  about?: typeof DEFAULT_ABOUT;
  intro?: string;
  e164?: string;
};

function titleWithAccent(title: string, accent?: string) {
  if (!accent || !title.includes(accent)) {
    return <>{title}</>;
  }
  const [before, ...rest] = title.split(accent);
  return (
    <>
      {before}
      <span className="text-gold">{accent}</span>
      {rest.join(accent)}
    </>
  );
}

export function AboutPage({
  about = DEFAULT_ABOUT,
  intro,
  e164,
}: AboutPageProps) {
  const heroImage =
    about.heroImageUrl ||
    about.placeholders.find((item) => item.imageUrl)?.imageUrl;
  const heroAlt =
    about.heroImageAlt ||
    about.placeholders.find((item) => item.imageUrl)?.alt ||
    about.placeholders[0]?.label ||
    about.heading;

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            priority
            className="object-cover object-[center_35%] brightness-[1.08] opacity-60"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/72 via-ink/48 to-ink/20" />
        <div className="relative mx-auto max-w-6xl px-5 py-[clamp(5rem,12vw,8.5rem)] sm:px-8">
          {about.heroEyebrow ? (
            <p className="nx-hero-rise type-label mb-4 text-gold">{about.heroEyebrow}</p>
          ) : null}
          <h1 className="nx-hero-rise nx-hero-rise-delay-1 max-w-[16ch] font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] uppercase">
            {titleWithAccent(about.heading, about.headingHighlight)}
          </h1>
          {about.heroLead ? (
            <p className="nx-hero-rise nx-hero-rise-delay-2 mt-6 max-w-[42ch] text-[17px] leading-relaxed text-cream/80">
              {about.heroLead}
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-cream px-5 py-[clamp(4.5rem,8vw,8rem)] sm:px-8">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <SectionHeading title={about.storyTitle} />
            <div className="mt-8 max-w-[54ch] space-y-5 text-base leading-relaxed text-charcoal/70 sm:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.text}>{paragraph.text}</p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {about.placeholders.map((item) => {
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
                <figure
                  key={item.label}
                  className={`relative overflow-hidden bg-sand ${frameClass}`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.alt || item.label}
                    fill
                    sizes={
                      item.shape === "wide"
                        ? "(min-width: 1024px) 560px, 100vw"
                        : "(min-width: 1024px) 270px, 50vw"
                    }
                    className="object-cover brightness-[1.12] contrast-[1.04]"
                  />
                  <figcaption className="sr-only">{item.label}</figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {about.values.length > 0 ? (
        <section className="bg-plaster px-5 py-[clamp(4.5rem,8vw,8rem)] sm:px-8">
          <div className="mx-auto max-w-6xl">
            {about.valuesEyebrow ? (
              <p className="type-label mb-4 text-bronze">{about.valuesEyebrow}</p>
            ) : null}
            <SectionHeading
              title={about.valuesTitle}
              description={about.valuesIntro || undefined}
            />
            <dl className="mt-12 grid gap-10 border-t border-charcoal/15 pt-12 sm:grid-cols-2 sm:gap-16">
              {about.values.map((item) => (
                <div key={item.title}>
                  <dt className="text-lg font-medium text-charcoal">{item.title}</dt>
                  <dd className="mt-3 max-w-[65ch] text-base leading-relaxed text-charcoal sm:text-lg">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <section className="bg-ink px-5 py-[clamp(4rem,7vw,6.5rem)] text-cream sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <SectionHeading title={about.ctaTitle} tone="dark" />
            {about.ctaBody ? (
              <p className="mt-4 max-w-[42ch] text-[16.5px] leading-relaxed text-cream/75">
                {about.ctaBody}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={about.ctaHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-7 text-sm tracking-wide text-ink transition-colors hover:bg-cream"
            >
              {about.ctaLabel}
            </Link>
            <WhatsAppButton
              serviceLabel="os vossos serviços"
              variant="cream"
              intro={intro}
              e164={e164}
            >
              {about.ctaWhatsappLabel}
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </div>
  );
}
