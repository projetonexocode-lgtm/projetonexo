import type { Metadata } from "next";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { notFound } from "next/navigation";
import { formatPostDate } from "@/lib/format-date";
import { getAllPosts, getPostBySlug } from "@/lib/cms/content";
import { SITE } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

type RichTextData = NonNullable<Parameters<typeof RichText>[0]["data"]>;

function isRichTextData(value: unknown): value is RichTextData {
  return Boolean(value && typeof value === "object" && "root" in value);
}

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Artigo" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverUrl ? [{ url: post.coverUrl }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      {post.category ? (
        <p className="type-label text-gold">{post.category}</p>
      ) : null}
      <h1 className="mt-3 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
        {post.title}
      </h1>
      {post.publishedAt ? (
        <p className="mt-4 text-sm text-charcoal/70">
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
        </p>
      ) : null}
      {post.coverUrl ? (
        <div className="relative mt-8 aspect-16/10 overflow-hidden bg-sand">
          <Image
            src={post.coverUrl}
            alt=""
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      ) : null}
      {isRichTextData(post.body) ? (
        <div className="mt-8 max-w-[65ch] text-base leading-relaxed text-charcoal/80 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-charcoal [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:text-charcoal [&_p]:mt-4">
          <RichText data={post.body} />
        </div>
      ) : null}
      <p className="mt-12 text-sm text-charcoal/70">
        Publicado por {SITE.name}.
      </p>
    </article>
  );
}
