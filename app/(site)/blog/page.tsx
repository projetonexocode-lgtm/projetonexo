import type { Metadata } from "next";
import Link from "next/link";
import { PostTeaser } from "@/components/blog/PostTeaser";
import { getAllPosts, getCmsContent } from "@/lib/cms/content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getCmsContent();
  return {
    title: "Blog",
    description: site.blogPageIntro,
  };
}

export default async function BlogPage() {
  const [{ site }, posts] = await Promise.all([getCmsContent(), getAllPosts()]);
  const headingParts =
    site.blogHeadingHighlight && site.blogHeading.includes(site.blogHeadingHighlight)
      ? site.blogHeading.split(site.blogHeadingHighlight)
      : null;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
        {headingParts ? (
          <>
            {headingParts[0]}
            <span className="text-gold">{site.blogHeadingHighlight}</span>
            {headingParts[1]}
          </>
        ) : (
          site.blogHeading
        )}
      </h1>
      <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-charcoal/75 sm:text-lg">
        {site.blogPageIntro}
      </p>

      {posts.length === 0 ? (
        <div className="relative mt-12 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 hidden h-18 w-screen -translate-x-1/2 -translate-y-1/2 bg-gold lg:block"
          />
          <div className="relative z-10 grid gap-3 lg:grid-cols-2">
            <div className="flex min-h-64 flex-col justify-center bg-sand px-7 py-10 sm:px-10">
              <p className="font-display text-2xl leading-[1.12] text-charcoal sm:text-3xl">
                {site.blogPageEmptyTitle}
              </p>
              <p className="mt-3 max-w-[36ch] text-base leading-relaxed text-charcoal/75">
                {site.blogPageEmptyBody}
              </p>
            </div>
            <div className="flex min-h-64 flex-col justify-center bg-sand px-7 py-10 sm:px-10">
              <p className="max-w-[32ch] text-base leading-relaxed text-charcoal/75">
                {site.blogPageEmptyAside}
              </p>
              <Link
                href="/#contacto"
                className="hit-link mt-6 w-fit rounded-full border border-charcoal px-5 text-sm tracking-wide text-charcoal transition-colors hover:bg-charcoal hover:text-cream"
              >
                {site.blogEmptyCta}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostTeaser post={post} readCta={site.blogReadCta} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
