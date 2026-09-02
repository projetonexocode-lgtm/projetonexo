import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/sanity/posts";
import { SITE } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

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

const portableComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 font-display text-3xl text-charcoal">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-2xl text-charcoal">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 text-base leading-relaxed text-charcoal/80">{children}</p>
    ),
  },
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      {post.category ? (
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-bronze">
          {post.category}
        </p>
      ) : null}
      <h1 className="mt-3 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
        {post.title}
      </h1>
      {post.publishedAt ? (
        <p className="mt-4 text-sm text-charcoal/55">
          {new Date(post.publishedAt).toLocaleDateString("pt-PT", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      ) : null}
      {post.body ? (
        <div className="mt-8">
          <PortableText value={post.body} components={portableComponents} />
        </div>
      ) : null}
      <p className="mt-12 text-sm text-charcoal/60">
        Publicado por {SITE.name}.
      </p>
    </article>
  );
}
