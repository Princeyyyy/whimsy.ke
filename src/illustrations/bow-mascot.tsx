import * as React from "react";
import { cn } from "@/lib/utils";

export type MascotMood = "happy" | "sleepy" | "waving" | "confused";

export interface BowMascotProps extends React.SVGProps<SVGSVGElement> {
  mood?: MascotMood;
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  animated?: boolean;
}

const sizeMap = {
  sm: "size-12",
  md: "size-20",
  lg: "size-28",
  xl: "size-36",
} as const;

const moodDescriptions: Record<MascotMood, string> = {
  happy: "Bowberry the Whimsy bow mascot smiling happily with little sparkles",
  sleepy: "Bowberry the Whimsy bow mascot resting peacefully with sleepy eyes and Zzz bubbles",
  waving: "Bowberry the Whimsy bow mascot waving a ribbon tail to say Karibu",
  confused: "Bowberry the Whimsy bow mascot tilting curiously with a tiny question mark",
};

/**
 * Whimsy.KE Signature Bow Mascot ("Bowberry")
 * A cute ribbon bow with a smiling face in 4 distinct moods:
 * happy, sleepy, waving, confused.
 */
export function BowMascot({
  mood = "happy",
  size = "md",
  label,
  animated = true,
  className,
  ...props
}: BowMascotProps) {
  const accessibleLabel = label ?? moodDescriptions[mood];

  return (
    <svg
      viewBox="0 0 160 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={accessibleLabel}
      className={cn(
        sizeMap[size],
        animated && mood === "happy" && "motion-safe:animate-bounce",
        animated && mood === "confused" && "motion-safe:-rotate-3",
        className,
      )}
      style={animated && mood === "happy" ? { animationDuration: "2.8s" } : undefined}
      {...props}
    >
      <title>{accessibleLabel}</title>

      {/* Die-cut white sticker backing */}
      <path
        d="M34 22C16 22 8 38 8 56C8 74 18 90 36 90C44 90 50 87 55 84L44 114L64 108L72 92H88L96 108L116 114L105 84C110 87 116 90 124 90C142 90 152 74 152 56C152 38 144 22 126 22C110 22 98 31 91 40C87 37 83 36 80 36C77 36 73 37 69 40C62 31 50 22 34 22Z"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinejoin="round"
      />

      {/* Left & Right Ribbon Tails */}
      <path
        d="M64 78L48 112L64 106L75 84"
        fill="#FFD9E8"
        stroke="#4A3552"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={mood === "waving" ? "M96 78L122 102L116 86L130 78" : "M96 78L112 112L96 106L85 84"}
        fill="#FFD9E8"
        stroke="#4A3552"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left Bow Loop */}
      <path
        d="M66 46C56 30 42 26 30 28C18 30 14 42 14 56C14 70 20 82 34 84C46 86 58 78 66 66Z"
        fill="#FF8FB4"
        stroke="#4A3552"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Left Loop Inner Crease Highlight */}
      <path d="M30 37C24 39 22 46 22 54" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <path d="M58 53C50 51 44 53 39 58" stroke="#4A3552" strokeWidth="2.5" strokeLinecap="round" />

      {/* Right Bow Loop */}
      <path
        d="M94 46C104 30 118 26 130 28C142 30 146 42 146 56C146 70 140 82 126 84C114 86 102 78 94 66Z"
        fill="#FF8FB4"
        stroke="#4A3552"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Right Loop Inner Highlight */}
      <path
        d="M130 37C136 39 138 46 138 54"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M102 53C110 51 116 53 121 58"
        stroke="#4A3552"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Center Knot (Face Container) */}
      <rect
        x="56"
        y="38"
        width="48"
        height="42"
        rx="18"
        fill="#FFD9E8"
        stroke="#4A3552"
        strokeWidth="3.5"
      />

      {/* Rosy Cheeks */}
      <ellipse cx="66" cy="63" rx="4.5" ry="2.8" fill="#FF8FB4" />
      <ellipse cx="94" cy="63" rx="4.5" ry="2.8" fill="#FF8FB4" />

      {/* Mood-specific Eyes & Mouth */}
      {mood === "happy" && (
        <>
          <circle cx="70" cy="56" r="3.2" fill="#4A3552" />
          <circle cx="90" cy="56" r="3.2" fill="#4A3552" />
          <circle cx="71.2" cy="54.8" r="1.1" fill="#FFFFFF" />
          <circle cx="91.2" cy="54.8" r="1.1" fill="#FFFFFF" />
          <path
            d="M75 62C76.8 65.5 83.2 65.5 85 62"
            stroke="#4A3552"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Happy Sparkles */}
          <path
            d="M80 12L82 18L88 20L82 22L80 28L78 22L72 20L78 18L80 12Z"
            fill="#F5E1A4"
            stroke="#4A3552"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </>
      )}

      {mood === "sleepy" && (
        <>
          <path
            d="M66 56C68 59 72 59 74 56"
            stroke="#4A3552"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M86 56C88 59 92 59 94 56"
            stroke="#4A3552"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <circle cx="80" cy="64" r="2.5" fill="#4A3552" />
          {/* Sleepy Zzz */}
          <path
            d="M104 16H114L104 26H114"
            stroke="#4A3552"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M120 8H127L120 15H127"
            stroke="#7A6685"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {mood === "waving" && (
        <>
          {/* Left wink, right open eye */}
          <path
            d="M66 56C68 53 72 53 74 56"
            stroke="#4A3552"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <circle cx="90" cy="56" r="3.2" fill="#4A3552" />
          <circle cx="91.2" cy="54.8" r="1.1" fill="#FFFFFF" />
          <path d="M74 61C76 66 84 66 86 61Z" fill="#4A3552" />
          {/* Little floating heart above */}
          <path
            d="M80 24C80 24 72 19 72 14C72 11 74.5 9 77 9C78.8 9 80 10.2 80 11.5C80 10.2 81.2 9 83 9C85.5 9 88 11 88 14C88 19 80 24 80 24Z"
            fill="#FF8FB4"
            stroke="#4A3552"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </>
      )}

      {mood === "confused" && (
        <>
          <circle cx="70" cy="56" r="3.2" fill="#4A3552" />
          <circle cx="90" cy="55" r="3.2" fill="#4A3552" />
          <path d="M66 49L74 51" stroke="#4A3552" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M86 50L94 47" stroke="#4A3552" strokeWidth="2.4" strokeLinecap="round" />
          <path
            d="M75 64C77 62 79 65 81 63C83 61 84 64 85 63"
            stroke="#4A3552"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Question Mark */}
          <path
            d="M76 14C76 10.5 84 10.5 84 15C84 18 80 18.5 80 21"
            stroke="#4A3552"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="80" cy="26" r="2" fill="#4A3552" />
        </>
      )}
    </svg>
  );
}
