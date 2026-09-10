import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/og-logo";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await logoDataUri(
    "public/assets/projeto-nexo-logo-fundo-claro.svg",
    640,
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
          background: "#E5DBD2",
          padding: "64px 72px",
          color: "#3A2618",
        }}
      >
        <img src={logo} alt="" width={640} height={217} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 36, color: "#6D461B", lineHeight: 1.3 }}>
            {SITE.legalName.replace("Projeto Nexo — ", "")}
          </div>
          <div style={{ marginTop: 16, fontSize: 24, color: "#5C422B", opacity: 0.85 }}>
            Remodelação · Construção · Reabilitação
          </div>
        </div>
      </div>
    ),
    size,
  );
}
