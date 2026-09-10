import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/og-logo";
import { SITE } from "@/lib/nexo-services/site";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await logoDataUri(
    "public/assets/nexo-services-fundo-claro.svg",
    520,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF7F2",
          padding: "64px 72px",
          color: "#1A1815",
        }}
      >
        <img src={logo} alt="" width={520} height={306} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 36, color: "#B08D4F", lineHeight: 1.3 }}>
            Avaria em casa? Resolvemos hoje.
          </div>
          <div style={{ marginTop: 16, fontSize: 24, color: "#1A1815", opacity: 0.7 }}>
            {SITE.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
