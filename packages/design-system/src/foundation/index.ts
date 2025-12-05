/**
 * Foundation Design Tokens
 *
 * Core design tokens that form the foundation of the design system.
 * Includes colors, typography, spacing, shadows, radius, z-index, and breakpoints.
 *
 * Note: Only semantic colors are exported. Primitive colors are internal
 * implementation details used to define semantic tokens.
 */

// Color tokens (semantic only)
export * from './colors';

// Typography tokens
export { fontSize, lineHeight, fontWeight, letterSpacing, typographyScale } from './typography';
export type { FontSizeToken, LineHeightToken, FontWeightToken, LetterSpacingToken, TypographyScaleToken } from './typography';

// Layout tokens
export { spacing } from './spacing';
export type { SpacingToken } from './spacing';

export { radius } from './radius';
export type { RadiusToken } from './radius';

export { shadows } from './shadows';
export type { ShadowToken } from './shadows';

export { zIndex } from './zIndex';
export type { ZIndexToken } from './zIndex';

export { breakpoints } from './breakpoints';
export type { BreakpointToken } from './breakpoints';
