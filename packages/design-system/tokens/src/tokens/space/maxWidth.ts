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

import { maxWidth as primitiveMaxWidth } from "@grasdouble/lufa_design-system-primitives";

export const maxWidth = {
  /** 256px - 3xs container */
  "3xs": primitiveMaxWidth[256],
  /** 288px - 2xs container */
  "2xs": primitiveMaxWidth[288],
  /** 384px - xs container (modals, forms, narrow content) */
  xs: primitiveMaxWidth[384],
  /** 448px - Small container */
  sm: primitiveMaxWidth[448],
  /** 512px - Medium container */
  md: primitiveMaxWidth[512],
  /** 576px - Large container (article content, optimal line length) */
  lg: primitiveMaxWidth[576],
  /** 640px - xl container */
  xl: primitiveMaxWidth[640],
  /** 672px - 2xl container (blog posts, optimal readability) */
  "2xl": primitiveMaxWidth[672],
  /** 768px - 3xl container (standard page) */
  "3xl": primitiveMaxWidth[768],
  /** 896px - 4xl container */
  "4xl": primitiveMaxWidth[896],
  /** 1024px - 5xl container (dashboards) */
  "5xl": primitiveMaxWidth[1024],
  /** 1152px - 6xl container (wide layouts) */
  "6xl": primitiveMaxWidth[1152],
  /** 1280px - 7xl container (extra wide layouts) */
  "7xl": primitiveMaxWidth[1280],
  /** 1440px - 8xl container (full-width dashboards) */
  "8xl": primitiveMaxWidth[1440],
  /** 100% - Fluid width, no constraint */
  full: primitiveMaxWidth.full,
  /** none - Unconstrained width */
  none: primitiveMaxWidth.none,
} as const;

export type MaxWidth = keyof typeof maxWidth;
