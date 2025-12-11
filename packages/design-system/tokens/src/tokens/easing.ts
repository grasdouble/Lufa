/**
 * Easing Tokens
 *
 * Semantic naming for animation/transition easing curves.
 * References primitive easing scale for consistent token.
 */

import { easing as primitiveEasing } from "@grasdouble/lufa_design-system-primitives";

export const easing = {
  /** Ease in - Gentle acceleration */
  easeIn: primitiveEasing.easeIn,
  /** Ease out - Gentle deceleration */
  easeOut: primitiveEasing.easeOut,
  /** Ease in-out - Smooth start and end */
  easeInOut: primitiveEasing.easeInOut,
  /** Gentle - Smoother, less jarring motion */
  gentle: primitiveEasing.gentle,
} as const;

export type EasingToken = keyof typeof easing;

export default easing;
