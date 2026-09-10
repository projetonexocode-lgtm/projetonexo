import Image from "next/image";
import Link from "next/link";
import type { CmsPost } from "@/lib/cms/content";
import { formatPostDate } from "@/lib/format-date";

type PostTeaserProps = {
  post: CmsPost;
  featured?: boolean;
  readCta?: string;
};

export function PostTeaser({
  post,
  featured = false,
  readCta = "Ler artigo",
}: PostTeaserProps) {
  return (
    <article className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
      >
        {post.coverUrl ? (
          <div
            className={`relative overflow-hidden bg-sand ${
              featured ? "aspect-16/10" : "aspect-4/3"
            }`}
          >
            <Image
              src={post.coverUrl}
              alt=""
              fill
              sizes={
                featured
                  ? "(min-width: 1024px) 640px, 100vw"
                  : "(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
              }
              className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
            />
          </div>
        ) : null}
        <div className={`flex flex-1 flex-col ${post.coverUrl ? "pt-4" : ""}`}>
          {post.category || post.publishedAt ? (
            <p className="type-label text-gold">
              {post.category}
              {post.category && post.publishedAt ? " · " : null}
              {post.publishedAt ? (
                <time dateTime={post.publishedAt}>
                  {formatPostDate(post.publishedAt)}
                </time>
              ) : null}
            </p>
          ) : null}
          <h3
            className={`font-display text-pretty text-charcoal group-hover:text-accent ${
              featured
                ? "mt-3 text-2xl leading-[1.12] sm:text-3xl"
                : "mt-2 text-xl leading-[1.15] sm:text-2xl"
            }`}
          >
            {post.title}
          </h3>
          {post.excerpt ? (
            <p
              className={`mt-3 max-w-[55ch] leading-relaxed text-charcoal/75 ${
                featured ? "text-base sm:text-lg" : "text-sm sm:text-base"
              }`}
            >
              {post.excerpt}
            </p>
          ) : null}
          <span className="hit-link mt-4 w-fit text-sm tracking-wide text-charcoal group-hover:text-gold">
            {readCta}
          </span>
        </div>
      </Link>
    </article>
  );
}
