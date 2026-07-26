import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// ImageResponse (satori) can't read CSS custom properties, so the accent hex is
// duplicated here from app/globals.css's light-theme --color-accent by necessity.
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
          background: "#0071e3",
          color: "#ffffff",
          fontSize: 20,
          fontWeight: 600,
          fontFamily: "sans-serif",
        }}
      >
        V
      </div>
    ),
    size,
  );
}
