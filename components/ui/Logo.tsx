type LogoProps = {
  className?: string;
  onDark?: boolean;
  size?: "header" | "footer";
};

const SIZE_CLASS = {
  header: "h-10 w-auto max-w-[10.75rem] sm:h-12 sm:max-w-[13.5rem]",
  footer: "h-[3.75rem] w-auto max-w-[16rem] sm:h-[4.5rem] sm:max-w-[18rem]",
} as const;

export function Logo({
  className = "",
  onDark = false,
  size = "header",
}: LogoProps) {
  const src = onDark
    ? "/assets/projeto-nexo-logo.svg"
    : "/assets/projeto-nexo-logo-fundo-claro.svg";

  return (
    <img
      src={src}
      alt=""
      width={1180}
      height={400}
      className={`${SIZE_CLASS[size]} ${className}`.trim()}
      decoding="async"
    />
  );
}
