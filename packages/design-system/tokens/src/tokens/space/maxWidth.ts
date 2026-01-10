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

import primitives from '@grasdouble/lufa_design-system-primitives';

export const maxWidth = {
  /** 256px - 3xs container */
  '3xs': primitives.maxWidth[256],
  /** 288px - 2xs container */
  '2xs': primitives.maxWidth[288],
  /** 384px - xs container (modals, forms, narrow content) */
  xs: primitives.maxWidth[384],
  /** 448px - Small container */
  sm: primitives.maxWidth[448],
  /** 512px - Medium container */
  md: primitives.maxWidth[512],
  /** 576px - Large container (article content, optimal line length) */
  lg: primitives.maxWidth[576],
  /** 640px - xl container */
  xl: primitives.maxWidth[640],
  /** 672px - 2xl container (blog posts, optimal readability) */
  '2xl': primitives.maxWidth[672],
  /** 768px - 3xl container (standard page) */
  '3xl': primitives.maxWidth[768],
  /** 896px - 4xl container */
  '4xl': primitives.maxWidth[896],
  /** 1024px - 5xl container (dashboards) */
  '5xl': primitives.maxWidth[1024],
  /** 1152px - 6xl container (wide layouts) */
  '6xl': primitives.maxWidth[1152],
  /** 1280px - 7xl container (extra wide layouts) */
  '7xl': primitives.maxWidth[1280],
  /** 1440px - 8xl container (full-width dashboards) */
  '8xl': primitives.maxWidth[1440],
  /** 100% - Fluid width, no constraint */
  full: primitives.maxWidth.full,
  /** none - Unconstrained width */
  none: primitives.maxWidth.none,
} as const;

export type MaxWidth = keyof typeof maxWidth;
