/**
 * Icon Size Tokens
 *
 * Standardized icon dimensions for consistent visual hierarchy.
 * References primitive size scale for consistent foundation.
 *
 * WCAG 2.1 Accessibility:
 * - Icon buttons: Minimum 44x44px touch target (WCAG 2.5.5 Target Size)
 * - Icon spacing: Adequate spacing for touch/click accuracy
 * - Icon contrast: Ensure sufficient contrast ratio (WCAG 1.4.11 Non-text Contrast)
 */

import { sizes as primitiveSizes } from "@grasdouble/lufa_design-system-primitives";

export const iconSizes = {
  /** 16px - Extra small icons (inline with text) */
  xs: primitiveSizes[16],
  /** 24px - Small icons (buttons, navigation) */
  sm: primitiveSizes[24],
  /** 32px - Medium icons (default size) */
  md: primitiveSizes[32],
  /** 44px - Large icons (WCAG minimum touch target) */
  lg: primitiveSizes[44],
  /** 48px - Extra large icons (hero sections) */
  xl: primitiveSizes[48],
  /** 64px - 2x large icons (feature highlights) */
  "2xl": primitiveSizes[64],
} as const;

export type IconSizeToken = keyof typeof iconSizes;

export default iconSizes;
