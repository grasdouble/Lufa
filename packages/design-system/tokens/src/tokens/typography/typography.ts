/**
 * Typography Tokens
 *
 * Combined typography system with pre-configured scales for common use cases.
 * Exports individual typography tokens and combined scale presets.
 *
 * USAGE:
 * ```typescript
 * // Use individual tokens
 * import { fontSizes, fontWeights } from './typography';
 *
 * // Use pre-configured scales
 * import { typographyScale } from './typography';
 * const heading = typographyScale.h1; // Complete heading configuration
 * ```
 *
 * TYPOGRAPHY SCALE PRESETS:
 * - h1-h6: Heading scales with optimized font size, weight, line height
 * - bodyLarge/body/bodySmall: Body text variants
 * - caption: Small supplementary text
 * - label: Form labels and UI text
 *
 * GUIDELINES:
 * - Use scale presets for consistent typography hierarchy
 * - Customize individual tokens when needed
 * - Consider responsive scaling for headings
 * - Test readability across all scales
 * - Maintain WCAG 2.1 compliance (minimum 16px body, 1.5 line height)
 *
 * ACCESSIBILITY:
 * - All presets meet WCAG 2.1 AA requirements
 * - Base body text is 16px minimum
 * - Line heights are 1.5 or greater for body text
 * - Headings use appropriate weight for visibility
 * - Test with browser zoom up to 200%
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html|WCAG 2.1 - Resize Text}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html|WCAG 2.1 - Text Spacing}
 */

import { fontSizes } from "./fontSize.js";
import { fontWeights } from "./fontWeight.js";
import { lineHeights } from "./lineHeight.js";
import { letterSpacings } from "./letterSpacing.js";

/**
 * Typography scale presets
 *
 * Pre-configured combinations of font size, line height, weight, and letter spacing
 * for common typographic use cases.
 *
 * HEADING SCALES (h1-h6):
 * - h1: 60px, tight line height, bold - Hero headings
 * - h2: 48px, tight line height, bold - Page titles
 * - h3: 36px, snug line height, semibold - Section headings
 * - h4: 30px, snug line height, semibold - Subsection headings
 * - h5: 24px, base line height, semibold - Component headings
 * - h6: 20px, base line height, semibold - Small headings
 *
 * BODY SCALES:
 * - bodyLarge: 18px, relaxed - Lead paragraphs, introductions
 * - body: 16px, relaxed - Default body text (WCAG compliant)
 * - bodySmall: 14px, relaxed - Secondary body text
 *
 * UI SCALES:
 * - caption: 12px, base - Captions, metadata
 * - label: 14px, base, medium - Form labels, UI text
 */
export const typographyScales = {
  /** H1 - 60px, tight, bold (hero headings) */
  h1: {
    fontSizes: fontSizes["6xl"],
    lineHeights: lineHeights.tight,
    fontWeights: fontWeights.bold,
    letterSpacings: letterSpacings.tight,
  },
  /** H2 - 48px, tight, bold (page titles) */
  h2: {
    fontSizes: fontSizes["5xl"],
    lineHeights: lineHeights.tight,
    fontWeights: fontWeights.bold,
    letterSpacings: letterSpacings.tight,
  },
  /** H3 - 36px, snug, semibold (section headings) */
  h3: {
    fontSizes: fontSizes["4xl"],
    lineHeights: lineHeights.snug,
    fontWeights: fontWeights.semibold,
    letterSpacings: letterSpacings.normal,
  },
  /** H4 - 30px, snug, semibold (subsection headings) */
  h4: {
    fontSizes: fontSizes["3xl"],
    lineHeights: lineHeights.snug,
    fontWeights: fontWeights.semibold,
    letterSpacings: letterSpacings.normal,
  },
  /** H5 - 24px, base, semibold (component headings) */
  h5: {
    fontSizes: fontSizes["2xl"],
    lineHeights: lineHeights.base,
    fontWeights: fontWeights.semibold,
    letterSpacings: letterSpacings.normal,
  },
  /** H6 - 20px, base, semibold (small headings) */
  h6: {
    fontSizes: fontSizes.xl,
    lineHeights: lineHeights.base,
    fontWeights: fontWeights.semibold,
    letterSpacings: letterSpacings.normal,
  },
  /** Body Large - 18px, relaxed (lead paragraphs) */
  bodyLarge: {
    fontSizes: fontSizes.lg,
    lineHeights: lineHeights.relaxed,
    fontWeights: fontWeights.regular,
    letterSpacings: letterSpacings.normal,
  },
  /** Body - 16px, relaxed (default body text, WCAG compliant) */
  body: {
    fontSizes: fontSizes.base,
    lineHeights: lineHeights.relaxed,
    fontWeights: fontWeights.regular,
    letterSpacings: letterSpacings.normal,
  },
  /** Body Small - 14px, relaxed (secondary body text) */
  bodySmall: {
    fontSizes: fontSizes.sm,
    lineHeights: lineHeights.relaxed,
    fontWeights: fontWeights.regular,
    letterSpacings: letterSpacings.normal,
  },
  /** Caption - 12px, base (captions, metadata) */
  caption: {
    fontSizes: fontSizes.xs,
    lineHeights: lineHeights.base,
    fontWeights: fontWeights.regular,
    letterSpacings: letterSpacings.normal,
  },
  /** Label - 14px, base, medium (form labels, UI text) */
  label: {
    fontSizes: fontSizes.sm,
    lineHeights: lineHeights.base,
    fontWeights: fontWeights.medium,
    letterSpacings: letterSpacings.normal,
  },
} as const;

export type TypographyScales = typeof typographyScales;
export type TypographyScalesTokens = keyof TypographyScales;
