/**
 * Border primitives with descriptive width keys and standard CSS style names.
 * Width keys use actual pixel values; style keys use CSS values for clarity.
 *
 * SCOPE: Global - Used across all components
 *
 * COMMON USE CASES:
 * - Card borders and dividers
 * - Input field outlines
 * - Focus indicators (keyboard navigation)
 * - Button borders
 * - Table cell borders
 *
 * WCAG 2.1 Accessibility Guidelines:
 * - Focus Indicators: Minimum 2px thickness (WCAG 2.4.7 Focus Visible)
 * - Border Contrast: Minimum 3:1 against adjacent colors (WCAG 1.4.11 Non-text Contrast)
 * - Visual Affordance: Visible borders help users identify interactive elements
 */
export const borders = {
  width: {
    0: "0px",
    1: "1px",
    2: "2px", // WCAG 2.4.7 minimum for focus indicators
    3: "3px", // Recommended for clear focus visibility
    4: "4px",
  },
  style: {
    solid: "solid",
    dashed: "dashed",
    dotted: "dotted",
    double: "double",
  },
} as const;

export type BorderWidths = typeof borders.width;
export type BorderWidthKey = keyof BorderWidths;
export type BorderStyles = typeof borders.style;
export type BorderStyleKey = keyof BorderStyles;
export type Borders = typeof borders;
