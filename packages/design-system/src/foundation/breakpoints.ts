/**
 * Breakpoint Tokens
 *
 * Standardized breakpoints for responsive design.
 */

export const breakpoints = {
    /** Mobile - 0px and up */
    xs: '0px',
    /** Small tablet - 640px and up */
    sm: '640px',
    /** Tablet - 768px and up */
    md: '768px',
    /** Desktop - 1024px and up */
    lg: '1024px',
    /** Large desktop - 1280px and up */
    xl: '1280px',
    /** Extra large desktop - 1536px and up */
    '2xl': '1536px',
} as const;

export type BreakpointToken = keyof typeof breakpoints;

export default breakpoints;
