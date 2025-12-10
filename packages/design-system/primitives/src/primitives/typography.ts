/**
 * Typography primitives with descriptive keys for better developer experience.
 * Font sizes use pixel values; weights use numeric values; line-height and letter-spacing
 * use descriptive names that indicate the visual effect (tight, body, relaxed, etc.).
 *
 * SCOPE: Global - Foundation for all text rendering
 *
 * COMMON USE CASES:
 * - fontFamily.sans: Body text, UI elements (most common)
 * - fontFamily.serif: Editorial content, headings, quotes
 * - fontFamily.mono: Code snippets, technical data, monospaced needs
 * - fontSize 12-14: Secondary labels, captions, metadata
 * - fontSize 16: Body text default (WCAG minimum)
 * - fontSize 20+: Headings, emphasis, large UI
 * - fontWeight 300-400: Body text
 * - fontWeight 500-700: Headings, emphasis, buttons
 * - lineHeight.body (1.5): Paragraphs, readable content
 * - lineHeight.heading (1.2): Headings only
 * - letterSpacing.normal: Default for most text
 * - letterSpacing.readable/dyslexia: Accessibility enhancement
 *
 * WCAG 2.1 Accessibility Guidelines:
 * - Font Size: Minimum 16px for body text (WCAG 1.4.4 Resize Text)
 * - Line Height: Minimum 1.5 for normal text (WCAG 1.4.12 Text Spacing)
 * - Letter Spacing: Minimum 0.12em for improved readability (WCAG 1.4.12)
 * - Font Weight: Minimum 400 for body text; avoid thin weights for small sizes
 *
 * Size Usage Guidelines:
 * - xs/sm (12-14px): Secondary labels, captions only - never primary content
 * - md (16px): Recommended minimum for body text and interactive elements
 * - lg+ (20px+): Headings, emphasis, improved legibility
 */
export const typography = {
  fontFamily: {
    sans: "'Space Grotesk', 'Inter', system-ui, -apple-system, sans-serif",
    serif: "'Canela', 'Cormorant Garamond', Georgia, serif",
    mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace",
  },
  fontWeight: {
    100: 100, // Avoid for text < 20px
    200: 200, // Avoid for text < 20px
    300: 300, // Use cautiously, may reduce legibility at small sizes
    400: 400, // WCAG recommended minimum for body text
    500: 500,
    600: 600,
    700: 700,
    800: 800,
    900: 900,
  },
  fontSize: {
    12: "12px", // Secondary labels only - not for primary content
    14: "14px", // Captions, metadata - use sparingly
    16: "16px", // WCAG recommended minimum for body text
    20: "20px", // Large text threshold (WCAG 1.4.3)
    24: "24px",
    32: "32px",
    40: "40px",
    48: "48px",
    64: "64px",
  },
  lineHeight: {
    tight: 1.0,
    heading: 1.2, // Headings only - below WCAG minimum for body text
    display: 1.35, // Large text only - below WCAG minimum for body text
    body: 1.5, // WCAG 1.4.12 minimum for paragraph text
    reading: 1.65, // Enhanced readability for long-form content
    dyslexia: 1.8, // Maximum spacing for improved dyslexia-friendly reading
  },
  letterSpacing: {
    tight: "-0.02em",
    heading: "-0.01em", // Headings only - avoid for body text
    normal: "0em",
    relaxed: "0.01em",
    readable: "0.04em", // Improved readability for users with dyslexia
    dyslexia: "0.08em",
  },
} as const;

export type Typography = typeof typography;
export type TypographyKey = keyof Typography;
