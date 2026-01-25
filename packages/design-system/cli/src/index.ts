// Import for internal use
import { parseCSSFile } from './utils/parse-css.js';
import { validateCompleteness } from './validators/completeness.js';
import { validateContrast } from './validators/contrast.js';
import { validateFormat } from './validators/format.js';

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
export type ValidationResult = {
  valid: boolean;
  errors: string[];
  warnings?: string[];
};

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
 * const result = await validateTheme('./my-theme.css');
 * if (result.valid) {
 *   console.log('Theme is valid!');
 * } else {
 *   console.error('Validation errors:', result.errors);
 * }
 * ```
 */
export async function validateTheme(themePath: string): Promise<ValidationResult> {
  const properties = await parseCSSFile(themePath);

  const completenessResult = await validateCompleteness(properties);
  const contrastResult = validateContrast(properties);
  const formatResult = validateFormat(properties);

  const errors: string[] = [];

  // Convert completeness errors
  if (!completenessResult.valid) {
    errors.push(...completenessResult.missingTokens.map((token) => `Missing required token: ${token}`));
  }

  // Convert format errors
  errors.push(
    ...formatResult.errors.map(
      (error) => `${error.token} (line ${error.line}): Invalid format - ${error.expectedFormat}`
    )
  );

  // Convert contrast violations
  errors.push(
    ...contrastResult.violations.map(
      (violation) =>
        `Contrast violation: ${violation.foreground} on ${violation.background} (${violation.ratio}:1, needs ${violation.required}:1)`
    )
  );

  const warnings: string[] = [];

  // Extra tokens are warnings
  if (completenessResult.extraTokens.length > 0) {
    warnings.push(...completenessResult.extraTokens.map((token) => `Extra token (not in design system): ${token}`));
  }

  return {
    valid: completenessResult.valid && contrastResult.valid && formatResult.valid,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}
