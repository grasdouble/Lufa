/**
 * Opacity Tokens
 *
 * Semantic naming for opacity values.
 * References primitive opacity scale for consistent foundation.
 *
 * WCAG 2.1 Accessibility:
 * - Use with caution on text and interactive elements
 * - Always verify contrast ratios when applying opacity
 * - Disabled states should maintain minimum 3:1 contrast
 */

import { opacity as primitiveOpacity } from "@grasdouble/lufa_design-system-primitives";

export const opacity = {
  /** 0 - Fully transparent */
  invisible: primitiveOpacity[0],
  /** 0.1 - Very subtle tint */
  subtle: primitiveOpacity[10],
  /** 0.25 - Light overlay */
  light: primitiveOpacity[25],
  /** 0.5 - Medium transparency */
  medium: primitiveOpacity[50],
  /** 0.75 - Disabled state (verify contrast) */
  disabled: primitiveOpacity[75],
  /** 0.9 - Slightly transparent */
  faint: primitiveOpacity[90],
  /** 1 - Fully opaque */
  full: primitiveOpacity[100],
} as const;

export type OpacityToken = keyof typeof opacity;

export default opacity;
