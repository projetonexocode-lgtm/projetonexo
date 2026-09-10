import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/og-logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const src = await logoDataUri("public/assets/projeto-nexo-mark.svg", 140);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#E5DBD2",
        }}
      >
        <img src={src} alt="" width={140} height={167} />
      </div>
    ),
    size,
  );
}
