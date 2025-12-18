/**
 * Easing Tokens
 *
 * Semantic naming for animation and transition easing curves.
 * References primitive easing scale for consistent motion design.
 *
 * USAGE:
 * - easeIn: Gentle acceleration - elements entering the screen
 * - easeOut: Gentle deceleration - elements leaving the screen
 * - easeInOut: Smooth start and end - elements moving within the screen
 * - gentle: Smoother, less jarring motion - large movements, page transitions
 *
 * GUIDELINES:
 * - Use easeOut for most UI interactions (feels more responsive)
 * - Use easeIn for elements entering the viewport
 * - Use easeInOut for reversible animations
 * - Use gentle for larger, more deliberate movements
 * - Match easing to the physical metaphor of the interaction
 *
 * ACCESSIBILITY:
 * - Respect prefers-reduced-motion media query
 * - Avoid jarring or aggressive easing curves
 * - Test animations with motion sensitivity
 * - Provide alternatives for critical motion-based feedback
 *
 * PERFORMANCE:
 * - Easing functions are GPU-accelerated
 * - Prefer CSS cubic-bezier for web animations
 * - Use hardware-accelerated properties (transform, opacity)
 * - Avoid easing on expensive properties (width, height)
 *
 * @see {@link https://easings.net/|Easing Functions Cheat Sheet}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html|WCAG 2.1 - Animation from Interactions}
 */

import { easing as primitiveEasing } from '@grasdouble/lufa_design-system-primitives';

export const easing = {
  /** Ease in - Gentle acceleration (elements entering) */
  easeIn: primitiveEasing.easeIn,
  /** Ease out - Gentle deceleration (elements leaving) */
  easeOut: primitiveEasing.easeOut,
  /** Ease in-out - Smooth start and end (reversible) */
  easeInOut: primitiveEasing.easeInOut,
  /** Gentle - Smoother, less jarring motion (large movements) */
  gentle: primitiveEasing.gentle,
} as const;

export type Easing = keyof typeof easing;
