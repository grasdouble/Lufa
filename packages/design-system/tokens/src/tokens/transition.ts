import {
  timing as primitiveTiming,
  easing as primitiveEasing,
} from "@grasdouble/lufa_design-system-primitives";

/**
 * Transition Tokens
 *
 * Pre-built CSS transition strings for common UI interactions.
 * These tokens provide simpler alternatives to motion presets for basic transitions.
 *
 * USAGE:
 * - fast: Quick transitions (150ms) - for micro-interactions, hovers
 * - base: Standard transitions (250ms) - for most UI elements
 * - slow: Slower transitions (400ms) - for larger movements, modals
 * - colors: Optimized for color changes (150ms) - for theme switching, state changes
 * - none: Disable transitions - for reduced motion preference
 *
 * GUIDELINES:
 * - Use transition tokens for simple CSS transitions
 * - Use motion tokens for complex multi-property animations
 * - transition.fast: buttons, links, small element hovers
 * - transition.base: dropdowns, tooltips, small modals
 * - transition.slow: drawers, large modals, page transitions
 * - transition.colors: backgrounds, borders, text colors
 * - Honor prefers-reduced-motion by using transition.none
 *
 * ACCESSIBILITY:
 * - Respect prefers-reduced-motion media query
 * - Provide transition.none for reduced motion preference
 * - Ensure transitions don't interfere with keyboard navigation
 * - Test with assistive technologies
 *
 * EXAMPLES:
 * ```css
 * .button {
 *   transition: ${transition.fast};
 * }
 *
 * .modal {
 *   transition: ${transition.slow};
 * }
 *
 * @media (prefers-reduced-motion: reduce) {
 *   * {
 *     transition: ${transition.none} !important;
 *   }
 * }
 * ```
 */
export const transition = {
  fast: `all ${primitiveTiming[150]} ${primitiveEasing.easeOut}`,
  base: `all ${primitiveTiming[250]} ${primitiveEasing.easeInOut}`,
  slow: `all ${primitiveTiming[400]} ${primitiveEasing.easeInOut}`,
  colors: `color ${primitiveTiming[150]} ${primitiveEasing.easeInOut}, background-color ${primitiveTiming[150]} ${primitiveEasing.easeInOut}, border-color ${primitiveTiming[150]} ${primitiveEasing.easeInOut}`,
  none: "none",
} as const;

export type TransitionKey = keyof typeof transition;
export type TransitionValue = (typeof transition)[TransitionKey];
