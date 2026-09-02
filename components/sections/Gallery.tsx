import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GALLERY_ITEMS } from "@/lib/images";

export function Gallery() {
  return (
    <section id="galeria" className="scroll-mt-28 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Galeria"
          title="Trabalhos com a luz e a matéria no centro."
          highlight="matéria"
          description="O primeiro trabalho é um projeto real de WC. As restantes imagens são de banco, temporárias, até chegarem fotografias dos outros serviços."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item) => (
            <li key={item.src} className="group relative">
              <figure className="relative aspect-[4/5] overflow-hidden bg-sand">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-charcoal/60 px-4 py-3 text-sm text-warm">
                  {item.caption}
                  {item.placeholder ? (
                    <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.14em] text-gold">
                      Fotografia temporária
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
