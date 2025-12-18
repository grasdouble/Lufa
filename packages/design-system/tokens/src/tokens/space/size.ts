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

import { size as primitiveSize } from '@grasdouble/lufa_design-system-primitives';

export const size = {
  /** 0px - No size */
  none: primitiveSize[0],
  /** 16px - Extra small (tiny icons, indicators) */
  xs: primitiveSize[16],
  /** 24px - Small (small buttons, small avatars) */
  sm: primitiveSize[24],
  /** 32px - Medium (default buttons, icons) */
  md: primitiveSize[32],
  /** 44px - WCAG minimum touch target */
  touchTarget: primitiveSize[44],
  /** 48px - Large (large buttons, avatars) */
  lg: primitiveSize[48],
  /** 64px - Extra large (feature icons, large avatars) */
  xl: primitiveSize[64],
  /** 96px - 2x large (hero icons, profile pictures) */
  '2xl': primitiveSize[96],
  /** 128px - 3x large (large images, logos) */
  '3xl': primitiveSize[128],
  /** 192px - 4x large (thumbnails, product images) */
  '4xl': primitiveSize[192],
} as const;

export type Size = keyof typeof size;
