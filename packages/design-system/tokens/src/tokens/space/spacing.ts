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

import primitives from '@grasdouble/lufa_design-system-primitives';

export const spacing = {
  /** 0px - No spacing */
  none: primitives.spacing[0],
  /** 2px - Minimal spacing */
  xxs: primitives.spacing[2],
  /** 4px - Very tight spacing */
  xs: primitives.spacing[4],
  /** 6px - Subtle spacing */
  '2xs': primitives.spacing[6],
  /** 8px - Tight spacing */
  sm: primitives.spacing[8],
  /** 10px - Small-medium spacing */
  'sm-md': primitives.spacing[10],
  /** 12px - Compact spacing */
  md: primitives.spacing[12],
  /** 16px - Base spacing unit */
  base: primitives.spacing[16],
  /** 20px - Medium-large spacing */
  'md-lg': primitives.spacing[20],
  /** 24px - Spacious (minimum between touch targets) */
  lg: primitives.spacing[24],
  /** 28px - Large-extra large spacing */
  'lg-xl': primitives.spacing[28],
  /** 32px - Extra spacious (touch target padding) */
  xl: primitives.spacing[32],
  /** 40px - Very spacious */
  'xl-2xl': primitives.spacing[40],
  /** 48px - Recommended for primary touch targets */
  '2xl': primitives.spacing[48],
  /** 56px - Huge spacing */
  '2xl-3xl': primitives.spacing[56],
  /** 64px - Section separation */
  '3xl': primitives.spacing[64],
  /** 80px - Large section separation */
  '3xl-4xl': primitives.spacing[80],
  /** 96px - Very large section */
  '4xl': primitives.spacing[96],
  /** 128px - Maximum section separation */
  '5xl': primitives.spacing[128],
} as const;

export type Spacing = keyof typeof spacing;
