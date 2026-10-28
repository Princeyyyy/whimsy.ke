import * as React from "react";

export interface ScallopDividerProps {
  flip?: boolean;
  fill?: "cream" | "blush" | "lavender" | "mint" | "white";
  className?: string;
}

/**
 * Section divider. v1 used a scalloped SVG edge; the refined system uses clean,
 * flat section edges, so this renders nothing. Kept so layouts remain stable.
 */
export function ScallopDivider(_props: ScallopDividerProps): React.ReactNode {
  return null;
}
