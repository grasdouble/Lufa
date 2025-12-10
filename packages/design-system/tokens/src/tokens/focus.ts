/**
 * Focus Tokens
 *
 * Standardized focus indicator configurations for keyboard navigation.
 * Ensures WCAG 2.1 compliance for focus visibility.
 *
 * WCAG 2.1 Accessibility:
 * - Focus Visible: Minimum 2px indicator (WCAG 2.4.7)
 * - Focus Contrast: Minimum 3:1 against adjacent colors (WCAG 2.4.11, Level AA)
 * - Focus Area: Indicator should be visible around entire element
 */

import { colors } from "./colors.js";
import { borders } from "./borders.js";
import { radius } from "./radius.js";

export const focus = {
  /** Default focus ring - solid outline */
  default: {
    width: borders.width.thin, // 2px
    style: borders.style.solid,
    color: colors.border.focus,
    offset: "2px",
    radius: radius.sm,
  },
  /** Thick focus ring - high visibility */
  thick: {
    width: borders.width.focus, // 3px
    style: borders.style.solid,
    color: colors.border.focus,
    offset: "2px",
    radius: radius.sm,
  },
  /** Inset focus ring - contained within element */
  inset: {
    width: borders.width.thin, // 2px
    style: borders.style.solid,
    color: colors.border.focus,
    offset: "-2px",
    radius: radius.sm,
  },
  /** Focus ring with shadow - elevated appearance */
  shadow: {
    width: borders.width.thin, // 2px
    style: borders.style.solid,
    color: colors.border.focus,
    offset: "0px",
    shadow: "0 0 0 3px rgb(37 99 235 / 0.2)", // Blue with transparency
    radius: radius.sm,
  },
  /** Inverse focus ring - for dark backgrounds */
  inverse: {
    width: borders.width.thin, // 2px
    style: borders.style.solid,
    color: colors.text.inverse,
    offset: "2px",
    radius: radius.sm,
  },
} as const;

export type FocusToken = keyof typeof focus;

/**
 * Helper to generate CSS focus-visible styles
 * @example
 * &:focus-visible {
 *   ${getFocusStyle('default')}
 * }
 */
export const getFocusStyle = (focusKey: FocusToken): string => {
  const f = focus[focusKey];
  let style = `outline: ${f.width} ${f.style} ${f.color}; outline-offset: ${f.offset};`;
  if ("shadow" in f && f.shadow) {
    style += ` box-shadow: ${f.shadow};`;
  }
  return style;
};

export default focus;
