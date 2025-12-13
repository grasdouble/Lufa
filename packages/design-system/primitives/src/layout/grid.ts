/**
 * Grid primitives with descriptive keys for columns and gutters.
 * Column keys use actual column count values for clarity.
 * Gutter keys use pixel values for clarity (0px, 8px, 16px, etc.).
 *
 * SCOPE: Global - Used for CSS Grid and layout systems
 *
 * COMMON USE CASES:
 * - columns[12]: Standard 12-column grid (most common)
 * - columns[4]: Simple card grids, features sections
 * - columns[3]: Three-column layouts
 * - columns[16]: Complex dashboards, data tables
 * - gutters[16]: Compact layouts
 * - gutters[24]: Standard spacing
 * - gutters[32]: Comfortable, spacious layouts
 *
 * GRID STRATEGY:
 * 12-column grid is industry standard for flexibility. Use 4 or 6 for simpler
 * layouts. Adjust gutters based on content density and viewport size.
 */
export const grid = {
  columns: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    6: 6,
    8: 8,
    12: 12,
    16: 16,
  },
  gutters: {
    0: "0px",
    8: "8px",
    16: "16px",
    24: "24px",
    32: "32px",
    48: "48px",
  },
} as const;

export type GridColumns = keyof typeof grid.columns;

export type GridGutters = keyof typeof grid.gutters;
