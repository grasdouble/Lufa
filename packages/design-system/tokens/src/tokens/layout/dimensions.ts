/**
 * Component dimension semantic tokens.
 * Standard sizes for common UI components.
 *
 * SCOPE: Layout & Components
 *
 * USE CASES:
 * - Navigation bars, headers, footers
 * - Sidebars, panels, drawers
 * - Buttons, inputs, controls
 *
 * STRUCTURE:
 * - Each component category has height/width tokens
 * - Values based on spacing and maxWidths primitives
 */

import {
  spacing as primitiveSpacing,
  maxWidths as primitiveMaxWidths,
} from "@grasdouble/lufa_design-system-primitives";

export const dimensions = {
  // Navigation heights
  navbarHeightCompact: primitiveSpacing[48],
  navbarHeightDefault: primitiveSpacing[64],
  navbarHeightLarge: primitiveSpacing[72],

  // Sidebar widths
  sidebarWidthCollapsed: primitiveSpacing[64],
  sidebarWidthDefault: primitiveMaxWidths[256],
  sidebarWidthWide: primitiveMaxWidths[320],

  // Footer heights
  footerHeightCompact: primitiveSpacing[48],
  footerHeightDefault: primitiveSpacing[64],
  footerHeightLarge: primitiveSpacing[96],

  // Button heights
  buttonHeightSmall: primitiveSpacing[32],
  buttonHeightDefault: primitiveSpacing[40],
  buttonHeightLarge: primitiveSpacing[48],

  // Input heights
  inputHeightSmall: primitiveSpacing[32],
  inputHeightDefault: primitiveSpacing[40],
  inputHeightLarge: primitiveSpacing[48],

  // Card/Panel minimum widths
  cardMinWidth: "280px", // Custom value between 256 and 288
  cardDefaultWidth: primitiveMaxWidths[360],

  // Modal widths
  modalWidthSmall: primitiveMaxWidths[400],
  modalWidthDefault: primitiveMaxWidths[600],
  modalWidthLarge: primitiveMaxWidths[800],
  modalWidthFullWidth: primitiveMaxWidths[1200],
} as const;

export type Dimensions = typeof dimensions;
export type DimensionsTokens = keyof Dimensions;
