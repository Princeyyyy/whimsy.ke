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
        background: "#352438",
        borderRadius: "18px",
      }}
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 17L17.5 35L24 22L30.5 35L36 17"
          stroke="#F8F4F2"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 17.75C24 17.75 20.1 15.05 20.1 12.65C20.1 11.3 21.15 10.25 22.4 10.25C23.15 10.25 23.75 10.65 24 11.25C24.25 10.65 24.85 10.25 25.6 10.25C26.85 10.25 27.9 11.3 27.9 12.65C27.9 15.05 24 17.75 24 17.75Z"
          fill="#FF7AA8"
        />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
