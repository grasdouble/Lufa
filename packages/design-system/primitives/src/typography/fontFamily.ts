/**
 * Font family primitives with system font fallbacks.
 * Keys describe font classification (sans, serif, mono).
 *
 * SCOPE: Global - Used for all typography across the design system
 *
 * COMMON USE CASES:
 * - sans: UI text, headings, body copy (default)
 * - serif: Editorial content, long-form reading, headlines
 * - mono: Code snippets, technical data, tabular numbers
 *
 * FONT STACK STRATEGY:
 * Each stack includes:
 * 1. Custom brand font(s)
 * 2. High-quality fallback font(s)
 * 3. System font fallbacks for reliability
 *
 * ACCESSIBILITY:
 * - Ensure custom fonts load efficiently (font-display: swap)
 * - System fallbacks maintain readability during font loading
 * - Test font legibility across sizes and weights
 */
export const fontFamily = {
  sans: "'Space Grotesk', 'Inter', system-ui, -apple-system, sans-serif",
  serif: "'Canela', 'Cormorant Garamond', Georgia, serif",
  mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace",
} as const;

export type FontFamily = keyof typeof fontFamily;
