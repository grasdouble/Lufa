/**
 * Grid Tokens
 *
 * Semantic grid system configurations for responsive layouts.
 * References primitive grid scale for consistent tokens.
 *
 * USAGE:
 * - Columns: Define the number of columns in your grid layout
 * - Gutters: Set the spacing between grid items
 *
 * GRID SYSTEM GUIDELINES:
 * - Use 12-column grid for maximum flexibility
 * - Maintain consistent gutter sizes across breakpoints
 * - Ensure adequate spacing for touch targets on mobile (minimum 24px gutters)
 * - Consider subgrids for nested layouts
 * - Use semantic column names for clarity
 *
 * COLUMN USAGE:
 * - single: Mobile vertical stacking
 * - double: Small tablets, split layouts
 * - triple: Tablet portrait, triadic compositions
 * - quad: Tablet landscape, card grids
 * - six: Medium desktop, product grids
 * - eight: Large desktop, complex layouts
 * - twelve: Standard grid system (most flexible)
 * - sixteen: Dense layouts, dashboards
 *
 * GUTTER USAGE:
 * - none: Flush layouts, no spacing
 * - xs: Compact layouts (8px)
 * - sm: Standard spacing (16px)
 * - md: Comfortable spacing (24px, minimum for touch)
 * - lg: Spacious layouts (32px)
 * - xl: Very spacious, hero sections (48px)
 *
 * ACCESSIBILITY:
 * - Maintain minimum 24px gutters on touch devices
 * - Ensure grid items reflow properly on small screens
 * - Test with browser zoom and text scaling
 * - Use semantic HTML with grid (main, article, section)
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/reflow.html|WCAG 2.1 - Reflow}
 */

import { grid as primitiveGrid } from "@grasdouble/lufa_design-system-primitives";

export const grid = {
  columns: {
    /** 1 column - Mobile vertical stacking */
    single: primitiveGrid.columns[1],
    /** 2 columns - Small tablets, split layouts */
    double: primitiveGrid.columns[2],
    /** 3 columns - Tablet portrait */
    triple: primitiveGrid.columns[3],
    /** 4 columns - Tablet landscape, small desktop */
    quad: primitiveGrid.columns[4],
    /** 6 columns - Medium desktop */
    six: primitiveGrid.columns[6],
    /** 8 columns - Large desktop */
    eight: primitiveGrid.columns[8],
    /** 12 columns - Standard grid system (most flexible) */
    twelve: primitiveGrid.columns[12],
    /** 16 columns - Dense layouts, dashboards */
    sixteen: primitiveGrid.columns[16],
  },
  gutters: {
    /** No gutter - Flush layouts */
    none: primitiveGrid.gutters[0],
    /** 8px - Compact layouts */
    xs: primitiveGrid.gutters[8],
    /** 16px - Standard spacing */
    sm: primitiveGrid.gutters[16],
    /** 24px - Comfortable spacing (minimum for touch) */
    md: primitiveGrid.gutters[24],
    /** 32px - Spacious layouts */
    lg: primitiveGrid.gutters[32],
    /** 48px - Very spacious, hero sections */
    xl: primitiveGrid.gutters[48],
  },
} as const;

export type GridColumn = typeof grid.columns;
export type GridColumnTokens = keyof GridColumn;

export type GridGutter = typeof grid.gutters;
export type GridGutterTokens = keyof GridGutter;
