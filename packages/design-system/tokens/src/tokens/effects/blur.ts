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

import primitives from '@grasdouble/lufa_design-system-primitives';

export const blur = {
  /** 0px - No blur */
  none: primitives.blur.none,
  /** 4px - Subtle blur (frosted glass) */
  subtle: primitives.blur[4],
  /** 8px - Base blur (overlays) */
  base: primitives.blur[8],
  /** 12px - Medium blur (modals) */
  medium: primitives.blur[12],
  /** 16px - Strong blur (important overlays) */
  strong: primitives.blur[16],
  /** 24px - Extra strong blur (full-screen overlays) */
  extraStrong: primitives.blur[24],
  /** 40px - Maximum blur (privacy screens) */
  max: primitives.blur[40],
} as const;

export type Blur = keyof typeof blur;
