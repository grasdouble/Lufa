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

import primitives from '@grasdouble/lufa_design-system-primitives';

export const dimension = {
  // Navigation heights
  navbarHeightCompact: primitives.spacing[48],
  navbarHeightDefault: primitives.spacing[64],
  navbarHeightLarge: primitives.spacing[72],

  // Sidebar widths
  sidebarWidthCollapsed: primitives.spacing[64],
  sidebarWidthDefault: primitives.maxWidth[256],
  sidebarWidthWide: primitives.maxWidth[320],

  // Footer heights
  footerHeightCompact: primitives.spacing[48],
  footerHeightDefault: primitives.spacing[64],
  footerHeightLarge: primitives.spacing[96],

  // Button heights
  buttonHeightSmall: primitives.spacing[32],
  buttonHeightDefault: primitives.spacing[40],
  buttonHeightLarge: primitives.spacing[48],

  // Input heights
  inputHeightSmall: primitives.spacing[32],
  inputHeightDefault: primitives.spacing[40],
  inputHeightLarge: primitives.spacing[48],

  // Card/Panel minimum widths
  cardMinWidth: '280px', // Custom value between 256 and 288
  cardDefaultWidth: primitives.maxWidth[360],

  // Modal widths
  modalWidthSmall: primitives.maxWidth[400],
  modalWidthDefault: primitives.maxWidth[600],
  modalWidthLarge: primitives.maxWidth[800],
  modalWidthFullWidth: primitives.maxWidth[1200],
} as const;

export type Dimension = keyof typeof dimension;
