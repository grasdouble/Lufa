/**
 * Grid Tokens
 *
 * Semantic grid system configurations for responsive layouts.
 * References primitive grid scale for consistent token.
 *
 * Grid System Guidelines:
 * - Use 12-column grid for maximum flexibility
 * - Maintain consistent gutter sizes across breakpoints
 * - Ensure adequate spacing for touch targets on mobile
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

export type GridColumnToken = keyof typeof grid.columns;
export type GridGutterToken = keyof typeof grid.gutters;

export default grid;
