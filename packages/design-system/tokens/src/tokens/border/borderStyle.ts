/**
 * Border Style Tokens
 *
 * Semantic naming for border styles.
 * References primitive border styles for consistent tokens.
 *
 * SCOPE: Global - Used for all border styles across the design system
 *
 * ACCESSIBILITY:
 * - Don't rely solely on border style to convey information
 * - Combine with color and text labels for clarity
 */

import { borderStyle as primitiveBorderStyle } from "@grasdouble/lufa_design-system-primitives";

export const borderStyle = {
  /** Solid line (default) */
  solid: primitiveBorderStyle.solid,
  /** Dashed line (inactive/disabled states) */
  dashed: primitiveBorderStyle.dashed,
  /** Dotted line (subtle separation) */
  dotted: primitiveBorderStyle.dotted,
  /** Double line (decorative) */
  double: primitiveBorderStyle.double,
  /** No border */
  none: primitiveBorderStyle.none,
} as const;

export type BorderStyle = keyof typeof borderStyle;
