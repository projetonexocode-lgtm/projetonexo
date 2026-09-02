import { ImageResponse } from "next/og";
import { SITE } from "@/lib/nexo-services/site";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          padding: "72px",
          color: "#1A1815",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#B08D4F",
          }}
        >
          Lisboa · Área Metropolitana · Portugal
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, lineHeight: 1.05 }}>{SITE.name}</div>
          <div style={{ marginTop: 18, fontSize: 36, color: "#B08D4F" }}>
            Avaria em casa? Resolvemos hoje.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#1A1815", opacity: 0.7 }}>
          Reparações urgentes ao domicílio
        </div>
      </div>
    ),
    size,
  );
}
