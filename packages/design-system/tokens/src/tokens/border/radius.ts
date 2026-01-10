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

import primitives from '@grasdouble/lufa_design-system-primitives';

export const radius = {
  /** 0px - No rounding (sharp corners) */
  none: primitives.radius[0],
  /** 2px - Subtle rounding */
  xs: primitives.radius[2],
  /** 4px - Small rounding (inputs, small buttons) */
  sm: primitives.radius[4],
  /** 6px - Medium rounding */
  md: primitives.radius[6],
  /** 8px - Base rounding (cards, buttons, modals) */
  base: primitives.radius[8],
  /** 12px - Large rounding (panels, large cards) */
  lg: primitives.radius[12],
  /** 16px - Extra large rounding */
  xl: primitives.radius[16],
  /** 24px - Very large rounding (hero sections) */
  '2xl': primitives.radius[24],
  /** 32px - Huge rounding (feature cards) */
  '3xl': primitives.radius[32],
  /** 9999px - Fully rounded (pills, badges, avatars) */
  full: primitives.radius[9999],
} as const;

export type Radius = keyof typeof radius;
