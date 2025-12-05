/**
 * Color System
 *
 * Exports semantic color tokens for use in applications.
 * Primitive colors are used internally to define semantic colors
 * but are not exposed in the public API.
 *
 * @example
 * ```typescript
 * import { semantic } from '@grasdouble/lufa_design-system';
 *
 * // Use semantic colors
 * const primaryText = semantic.text.primary;
 * const buttonBg = semantic.interactive.default;
 * ```
 */

import { semantic } from './colors-semantic';

export { semantic } from './colors-semantic';
export type { SemanticColorCategory, SemanticColorToken } from './colors-semantic';

/**
 * Complete color palette (semantic tokens only)
 * @deprecated Use `semantic` directly instead
 */
export const colors = {
    semantic,
} as const;

export default colors;
