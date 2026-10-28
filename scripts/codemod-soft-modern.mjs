// One-off codemod: Sticker Sheet -> Soft Modern. Run from repo root.
import fs from "node:fs";
import path from "node:path";

const root = "src";
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(tsx?|css)$/.test(f.name)) files.push(p);
  }
})(root);

const KEEP = new Set([0x2605, 0x2713, 0x2714, 0x2192, 0x2190]);
const emojiRe =
  /(\s?)((?:[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}\u{2B06}\u{2B1B}\u{2B1C}\u{2300}-\u{23FF}][\u{FE0F}\u{20E3}\u{200D}]*)+)(\s?)/gu;

let changed = 0;
for (const f of files) {
  if (f.includes("globals.css") || f.includes("brand-glyph") || f.includes("product-illustrations"))
    continue;
  let s = fs.readFileSync(f, "utf8");
  const o = s;

  // hard sticker shadows -> soft token; outlines -> hairlines
  s = s.replace(/shadow-\[0_\d+px_0_#[0-9A-Fa-f]{6}\]/g, "shadow-sticker");
  s = s.replace(/ ring-4 ring-white/g, "");
  s = s.replace(/\bborder(-[tblrxy])?-2\b/g, "border$1");
  s = s.replace(/border-plum(?![\w/.\-])/g, "border-line-strong");
  // tilt / tape
  s = s.replace(
    /\s?(?:sm:|md:|lg:)?(?:hover:|focus-within:)?(?:motion-safe:)+-?rotate-(?:\d+|\[[^\]]+\])/g,
    "",
  );
  s = s.replace(/ -rotate-1(?=[ "])/g, "");
  s = s.replace(/washi-tape ?/g, "");
  s = s.replace(/rounded-\[28px\]/g, "rounded-sheet");
  s = s
    .replace(/BowMascot/g, "BrandGlyph")
    .replace(/bow-mascot/g, "brand-glyph")
    .replace(/BowMascotProps/g, "BrandGlyphProps");

  // emoji removal
  s = s.replace(emojiRe, (m, pre, em, post) => {
    const cps = [...em].map((c) => c.codePointAt(0));
    if (cps.every((c) => KEEP.has(c))) return m;
    const kept = [...em].filter((c) => KEEP.has(c.codePointAt(0))).join("");
    if (kept) return pre + kept + post;
    return pre && post ? " " : "";
  });

  if (s !== o) {
    fs.writeFileSync(f, s);
    changed++;
  }
}
console.log("files changed:", changed);
