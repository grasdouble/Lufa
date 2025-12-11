/**
 * Border Width Tokens
 *
 * Semantic naming for border widths.
 * References primitive border scale for consistent tokens.
 *
 * SCOPE: Global - Used for all border widths across the design system
 *
 * WCAG 2.4.7 FOCUS VISIBLE:
 * - Minimum 2px for focus indicators
 * - 3px recommended for better visibility
 */

import { borderWidths as primitiveBorderWidths } from "@grasdouble/lufa_design-system-primitives";

export const borderWidths = {
  /** 0px - No border */
  none: primitiveBorderWidths[0],
  /** 1px - Hairline border (default) */
  hairline: primitiveBorderWidths[1],
  /** 2px - Thin border (WCAG minimum for focus) */
  thin: primitiveBorderWidths[2],
  /** 3px - Focus indicator (recommended) */
  focus: primitiveBorderWidths[3],
  /** 4px - Thick border (emphasis) */
  thick: primitiveBorderWidths[4],
  /** 8px - Extra thick border (decorative) */
  extraThick: primitiveBorderWidths[8],
} as const;

export type BorderWidths = typeof borderWidths;
export type BorderWidthsTokens = keyof BorderWidths;
