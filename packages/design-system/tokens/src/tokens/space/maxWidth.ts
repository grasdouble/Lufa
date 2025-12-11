/**
 * Max-Width Tokens
 *
 * Standardized maximum widths for content containers and responsive layouts.
 * References primitive maxWidth scale for consistent tokens.
 *
 * SCOPE: Specific - Used for content width constraints
 *
 * READABILITY GUIDELINES:
 * - For text content, use md-2xl (448-672px) for optimal line length
 * - 45-75 characters per line reduces eye strain
 */

import { maxWidths as primitiveMaxWidths } from "@grasdouble/lufa_design-system-primitives";

export const maxWidths = {
  /** 256px - 3xs container */
  "3xs": primitiveMaxWidths[256],
  /** 288px - 2xs container */
  "2xs": primitiveMaxWidths[288],
  /** 384px - xs container (modals, forms, narrow content) */
  xs: primitiveMaxWidths[384],
  /** 448px - Small container */
  sm: primitiveMaxWidths[448],
  /** 512px - Medium container */
  md: primitiveMaxWidths[512],
  /** 576px - Large container (article content, optimal line length) */
  lg: primitiveMaxWidths[576],
  /** 640px - xl container */
  xl: primitiveMaxWidths[640],
  /** 672px - 2xl container (blog posts, optimal readability) */
  "2xl": primitiveMaxWidths[672],
  /** 768px - 3xl container (standard page) */
  "3xl": primitiveMaxWidths[768],
  /** 896px - 4xl container */
  "4xl": primitiveMaxWidths[896],
  /** 1024px - 5xl container (dashboards) */
  "5xl": primitiveMaxWidths[1024],
  /** 1152px - 6xl container (wide layouts) */
  "6xl": primitiveMaxWidths[1152],
  /** 1280px - 7xl container (extra wide layouts) */
  "7xl": primitiveMaxWidths[1280],
  /** 1440px - 8xl container (full-width dashboards) */
  "8xl": primitiveMaxWidths[1440],
  /** 100% - Fluid width, no constraint */
  full: primitiveMaxWidths.full,
  /** none - Unconstrained width */
  none: primitiveMaxWidths.none,
} as const;

export type MaxWidths = typeof maxWidths;
export type MaxWidthsTokens = keyof MaxWidths;
