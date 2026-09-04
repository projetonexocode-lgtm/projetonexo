import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/sanity/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos da Projeto Nexo sobre obras, remodelações e reabilitação de imóveis.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
        Notas de <span className="text-accent">obra</span>
      </h1>
      <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-charcoal/75">
        Notas sobre obras, remodelações e reabilitação. Enquanto não houver
        artigos publicados, esta listagem permanece vazia — sem conteúdos
        inventados.
      </p>

      {posts.length === 0 ? (
        <div className="mt-12 border border-gold/40 bg-sand px-6 py-16 text-center">
          <p className="font-display text-2xl text-charcoal">Ainda sem artigos</p>
          <p className="mx-auto mt-3 max-w-[65ch] text-sm leading-relaxed text-charcoal/70">
            O primeiro artigo aparecerá aqui quando for publicado.
          </p>
        </div>
      ) : (
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="border border-gold/30 bg-cream p-5">
              {post.category ? (
                <p className="type-label text-accent">
                  {post.category}
                </p>
              ) : null}
              <h2 className="mt-2 font-display text-2xl text-charcoal">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.excerpt ? (
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                  {post.excerpt}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
