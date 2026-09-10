import Link from "next/link";
import { PostTeaser } from "@/components/blog/PostTeaser";
import { getLatestPosts } from "@/lib/cms/content";
import { DEFAULT_SITE } from "@/lib/cms/defaults";

type BlogPreviewProps = {
  heading?: string;
  highlight?: string;
  intro?: string;
  allCta?: string;
  readCta?: string;
  emptyTitle?: string;
  emptyBody?: string;
  emptyAside?: string;
  emptyCta?: string;
};

export async function BlogPreview({
  heading = DEFAULT_SITE.blogHeading,
  highlight = DEFAULT_SITE.blogHeadingHighlight,
  intro = DEFAULT_SITE.blogIntro,
  allCta = DEFAULT_SITE.blogAllCta,
  readCta = DEFAULT_SITE.blogReadCta,
  emptyTitle = DEFAULT_SITE.blogEmptyTitle,
  emptyBody = DEFAULT_SITE.blogEmptyBody,
  emptyAside = DEFAULT_SITE.blogEmptyAside,
  emptyCta = DEFAULT_SITE.blogEmptyCta,
}: BlogPreviewProps) {
  const posts = await getLatestPosts(3);
  const [featured, ...rest] = posts;
  const headingParts = highlight && heading.includes(highlight)
    ? heading.split(highlight)
    : null;

  return (
    <section
      id="blog"
      className="scroll-mt-32 bg-linen px-5 py-20 sm:px-8 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-[16ch] font-display text-pretty text-3xl leading-[1.08] text-charcoal sm:text-4xl lg:text-[2.75rem]">
              {headingParts ? (
                <>
                  {headingParts[0]}
                  <span className="text-gold">{highlight}</span>
                  {headingParts[1]}
                </>
              ) : (
                heading
              )}
            </h2>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-charcoal/75 sm:text-lg">
              {intro}
            </p>
          </div>
          {posts.length > 0 ? (
            <Link
              href="/blog"
              className="hit-link rounded-full border border-charcoal px-5 text-sm tracking-wide text-charcoal transition-colors hover:bg-charcoal hover:text-cream"
            >
              {allCta}
            </Link>
          ) : null}
        </div>

        {featured ? (
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
            <PostTeaser post={featured} featured readCta={readCta} />
            {rest.length > 0 ? (
              <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
                {rest.map((post) => (
                  <li key={post.slug}>
                    <PostTeaser post={post} readCta={readCta} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : (
          <div className="relative mt-12 overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 hidden h-18 w-screen -translate-x-1/2 -translate-y-1/2 bg-gold lg:block"
            />
            <div className="relative z-10 grid gap-3 lg:grid-cols-2">
              <div className="flex min-h-64 flex-col justify-center bg-cream px-7 py-10 sm:px-10">
                <p className="font-display text-2xl leading-[1.12] text-charcoal sm:text-3xl">
                  {emptyTitle}
                </p>
                <p className="mt-3 max-w-[36ch] text-base leading-relaxed text-charcoal/75">
                  {emptyBody}
                </p>
              </div>
              <div className="flex min-h-64 flex-col justify-center bg-cream px-7 py-10 sm:px-10">
                <p className="max-w-[32ch] text-base leading-relaxed text-charcoal/75">
                  {emptyAside}
                </p>
                <Link
                  href="/#contacto"
                  className="hit-link mt-6 w-fit rounded-full border border-charcoal px-5 text-sm tracking-wide text-charcoal transition-colors hover:bg-charcoal hover:text-cream"
                >
                  {emptyCta}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
