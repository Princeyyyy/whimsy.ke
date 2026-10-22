import * as React from "react";
import { cn } from "@/lib/utils";

export type IllustrationKind =
  | "shoulder-bag"
  | "mini-tote"
  | "charm-pouch"
  | "ceramic-plate"
  | "ceramic-mug"
  | "wall-frame"
  | "bedsheet-set"
  | "water-bottle"
  | "house-shoes"
  | "phone-case"
  | "journal"
  | "colouring-book"
  | "makeup-pouch"
  | "bead-kit"
  | "gift-bundle"
  | "hair-clips"
  | "candle-jar"
  | "desk-organiser"
  | "sticker-sheet"
  | "cereal-bowl"
  | "pink-tote"
  | "fluffy-cushion"
  | "throw-blanket"
  | "lunch-box"
  | "mini-mirror"
  | "washi-tape"
  | "gel-pens"
  | "tea-set"
  | "trinket-tray"
  | "mug-journal-set";

export type IllustrationView = "main" | "variant" | "detail" | "lifestyle";

export type PastelBackdrop = "blush" | "lavender" | "mint" | "butter" | "cream";

export interface ProductIllustrationProps {
  kind: IllustrationKind;
  view?: IllustrationView;
  backdrop?: PastelBackdrop;
  alt: string;
  className?: string;
}

const backdropClasses: Record<PastelBackdrop, string> = {
  blush: "bg-blush/55",
  lavender: "bg-lavender/65",
  mint: "bg-mint/65",
  butter: "bg-butter/55",
  cream: "bg-cream-subtle",
};

/**
 * Renders the vector artwork for each of our 30 products with consistent
 * 3px plum strokes (#4A3552), white die-cut sticker outlines, pastel fills,
 * and support for 4 gallery views: main, variant, detail (close-up), and lifestyle (desk/table scene).
 */
