import type { ReactNode, SVGProps } from "react";
import {
  socialNetworkLabel,
  visibleSocialLinks,
  type SocialLink,
  type SocialNetwork,
} from "@/lib/cms/defaults";

type SocialLinksProps = {
  links: SocialLink[];
};

function IconFrame({
  children,
  ...props
}: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      className="size-5"
      {...props}
    >
      {children}
    </svg>
  );
}

function SocialIcon({ network }: { network: SocialNetwork }) {
  switch (network) {
    case "instagram":
      return (
        <IconFrame stroke="currentColor" strokeWidth="1.6">
          <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
          <circle cx="12" cy="12" r="4.1" />
          <circle cx="17.35" cy="6.65" r="1.05" fill="currentColor" stroke="none" />
        </IconFrame>
      );
    case "facebook":
      return (
        <IconFrame fill="currentColor">
          <path d="M14.2 8.4h1.85V5.7h-1.85c-2.28 0-3.78 1.38-3.78 3.72v1.53H8.4v2.7h2.02V18.3h2.78v-4.65h2.18l.42-2.7h-2.6V9.66c0-.78.32-1.26 1-1.26Z" />
        </IconFrame>
      );
    case "linkedin":
      return (
        <IconFrame fill="currentColor">
          <path d="M7.35 9.15H4.92V19h2.43V9.15ZM6.14 5a1.42 1.42 0 1 0 0 2.84 1.42 1.42 0 0 0 0-2.84ZM19.08 13.08c0-2.86-1.53-4.2-3.57-4.2-1.64 0-2.38.9-2.79 1.54h-.06V9.15H10.3c.03.7 0 9.85 0 9.85h2.43v-5.5c0-.29.02-.58.11-.79.23-.58.77-1.18 1.67-1.18 1.18 0 1.65.9 1.65 2.21V19h2.43v-5.92Z" />
        </IconFrame>
      );
    case "youtube":
      return (
        <IconFrame fill="currentColor">
          <path d="M21.2 8.2a2.6 2.6 0 0 0-1.83-1.84C17.7 6 12 6 12 6s-5.7 0-7.37.36A2.6 2.6 0 0 0 2.8 8.2 27.3 27.3 0 0 0 2.44 12a27.3 27.3 0 0 0 .36 3.8 2.6 2.6 0 0 0 1.83 1.84C6.3 18 12 18 12 18s5.7 0 7.37-.36a2.6 2.6 0 0 0 1.83-1.84A27.3 27.3 0 0 0 21.56 12a27.3 27.3 0 0 0-.36-3.8ZM10.2 15.05V8.95L15.4 12l-5.2 3.05Z" />
        </IconFrame>
      );
    case "tiktok":
      return (
        <IconFrame fill="currentColor">
          <path d="M14.3 4h-2.5v10.18a2.18 2.18 0 1 1-1.86-2.16V9.46a4.68 4.68 0 1 0 4.36 4.66V9.7a6.7 6.7 0 0 0 3.9 1.24V8.48A4.2 4.2 0 0 1 14.3 7.2V4Z" />
        </IconFrame>
      );
    case "x":
      return (
        <IconFrame fill="currentColor">
          <path d="M16.86 4.5h2.54l-5.55 6.35 6.53 8.65h-5.12l-4.01-5.24-4.59 5.24H4.12l5.94-6.79L3.72 4.5h5.25l3.62 4.8 4.27-4.8Zm-.89 13.47h1.41L8.12 5.95H6.61l9.36 12.02Z" />
        </IconFrame>
      );
    case "pinterest":
      return (
        <IconFrame fill="currentColor">
          <path d="M12 3.6A8.4 8.4 0 0 0 6.7 17.3c.1-.66.36-1.64.74-2.45l2.6-6.2c-.4-.8-.16-1.9.58-2.42.9-.63 2.16-.32 2.7.66.36.64.28 1.5-.04 2.22l-1.1 2.62c-.22.54-.08 1.16.36 1.5.5.38 1.22.26 1.6-.26 1.22-1.68 1.06-4.08-.4-5.56-1.72-1.74-4.7-1.44-6.18.66-1.3 1.84-.86 4.42.66 5.5.22.16.3.44.2.68l-.34.92c-.08.2-.26.28-.46.2-1.86-.76-3.04-2.84-2.7-5.06.4-2.7 2.86-4.86 5.64-4.86 2.3 0 4.46 1.28 5.12 3.36.6 1.88.06 3.92-1.4 5.14-1.22 1.02-2.94 1.26-4.32.56l-1.1 3.28c-.32.96-.18 1.98.1 2.8A8.4 8.4 0 1 0 12 3.6Z" />
        </IconFrame>
      );
  }
}

export function SocialLinks({ links }: SocialLinksProps) {
  const visible = visibleSocialLinks(links);
  if (visible.length === 0) return null;

  return (
    <ul className="mt-6 flex flex-wrap gap-3" aria-label="Redes sociais">
      {visible.map((link) => {
        const label = socialNetworkLabel(link.network);
        return (
          <li key={`${link.network}-${link.url}`}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex size-11 items-center justify-center rounded-full border border-gold text-gold transition-colors hover:border-cream hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
            >
              <SocialIcon network={link.network} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
