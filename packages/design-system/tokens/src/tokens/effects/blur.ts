/**
 * Blur Effect Tokens
 *
 * Semantic blur values for backdrop filters, overlays, and modern UI effects.
 * References primitive blur scale for consistent tokens.
 *
 * SCOPE: Global - Used for backdrop-filter and filter effects
 *
 * PERFORMANCE:
 * - Use blur sparingly on low-end devices
 * - Prefer backdrop-filter over filter for better performance
 * - Test on target devices
 *
 * ACCESSIBILITY:
 * - Ensure sufficient contrast when applying blur
 * - Maintain WCAG AA contrast ratios (4.5:1 for text)
 */

import { blur as primitiveBlur } from "@grasdouble/lufa_design-system-primitives";

export const blur = {
  /** 0px - No blur */
  none: primitiveBlur.none,
  /** 4px - Subtle blur (frosted glass) */
  subtle: primitiveBlur[4],
  /** 8px - Base blur (overlays) */
  base: primitiveBlur[8],
  /** 12px - Medium blur (modals) */
  medium: primitiveBlur[12],
  /** 16px - Strong blur (important overlays) */
  strong: primitiveBlur[16],
  /** 24px - Extra strong blur (full-screen overlays) */
  extraStrong: primitiveBlur[24],
  /** 40px - Maximum blur (privacy screens) */
  max: primitiveBlur[40],
} as const;

export type Blur = typeof blur;
export type BlurTokens = keyof Blur;
