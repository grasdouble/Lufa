/**
 * Max-Width Tokens
 *
 * Standardized maximum widths for components like modals, containers, and content areas.
 * These tokens define the maximum width constraints used across the design system.
 * References primitive maxWidth scale for consistent foundation.
 *
 * @example
 * ```tsx
 * <Modal size="medium" /> // Uses max-width: var(--lufa-max-width-2xl)
 * ```
 */

import { maxWidth as primitiveMaxWidth } from "@grasdouble/lufa_design-system-primitives";

export const maxWidth = {
  /** Extra small - 384px (24rem) */
  sm: primitiveMaxWidth[384],
  /** Small/Medium - 448px (28rem) */
  md: primitiveMaxWidth[448],
  /** Medium - 512px (32rem) */
  lg: primitiveMaxWidth[512],
  /** Large - 576px (36rem) */
  xl: primitiveMaxWidth[576],
  /** Extra large - 672px (42rem) */
  "2xl": primitiveMaxWidth[672],
  /** 2X Extra large - 768px (48rem) */
  "3xl": primitiveMaxWidth[768],
  /** 3X Extra large - 896px (56rem) */
  "4xl": primitiveMaxWidth[896],
  /** 4X Extra large - 1024px (64rem) */
  "5xl": primitiveMaxWidth[1024],
  /** 5X Extra large - 1152px (72rem) */
  "6xl": primitiveMaxWidth[1152],
  /** 6X Extra large - 1280px (80rem) */
  "7xl": primitiveMaxWidth[1280],
  /** Full width - No constraint */
  full: primitiveMaxWidth.full,
  /** No maximum width */
  none: primitiveMaxWidth.none,
} as const;

export type MaxWidthToken = keyof typeof maxWidth;

export default maxWidth;
