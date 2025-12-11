/**
 * Spacing Tokens
 *
 * Standardized spacing values for consistent layouts.
 * Based on 4px/8px grid system for optimal visual rhythm.
 * References primitive spacing scale for consistent token.
 */

import { spacing as primitiveSpacing } from "@grasdouble/lufa_design-system-primitives";

export const spacing = {
  /** 0px - No spacing */
  none: primitiveSpacing[0],
  /** 2px - Minimal spacing */
  xxs: primitiveSpacing[2],
  /** 4px - Very tight spacing */
  xs: primitiveSpacing[4],
  /** 8px - Tight spacing */
  sm: primitiveSpacing[8],
  /** 12px - Compact spacing */
  md: primitiveSpacing[12],
  /** 16px - Base spacing unit */
  base: primitiveSpacing[16],
  /** 24px - Spacious (minimum between touch targets) */
  lg: primitiveSpacing[24],
  /** 32px - Extra spacious (touch target padding) */
  xl: primitiveSpacing[32],
  /** 48px - Recommended for primary touch targets */
  "2xl": primitiveSpacing[48],
  /** 64px - Huge spacing (section separation) */
  "3xl": primitiveSpacing[64],
} as const;

export type SpacingToken = keyof typeof spacing;

export default spacing;
