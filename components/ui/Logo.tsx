import { useId } from "react";
import {
  WORDMARK_NEXO,
  WORDMARK_PROJETO,
  WORDMARK_TAGLINE,
} from "@/components/ui/logo-paths";

type LogoProps = {
  className?: string;
  onDark?: boolean;
  size?: "header" | "footer";
};

const SIZE_CLASS = {
  header: "h-12 w-auto max-w-[13rem] sm:h-16 sm:max-w-[18rem]",
  footer: "h-[3.75rem] w-auto max-w-[16rem] sm:h-[4.5rem] sm:max-w-[18rem]",
} as const;

const PALETTE = {
  dark: {
    gold: ["#6b3f10", "#c8912f", "#f7dc96", "#b8802a", "#6b3f10"],
    silver: ["#ffffff", "#d7dade", "#8d9399", "#f2f4f6"],
    silverText: ["#ffffff", "#e6e9ec", "#8f959b", "#f4f6f8"],
    goldText: ["#c9a15c", "#f3e0b0", "#c9a15c"],
    barFill: "#2a2a2e",
    barOpacity: 0.55,
    tagFill: "#e9ecef",
  },
  light: {
    gold: ["#3d2412", "#734A26", "#D9984A", "#734A26", "#3d2412"],
    silver: ["#5a5a62", "#2a2a2e", "#0B0B0D", "#3a3a40"],
    silverText: ["#5a5a62", "#0B0B0D", "#2a2a2e", "#0B0B0D"],
    goldText: ["#734A26", "#D9984A", "#734A26"],
    barFill: "#F2F2F2",
    barOpacity: 0.5,
    tagFill: "#0B0B0D",
  },
} as const;

export function Logo({
  className = "",
  onDark = false,
  size = "header",
}: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const palette = onDark ? PALETTE.dark : PALETTE.light;
  const gold = `${uid}-gold`;
  const silver = `${uid}-silver`;
  const goldText = `${uid}-gold-text`;
  const silverText = `${uid}-silver-text`;

  return (
    <svg
      viewBox="0 0 1180 400"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={`nx-logo ${SIZE_CLASS[size]} ${className}`.trim()}
    >
      <defs>
        <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.gold[0]} />
          <stop offset="28%" stopColor={palette.gold[1]} />
          <stop offset="52%" stopColor={palette.gold[2]} />
          <stop offset="74%" stopColor={palette.gold[3]} />
          <stop offset="100%" stopColor={palette.gold[4]} />
        </linearGradient>
        <linearGradient id={silver} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor={palette.silver[0]} />
          <stop offset="40%" stopColor={palette.silver[1]} />
          <stop offset="62%" stopColor={palette.silver[2]} />
          <stop offset="100%" stopColor={palette.silver[3]} />
        </linearGradient>
        <linearGradient id={silverText} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.silverText[0]} />
          <stop offset="45%" stopColor={palette.silverText[1]} />
          <stop offset="55%" stopColor={palette.silverText[2]} />
          <stop offset="100%" stopColor={palette.silverText[3]} />
        </linearGradient>
        <linearGradient id={goldText} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={palette.goldText[0]} />
          <stop offset="50%" stopColor={palette.goldText[1]} />
          <stop offset="100%" stopColor={palette.goldText[2]} />
        </linearGradient>
      </defs>
      <g transform="translate(40,30)">
        <path
          d="M170 8 L288 76 L288 212 L170 280 L52 212 L52 76 Z"
          fill="none"
          stroke={`url(#${gold})`}
          strokeWidth="15"
          strokeLinejoin="miter"
        />
        <g fill={`url(#${gold})`}>
          <rect x="104" y="60" width="7" height="182" />
          <rect x="121" y="52" width="7" height="190" />
          <rect x="138" y="44" width="7" height="198" />
          <rect x="155" y="36" width="7" height="206" />
        </g>
        <path
          d="M178 96 L266 148 L266 268 L232 248 L232 176 L178 144 Z"
          fill={`url(#${silver})`}
        />
        <g fill={palette.barFill} opacity={palette.barOpacity}>
          <rect x="196" y="160" width="6" height="72" />
          <rect x="208" y="167" width="6" height="72" />
          <rect x="220" y="174" width="6" height="72" />
        </g>
        <path
          d="M40 214 L196 262 L190 276 L36 228 Z"
          fill={`url(#${gold})`}
        />
        <path
          d="M74 246 L214 288 L208 301 L70 260 Z"
          fill={`url(#${silver})`}
          opacity="0.9"
        />
      </g>
      <path d={WORDMARK_PROJETO} fill={`url(#${goldText})`} />
      <path d={WORDMARK_NEXO} fill={`url(#${silverText})`} />
      <rect x="396" y="306" width="34" height="4" fill={palette.tagFill} />
      <path d={WORDMARK_TAGLINE} fill={palette.tagFill} />
      <rect x="908" y="306" width="34" height="4" fill={palette.tagFill} />
    </svg>
  );
}
