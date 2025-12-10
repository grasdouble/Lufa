/**
 * Easing curve primitives - raw cubic-bezier values with descriptive curve names.
 * Keys describe the curve shape (easeIn, easeOut, etc.), not the usage context.
 * Tokens layer adds semantic meaning for specific use cases (e.g., 'enter', 'exit').
 *
 * SCOPE: Global - Used for all animations and transitions
 *
 * COMMON USE CASES:
 * - easeIn: Elements entering (start slow, accelerate)
 * - easeOut: Elements exiting (start fast, decelerate) - Most common
 * - easeInOut: State changes (smooth acceleration/deceleration)
 * - gentle: Subtle animations, micro-interactions
 *
 * USAGE GUIDELINES:
 * - Prefer easeOut for most UI transitions
 * - Use easeIn sparingly (feels unnatural for UI)
 * - gentle for hover states and subtle feedback
 * - Combine with timing primitives for complete animations
 */
export const easing = {
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  gentle: "cubic-bezier(0.33, 1, 0.68, 1)",
} as const;

export type Easing = typeof easing;
export type EasingKey = keyof Easing;
