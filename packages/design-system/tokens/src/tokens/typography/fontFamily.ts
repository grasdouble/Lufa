/**
 * Font Family Tokens
 *
 * Semantic font family tokens for typography.
 * Provides fallback stacks for different font types.
 *
 * USAGE:
 * - sans: Primary sans-serif font - most UI elements, body text
 * - serif: Editorial and heading font - articles, blog posts
 * - mono: Code and technical content - code blocks, data tables
 *
 * GUIDELINES:
 * - Use sans for most UI and body text
 * - Use serif for editorial content and headlines
 * - Use mono for code, terminal output, and fixed-width data
 * - Always provide fallback fonts
 * - Test fonts across different operating systems
 * - Consider font loading strategies (FOUT, FOIT, FOFT)
 *
 * ACCESSIBILITY:
 * - Ensure fonts are legible at all sizes
 * - Test with dyslexia-friendly fonts
 * - Provide sufficient font weight for visibility
 * - Consider font readability for vision impairments
 *
 * PERFORMANCE:
 * - Use font-display: swap to prevent FOIT
 * - Preload critical fonts
 * - Subset fonts to reduce file size
 * - Use variable fonts when appropriate
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html|WCAG 2.1 - Visual Presentation}
 */

import { fontFamilies as primitiveFontFamilies } from "@grasdouble/lufa_design-system-primitives";

export const fontFamilies = {
  /** Sans-serif - Primary font family for UI and body text */
  sans: primitiveFontFamilies.sans,
  /** Serif - Editorial and heading font for articles */
  serif: primitiveFontFamilies.serif,
  /** Monospace - Code and technical content */
  mono: primitiveFontFamilies.mono,
} as const;

export type FontFamilies = typeof fontFamilies;
export type FontFamiliesTokens = keyof FontFamilies;
