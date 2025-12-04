/**
 * Spacing Tokens
 *
 * Standardized spacing values for consistent layouts.
 * Based on an 8px grid system for optimal visual rhythm.
 */

export const spacing = {
    /** 0px */
    none: '0',
    /** 2px - Minimal spacing */
    xxs: '0.125rem',
    /** 4px - Very tight spacing */
    xs: '0.25rem',
    /** 8px - Tight spacing */
    sm: '0.5rem',
    /** 12px - Compact spacing */
    md: '0.75rem',
    /** 16px - Base spacing unit */
    base: '1rem',
    /** 20px - Comfortable spacing */
    lg: '1.25rem',
    /** 24px - Spacious */
    xl: '1.5rem',
    /** 32px - Extra spacious */
    '2xl': '2rem',
    /** 40px - Very spacious */
    '3xl': '2.5rem',
    /** 48px - Extra large */
    '4xl': '3rem',
    /** 64px - Huge spacing */
    '5xl': '4rem',
    /** 80px - Very huge spacing */
    '6xl': '5rem',
    /** 96px - Maximum spacing */
    '7xl': '6rem',
} as const;

export type SpacingToken = keyof typeof spacing;

export default spacing;
