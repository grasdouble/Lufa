/**
 * Border style primitives - standard CSS border-style values.
 * Keys match CSS property values for intuitive usage.
 *
 * SCOPE: Global - Used for all border styles
 *
 * COMMON USE CASES:
 * - solid: Standard borders (most common, default)
 * - dashed: Inactive/disabled states, placeholders
 * - dotted: Subtle separation, focus indicators (alternative)
 * - double: Decorative borders, emphasized sections
 * - none: Remove borders
 *
 * ACCESSIBILITY:
 * - Don't rely solely on border style to convey information
 * - Combine with color and text labels for clarity
 * - Test dotted/dashed borders at different zoom levels
 */
export const borderStyle = {
  solid: "solid",
  dashed: "dashed",
  dotted: "dotted",
  double: "double",
  none: "none",
} as const;

export type BorderStyle = keyof typeof borderStyle;
