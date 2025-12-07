/**
 * Max-Width Tokens
 *
 * Standardized maximum widths for components like modals, containers, and content areas.
 * These tokens define the maximum width constraints used across the design system.
 *
 * @example
 * ```tsx
 * <Modal size="medium" /> // Uses max-width: var(--lufa-max-width-2xl)
 * ```
 */

export const maxWidth = {
  /** Extra small - 384px (24rem) */
  sm: "24rem",
  /** Small/Medium - 448px (28rem) */
  md: "28rem",
  /** Medium - 512px (32rem) */
  lg: "32rem",
  /** Large - 576px (36rem) */
  xl: "36rem",
  /** Extra large - 672px (42rem) */
  "2xl": "42rem",
  /** 2X Extra large - 768px (48rem) */
  "3xl": "48rem",
  /** 3X Extra large - 896px (56rem) */
  "4xl": "56rem",
  /** 4X Extra large - 1024px (64rem) */
  "5xl": "64rem",
  /** 5X Extra large - 1152px (72rem) */
  "6xl": "72rem",
  /** 6X Extra large - 1280px (80rem) */
  "7xl": "80rem",
  /** Full width - No constraint */
  full: "100%",
  /** No maximum width */
  none: "none",
} as const;

export type MaxWidthToken = keyof typeof maxWidth;

export default maxWidth;
