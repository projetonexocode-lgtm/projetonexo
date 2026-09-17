import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Briefcase, Building2, Home, KeyRound } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { DEFAULT_ABOUT } from "@/lib/cms/defaults";

const AUDIENCE_ICONS: { match: RegExp; icon: LucideIcon }[] = [
  { match: /fam[ií]lia|particular/i, icon: Home },
  { match: /comprador|rec[eé]m/i, icon: KeyRound },
  { match: /senhorio|investidor/i, icon: Building2 },
  { match: /profissional|empresa/i, icon: Briefcase },
];

function audienceIcon(title: string): LucideIcon {
  return AUDIENCE_ICONS.find((entry) => entry.match.test(title))?.icon ?? Home;
}

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

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function MissionImages({
  images,
}: {
  images: { label: string; imageUrl: string; alt: string }[];
}) {
  const photos = images.filter((item) => item.imageUrl);
  if (photos.length === 0) return null;

  const frame = (item: (typeof photos)[number], sizes: string) => (
    <figure
      key={item.label}
      className="relative h-full min-h-0 overflow-hidden bg-sand"
    >
      <Image
        src={item.imageUrl}
        alt={item.alt || item.label}
        fill
        sizes={sizes}
        className="object-cover brightness-[1.12] contrast-[1.04]"
      />
      <figcaption className="sr-only">{item.label}</figcaption>
    </figure>
  );

  if (photos.length === 1) {
    return (
      <div className="aspect-4/5 w-full">
        {frame(photos[0], "(min-width: 1024px) 560px, 100vw")}
      </div>
    );
  }

  if (photos.length === 2) {
    return (
      <div className="grid grid-cols-2 items-end gap-3 sm:gap-4">
        <div className="aspect-3/4">
          {frame(photos[0], "(min-width: 1024px) 280px, 50vw")}
        </div>
        <div className="aspect-square sm:mb-8">
          {frame(photos[1], "(min-width: 1024px) 280px, 50vw")}
        </div>
      </div>
    );
  }

  if (photos.length >= 4) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {photos.slice(0, 4).map((item) => (
          <div key={item.label} className="aspect-square">
            {frame(item, "(min-width: 1024px) 280px, 50vw")}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:h-[28rem] lg:grid-cols-12 lg:grid-rows-6">
      <div className="col-span-2 aspect-16/10 lg:col-span-7 lg:row-span-6 lg:aspect-auto">
        {frame(photos[0], "(min-width: 1024px) 360px, 100vw")}
      </div>
      <div className="aspect-square lg:col-span-5 lg:row-span-3 lg:aspect-auto">
        {frame(photos[1], "(min-width: 1024px) 240px, 50vw")}
      </div>
      <div className="aspect-square lg:col-span-5 lg:row-span-3 lg:aspect-auto">
        {frame(photos[2], "(min-width: 1024px) 240px, 50vw")}
      </div>
    </div>
  );
}

function ActionLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (isExternalHref(href) || href.includes("#")) {
    return (
      <a
        href={href}
        className={className}
        {...(isExternalHref(href)
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
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
          <h1 className="nx-hero-rise max-w-[20ch] font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em]">
            {titleWithAccent(about.heading, about.headingHighlight)}
          </h1>
          {about.heroLead ? (
            <p className="nx-hero-rise nx-hero-rise-delay-1 mt-6 max-w-[42ch] text-[17px] leading-relaxed text-cream/80">
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

      {about.missionTitle || about.missionBody ? (
        <section className="bg-plaster px-5 py-[clamp(4.5rem,8vw,8rem)] sm:px-8">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
            <div>
              {about.missionTitle ? (
                <h2 className="max-w-[16ch] font-display text-3xl leading-[1.1] text-charcoal sm:text-4xl lg:text-[2.75rem]">
                  {about.missionTitle}
                </h2>
              ) : null}
              {about.missionBody ? (
                <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-charcoal sm:text-lg">
                  {about.missionBody}
                </p>
              ) : null}
            </div>
            <MissionImages images={about.missionImages} />
          </div>
        </section>
      ) : null}

      {about.values.length > 0 || about.processSteps.length > 0 ? (
        <section className="bg-cream px-5 py-[clamp(4.5rem,8vw,8rem)] sm:px-8">
          <div className="mx-auto max-w-6xl">
            {about.values.length > 0 ? (
              <>
                <SectionHeading
                  title={about.valuesTitle}
                  description={about.valuesIntro || undefined}
                />
                <div className="mt-12 grid min-w-0 gap-12 border-t border-charcoal/15 pt-12 lg:grid-cols-2 lg:gap-0">
                  {about.values.map((item, index) => (
                    <article
                      key={item.title}
                      className={
                        index === 0
                          ? "lg:border-r lg:border-gold/55 lg:pr-16"
                          : "border-t border-gold/45 pt-12 lg:border-t-0 lg:pt-0 lg:pl-16"
                      }
                    >
                      <h3 className="text-lg font-medium text-charcoal">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-charcoal/70 sm:text-lg">
                        {item.body}
                      </p>
                      {item.href && item.linkLabel ? (
                        <ActionLink
                          href={item.href}
                          className="mt-8 inline-flex min-h-12 items-center text-sm tracking-wide text-accent underline decoration-gold/70 underline-offset-[0.22em] transition-colors hover:text-charcoal hover:decoration-charcoal"
                        >
                          {item.linkLabel}
                        </ActionLink>
                      ) : null}
                    </article>
                  ))}
                </div>
              </>
            ) : null}

            {about.processSteps.length > 0 ? (
              <div
                className={`grid min-w-0 items-start gap-12 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-16 ${
                  about.values.length > 0
                    ? "mt-[clamp(4.5rem,8vw,8rem)] border-t border-charcoal/15 pt-[clamp(4.5rem,8vw,8rem)]"
                    : ""
                }`}
              >
                <div>
                  <SectionHeading
                    title={about.processTitle}
                    description={about.processIntro || undefined}
                  />
                  {about.processImageUrl ? (
                    <figure className="relative mt-10 aspect-16/10 overflow-hidden bg-sand">
                      <Image
                        src={about.processImageUrl}
                        alt={about.processImageAlt || about.processTitle}
                        fill
                        sizes="(min-width: 1280px) 480px, calc(100vw - 2.5rem)"
                        className="object-cover brightness-[1.08] contrast-[1.04]"
                      />
                    </figure>
                  ) : null}
                </div>
                <ol className="m-0 list-none p-0">
                  {about.processSteps.map((step, index) => (
                    <li
                      key={`${index}-${step.title}`}
                      className="grid grid-cols-[2.2rem_minmax(0,1fr)] gap-x-5 pb-7 last:pb-0"
                    >
                      <div className="flex flex-col items-center">
                        <span className="pt-[0.2em] text-sm font-medium tabular-nums leading-none text-charcoal">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          aria-hidden
                          className="mt-3 h-[1.25lh] w-px flex-none bg-gold/70 text-base"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium leading-snug text-charcoal">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-[58ch] text-base leading-relaxed text-charcoal/70 sm:text-lg">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {about.audiences.length > 0 ? (
        <section className="bg-plaster px-5 py-[clamp(4.5rem,8vw,8rem)] sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title={about.audiencesTitle}
              description={about.audiencesIntro || undefined}
            />
            <dl className="mt-12 grid gap-10 border-t border-charcoal/15 pt-12 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-12">
              {about.audiences.map((item) => {
                const Icon = audienceIcon(item.title);

                return (
                  <div key={item.title}>
                    <dt className="flex items-center gap-3 text-lg font-medium text-accent">
                      <Icon
                        className="size-5 shrink-0 text-gold"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      {item.title}
                    </dt>
                    <dd className="mt-3 max-w-[65ch] text-base leading-relaxed text-charcoal/70 sm:text-lg">
                      {item.body}
                    </dd>
                  </div>
                );
              })}
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
            <ActionLink
              href={about.ctaHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-7 text-sm tracking-wide text-ink transition-colors hover:bg-cream"
            >
              {about.ctaLabel}
            </ActionLink>
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
