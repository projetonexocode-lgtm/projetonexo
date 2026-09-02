import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { buildWhatsAppUrl } from "@/lib/site";

type WhatsAppButtonProps = {
  serviceLabel: string;
  children: ReactNode;
  variant?: "primary" | "gold" | "ghost" | "card";
  className?: string;
  showIcon?: boolean;
};

const VARIANTS: Record<NonNullable<WhatsAppButtonProps["variant"]>, string> = {
  primary:
    "bg-espresso text-warm hover:bg-espresso/90",
  gold:
    "border border-gold bg-transparent text-charcoal hover:bg-cognac/20",
  ghost:
    "border border-charcoal/15 bg-transparent text-charcoal hover:border-bronze hover:bg-cognac/15",
  card:
    "border border-gold/50 bg-cream text-espresso hover:border-gold hover:bg-warm",
};

export function WhatsAppButton({
  serviceLabel,
  children,
  variant = "primary",
  className = "",
  showIcon = true,
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppUrl(serviceLabel)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-none px-5 text-sm font-medium tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze ${VARIANTS[variant]} ${className}`}
    >
      {showIcon ? <MessageCircle className="size-4 shrink-0" aria-hidden /> : null}
      <span>{children}</span>
      {variant === "card" ? (
        <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
      ) : null}
    </a>
  );
}
