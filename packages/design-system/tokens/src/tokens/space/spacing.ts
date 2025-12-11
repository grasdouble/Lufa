/**
 * Spacing Tokens
 *
 * Standardized spacing values for consistent layouts.
 * Based on 4px/8px grid system for optimal visual rhythm.
 * References primitive spacing scale for consistent tokens.
 *
 * SCOPE: Global - Used for margins, padding, and gaps
 *
 * WCAG 2.1 ACCESSIBILITY:
 * - lg (24px): Minimum spacing between touch targets (WCAG 2.5.8)
 * - xl (32px): Comfortable touch target padding
 * - 2xl (48px): Recommended for primary actions on mobile
 */

import { spacing as primitiveSpacing } from "@grasdouble/lufa_design-system-primitives";

export const spacings = {
  /** 0px - No spacing */
  none: primitiveSpacing[0],
  /** 2px - Minimal spacing */
  xxs: primitiveSpacing[2],
  /** 4px - Very tight spacing */
  xs: primitiveSpacing[4],
  /** 6px - Subtle spacing */
  "2xs": primitiveSpacing[6],
  /** 8px - Tight spacing */
  sm: primitiveSpacing[8],
  /** 10px - Small-medium spacing */
  "sm-md": primitiveSpacing[10],
  /** 12px - Compact spacing */
  md: primitiveSpacing[12],
  /** 16px - Base spacing unit */
  base: primitiveSpacing[16],
  /** 20px - Medium-large spacing */
  "md-lg": primitiveSpacing[20],
  /** 24px - Spacious (minimum between touch targets) */
  lg: primitiveSpacing[24],
  /** 28px - Large-extra large spacing */
  "lg-xl": primitiveSpacing[28],
  /** 32px - Extra spacious (touch target padding) */
  xl: primitiveSpacing[32],
  /** 40px - Very spacious */
  "xl-2xl": primitiveSpacing[40],
  /** 48px - Recommended for primary touch targets */
  "2xl": primitiveSpacing[48],
  /** 56px - Huge spacing */
  "2xl-3xl": primitiveSpacing[56],
  /** 64px - Section separation */
  "3xl": primitiveSpacing[64],
  /** 80px - Large section separation */
  "3xl-4xl": primitiveSpacing[80],
  /** 96px - Very large section */
  "4xl": primitiveSpacing[96],
  /** 128px - Maximum section separation */
  "5xl": primitiveSpacing[128],
} as const;

export type Spacings = typeof spacings;
export type SpacingsTokens = keyof Spacings;
