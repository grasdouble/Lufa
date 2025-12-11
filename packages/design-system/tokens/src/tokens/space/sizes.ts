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

import { sizes as primitiveSizes } from "@grasdouble/lufa_design-system-primitives";

export const sizes = {
  /** 0px - No size */
  none: primitiveSizes[0],
  /** 16px - Extra small (tiny icons, indicators) */
  xs: primitiveSizes[16],
  /** 24px - Small (small buttons, small avatars) */
  sm: primitiveSizes[24],
  /** 32px - Medium (default buttons, icons) */
  md: primitiveSizes[32],
  /** 44px - WCAG minimum touch target */
  touchTarget: primitiveSizes[44],
  /** 48px - Large (large buttons, avatars) */
  lg: primitiveSizes[48],
  /** 64px - Extra large (feature icons, large avatars) */
  xl: primitiveSizes[64],
  /** 96px - 2x large (hero icons, profile pictures) */
  "2xl": primitiveSizes[96],
  /** 128px - 3x large (large images, logos) */
  "3xl": primitiveSizes[128],
  /** 192px - 4x large (thumbnails, product images) */
  "4xl": primitiveSizes[192],
} as const;

export type Sizes = typeof sizes;
export type SizesTokens = keyof Sizes;
