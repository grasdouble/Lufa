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

import { borderStyles as primitiveBorderStyles } from "@grasdouble/lufa_design-system-primitives";

export const borderStyles = {
  /** Solid line (default) */
  solid: primitiveBorderStyles.solid,
  /** Dashed line (inactive/disabled states) */
  dashed: primitiveBorderStyles.dashed,
  /** Dotted line (subtle separation) */
  dotted: primitiveBorderStyles.dotted,
  /** Double line (decorative) */
  double: primitiveBorderStyles.double,
  /** No border */
  none: primitiveBorderStyles.none,
} as const;

export type BorderStyles = typeof borderStyles;
export type BorderStylesTokens = keyof BorderStyles;
