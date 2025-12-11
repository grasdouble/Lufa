/**
 * Letter spacing primitives using em units for scalability.
 * Positive values increase spacing, negative values tighten.
 *
 * SCOPE: Global - Used for text tracking across all typography
 *
 * COMMON USE CASES:
 * - tight: Large headings, display text (save space)
 * - heading: Standard headings (subtle tightening)
 * - normal: Body text, most UI text (browser default)
 * - relaxed: Subtle increase for small caps, buttons
 * - readable: Enhanced readability, accessibility-focused
 * - dyslexia: Maximum spacing for dyslexia-friendly text
 *
 * ACCESSIBILITY GUIDELINES:
 * - WCAG 1.4.12: Letter spacing should be adjustable
 * - Avoid tight spacing on body text (reduces readability)
 * - Use readable/dyslexia for accessible reading experiences
 * - Test with actual text content, not Lorem Ipsum
 */
export const letterSpacings = {
  tight: "-0.02em",
  heading: "-0.01em", // Headings only - avoid for body text
  normal: "0em",
  relaxed: "0.01em",
  readable: "0.04em", // Improved readability for users with dyslexia
  dyslexia: "0.08em",
} as const;

export type LetterSpacings = typeof letterSpacings;
export type LetterSpacingsKey = keyof LetterSpacings;
