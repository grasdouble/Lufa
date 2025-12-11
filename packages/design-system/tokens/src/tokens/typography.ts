/**
 * Typography Tokens
 *
 * Semantic naming for typography values.
 * References primitive typography scale for consistent foundation.
 */

import { typography as primitiveTypography } from "@grasdouble/lufa_design-system-primitives";

export const fontFamily = {
  /** Sans-serif - Primary font family */
  sans: "'Space Grotesk', 'Inter', system-ui, -apple-system, sans-serif",
  /** Serif - Editorial and heading font */
  serif: "'Canela', 'Cormorant Garamond', Georgia, serif",
  /** Monospace - Code and technical content */
  mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace",
} as const;

export type FontFamilyToken = keyof typeof fontFamily;

export const fontSize = {
  /** 12px - Extra small text (secondary labels only) */
  xs: primitiveTypography.fontSize[12],
  /** 14px - Small text (captions, metadata) */
  sm: primitiveTypography.fontSize[14],
  /** 16px - Base/body text (WCAG minimum) */
  base: primitiveTypography.fontSize[16],
  /** 18px - Large body text */
  lg: primitiveTypography.fontSize[18],
  /** 20px - Extra large text */
  xl: primitiveTypography.fontSize[20],
  /** 24px - 2x large */
  "2xl": primitiveTypography.fontSize[24],
  /** 30px - 3x large */
  "3xl": primitiveTypography.fontSize[30],
  /** 36px - 4x large */
  "4xl": primitiveTypography.fontSize[36],
  /** 48px - 5x large */
  "5xl": primitiveTypography.fontSize[48],
  /** 60px - 6x large */
  "6xl": primitiveTypography.fontSize[60],
  /** 72px - 7x large */
  "7xl": primitiveTypography.fontSize[72],
  /** 96px - 8x large */
  "8xl": primitiveTypography.fontSize[96],
  /** 128px - 9x large */
  "9xl": primitiveTypography.fontSize[128],
} as const;

export type FontSizeToken = keyof typeof fontSize;

export const lineHeight = {
  /** 1.0 - None */
  none: primitiveTypography.lineHeight.tight,
  /** 1.2 - Tight (headings only) */
  tight: primitiveTypography.lineHeight.heading,
  /** 1.35 - Snug (large text only) */
  snug: primitiveTypography.lineHeight.display,
  /** 1.5 - Base (WCAG minimum for body) */
  base: primitiveTypography.lineHeight.body,
  /** 1.65 - Relaxed (enhanced readability) */
  relaxed: primitiveTypography.lineHeight.reading,
  /** 1.8 - Loose (dyslexia-friendly) */
  loose: primitiveTypography.lineHeight.dyslexia,
} as const;

export type LineHeightToken = keyof typeof lineHeight;

export const fontWeight = {
  /** 100 - Thin (avoid for small text) */
  thin: primitiveTypography.fontWeight[100],
  /** 200 - Extra light (avoid for small text) */
  extraLight: primitiveTypography.fontWeight[200],
  /** 300 - Light */
  light: primitiveTypography.fontWeight[300],
  /** 400 - Regular (WCAG minimum) */
  regular: primitiveTypography.fontWeight[400],
  /** 500 - Medium */
  medium: primitiveTypography.fontWeight[500],
  /** 600 - Semibold */
  semibold: primitiveTypography.fontWeight[600],
  /** 700 - Bold */
  bold: primitiveTypography.fontWeight[700],
  /** 800 - Extra bold */
  extraBold: primitiveTypography.fontWeight[800],
  /** 900 - Black */
  black: primitiveTypography.fontWeight[900],
} as const;

export type FontWeightToken = keyof typeof fontWeight;

export const letterSpacing = {
  /** -0.02em - Tightest */
  tightest: primitiveTypography.letterSpacing.tight,
  /** -0.01em - Tight (headings only) */
  tight: primitiveTypography.letterSpacing.heading,
  /** 0 - Normal */
  normal: primitiveTypography.letterSpacing.normal,
  /** 0.01em - Wide */
  wide: primitiveTypography.letterSpacing.relaxed,
  /** 0.04em - Wider (dyslexia-friendly) */
  wider: primitiveTypography.letterSpacing.readable,
  /** 0.08em - Widest */
  widest: primitiveTypography.letterSpacing.dyslexia,
} as const;

export type LetterSpacingToken = keyof typeof letterSpacing;

/**
 * Typography scale presets
 * Combines font size, line height, and weight for common use cases
 */
export const typographyScale = {
  h1: {
    fontSize: fontSize["6xl"],
    lineHeight: lineHeight.tight,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontSize: fontSize["5xl"],
    lineHeight: lineHeight.tight,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight.snug,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight.snug,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h5: {
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontSize: fontSize.xl,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },
  bodyLarge: {
    fontSize: fontSize.lg,
    lineHeight: lineHeight.relaxed,
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },
  body: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.relaxed,
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.relaxed,
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },
  caption: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },
  label: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
  },
} as const;

export type TypographyScaleToken = keyof typeof typographyScale;

export default {
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  typographyScale,
};
