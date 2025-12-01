/**
 * Color System Index
 *
 * Main export file for the accessible color system.
 * Import colors from this file to use in your components.
 *
 * @example
 * ```typescript
 * import { primitives, semantic, accessibility } from '@grasdouble/lufa_design-system/colors';
 *
 * // Use primitive colors
 * const blueColor = primitives.blue[600];
 *
 * // Use semantic colors
 * const primaryText = semantic.text.primary;
 *
 * // Check accessibility
 * const isAccessible = accessibility.meetsWCAG(primaryText, semantic.background.primary);
 * ```
 */

import { primitives as primitivesImport } from './primitives';
import { semantic as semanticImport } from './semantic';

export { primitives } from './primitives';
export type { PrimitiveColor, PrimitiveShade } from './primitives';

export { semantic } from './semantic';
export type { SemanticColorCategory, SemanticColorToken } from './semantic';

export * as accessibility from './accessibility';

// Re-export commonly used functions
export { getContrastRatio, meetsWCAG, meetsWCAGForUI, getContrastLevel, getSuggestedTextColor, WCAG_STANDARDS } from './accessibility';

// Export CSS variables for direct injection
export { cssVariables, generateCSSVariables, tailwindColors } from './cssVariables';

/**
 * Complete color palette with both primitives and semantic tokens
 */
export const colors = {
    primitives: primitivesImport,
    semantic: semanticImport,
} as const;

export default colors;
