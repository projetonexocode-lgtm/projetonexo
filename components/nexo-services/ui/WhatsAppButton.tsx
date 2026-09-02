import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { buildWhatsAppUrl } from "@/lib/nexo-services/site";

type WhatsAppButtonProps = {
  message: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "card";
  className?: string;
  showIcon?: boolean;
};

const VARIANTS: Record<NonNullable<WhatsAppButtonProps["variant"]>, string> = {
  primary: "bg-charcoal text-warm hover:bg-charcoal/90",
  secondary:
    "border border-gold bg-transparent text-charcoal hover:bg-sand",
  card: "border border-bronze/50 bg-cream text-charcoal hover:border-bronze hover:bg-cream/80",
};

export function WhatsAppButton({
  message,
  children,
  variant = "secondary",
  className = "",
  showIcon = true,
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-none px-5 text-sm font-medium tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze ${VARIANTS[variant]} ${className}`}
    >
      {showIcon ? <MessageCircle className="size-4 shrink-0" aria-hidden /> : null}
      <span>{children}</span>
    </a>
  );
}
