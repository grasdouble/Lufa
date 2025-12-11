/**
 * Breakpoint Tokens
 *
 * Standardized breakpoints for responsive design.
 * References primitive breakpoint scale for consistent token.
 */

import { breakpoints as primitiveBreakpoints } from "@grasdouble/lufa_design-system-primitives";

export const breakpoints = {
  /** Mobile - 480px and up */
  xs: primitiveBreakpoints[480],
  /** Small tablet - 768px and up */
  sm: primitiveBreakpoints[768],
  /** Tablet - 1024px and up */
  md: primitiveBreakpoints[1024],
  /** Desktop - 1280px and up */
  lg: primitiveBreakpoints[1280],
  /** Large desktop - 1440px and up */
  xl: primitiveBreakpoints[1440],
  /** Extra large desktop - 1920px and up */
  "2xl": primitiveBreakpoints[1920],
} as const;

export type BreakpointToken = keyof typeof breakpoints;

export default breakpoints;
