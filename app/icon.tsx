import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          color: "#6D461B",
          fontSize: 36,
          border: "3px solid #D4A05A",
        }}
      >
        N
      </div>
    ),
    size,
  );
}
