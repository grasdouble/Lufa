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

import { iconStrokes as primitiveIconStrokes } from "@grasdouble/lufa_design-system-primitives";

export const iconStrokes = {
  thin: primitiveIconStrokes["1"], // Subtle, decorative
  default: primitiveIconStrokes["1-5"], // Standard (most common)
  bold: primitiveIconStrokes["2"], // Emphasized
  extraBold: primitiveIconStrokes["2-5"], // Strong emphasis
} as const;

export type IconStrokes = typeof iconStrokes;
export type IconStrokesTokens = keyof IconStrokes;
