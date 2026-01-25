/**
 * Lufa Design System CLI - Programmatic API
 *
 * This module exports validators and utilities for programmatic use.
 *
 * @example
 * ```typescript
 * import { validateCompleteness, validateContrast, validateFormat } from '@grasdouble/lufa_design-system-cli';
 *
 * const completenessResult = validateCompleteness(themePath);
 * const contrastResult = validateContrast(themePath);
 * const formatResult = validateFormat(themePath);
 *
 * if (completenessResult.valid && contrastResult.valid && formatResult.valid) {
 *   console.log('Theme is valid!');
 * }
 * ```
 */

export { validateCompleteness } from './validators/completeness.js';
export { validateContrast } from './validators/contrast.js';
export { validateFormat } from './validators/format.js';

export { parseCSSFile, tokenNameFromCSSVar, cssVarNameFromToken } from './utils/parse-css.js';
export {
  hexToRgb,
  getRelativeLuminance,
  getContrastRatio,
  WCAG_LEVELS,
  meetsWCAG_AA_Text,
  meetsWCAG_AA_UI,
  meetsWCAG_AAA,
  getWCAGLevel,
} from './utils/wcag.js';

/**
 * Validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings?: string[];
}

/**
 * Validate a theme file against all validation rules
 *
 * @param themePath - Path to the theme CSS file
 * @returns Combined validation result
 *
 * @example
 * ```typescript
 * import { validateTheme } from '@grasdouble/lufa_design-system-cli';
 *
 * const result = validateTheme('./my-theme.css');
 * if (result.valid) {
 *   console.log('Theme is valid!');
 * } else {
 *   console.error('Validation errors:', result.errors);
 * }
 * ```
 */
export function validateTheme(themePath: string): ValidationResult {
  const { validateCompleteness } = require('./validators/completeness.js');
  const { validateContrast } = require('./validators/contrast.js');
  const { validateFormat } = require('./validators/format.js');

  const completenessResult = validateCompleteness(themePath);
  const contrastResult = validateContrast(themePath);
  const formatResult = validateFormat(themePath);

  const allErrors = [...completenessResult.errors, ...contrastResult.errors, ...formatResult.errors];

  const allWarnings = [
    ...(completenessResult.warnings || []),
    ...(contrastResult.warnings || []),
    ...(formatResult.warnings || []),
  ];

  return {
    valid: completenessResult.valid && contrastResult.valid && formatResult.valid,
    errors: allErrors,
    warnings: allWarnings.length > 0 ? allWarnings : undefined,
  };
}
