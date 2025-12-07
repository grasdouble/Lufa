/**
 * Shadow Tokens
 *
 * Standardized shadow values for elevation and depth.
 * Follows Material Design elevation principles.
 */

export const shadows = {
    /** No shadow */
    none: 'none',
    /** 0px 1px 2px - Subtle elevation */
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    /** 0px 1px 3px - Small elevation */
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    /** 0px 4px 6px - Medium elevation */
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    /** 0px 10px 15px - Large elevation */
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    /** 0px 20px 25px - Extra large elevation */
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    /** 0px 25px 50px - Huge elevation */
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    /** Inset shadow for inner depth */
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

export type ShadowToken = keyof typeof shadows;

export default shadows;
