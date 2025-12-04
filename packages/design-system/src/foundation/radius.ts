/**
 * Border Radius Tokens
 *
 * Standardized border radius values for consistent rounded corners.
 */

export const radius = {
    /** 0px - No rounding */
    none: '0',
    /** 2px - Subtle rounding */
    xs: '0.125rem',
    /** 4px - Small rounding */
    sm: '0.25rem',
    /** 6px - Medium rounding */
    md: '0.375rem',
    /** 8px - Base rounding */
    base: '0.5rem',
    /** 12px - Large rounding */
    lg: '0.75rem',
    /** 16px - Extra large rounding */
    xl: '1rem',
    /** 24px - Very large rounding */
    '2xl': '1.5rem',
    /** 32px - Huge rounding */
    '3xl': '2rem',
    /** 9999px - Fully rounded (pill) */
    full: '9999px',
} as const;

export type RadiusToken = keyof typeof radius;

export default radius;
