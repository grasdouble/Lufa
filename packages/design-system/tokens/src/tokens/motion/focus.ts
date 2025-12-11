/**
 * Focus Tokens
 *
 * Standardized focus indicator configurations for keyboard navigation.
 * Ensures WCAG 2.1 compliance for focus visibility.
 *
 * USAGE:
 * - default: Solid outline focus ring - most UI elements
 * - thick: High visibility focus ring - critical actions, primary buttons
 * - inset: Contained within element - inputs, form fields
 * - shadow: Elevated appearance - cards, modals
 * - inverse: For dark backgrounds - dark mode, hero sections
 *
 * GUIDELINES:
 * - Always provide visible focus indicators
 * - Use default for most interactive elements
 * - Use thick for critical actions (submit, delete, confirm)
 * - Use inset for form inputs to avoid layout shift
 * - Use shadow for elevated components
 * - Use inverse on dark backgrounds
 * - Never remove focus indicators without providing alternatives
 *
 * ACCESSIBILITY (CRITICAL):
 * - Focus Visible: Minimum 2px indicator (WCAG 2.4.7, Level AA)
 * - Focus Contrast: Minimum 3:1 against adjacent colors (WCAG 2.4.11, Level AA)
 * - Focus Area: Indicator should be visible around entire element
 * - Never use outline: none without providing alternative
 * - Test with keyboard-only navigation
 * - Ensure focus order is logical and predictable
 *
 * IMPLEMENTATION:
 * ```css
 * button:focus-visible {
 *   outline: 2px solid var(--focus-color);
 *   outline-offset: 2px;
 * }
 * ```
 *
 * HELPER FUNCTION:
 * ```typescript
 * import { getFocusStyle } from './focus';
 *
 * const styles = {
 *   button: {
 *     '&:focus-visible': getFocusStyle('default')
 *   }
 * };
 * ```
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html|WCAG 2.1 - Focus Visible}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/focus-appearance.html|WCAG 2.4.11 - Focus Appearance}
 */

import { borderWidths } from "../border/borderWidth.js";
import { borderStyles } from "../border/borderStyle.js";
import { colors } from "../color/colors.js";
import { radius } from "../border/radius.js";

export const focus = {
  /** Default focus ring - solid outline (most UI elements) */
  default: {
    width: borderWidths.thin, // 2px
    style: borderStyles.solid,
    color: colors.border.focus,
    offset: "2px",
    radius: radius.sm,
  },
  /** Thick focus ring - high visibility (critical actions) */
  thick: {
    width: borderWidths.focus, // 3px
    style: borderStyles.solid,
    color: colors.border.focus,
    offset: "2px",
    radius: radius.sm,
  },
  /** Inset focus ring - contained within element (form inputs) */
  inset: {
    width: borderWidths.thin, // 2px
    style: borderStyles.solid,
    color: colors.border.focus,
    offset: "-2px",
    radius: radius.sm,
  },
  /** Focus ring with shadow - elevated appearance (cards, modals) */
  shadow: {
    width: borderWidths.thin, // 2px
    style: borderStyles.solid,
    color: colors.border.focus,
    offset: "0px",
    shadow: "0 0 0 3px rgb(37 99 235 / 0.2)", // Blue with transparency
    radius: radius.sm,
  },
  /** Inverse focus ring - for dark backgrounds (dark mode) */
  inverse: {
    width: borderWidths.thin, // 2px
    style: borderStyles.solid,
    color: colors.text.inverse,
    offset: "2px",
    radius: radius.sm,
  },
} as const;

export type Focus = typeof focus;
export type FocusTokens = keyof Focus;

/**
 * Helper to generate CSS focus-visible styles
 *
 * @param focusKey - The focus token to use
 * @returns CSS string for focus-visible styles
 *
 * @example
 * ```typescript
 * const styles = {
 *   button: {
 *     '&:focus-visible': getFocusStyle('default')
 *   }
 * };
 * // Output: "outline: 2px solid #2563eb; outline-offset: 2px;"
 * ```
 */
export const getFocusStyle = (focusKey: FocusTokens): string => {
  const f = focus[focusKey];
  let style = `outline: ${f.width} ${f.style} ${f.color}; outline-offset: ${f.offset};`;
  if ("shadow" in f && f.shadow) {
    style += ` box-shadow: ${f.shadow};`;
  }
  return style;
};

export default focus;
