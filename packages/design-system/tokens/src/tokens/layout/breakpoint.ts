/**
 * Breakpoint Tokens
 *
 * Standardized breakpoints for responsive design.
 * References primitive breakpoint scale for consistent tokens.
 *
 * USAGE:
 * - xs: Mobile devices (480px and up)
 * - sm: Small tablets (768px and up)
 * - md: Tablets (1024px and up)
 * - lg: Desktop (1280px and up)
 * - xl: Large desktop (1440px and up)
 * - 2xl: Extra large desktop (1920px and up)
 *
 * GUIDELINES:
 * - Design mobile-first, then scale up
 * - Test critical content at all breakpoints
 * - Use min-width media queries for progressive enhancement
 * - Avoid breakpoint-specific design decisions
 * - Consider fluid typography and spacing
 *
 * ACCESSIBILITY:
 * - Ensure touch targets remain accessible at all sizes
 * - Maintain readable line lengths across breakpoints
 * - Test with browser zoom up to 200%
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/reflow.html|WCAG 2.1 - Reflow}
 */

import primitives from '@grasdouble/lufa_design-system-primitives';

export const breakpoint = {
  /** Mobile - 480px and up */
  xs: primitives.breakpoint[480],
  /** Small tablet - 768px and up */
  sm: primitives.breakpoint[768],
  /** Tablet - 1024px and up */
  md: primitives.breakpoint[1024],
  /** Desktop - 1280px and up */
  lg: primitives.breakpoint[1280],
  /** Large desktop - 1440px and up */
  xl: primitives.breakpoint[1440],
  /** Extra large desktop - 1920px and up */
  '2xl': primitives.breakpoint[1920],
} as const;

export type Breakpoint = keyof typeof breakpoint;
