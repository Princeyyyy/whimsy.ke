import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFD9E8",
        borderRadius: "40px",
        border: "8px solid #4A3552",
        color: "#4A3552",
        fontWeight: 800,
        fontSize: 72,
      }}
    ></div>,
    {
      ...size,
    },
  );
}
