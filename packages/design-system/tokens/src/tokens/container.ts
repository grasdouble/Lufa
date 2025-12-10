import { maxWidth as primitiveMaxWidth } from "@grasdouble/lufa_design-system-primitives";

/**
 * Container Tokens
 *
 * Semantic container widths for page layouts and content areas.
 * These tokens provide clearer intent than maxWidth for layout containers.
 *
 * USAGE:
 * - xs: Extra small containers (384px) - for narrow forms, alerts
 * - sm: Small containers (448px) - for compact content sections
 * - md: Medium containers (672px) - for standard content width
 * - lg: Large containers (1024px) - for wide content areas
 * - xl: Extra large containers (1280px) - for full-width layouts
 * - full: Full viewport width (100%) - for edge-to-edge content
 * - fluid: Fluid container with no max-width - grows with viewport
 *
 * GUIDELINES:
 * - Use container tokens for page-level layout containers
 * - Use maxWidth tokens for component-level constraints
 * - Container tokens follow responsive design patterns
 * - Combine with spacing tokens for padding
 * - Consider breakpoints when choosing container sizes
 *
 * ACCESSIBILITY:
 * - Maintain readable line lengths (45-75 characters)
 * - Ensure sufficient padding on smaller screens
 * - Test container behavior across all breakpoints
 */
export const container = {
  xs: primitiveMaxWidth[384],
  sm: primitiveMaxWidth[448],
  md: primitiveMaxWidth[672],
  lg: primitiveMaxWidth[1024],
  xl: primitiveMaxWidth[1280],
  full: primitiveMaxWidth.full,
  fluid: primitiveMaxWidth.none,
} as const;

export type ContainerKey = keyof typeof container;
export type ContainerValue = (typeof container)[ContainerKey];
