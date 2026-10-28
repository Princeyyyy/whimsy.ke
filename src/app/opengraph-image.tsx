import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.slogan}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF8F2",
        border: "16px solid #FFD9E8",
        padding: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          border: "6px solid #4A3552",
          borderRadius: "40px",
          padding: "48px 72px",
          boxShadow: "0 12px 0 #FFD9E8",
        }}
      >
        <div
          style={{
            backgroundColor: "#F5E1A4",
            border: "3px solid #4A3552",
            borderRadius: "999px",
            padding: "8px 24px",
            fontSize: 24,
            fontWeight: 700,
            color: "#4A3552",
            marginBottom: "20px",
          }}
        >
          Curated Lifestyle Goods · Nairobi, Kenya
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: "#4A3552",
            lineHeight: 1.1,
          }}
        >
          Whimsy.KE
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 600,
            color: "#C83E6B",
            marginTop: "12px",
          }}
        >
          &ldquo;Little things, big smiles.&rdquo;
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#7A6685",
            marginTop: "20px",
          }}
        >
          Pastel Bags · Ceramic Tableware · Journals · Custom Gift Boxes
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