export function ProductIllustration({
  kind,
  view = "main",
  backdrop = "blush",
  alt,
  className,
}: ProductIllustrationProps) {
  const isVariant = view === "variant";
  const isDetail = view === "detail";
  const isLifestyle = view === "lifestyle";

  // Palette swap for the "variant" gallery tab so colour variants look distinct
  const primaryFill = isVariant ? "#E7D9FB" : "#FF8FB4";
  const secondaryFill = isVariant ? "#D7F5E4" : "#FFD9E8";
  const accentFill = isVariant ? "#FF8FB4" : "#F5E1A4";

  return (
    <div
      className={cn(
        "relative flex aspect-4/5 w-full items-center justify-center overflow-hidden rounded-2xl select-none",
        backdropClasses[backdrop],
        className,
      )}
    >
      {/* Subtle decorative background dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage: "radial-gradient(#FFFFFF 2.5px, transparent 2.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Lifestyle scene backdrop props (tabletop + little plant/sparkle) */}
      {isLifestyle && (
        <svg
          aria-hidden="true"
          viewBox="0 0 200 240"
          className="pointer-events-none absolute inset-0 size-full"
        >
          {/* Pastel tabletop surface */}
          <rect
            x="0"
            y="182"
            width="200"
            height="58"
            fill="#FFF8F2"
            stroke="#4A3552"
            strokeWidth="2.5"
          />
          {/* Cute arched window or wall art in lifestyle background */}
          <rect
            x="135"
            y="24"
            width="44"
            height="56"
            rx="22"
            fill="#FFFFFF"
            fillOpacity="0.7"
            stroke="#4A3552"
            strokeWidth="2"
          />
          <circle cx="157" cy="46" r="8" fill="#F5E1A4" />
          {/* Little potted leaf prop */}
          <rect
            x="22"
            y="162"
            width="22"
            height="22"
            rx="5"
            fill="#FFD9E8"
            stroke="#4A3552"
            strokeWidth="2"
          />
          <path
            d="M33 162C28 150 20 148 24 140C28 134 35 145 33 162Z"
            fill="#D7F5E4"
            stroke="#4A3552"
            strokeWidth="2"
          />
          <path
            d="M33 162C38 150 46 148 42 140C38 134 31 145 33 162Z"
            fill="#D7F5E4"
            stroke="#4A3552"
            strokeWidth="2"
          />
        </svg>
      )}

      <svg
        viewBox={isDetail ? "38 42 124 124" : "0 0 200 220"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={alt}
        className={cn(
          "relative z-10 size-4/5 transition-transform duration-300",
          isLifestyle && "translate-y-2 scale-90",
        )}
      >
        <title>{alt}</title>

        {/* Corner Sparkles & Hearts common to the Sticker Sheet aesthetic */}
        <g aria-hidden="true">
          <path
            d="M34 40L36 46L42 48L36 50L34 56L32 50L26 48L32 46L34 40Z"
            fill={accentFill}
            stroke="#4A3552"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M166 48C166 48 159 43.5 159 39.5C159 37 161 35 163 35C164.5 35 166 36 166 37.2C166 36 167.5 35 169 35C171 35 173 37 173 39.5C173 43.5 166 48 166 48Z"
            fill={primaryFill}
            stroke="#4A3552"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="172" r="4" fill="#FFFFFF" stroke="#4A3552" strokeWidth="2" />
          <circle cx="162" cy="168" r="5" fill={secondaryFill} stroke="#4A3552" strokeWidth="2" />
        </g>

        {renderArtworkByKind(kind, primaryFill, secondaryFill, accentFill)}
      </svg>

      {/* View pill label when viewing alternate gallery shots */}
      {view !== "main" && (
        <span className="border-plum/20 text-plum font-display absolute bottom-2.5 left-2.5 z-20 rounded-full border bg-white/90 px-2.5 py-0.5 text-xs font-medium capitalize">
          {view === "variant"
            ? "Pastel Variant"
            : view === "detail"
              ? "Close-up Detail"
              : "Styled Scene"}
        </span>
      )}
    </div>
  );
}

function renderArtworkByKind(
  kind: IllustrationKind,
  primary: string,
  secondary: string,
  accent: string,
) {
  switch (kind) {
    case "shoulder-bag":
      return (
        <g>
          {/* Die-cut white sticker backing */}
          <path
            d="M62 84C62 52 138 52 138 84L150 152C152 164 142 174 130 174H70C58 174 48 164 50 152L62 84Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="12"
            strokeLinejoin="round"
          />
          {/* Shoulder Strap */}
          <path
            d="M68 92C68 54 132 54 132 92"
            stroke="#4A3552"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Bag Body */}
          <path
            d="M54 96C54 88 60 82 68 82H132C140 82 146 88 146 96L152 152C153 163 144 172 133 172H67C56 172 47 163 48 152L54 96Z"
            fill={secondary}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Curved Flap */}
          <path
            d="M54 94H146V114C146 128 128 136 100 136C72 136 54 128 54 114V94Z"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Heart Clasp */}
          <path
            d="M100 146C100 146 88 138 88 131C88 126.5 91.5 124 95 124C97.5 124 100 126 100 128C100 126 102.5 124 105 124C108.5 124 112 126.5 112 131C112 138 100 146 100 146Z"
            fill={accent}
            stroke="#4A3552"
            strokeWidth="3"
          />
        </g>
      );

    case "mini-tote":
    case "pink-tote":
      return (
        <g>
          <rect
            x="52"
            y="78"
            width="96"
            height="98"
            rx="16"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="12"
          />
          {/* Handles */}
          <path
            d="M76 82V58C76 46 124 46 124 58V82"
            stroke="#4A3552"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Canvas Tote Body */}
          <rect
            x="54"
            y="80"
            width="92"
            height="94"
            rx="14"
            fill={kind === "pink-tote" ? primary : "#E7D9FB"}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Front Pocket */}
          <rect
            x="72"
            y="112"
            width="56"
            height="44"
            rx="10"
            fill="#FFF8F2"
            stroke="#4A3552"
            strokeWidth="3"
          />
          {/* Cute Bow on Pocket */}
          <path
            d="M90 132L100 137L90 142V132ZM110 132L100 137L110 142V132Z"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="100" cy="137" r="3.5" fill={accent} stroke="#4A3552" strokeWidth="2" />
        </g>
      );

    case "charm-pouch":
    case "makeup-pouch":
      return (
        <g>
          <rect
            x="44"
            y="82"
            width="112"
            height="78"
            rx="26"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="12"
          />
          {/* Zipper Track */}
          <rect
            x="56"
            y="76"
            width="88"
            height="10"
            rx="5"
            fill={accent}
            stroke="#4A3552"
            strokeWidth="3"
          />
          {/* Zip Charm */}
          <circle cx="144" cy="82" r="9" fill={primary} stroke="#4A3552" strokeWidth="3" />
          {/* Quilted Pouch Body */}
          <rect
            x="46"
            y="84"
            width="108"
            height="74"
            rx="24"
            fill={kind === "makeup-pouch" ? secondary : primary}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Center Heart Patch */}
          <rect
            x="76"
            y="102"
            width="48"
            height="38"
            rx="12"
            fill="#FFF8F2"
            stroke="#4A3552"
            strokeWidth="2.8"
          />
          <path
            d="M100 130C100 130 90 123 90 117C90 113.5 92.8 111 96 111C98 111 100 112.5 100 114C100 112.5 102 111 104 111C107.2 111 110 113.5 110 117C110 123 100 130 100 130Z"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="2.5"
          />
        </g>
      );

    case "ceramic-plate":
    case "trinket-tray":
      return (
        <g>
          <circle cx="100" cy="115" r="62" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="10" />
          <circle cx="100" cy="115" r="60" fill="#FFF8F2" stroke="#4A3552" strokeWidth="3.5" />
          <circle
            cx="100"
            cy="115"
            r="44"
            fill={secondary}
            stroke="#4A3552"
            strokeWidth="2.8"
            strokeDasharray="6 4"
          />
          {/* Rim Hearts */}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <circle
              key={angle}
              cx={100 + 52 * Math.cos((angle * Math.PI) / 180)}
              cy={115 + 52 * Math.sin((angle * Math.PI) / 180)}
              r="4"
              fill={primary}
              stroke="#4A3552"
              strokeWidth="1.8"
            />
          ))}
          {/* Center Heart Motif */}
          <path
            d="M100 132C100 132 82 120 82 108C82 101 87.5 96 93.5 96C97 96 100 98.5 100 101.5C100 98.5 103 96 106.5 96C112.5 96 118 101 118 108C118 120 100 132 100 132Z"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="3"
          />
        </g>
      );

    case "ceramic-mug":
    case "tea-set":
      return (
        <g>
          <rect
            x="52"
            y="72"
            width="84"
            height="92"
            rx="22"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="12"
          />
          {/* Mug Handle */}
          <path
            d="M132 88H148C158 88 164 96 164 108C164 120 158 128 148 128H132"
            stroke="#4A3552"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M132 88H148C158 88 164 96 164 108C164 120 158 128 148 128H132"
            stroke={accent}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Mug Body */}
          <path
            d="M54 78C54 72 58 68 64 68H124C130 68 134 72 134 78V134C134 152 120 164 94 164C68 164 54 152 54 134V78Z"
            fill={secondary}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Saucer if tea-set */}
          {kind === "tea-set" && (
            <ellipse
              cx="94"
              cy="168"
              rx="58"
              ry="10"
              fill={accent}
              stroke="#4A3552"
              strokeWidth="3"
            />
          )}
          {/* Cozy Steam Waves */}
          <path
            d="M80 56C78 50 84 46 80 40"
            stroke="#4A3552"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M106 54C104 48 110 44 106 38"
            stroke="#4A3552"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Smiling Mug Face */}
          <circle cx="80" cy="112" r="3.2" fill="#4A3552" />
          <circle cx="108" cy="112" r="3.2" fill="#4A3552" />
          <ellipse cx="73" cy="118" rx="4.5" ry="2.5" fill={primary} />
          <ellipse cx="115" cy="118" rx="4.5" ry="2.5" fill={primary} />
          <path
            d="M89 118C91 122 97 122 99 118"
            stroke="#4A3552"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </g>
      );

    case "wall-frame":
    case "mini-mirror":
      return (
        <g>
          {/* Scalloped Frame Backing */}
          <rect
            x="52"
            y="50"
            width="96"
            height="124"
            rx="24"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="10"
          />
          <rect
            x="54"
            y="52"
            width="92"
            height="120"
            rx="22"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Polka Dots on Frame */}
          <circle cx="66" cy="66" r="4" fill="#FFF8F2" />
          <circle cx="134" cy="66" r="4" fill="#FFF8F2" />
          <circle cx="66" cy="158" r="4" fill="#FFF8F2" />
          <circle cx="134" cy="158" r="4" fill="#FFF8F2" />
          {/* Inner Canvas / Mirror Glass */}
          <rect
            x="70"
            y="68"
            width="60"
            height="88"
            rx="14"
            fill={kind === "mini-mirror" ? "#D7F5E4" : "#FFF8F2"}
            stroke="#4A3552"
            strokeWidth="3"
          />
          {kind === "mini-mirror" ? (
            <path
              d="M82 92L112 62M88 118L118 88"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M100 128C100 128 84 116 84 106C84 100 88.5 96 94 96C97 96 100 98 100 101C100 98 103 96 106 96C111.5 96 116 100 116 106C116 116 100 128 100 128Z"
              fill={accent}
              stroke="#4A3552"
              strokeWidth="2.8"
            />
          )}
        </g>
      );

    case "bedsheet-set":
    case "throw-blanket":
    case "fluffy-cushion":
      return (
        <g>
          <rect
            x="44"
            y="66"
            width="112"
            height="98"
            rx="24"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="10"
          />
          {/* Folded Blanket / Sheet Stack */}
          <rect
            x="48"
            y="124"
            width="104"
            height="36"
            rx="16"
            fill={secondary}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          <rect
            x="52"
            y="96"
            width="96"
            height="34"
            rx="16"
            fill="#FFF8F2"
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Top Pillow / Cushion */}
          <rect
            x="62"
            y="64"
            width="76"
            height="38"
            rx="18"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Ribbon Tie */}
          <rect
            x="92"
            y="64"
            width="16"
            height="96"
            fill={accent}
            stroke="#4A3552"
            strokeWidth="3"
          />
        </g>
      );

    case "water-bottle":
      return (
        <g>
          <rect
            x="68"
            y="44"
            width="64"
            height="136"
            rx="24"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="10"
          />
          {/* Carry Loop */}
          <path
            d="M84 48C84 32 116 32 116 48"
            stroke="#4A3552"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Bottle Cap */}
          <rect
            x="78"
            y="46"
            width="44"
            height="20"
            rx="8"
            fill={accent}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Bottle Body */}
          <rect
            x="68"
            y="66"
            width="64"
            height="112"
            rx="22"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Belly Sticker Patch */}
          <rect
            x="78"
            y="96"
            width="44"
            height="52"
            rx="12"
            fill="#FFF8F2"
            stroke="#4A3552"
            strokeWidth="2.8"
          />
          <path
            d="M100 132C100 132 89 124 89 118C89 114.5 91.5 112 95 112C97.5 112 100 114 100 116C100 114 102.5 112 105 112C108.5 112 111 114.5 111 118C111 124 100 132 100 132Z"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="2.5"
          />
        </g>
      );

    case "house-shoes":
      return (
        <g>
          {/* Left Slipper */}
          <rect
            x="42"
            y="68"
            width="50"
            height="96"
            rx="25"
            fill={secondary}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          <ellipse
            cx="67"
            cy="102"
            rx="22"
            ry="14"
            fill="#FFF8F2"
            stroke="#4A3552"
            strokeWidth="3"
          />
          {/* Right Slipper */}
          <rect
            x="106"
            y="68"
            width="50"
            height="96"
            rx="25"
            fill={secondary}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          <ellipse
            cx="131"
            cy="102"
            rx="22"
            ry="14"
            fill="#FFF8F2"
            stroke="#4A3552"
            strokeWidth="3"
          />
          {/* Little Bows on Slippers */}
          <circle cx="67" cy="96" r="5" fill={primary} stroke="#4A3552" strokeWidth="2.2" />
          <circle cx="131" cy="96" r="5" fill={primary} stroke="#4A3552" strokeWidth="2.2" />
        </g>
      );

    case "phone-case":
      return (
        <g>
          <rect
            x="62"
            y="44"
            width="76"
            height="136"
            rx="22"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="10"
          />
          <rect
            x="64"
            y="46"
            width="72"
            height="132"
            rx="20"
            fill={secondary}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Camera Cutout */}
          <rect
            x="74"
            y="56"
            width="26"
            height="26"
            rx="8"
            fill="#FFF8F2"
            stroke="#4A3552"
            strokeWidth="2.8"
          />
          <circle cx="82" cy="64" r="3.5" fill="#4A3552" />
          <circle cx="82" cy="74" r="3.5" fill="#4A3552" />
          {/* Floating Hearts Pattern */}
          <path
            d="M100 138C100 138 86 128 86 119C86 114 90 110 95 110C97.8 110 100 112 100 114.5C100 112 102.2 110 105 110C110 110 114 114 114 119C114 128 100 138 100 138Z"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="2.8"
          />
        </g>
      );

    case "journal":
    case "colouring-book":
      return (
        <g>
          <rect
            x="54"
            y="50"
            width="92"
            height="124"
            rx="16"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="10"
          />
          {/* Book Cover */}
          <rect
            x="56"
            y="52"
            width="88"
            height="120"
            rx="14"
            fill={kind === "journal" ? primary : "#D7F5E4"}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Spiral Rings */}
          {[66, 84, 102, 120, 138, 156].map((y) => (
            <rect
              key={y}
              x="48"
              y={y}
              width="16"
              height="6"
              rx="3"
              fill={accent}
              stroke="#4A3552"
              strokeWidth="2.2"
            />
          ))}
          {/* Label Plate */}
          <rect
            x="74"
            y="76"
            width="56"
            height="40"
            rx="10"
            fill="#FFF8F2"
            stroke="#4A3552"
            strokeWidth="2.8"
          />
          {/* Bookmark Ribbon */}
          <path
            d="M116 172V190L124 184L132 190V172"
            fill={accent}
            stroke="#4A3552"
            strokeWidth="2.5"
          />
        </g>
      );

    case "bead-kit":
    case "lunch-box":
      return (
        <g>
          <rect
            x="44"
            y="64"
            width="112"
            height="96"
            rx="20"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="10"
          />
          <rect
            x="46"
            y="66"
            width="108"
            height="92"
            rx="18"
            fill="#FFF8F2"
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Compartments */}
          <rect
            x="56"
            y="76"
            width="40"
            height="32"
            rx="8"
            fill={secondary}
            stroke="#4A3552"
            strokeWidth="2.5"
          />
          <rect
            x="104"
            y="76"
            width="40"
            height="32"
            rx="8"
            fill={accent}
            stroke="#4A3552"
            strokeWidth="2.5"
          />
          <rect
            x="56"
            y="116"
            width="40"
            height="32"
            rx="8"
            fill="#D7F5E4"
            stroke="#4A3552"
            strokeWidth="2.5"
          />
          <rect
            x="104"
            y="116"
            width="40"
            height="32"
            rx="8"
            fill="#E7D9FB"
            stroke="#4A3552"
            strokeWidth="2.5"
          />
          {/* Cute Beads inside */}
          <circle cx="76" cy="92" r="6" fill={primary} stroke="#4A3552" strokeWidth="2" />
          <circle cx="124" cy="92" r="6" fill="#FFFFFF" stroke="#4A3552" strokeWidth="2" />
          <circle cx="76" cy="132" r="6" fill={accent} stroke="#4A3552" strokeWidth="2" />
          <circle cx="124" cy="132" r="6" fill={primary} stroke="#4A3552" strokeWidth="2" />
        </g>
      );

    case "gift-bundle":
    case "mug-journal-set":
      return (
        <g>
          {/* Gift Box */}
          <rect
            x="48"
            y="84"
            width="104"
            height="86"
            rx="18"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="10"
          />
          <rect
            x="50"
            y="86"
            width="100"
            height="82"
            rx="16"
            fill={secondary}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Box Lid */}
          <rect
            x="44"
            y="68"
            width="112"
            height="24"
            rx="10"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Vertical & Horizontal Ribbon */}
          <rect
            x="90"
            y="68"
            width="20"
            height="100"
            fill={accent}
            stroke="#4A3552"
            strokeWidth="3"
          />
          {/* Top Big Bow */}
          <path
            d="M100 68C86 48 66 52 68 64C70 72 88 70 100 68Z"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="3.2"
          />
          <path
            d="M100 68C114 48 134 52 132 64C130 72 112 70 100 68Z"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="3.2"
          />
          <circle cx="100" cy="66" r="7" fill={accent} stroke="#4A3552" strokeWidth="3" />
        </g>
      );

    case "cereal-bowl":
    case "candle-jar":
    case "desk-organiser":
      return (
        <g>
          {kind === "candle-jar" && (
            <path
              d="M100 50C106 60 106 68 100 72C94 68 94 60 100 50Z"
              fill={accent}
              stroke="#4A3552"
              strokeWidth="2.8"
            />
          )}
          <path
            d="M52 86H148L138 154C136 166 122 174 100 174C78 174 64 166 62 154L52 86Z"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <ellipse
            cx="100"
            cy="86"
            rx="48"
            ry="12"
            fill="#FFF8F2"
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          <rect
            x="76"
            y="112"
            width="48"
            height="32"
            rx="10"
            fill="#FFF8F2"
            stroke="#4A3552"
            strokeWidth="2.8"
          />
        </g>
      );

    case "hair-clips":
    case "sticker-sheet":
    case "washi-tape":
    case "gel-pens":
    default:
      return (
        <g>
          <rect
            x="52"
            y="54"
            width="96"
            height="116"
            rx="20"
            fill="#FFF8F2"
            stroke="#4A3552"
            strokeWidth="3.5"
          />
          {/* Cute Bow & Heart Stickers on Card */}
          <path
            d="M72 86L96 98L72 110V86ZM128 86L104 98L128 110V86Z"
            fill={primary}
            stroke="#4A3552"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="100" cy="98" r="8" fill={accent} stroke="#4A3552" strokeWidth="3" />
          <rect
            x="70"
            y="128"
            width="60"
            height="22"
            rx="11"
            fill={secondary}
            stroke="#4A3552"
            strokeWidth="2.8"
          />
        </g>
      );
  }
}
