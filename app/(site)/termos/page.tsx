import type { Metadata } from "next";
import { getCmsContent } from "@/lib/cms/content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getCmsContent();
  return {
    title: site.termsHeading,
    description: "Termos de utilização do site da Projeto Nexo.",
  };
}

export default async function TermsPage() {
  const { site } = await getCmsContent();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-display text-4xl text-charcoal">{site.termsHeading}</h1>
      <div className="mt-8 max-w-[65ch] space-y-5 text-base leading-relaxed text-charcoal/80">
        {site.termsParagraphs.map((paragraph) => (
          <p key={paragraph.text}>
            {paragraph.text}
            {paragraph.linkHref && paragraph.linkLabel ? (
              <>
                {" "}
                <a href={paragraph.linkHref} className="text-accent underline">
                  {paragraph.linkLabel}
                </a>
                .
              </>
            ) : null}
          </p>
        ))}
      </div>
    </div>
  );
}
