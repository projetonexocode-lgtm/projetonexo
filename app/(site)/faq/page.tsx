import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getCmsContent } from "@/lib/cms/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Garantias e FAQ",
  description:
    "Política de garantias da Projeto Nexo: 2 a 7 anos conforme o tipo de intervenção, e 6 meses em instalações com material do cliente.",
};

export default async function FaqPage() {
  const { site } = await getCmsContent();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
        {site.faqHeadingHighlight &&
        site.faqHeading.includes(site.faqHeadingHighlight) ? (
          <>
            {site.faqHeading.split(site.faqHeadingHighlight)[0]}
            <span className="text-accent">{site.faqHeadingHighlight}</span>
            {site.faqHeading.split(site.faqHeadingHighlight)[1]}
          </>
        ) : (
          site.faqHeading
        )}
      </h1>
      <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-charcoal/75">
        {site.faqIntro}
      </p>

      <div className="mt-10 border border-card bg-card p-6">
        <h2 className="font-display text-2xl text-warm">{site.faqPolicyHeading}</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-warm/80">
          {site.faqPolicyItems.map((item) => (
            <li key={item.text}>{item.text}</li>
          ))}
        </ul>
      </div>

      <ul className="mt-10 space-y-6">
        {site.faqs.map((item) => (
          <li key={item.question} className="border-t border-bronze/25 pt-6">
            <h2 className="font-display text-xl text-charcoal">{item.question}</h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
              {item.answer}
            </p>
          </li>
        ))}
      </ul>

      <WhatsAppButton
        serviceLabel="as vossas garantias"
        intro={site.whatsappIntro}
        e164={site.whatsappE164}
        className="mt-10"
      >
        {site.faqWhatsappCta}
      </WhatsAppButton>
    </div>
  );
}
