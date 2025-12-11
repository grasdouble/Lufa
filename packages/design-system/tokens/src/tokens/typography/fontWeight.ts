/**
 * Font Weight Tokens
 *
 * Semantic font weight tokens for typography hierarchy.
 * References primitive font weight scale for consistent weights.
 *
 * USAGE:
 * - thin/extraLight: Decorative text only (avoid for small text)
 * - light: Large headings, light UI
 * - regular: Body text, standard UI (WCAG minimum)
 * - medium: Subtle emphasis, labels
 * - semibold: Headings, strong emphasis
 * - bold: Important headings, buttons
 * - extraBold/black: Display headings, hero text
 *
 * GUIDELINES:
 * - Use regular (400) as default for body text
 * - Use medium (500) for subtle emphasis
 * - Use semibold (600) or bold (700) for headings
 * - Avoid thin/extraLight for small text
 * - Consider font rendering across different OS
 * - Test weight combinations with font families
 *
 * ACCESSIBILITY:
 * - Minimum regular (400) weight for body text (WCAG 2.1)
 * - Avoid thin weights below 16px font size
 * - Ensure sufficient contrast with font weight
 * - Test legibility with different weights
 * - Consider vision impairments when using light weights
 *
 * HIERARCHY:
 * - Body text: regular (400)
 * - Labels: medium (500)
 * - Subheadings: semibold (600)
 * - Headings: bold (700)
 * - Display: extraBold (800) or black (900)
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html|WCAG 2.1 - Visual Presentation}
 */

import { fontWeights as primitiveFontWeights } from "@grasdouble/lufa_design-system-primitives";

export const fontWeights = {
  /** 100 - Thin (avoid for small text) */
  thin: primitiveFontWeights[100],
  /** 200 - Extra light (avoid for small text) */
  extraLight: primitiveFontWeights[200],
  /** 300 - Light */
  light: primitiveFontWeights[300],
  /** 400 - Regular (WCAG minimum) */
  regular: primitiveFontWeights[400],
  /** 500 - Medium */
  medium: primitiveFontWeights[500],
  /** 600 - Semibold */
  semibold: primitiveFontWeights[600],
  /** 700 - Bold */
  bold: primitiveFontWeights[700],
  /** 800 - Extra bold */
  extraBold: primitiveFontWeights[800],
  /** 900 - Black */
  black: primitiveFontWeights[900],
} as const;

export type FontWeights = typeof fontWeights;
export type FontWeightsTokens = keyof FontWeights;
