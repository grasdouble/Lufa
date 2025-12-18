/**
 * Container Tokens
 *
 * Semantic container widths for page layouts and content areas.
 * These tokens provide clearer intent than maxWidth for layout containers.
 *
 * USAGE:
 * - xs: Extra small containers (384px) - narrow forms, alerts
 * - sm: Small containers (448px) - compact content sections
 * - md: Medium containers (672px) - standard content width
 * - lg: Large containers (1024px) - wide content areas
 * - xl: Extra large containers (1280px) - full-width layouts
 * - full: Full viewport width (100%) - edge-to-edge content
 * - fluid: Fluid container with no max-width - grows with viewport
 *
 * GUIDELINES:
 * - Use container tokens for page-level layout containers
 * - Use maxWidth tokens for component-level constraints
 * - Container tokens follow responsive design patterns
 * - Combine with spacing tokens for padding
 * - Consider breakpoints when choosing container sizes
 * - Maintain readable line lengths (45-75 characters per line)
 *
 * ACCESSIBILITY:
 * - Maintain readable line lengths (optimal: 45-75 characters)
 * - Ensure sufficient padding on smaller screens (minimum 16px)
 * - Test container behavior across all breakpoints
 * - Use semantic HTML (main, article, section) with containers
 * - Ensure content reflows properly when zoomed
 *
 * RESPONSIVE STRATEGY:
 * - xs/sm: Mobile-first content (forms, alerts, modals)
 * - md: Standard blog posts, article content
 * - lg: Marketing pages, dashboards
 * - xl: Full-width applications, admin interfaces
 * - full/fluid: Hero sections, edge-to-edge designs
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/reflow.html|WCAG 2.1 - Reflow}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html|WCAG 2.1 - Resize Text}
 */

import { maxWidth as primitiveMaxWidth } from '@grasdouble/lufa_design-system-primitives';

export const container = {
  /** Extra small - 384px (narrow forms, alerts) */
  xs: primitiveMaxWidth[384],
  /** Small - 448px (compact content sections) */
  sm: primitiveMaxWidth[448],
  /** Medium - 672px (standard content width) */
  md: primitiveMaxWidth[672],
  /** Large - 1024px (wide content areas) */
  lg: primitiveMaxWidth[1024],
  /** Extra large - 1280px (full-width layouts) */
  xl: primitiveMaxWidth[1280],
  /** Full - 100% (edge-to-edge content) */
  full: primitiveMaxWidth.full,
  /** Fluid - no max-width (grows with viewport) */
  fluid: primitiveMaxWidth.none,
} as const;

export type Container = keyof typeof container;
