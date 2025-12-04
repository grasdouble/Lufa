/**
 * Color System
 *
 * Main export file for the color system.
 * Combines primitive and semantic color tokens.
 *
 * @example
 * ```typescript
 * import { primitives, semantic } from '@grasdouble/lufa_design-system';
 *
 * // Use primitive colors
 * const blueColor = primitives.blue[600];
 *
 * // Use semantic colors
 * const primaryText = semantic.text.primary;
 * ```
 */

import { primitives } from './colors-primitives';
import { semantic } from './colors-semantic';

export { primitives } from './colors-primitives';
export type { PrimitiveColor, PrimitiveShade } from './colors-primitives';

export { semantic } from './colors-semantic';
export type { SemanticColorCategory, SemanticColorToken } from './colors-semantic';

/**
 * Complete color palette with both primitives and semantic tokens
 */
export const colors = {
    primitives,
    semantic,
} as const;

export default colors;
