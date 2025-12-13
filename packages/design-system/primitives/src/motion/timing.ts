/**
 * Timing primitives using actual millisecond values as keys for clarity.
 * Keeps interactions brisk (<400ms) to reduce cognitive load.
 *
 * SCOPE: Global - Used for animation and transition durations
 *
 * COMMON USE CASES:
 * - 0ms: Instant state changes (no animation)
 * - 100ms: Micro-interactions (hover, focus)
 * - 150ms: Quick transitions (dropdowns, tooltips)
 * - 250ms: Standard transitions (modals, slides)
 * - 400ms: Emphasized transitions (page changes)
 * - 600ms: Dramatic animations (use sparingly)
 *
 * PERFORMANCE GUIDELINES:
 * - Prefer 150-250ms for most UI transitions
 * - Keep animations under 400ms to feel responsive
 * - Use 600ms only for intentional dramatic effect
 * - Combine with easing curves for natural motion
 *
 * WCAG 2.2.1: Timing adjustable for users who need more time.
 */
export const timing = {
  0: "0ms",
  50: "50ms",
  75: "75ms",
  100: "100ms",
  150: "150ms",
  200: "200ms",
  250: "250ms",
  300: "300ms",
  400: "400ms",
  500: "500ms",
  600: "600ms",
  800: "800ms",
  1000: "1000ms",
} as const;

export type Timing = keyof typeof timing;
