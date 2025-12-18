/**
 * Minimum width semantic tokens.
 * Complement to maxWidth tokens for constraining minimum dimensions.
 *
 * SCOPE: Layout & Responsive Design
 *
 * USE CASES:
 * - Prevent elements from becoming too narrow
 * - Maintain usability on smaller screens
 * - Component minimum sizes (buttons, inputs, cards)
 * - Grid/flexbox item constraints
 *
 * BEST PRACTICES:
 * - Use with max-width for balanced responsive behavior
 * - Ensure values work well with breakpoints
 * - Test on mobile devices for usability
 */

import { maxWidth as primitiveMaxWidths, spacing as primitiveSpacing } from '@grasdouble/lufa_design-system-primitives';

export const minWidth = {
  // Button/Control minimums
  buttonMin: primitiveSpacing[80],
  inputMin: primitiveSpacing[120],

  // Content minimums
  cardMin: '240px', // Custom value between 256 and 288 primitives
  sidebarMin: '200px', // Custom value

  // Component minimums
  xs: '280px', // Custom value between 256 and 288
  sm: primitiveMaxWidths[320],
  md: '480px', // Custom value between 448 and 512
  lg: primitiveMaxWidths[640],
  xl: primitiveMaxWidths[768],

  // Special values
  none: '0',
  full: primitiveMaxWidths.full,
  fitContent: 'fit-content',
  minContent: 'min-content',
  maxContent: 'max-content',
} as const;

export type MinWidth = keyof typeof minWidth;
