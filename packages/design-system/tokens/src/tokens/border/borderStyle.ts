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

import primitives from '@grasdouble/lufa_design-system-primitives';

export const borderStyle = {
  /** Solid line (default) */
  solid: primitives.borderStyle.solid,
  /** Dashed line (inactive/disabled states) */
  dashed: primitives.borderStyle.dashed,
  /** Dotted line (subtle separation) */
  dotted: primitives.borderStyle.dotted,
  /** Double line (decorative) */
  double: primitives.borderStyle.double,
  /** No border */
  none: primitives.borderStyle.none,
} as const;

export type BorderStyle = keyof typeof borderStyle;
