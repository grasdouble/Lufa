/**
 * Typography Tokens
 *
 * Standardized typography values for consistent text styling.
 * Includes font sizes, line heights, font weights, and letter spacing.
 */

export const fontSize = {
    /** 12px - Extra small text */
    xs: '0.75rem',
    /** 14px - Small text */
    sm: '0.875rem',
    /** 16px - Base/body text */
    base: '1rem',
    /** 18px - Large body text */
    lg: '1.125rem',
    /** 20px - Extra large body text */
    xl: '1.25rem',
    /** 24px - Heading 6 */
    '2xl': '1.5rem',
    /** 30px - Heading 5 */
    '3xl': '1.875rem',
    /** 36px - Heading 4 */
    '4xl': '2.25rem',
    /** 48px - Heading 3 */
    '5xl': '3rem',
    /** 60px - Heading 2 */
    '6xl': '3.75rem',
    /** 72px - Heading 1 */
    '7xl': '4.5rem',
} as const;

export type FontSizeToken = keyof typeof fontSize;

export const lineHeight = {
    /** 1 - Tight (for headings) */
    tight: '1',
    /** 1.25 - Snug (for headings) */
    snug: '1.25',
    /** 1.375 - Normal (for headings) */
    normal: '1.375',
    /** 1.5 - Relaxed (for body) */
    relaxed: '1.5',
    /** 1.625 - Loose (for body) */
    loose: '1.625',
} as const;

export type LineHeightToken = keyof typeof lineHeight;

export const fontWeight = {
    /** 300 - Light */
    light: '300',
    /** 400 - Normal/Regular */
    normal: '400',
    /** 500 - Medium */
    medium: '500',
    /** 600 - Semibold */
    semibold: '600',
    /** 700 - Bold */
    bold: '700',
} as const;

export type FontWeightToken = keyof typeof fontWeight;

export const letterSpacing = {
    /** -0.05em - Tighter */
    tighter: '-0.05em',
    /** -0.025em - Tight */
    tight: '-0.025em',
    /** 0 - Normal */
    normal: '0',
    /** 0.025em - Wide */
    wide: '0.025em',
    /** 0.05em - Wider */
    wider: '0.05em',
} as const;

export type LetterSpacingToken = keyof typeof letterSpacing;

/**
 * Typography scale presets
 * Combines font size, line height, and weight for common use cases
 */
export const typographyScale = {
    h1: {
        fontSize: fontSize['7xl'],
        lineHeight: lineHeight.tight,
        fontWeight: fontWeight.bold,
        letterSpacing: letterSpacing.tight,
    },
    h2: {
        fontSize: fontSize['6xl'],
        lineHeight: lineHeight.tight,
        fontWeight: fontWeight.bold,
        letterSpacing: letterSpacing.tight,
    },
    h3: {
        fontSize: fontSize['5xl'],
        lineHeight: lineHeight.snug,
        fontWeight: fontWeight.semibold,
        letterSpacing: letterSpacing.normal,
    },
    h4: {
        fontSize: fontSize['4xl'],
        lineHeight: lineHeight.snug,
        fontWeight: fontWeight.semibold,
        letterSpacing: letterSpacing.normal,
    },
    h5: {
        fontSize: fontSize['3xl'],
        lineHeight: lineHeight.normal,
        fontWeight: fontWeight.semibold,
        letterSpacing: letterSpacing.normal,
    },
    h6: {
        fontSize: fontSize['2xl'],
        lineHeight: lineHeight.normal,
        fontWeight: fontWeight.semibold,
        letterSpacing: letterSpacing.normal,
    },
    bodyLarge: {
        fontSize: fontSize.lg,
        lineHeight: lineHeight.relaxed,
        fontWeight: fontWeight.normal,
        letterSpacing: letterSpacing.normal,
    },
    body: {
        fontSize: fontSize.base,
        lineHeight: lineHeight.relaxed,
        fontWeight: fontWeight.normal,
        letterSpacing: letterSpacing.normal,
    },
    bodySmall: {
        fontSize: fontSize.sm,
        lineHeight: lineHeight.relaxed,
        fontWeight: fontWeight.normal,
        letterSpacing: letterSpacing.normal,
    },
    caption: {
        fontSize: fontSize.xs,
        lineHeight: lineHeight.normal,
        fontWeight: fontWeight.normal,
        letterSpacing: letterSpacing.normal,
    },
    label: {
        fontSize: fontSize.sm,
        lineHeight: lineHeight.normal,
        fontWeight: fontWeight.medium,
        letterSpacing: letterSpacing.normal,
    },
} as const;

export type TypographyScaleToken = keyof typeof typographyScale;

export default {
    fontSize,
    lineHeight,
    fontWeight,
    letterSpacing,
    typographyScale,
};
