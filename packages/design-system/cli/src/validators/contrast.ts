/**
 * Contrast Validator
 *
 * Validates WCAG contrast ratios for color token pairs
 */

import type { CSSCustomProperty } from '../utils/parse-css.js';
import { getContrastRatio, meetsWCAG_AA_Text, meetsWCAG_AA_UI } from '../utils/wcag.js';

export interface ContrastViolation {
  foreground: string;
  background: string;
  ratio: number;
  required: number;
  type: 'text' | 'ui';
}

export interface ContrastResult {
  valid: boolean;
  violations: ContrastViolation[];
  totalChecks: number;
}

/**
 * Define color pairs that need to be checked for contrast
 * Format: [foreground-token-suffix, background-token-suffix, type]
 */
const COLOR_PAIRS_TO_CHECK: Array<[string, string, 'text' | 'ui']> = [
  // Text colors on backgrounds
  ['semantic-ui-text-primary', 'semantic-ui-background-page', 'text'],
  ['semantic-ui-text-primary', 'semantic-ui-background-surface', 'text'],
  ['semantic-ui-text-secondary', 'semantic-ui-background-page', 'text'],
  ['semantic-ui-text-secondary', 'semantic-ui-background-surface', 'text'],

  // Success colors
  ['semantic-ui-text-success', 'semantic-ui-background-page', 'text'],
  ['semantic-ui-background-on-success', 'semantic-ui-background-success', 'text'],

  // Error colors
  ['semantic-ui-text-error', 'semantic-ui-background-page', 'text'],
  ['semantic-ui-background-on-error', 'semantic-ui-background-error', 'text'],

  // Warning colors
  ['semantic-ui-text-warning', 'semantic-ui-background-page', 'text'],
  ['semantic-ui-background-on-warning', 'semantic-ui-background-warning', 'text'],

  // Info colors
  ['semantic-ui-text-info', 'semantic-ui-background-page', 'text'],
  ['semantic-ui-background-on-info', 'semantic-ui-background-info', 'text'],

  // Borders on backgrounds (UI components)
  ['semantic-ui-border-default', 'semantic-ui-background-page', 'ui'],
  ['semantic-ui-border-strong', 'semantic-ui-background-page', 'ui'],
];

/**
 * Validate contrast ratios for all color pairs
 */
export function validateContrast(properties: CSSCustomProperty[]): ContrastResult {
  const violations: ContrastViolation[] = [];

  // Create a map of token names to values for quick lookup
  const tokenMap = new Map(properties.map((p) => [p.name, p.value]));

  // Check each defined color pair
  for (const [fgSuffix, bgSuffix, type] of COLOR_PAIRS_TO_CHECK) {
    const fgName = `--lufa-${fgSuffix}`;
    const bgName = `--lufa-${bgSuffix}`;

    const fgValue = tokenMap.get(fgName);
    const bgValue = tokenMap.get(bgName);

    // Skip if either token is not defined
    if (!fgValue || !bgValue) {
      continue;
    }

    // Calculate contrast ratio
    const ratio = getContrastRatio(fgValue, bgValue);

    if (ratio === null) {
      // Skip if colors are invalid (will be caught by format validator)
      continue;
    }

    // Check if ratio meets WCAG standards
    const meetsStandard = type === 'text' ? meetsWCAG_AA_Text(ratio) : meetsWCAG_AA_UI(ratio);

    if (!meetsStandard) {
      violations.push({
        foreground: fgName,
        background: bgName,
        ratio: Math.round(ratio * 100) / 100, // Round to 2 decimal places
        required: type === 'text' ? 4.5 : 3.0,
        type,
      });
    }
  }

  return {
    valid: violations.length === 0,
    violations,
    totalChecks: COLOR_PAIRS_TO_CHECK.length,
  };
}
