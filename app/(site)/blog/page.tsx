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
      <p className="font-display text-[0.7rem] uppercase tracking-[0.28em] text-bronze">Blog</p>
      <h1 className="mt-3 font-display text-4xl text-charcoal sm:text-5xl">
        Notas de <span className="gold-leaf">obra</span>
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/75">
        Conteúdo gerido no Sanity. Enquanto o CMS não estiver ligado, esta
        listagem permanece vazia — sem artigos inventados.
      </p>

      {posts.length === 0 ? (
        <div className="mt-12 border border-dashed border-gold/40 bg-card px-6 py-16 text-center">
          <p className="font-display text-2xl text-warm">Ainda sem artigos</p>
          <p className="mx-auto mt-3 max-w-lg text-sm text-warm/75">
            Configure o projeto Sanity e publique o primeiro artigo no Studio
            em <code className="text-gold">/studio</code>.
          </p>
        </div>
      ) : (
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="border border-card bg-card p-5">
              {post.category ? (
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
                  {post.category}
                </p>
              ) : null}
              <h2 className="mt-2 font-display text-2xl text-warm">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.excerpt ? (
                <p className="mt-2 text-sm leading-relaxed text-warm/75">
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
