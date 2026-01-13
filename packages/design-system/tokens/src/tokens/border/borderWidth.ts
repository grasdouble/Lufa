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

import primitives from '@grasdouble/lufa_design-system-primitives';

export const borderWidth = {
  /** 0px - No border */
  none: primitives.borderWidth[0],
  /** 1px - Hairline border (default) */
  hairline: primitives.borderWidth[1],
  /** 2px - Thin border (WCAG minimum for focus) */
  thin: primitives.borderWidth[2],
  /** 3px - Focus indicator (recommended) */
  focus: primitives.borderWidth[3],
  /** 4px - Thick border (emphasis) */
  thick: primitives.borderWidth[4],
  /** 8px - Extra thick border (decorative) */
  extraThick: primitives.borderWidth[8],
} as const;

export type BorderWidth = keyof typeof borderWidth;
