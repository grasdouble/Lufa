/**
 * Size Tokens
 *
 * Semantic naming for generic sizing values.
 * References primitive size scale for consistent tokens.
 *
 * SCOPE: Global - Used for element-level dimensions
 *
 * WCAG 2.5.5 TARGET SIZE:
 * - touchTarget (44px): WCAG minimum for interactive elements
 */

import primitives from '@grasdouble/lufa_design-system-primitives';

export const size = {
  /** 0px - No size */
  none: primitives.size[0],
  /** 16px - Extra small (tiny icons, indicators) */
  xs: primitives.size[16],
  /** 24px - Small (small buttons, small avatars) */
  sm: primitives.size[24],
  /** 32px - Medium (default buttons, icons) */
  md: primitives.size[32],
  /** 44px - WCAG minimum touch target */
  touchTarget: primitives.size[44],
  /** 48px - Large (large buttons, avatars) */
  lg: primitives.size[48],
  /** 64px - Extra large (feature icons, large avatars) */
  xl: primitives.size[64],
  /** 96px - 2x large (hero icons, profile pictures) */
  '2xl': primitives.size[96],
  /** 128px - 3x large (large images, logos) */
  '3xl': primitives.size[128],
  /** 192px - 4x large (thumbnails, product images) */
  '4xl': primitives.size[192],
} as const;

export type Size = keyof typeof size;
