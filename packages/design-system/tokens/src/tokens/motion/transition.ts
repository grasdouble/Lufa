/**
 * Transition Tokens
 *
 * Pre-built CSS transition strings for common UI interactions.
 * These tokens provide simpler alternatives to motion presets for basic transitions.
 *
 * USAGE:
 * - fast: Quick transitions (150ms) - micro-interactions, hovers
 * - base: Standard transitions (250ms) - most UI elements
 * - slow: Slower transitions (400ms) - larger movements, modals
 * - colors: Optimized for color changes (150ms) - theme switching, state changes
 * - none: Disable transitions - reduced motion preference
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
 * - Respect prefers-reduced-motion media query (use transition.none)
 * - Provide transition.none for reduced motion preference
 * - Ensure transitions don't interfere with keyboard navigation
 * - Test with assistive technologies
 * - Keep transitions under 5 seconds (WCAG 2.2.2)
 *
 * PERFORMANCE:
 * - Avoid transitioning expensive properties (width, height, box-shadow)
 * - Prefer transform and opacity (GPU-accelerated)
 * - Use transition.colors for color-only changes
 * - Test on low-end devices
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
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition|CSS transition}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html|WCAG 2.1 - Animation from Interactions}
 */

import primitives from '@grasdouble/lufa_design-system-primitives';

export const transition = {
  /** Fast - 150ms (micro-interactions, hovers) */
  fast: `all ${primitives.timing[150]} ${primitives.easing.easeOut}`,
  /** Base - 250ms (most UI elements) */
  base: `all ${primitives.timing[250]} ${primitives.easing.easeInOut}`,
  /** Slow - 400ms (modals, drawers) */
  slow: `all ${primitives.timing[400]} ${primitives.easing.easeInOut}`,
  /** Colors - 150ms (color changes only) */
  colors: `color ${primitives.timing[150]} ${primitives.easing.easeInOut}, background-color ${primitives.timing[150]} ${primitives.easing.easeInOut}, border-color ${primitives.timing[150]} ${primitives.easing.easeInOut}`,
  /** None - disable transitions (reduced motion) */
  none: 'none',
} as const;

export type Transition = keyof typeof transition;
