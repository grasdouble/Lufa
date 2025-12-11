/**
 * Border Radius Tokens
 *
 * Semantic naming for border radius values.
 * References primitive radius scale for consistent tokens.
 *
 * SCOPE: Global - Used for all border-radius across the design system
 *
 * CONSISTENCY TIP:
 * Choose 1-2 radius values as your primary scale for brand consistency.
 * Common combinations: sm + lg, or md + xl
 */

import { radius as primitiveRadius } from "@grasdouble/lufa_design-system-primitives";

export const radius = {
  /** 0px - No rounding (sharp corners) */
  none: primitiveRadius[0],
  /** 2px - Subtle rounding */
  xs: primitiveRadius[2],
  /** 4px - Small rounding (inputs, small buttons) */
  sm: primitiveRadius[4],
  /** 6px - Medium rounding */
  md: primitiveRadius[6],
  /** 8px - Base rounding (cards, buttons, modals) */
  base: primitiveRadius[8],
  /** 12px - Large rounding (panels, large cards) */
  lg: primitiveRadius[12],
  /** 16px - Extra large rounding */
  xl: primitiveRadius[16],
  /** 24px - Very large rounding (hero sections) */
  "2xl": primitiveRadius[24],
  /** 32px - Huge rounding (feature cards) */
  "3xl": primitiveRadius[32],
  /** 9999px - Fully rounded (pills, badges, avatars) */
  full: primitiveRadius[9999],
} as const;

export type Radius = typeof radius;
export type RadiusTokens = keyof Radius;
