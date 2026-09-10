import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/og-logo";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const src = await logoDataUri("public/assets/projeto-nexo-mark.svg", 52);

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
        <img src={src} alt="" width={52} height={62} />
      </div>
    ),
    size,
  );
}
