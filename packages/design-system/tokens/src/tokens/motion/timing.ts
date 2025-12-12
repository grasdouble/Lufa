/**
 * Timing Tokens
 *
 * Semantic naming for animation and transition durations.
 * References primitive timing scale for consistent motion design.
 *
 * USAGE:
 * - none: 0ms - Instant (no animation, reduced motion)
 * - instant: 100ms - Very fast (micro-interactions, immediate feedback)
 * - fast: 150ms - Fast (button hovers, small element transitions)
 * - base: 250ms - Base duration (most UI interactions, standard transitions)
 * - slow: 400ms - Slow (modals, drawers, larger movements)
 * - deliberate: 600ms - Deliberate (page transitions, complex animations)
 *
 * GUIDELINES:
 * - Use fast (150ms) for micro-interactions and hover states
 * - Use base (250ms) as default for most transitions
 * - Use slow (400ms) for larger movements and modals
 * - Use none (0ms) for prefers-reduced-motion
 * - Shorter durations feel more responsive
 * - Longer durations allow users to track motion
 *
 * ACCESSIBILITY:
 * - Respect prefers-reduced-motion (use none)
 * - Keep animations under 5 seconds unless user-controlled (WCAG 2.2.2)
 * - Avoid long animations for critical interactions
 * - Provide skip options for long animations
 *
 * PERFORMANCE:
 * - Shorter animations perform better on low-end devices
 * - Long animations can feel sluggish
 * - Test on actual devices, not just desktop
 * - Consider device capabilities when choosing durations
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html|WCAG 2.1 - Animation from Interactions}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html|WCAG 2.1 - Pause, Stop, Hide}
 */

import { timing as primitiveTiming } from "@grasdouble/lufa_design-system-primitives";

export const timing = {
  /** 0ms - Instant (no animation) */
  none: primitiveTiming[0],
  /** 100ms - Very fast (micro-interactions) */
  instant: primitiveTiming[100],
  /** 150ms - Fast (button hovers) */
  fast: primitiveTiming[150],
  /** 250ms - Base duration (most UI) */
  base: primitiveTiming[250],
  /** 400ms - Slow (modals, drawers) */
  slow: primitiveTiming[400],
  /** 600ms - Deliberate (page transitions) */
  deliberate: primitiveTiming[600],
} as const;

export type Timing = keyof typeof timing;
