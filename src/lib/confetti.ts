"use client";

import confetti from "canvas-confetti";

/**
 * Whimsy signature palette for celebratory micro-animations:
 * Terracotta, Warm Gold, Soft Sage, Deep Plum, Light Buttercream
 */
const WHIMSY_CONFETTI_COLORS = ["#e76f51", "#f4a261", "#e9c46a", "#2a9d8f", "#264653"];

/**
 * Fires a joyful celebratory confetti burst across the screen.
 * Ideal for checkout success, gift bundle completion, or special milestones.
 */
export function fireCelebrationConfetti(): void {
  if (typeof window === "undefined") return;

  // Respect user preference for reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const count = 180;
  const defaults = {
    origin: { y: 0.7 },
    colors: WHIMSY_CONFETTI_COLORS,
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    void confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

/**
 * Fires a delicate, localised confetti sprinkle near an interactive element (e.g. Add to Bag button).
 */
export function fireMiniConfetti(origin?: { x: number; y: number }): void {
  if (typeof window === "undefined") return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  void confetti({
    particleCount: 28,
    angle: 90,
    spread: 45,
    startVelocity: 22,
    origin: origin ?? { x: 0.5, y: 0.8 },
    colors: WHIMSY_CONFETTI_COLORS,
    ticks: 120,
    gravity: 1.1,
    scalar: 0.75,
    disableForReducedMotion: true,
  });
}
