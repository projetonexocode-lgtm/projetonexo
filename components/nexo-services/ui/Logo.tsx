type LogoProps = {
  className?: string;
  onDark?: boolean;
  size?: "header" | "footer" | "compact";
};

const SIZE_CLASS = {
  header: "h-10 w-auto max-w-[9rem] sm:h-12 sm:max-w-[11rem]",
  footer: "h-12 w-auto max-w-[11rem] sm:h-14 sm:max-w-[13rem]",
  compact: "h-8 w-auto max-w-[7.5rem] sm:h-9 sm:max-w-[8.5rem]",
} as const;

export function Logo({
  className = "",
  onDark = false,
  size = "header",
}: LogoProps) {
  const src = onDark
    ? "/assets/nexo-services.svg"
    : "/assets/nexo-services-fundo-claro.svg";

  return (
    <img
      src={src}
      alt=""
      width={680}
      height={400}
      className={`${SIZE_CLASS[size]} ${className}`.trim()}
      decoding="async"
    />
  );
}
