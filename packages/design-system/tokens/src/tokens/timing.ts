/**
 * Timing Tokens
 *
 * Semantic naming for animation/transition durations.
 * References primitive timing scale for consistent token.
 */

import { timing as primitiveTiming } from "@grasdouble/lufa_design-system-primitives";

export const timing = {
  /** 0ms - Instant (no animation) */
  none: primitiveTiming[0],
  /** 100ms - Very fast */
  instant: primitiveTiming[100],
  /** 150ms - Fast */
  fast: primitiveTiming[150],
  /** 250ms - Base duration */
  base: primitiveTiming[250],
  /** 400ms - Slow */
  slow: primitiveTiming[400],
  /** 600ms - Deliberate */
  deliberate: primitiveTiming[600],
} as const;

export type TimingToken = keyof typeof timing;

export default timing;
