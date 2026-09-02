import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, SITE } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl("os vossos serviços")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir WhatsApp ${SITE.whatsappDisplay} com mensagem pronta`}
      className="fixed right-4 z-50 inline-flex min-h-14 min-w-14 items-center justify-center rounded-full bg-espresso text-warm ring-1 ring-gold/50 shadow-[0_8px_24px_rgba(92,66,43,0.35)] transition-transform hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:right-6"
    >
      <MessageCircle className="size-7" aria-hidden />
    </a>
  );
}
