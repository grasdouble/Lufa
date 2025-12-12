/**
 * Advanced duration semantic tokens.
 * Extended timing values for complex animations and sequences.
 *
 * SCOPE: Motion & Advanced Animations
 *
 * USE CASES:
 * - Multi-step animations
 * - Staggered entrance animations
 * - Page transitions
 * - Loading sequences
 * - Complex component animations
 *
 * BEST PRACTICES:
 * - Use for non-critical animations only
 * - Always respect prefers-reduced-motion
 * - Provide skip/cancel options for long animations
 * - Test on mobile devices for performance
 * - Consider using these values in delays rather than durations
 */

import { timing as primitiveTiming } from "@grasdouble/lufa_design-system-primitives";

export const advancedDuration = {
  // Extended durations for complex animations
  moderate: primitiveTiming[800], // Moderate animations
  leisurely: primitiveTiming[1000], // 1 second - Leisurely animations
  extended: "1500ms", // 1.5 seconds - Extended animations
  long: "2000ms", // 2 seconds - Long animations
  veryLong: "3000ms", // 3 seconds - Very long animations

  // Stagger delays for sequential animations
  staggerTiny: primitiveTiming[50], // Minimal stagger
  staggerSmall: primitiveTiming[75], // Small stagger
  staggerBase: primitiveTiming[100], // Base stagger
  staggerLarge: primitiveTiming[150], // Large stagger
  staggerExtraLarge: primitiveTiming[200], // Extra large stagger
} as const;

export type AdvancedDuration = keyof typeof advancedDuration;
