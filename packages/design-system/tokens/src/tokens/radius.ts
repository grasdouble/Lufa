/**
 * Border Radius Tokens
 *
 * Semantic naming for border radius values.
 * References primitive radius scale for consistent foundation.
 */

import { radius as primitiveRadius } from "@grasdouble/lufa_design-system-primitives";

export const radius = {
  /** 0px - No rounding */
  none: primitiveRadius[0],
  /** 2px - Subtle rounding */
  xs: primitiveRadius[2],
  /** 4px - Small rounding */
  sm: primitiveRadius[4],
  /** 6px - Medium rounding */
  md: primitiveRadius[6],
  /** 8px - Base rounding */
  base: primitiveRadius[8],
  /** 12px - Large rounding */
  lg: primitiveRadius[12],
  /** 16px - Extra large rounding */
  xl: primitiveRadius[16],
  /** 24px - Very large rounding */
  "2xl": primitiveRadius[24],
  /** 32px - Huge rounding */
  "3xl": primitiveRadius[32],
  /** 9999px - Fully rounded (pill) */
  full: primitiveRadius[9999],
} as const;

export type RadiusToken = keyof typeof radius;

export default radius;
