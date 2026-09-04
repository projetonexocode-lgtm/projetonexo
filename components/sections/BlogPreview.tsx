import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLatestPosts } from "@/lib/sanity/posts";

export async function BlogPreview() {
  const posts = await getLatestPosts(3);

  return (
    <section id="blog" className="scroll-mt-32 bg-cream px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <SectionHeading title="Notas de obra" />
        </div>

        {posts.length === 0 ? (
          <div className="border border-gold/40 bg-sand px-6 py-14 text-center">
            <p className="font-display text-2xl text-charcoal">Em breve</p>
            <p className="mx-auto mt-3 max-w-[65ch] text-sm leading-relaxed text-charcoal/70">
              Os artigos serão publicados aqui. Até lá, este espaço permanece
              vazio de propósito — sem conteúdos inventados.
            </p>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gold/30 bg-cream">
                  <div className="flex aspect-[16/10] items-center justify-center bg-sand text-sm text-charcoal/70">
                    Capa do post
                  </div>
                  <div className="flex flex-1 flex-col gap-3 px-6 py-7">
                    {post.category || post.publishedAt ? (
                      <div className="flex gap-3 type-label text-accent">
                        {post.category}
                        {post.publishedAt ? (
                          <span className="text-charcoal/70">
                            {new Date(post.publishedAt).toLocaleDateString("pt-PT", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                    <h3 className="font-display text-xl leading-snug text-charcoal">
                      <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                        {post.title}
                      </Link>
                    </h3>
                    {post.excerpt ? (
                      <p className="flex-1 text-sm leading-relaxed text-charcoal/70">
                        {post.excerpt}
                      </p>
                    ) : null}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-1 inline-flex min-h-11 items-center type-label text-charcoal"
                    >
                      Ler artigo
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
