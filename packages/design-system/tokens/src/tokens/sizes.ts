/**
 * Size Tokens
 *
 * Semantic naming for generic sizing values.
 * References primitive size scale for consistent token.
 */

import { sizes as primitiveSizes } from "@grasdouble/lufa_design-system-primitives";

export const sizes = {
  /** 0px - No size */
  none: primitiveSizes[0],
  /** 16px - Extra small */
  xs: primitiveSizes[16],
  /** 24px - Small */
  sm: primitiveSizes[24],
  /** 32px - Medium */
  md: primitiveSizes[32],
  /** 44px - WCAG minimum touch target */
  touchTarget: primitiveSizes[44],
  /** 48px - Large */
  lg: primitiveSizes[48],
  /** 64px - Extra large */
  xl: primitiveSizes[64],
  /** 96px - 2x large */
  "2xl": primitiveSizes[96],
  /** 128px - 3x large */
  "3xl": primitiveSizes[128],
  /** 192px - 4x large */
  "4xl": primitiveSizes[192],
} as const;

export type SizeToken = keyof typeof sizes;

export default sizes;
