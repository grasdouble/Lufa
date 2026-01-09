/**
 * Icon Size Tokens
 *
 * Standardized icon dimensions for consistent visual hierarchy.
 * References primitive iconSizes scale for consistent tokens.
 *
 * SCOPE: Global - Used for all icon components
 *
 * WCAG 2.5.5 TARGET SIZE:
 * - lg (44px): Minimum touch target for icons
 * - Use adequate spacing between interactive icons
 */

import primitives from '@grasdouble/lufa_design-system-primitives';

export const iconSize = {
  /** 12px - Tiny icons (dense UI, inline indicators) */
  '2xs': primitives.iconSize[12],
  /** 16px - Extra small icons (inline with text) */
  xs: primitives.iconSize[16],
  /** 20px - Small icons (compact UI) */
  sm: primitives.iconSize[20],
  /** 24px - Medium icons (default, navigation, toolbars) */
  md: primitives.iconSize[24],
  /** 32px - Large icons (prominent actions) */
  lg: primitives.iconSize[32],
  /** 40px - Extra large icons (hero sections) */
  xl: primitives.iconSize[40],
  /** 48px - 2x large icons (display, landing pages) */
  '2xl': primitives.iconSize[48],
} as const;

export type IconSize = keyof typeof iconSize;
