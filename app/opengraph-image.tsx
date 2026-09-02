import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

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
          background: "#E5DBD2",
          padding: "72px",
          color: "#3A2618",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#D4A05A",
          }}
        >
          Lisboa · Portugal
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, lineHeight: 1.05 }}>{SITE.name}</div>
          <div style={{ marginTop: 18, fontSize: 32, color: "#6D461B" }}>
            Gestão de Obras e Projetos
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#5C422B", opacity: 0.8 }}>
          Remodelação · Construção · Reabilitação
        </div>
      </div>
    ),
    size,
  );
}
