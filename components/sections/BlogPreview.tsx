import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLatestPosts } from "@/lib/sanity/posts";

export async function BlogPreview() {
  const posts = await getLatestPosts(3);

  return (
    <section id="blog" className="scroll-mt-28 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Blog"
            title="Notas de obra, critério e processo."
            highlight="critério"
          />
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center text-sm text-bronze hover:text-charcoal"
          >
            Ver todos os artigos
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="mt-10 border border-dashed border-gold/40 bg-card px-6 py-12 text-center">
            <p className="font-display text-2xl text-warm">Em breve</p>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-warm/75">
              Os artigos serão publicados aqui através do CMS Sanity. Até lá,
              este espaço permanece vazio de propósito — sem conteúdos
              inventados.
            </p>
          </div>
        ) : (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="flex h-full flex-col border border-card bg-card p-5">
                  {post.category ? (
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
                      {post.category}
                    </p>
                  ) : null}
                  <h3 className="mt-2 font-display text-xl text-warm">
                    <Link href={`/blog/${post.slug}`} className="hover:text-gold">
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt ? (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-warm/75">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex min-h-11 items-center text-sm text-gold"
                  >
                    Ler artigo
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
