type WhatsAppIconProps = {
  className?: string;
  /** Fill of the three "dots" that punch through the glyph — should match the button's background colour. */
  punchColor: string;
};

export function WhatsAppIcon({ className, punchColor }: WhatsAppIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
    >
      <rect x="2" y="3" width="20" height="15" rx="7" fill="currentColor" />
      <rect x="6" y="17" width="6" height="5" rx="2" fill="currentColor" />
      <circle cx="8" cy="10.5" r="1.4" fill={punchColor} />
      <circle cx="12" cy="10.5" r="1.4" fill={punchColor} />
      <circle cx="16" cy="10.5" r="1.4" fill={punchColor} />
    </svg>
  );
}
