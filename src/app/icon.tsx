import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFF8F2",
        borderRadius: "18px",
        border: "4px solid #4A3552",
        fontSize: 34,
        fontWeight: 800,
        color: "#4A3552",
      }}
    >
      🎀
    </div>,
    {
      ...size,
    },
  );
}
