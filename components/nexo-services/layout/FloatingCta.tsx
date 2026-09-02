import { MessageCircle, Phone } from "lucide-react";
import { buildWhatsAppUrl, SITE, URGENT_WHATSAPP_MESSAGE } from "@/lib/nexo-services/site";

export function FloatingCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-bronze/30 bg-cream/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:inset-x-auto sm:right-4 sm:bottom-[max(1rem,env(safe-area-inset-bottom))] sm:w-auto sm:border sm:border-bronze/30 sm:p-2">
      <div className="mx-auto flex max-w-6xl gap-2 sm:mx-0">
        <a
          href={`tel:${SITE.phoneTel}`}
          aria-label={`Ligar para ${SITE.phoneDisplay}`}
          className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 bg-charcoal px-4 text-base font-medium tracking-wide text-warm transition-colors hover:bg-charcoal/90 sm:flex-none sm:min-w-[148px]"
        >
          <Phone className="size-5 shrink-0" aria-hidden />
          Ligar
        </a>
        <a
          href={buildWhatsAppUrl(URGENT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir WhatsApp ${SITE.whatsappDisplay} com mensagem pronta`}
          className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 border border-gold bg-sand px-4 text-base font-medium tracking-wide text-charcoal transition-colors hover:bg-cream sm:flex-none sm:min-w-[148px]"
        >
          <MessageCircle className="size-5 shrink-0" aria-hidden />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
