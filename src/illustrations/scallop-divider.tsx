import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScallopDividerProps {
  flip?: boolean;
  fill?: "cream" | "blush" | "lavender" | "mint" | "white";
  className?: string;
}

const fillHexMap = {
  cream: "#FFF8F2",
  blush: "#FFD9E8",
  lavender: "#E7D9FB",
  mint: "#D7F5E4",
  white: "#FFFFFF",
} as const;

/**
 * Signature Scalloped SVG Divider between sections.
 */
export function ScallopDivider({ flip = false, fill = "white", className }: ScallopDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none w-full overflow-hidden leading-none select-none",
        flip && "rotate-180",
        className,
      )}
    >
      <svg
        viewBox="0 0 1200 36"
        preserveAspectRatio="none"
        className="block h-5 w-full md:h-7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,36 L0,18 Q30,0 60,18 T120,18 T180,18 T240,18 T300,18 T360,18 T420,18 T480,18 T540,18 T600,18 T660,18 T720,18 T780,18 T840,18 T900,18 T960,18 T1020,18 T1080,18 T1140,18 T1200,18 L1200,36 Z"
          fill={fillHexMap[fill]}
        />
        <path
          d="M0,18 Q30,0 60,18 T120,18 T180,18 T240,18 T300,18 T360,18 T420,18 T480,18 T540,18 T600,18 T660,18 T720,18 T780,18 T840,18 T900,18 T960,18 T1020,18 T1080,18 T1140,18 T1200,18"
          fill="none"
          stroke="#FFD9E8"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}
