/**
 * Breakpoint primitives using actual pixel values as keys.
 * Keys represent the minimum width for each breakpoint, following mobile-first approach.
 *
 * SCOPE: Global - Used for responsive layout behavior
 *
 * COMMON USE CASES:
 * - Media queries for responsive design
 * - Container queries
 * - Conditional rendering based on viewport size
 * - Grid/layout adjustments
 * - Typography scaling across devices
 *
 * BREAKPOINT STRATEGY:
 * - 480px: Mobile landscape
 * - 768px: Tablet portrait
 * - 1024px: Tablet landscape / Small desktop
 * - 1280px: Desktop
 * - 1440px: Large desktop
 * - 1920px: Extra large desktop
 */
export const breakpoint = {
  480: '480px',
  768: '768px',
  1024: '1024px',
  1280: '1280px',
  1440: '1440px',
  1920: '1920px',
} as const;

export type Breakpoint = keyof typeof breakpoint;
