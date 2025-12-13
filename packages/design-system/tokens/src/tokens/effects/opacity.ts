/**
 * Opacity Tokens
 *
 * Semantic naming for opacity values.
 * References primitive opacity scale for consistent tokens.
 *
 * SCOPE: Global - Used for transparency across all components
 *
 * WCAG 2.1 ACCESSIBILITY:
 * - Use with caution on text and interactive elements
 * - Always verify contrast ratios when applying opacity
 * - Disabled states should maintain minimum 3:1 contrast
 * - Avoid opacity < 0.9 on text to maintain WCAG compliance
 */

import { opacity as primitiveOpacity } from "@grasdouble/lufa_design-system-primitives";

export const opacity = {
  /** 0 - Fully transparent (invisible) */
  invisible: primitiveOpacity[0],
  /** 0.1 - Very subtle tint (decorative only) */
  subtle: primitiveOpacity[10],
  /** 0.25 - Light overlay (backgrounds only) */
  light: primitiveOpacity[25],
  /** 0.5 - Medium transparency (WARNING: may fail WCAG for text) */
  medium: primitiveOpacity[50],
  /** 0.75 - Disabled state (CAUTION: verify contrast ratios) */
  disabled: primitiveOpacity[75],
  /** 0.9 - Slightly transparent (safe for text if base color meets WCAG) */
  faint: primitiveOpacity[90],
  /** 1 - Fully opaque */
  full: primitiveOpacity[100],
} as const;

export type Opacity = keyof typeof opacity;
