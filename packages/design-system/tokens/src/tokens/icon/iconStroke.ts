/**
 * Icon stroke width semantic tokens.
 * Maps primitive stroke widths to semantic meanings.
 *
 * USE CASES:
 * - default: Standard UI icons
 * - thin: Decorative icons, large icons
 * - bold: Emphasized icons, small icons
 * - extraBold: Strong emphasis, branding
 */

import primitives from '@grasdouble/lufa_design-system-primitives';

export const iconStroke = {
  thin: primitives.iconStroke['1'], // Subtle, decorative
  default: primitives.iconStroke['1-5'], // Standard (most common)
  bold: primitives.iconStroke['2'], // Emphasized
  extraBold: primitives.iconStroke['2-5'], // Strong emphasis
} as const;

export type IconStroke = keyof typeof iconStroke;
