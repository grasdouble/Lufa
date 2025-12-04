/**
 * Z-Index Tokens
 *
 * Standardized z-index values for consistent stacking.
 */

export const zIndex = {
    /** Below normal content */
    behind: -1,
    /** Normal content layer */
    base: 0,
    /** Slightly elevated */
    elevated: 10,
    /** Sticky elements */
    sticky: 100,
    /** Fixed elements */
    fixed: 200,
    /** Dropdown menus */
    dropdown: 300,
    /** Modals and overlays */
    modal: 400,
    /** Popovers */
    popover: 500,
    /** Tooltips */
    tooltip: 600,
    /** Toast notifications */
    toast: 700,
} as const;

export type ZIndexToken = keyof typeof zIndex;

export default zIndex;
