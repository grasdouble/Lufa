/**
 * Contrast Validator
 *
 * Validates WCAG contrast ratios for color token pairs
 */

import type { CSSCustomProperty } from '../utils/parse-css.js';
import { resolveCSSVarValue } from '../utils/parse-css.js';
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
  ['semantic-ui-text-tertiary', 'semantic-ui-background-page', 'text'],
  ['semantic-ui-text-tertiary', 'semantic-ui-background-surface', 'text'],

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

  // Interactive colors
  ['semantic-interactive-text-default', 'semantic-ui-background-page', 'text'],
  ['semantic-interactive-text-hover', 'semantic-ui-background-page', 'text'],
  ['semantic-interactive-border-default', 'semantic-ui-background-page', 'ui'],
  ['semantic-interactive-border-hover', 'semantic-ui-background-page', 'ui'],
  ['semantic-interactive-border-active', 'semantic-ui-background-page', 'ui'],
  ['semantic-interactive-border-focus', 'semantic-ui-background-page', 'ui'],

  // Button - Primary
  ['component-button-primary-text-default', 'component-button-primary-background-default', 'text'],
  ['component-button-primary-text-hover', 'component-button-primary-background-hover', 'text'],
  ['component-button-primary-text-active', 'component-button-primary-background-active', 'text'],

  // Button - Secondary
  ['component-button-secondary-text-default', 'component-button-secondary-background-default', 'text'],
  ['component-button-secondary-text-hover', 'component-button-secondary-background-hover', 'text'],
  ['component-button-secondary-border-default', 'component-button-secondary-background-default', 'ui'],

  // Button - Ghost
  ['component-button-ghost-text-default', 'semantic-ui-background-page', 'text'],
  ['component-button-ghost-text-hover', 'component-button-ghost-background-hover', 'text'],

  // Button - Danger
  ['component-button-danger-text-default', 'component-button-danger-background-default', 'text'],
  ['component-button-danger-text-hover', 'component-button-danger-background-hover', 'text'],

  // Badge colors (all variants)
  ['component-badge-default-text', 'component-badge-default-background', 'text'],
  ['component-badge-primary-text', 'component-badge-primary-background', 'text'],
  ['component-badge-success-text', 'component-badge-success-background', 'text'],
  ['component-badge-error-text', 'component-badge-error-background', 'text'],
  ['component-badge-warning-text', 'component-badge-warning-background', 'text'],
  ['component-badge-info-text', 'component-badge-info-background', 'text'],

  // Input states
  ['component-input-text-default', 'component-input-background-default', 'text'],
  ['component-input-text-disabled', 'component-input-background-disabled', 'text'],
  ['component-input-border-default', 'component-input-background-default', 'ui'],
  ['component-input-border-hover', 'component-input-background-default', 'ui'],
  ['component-input-border-focus', 'component-input-background-default', 'ui'],
  ['component-input-border-error', 'component-input-background-default', 'ui'],

  // Tooltip & Popover
  ['component-tooltip-text', 'component-tooltip-background', 'text'],
  ['component-popover-text', 'component-popover-background', 'text'],

  // Alert components
  ['component-alert-success-text', 'component-alert-success-background', 'text'],
  ['component-alert-error-text', 'component-alert-error-background', 'text'],
  ['component-alert-warning-text', 'component-alert-warning-background', 'text'],
  ['component-alert-info-text', 'component-alert-info-background', 'text'],

  // Card components
  ['component-card-text', 'component-card-background', 'text'],
  ['component-card-border', 'component-card-background', 'ui'],
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

    // Resolve CSS variable references (e.g., var(--lufa-primitive-color-gray-900))
    const resolvedFg = resolveCSSVarValue(fgValue, tokenMap) || fgValue;
    const resolvedBg = resolveCSSVarValue(bgValue, tokenMap) || bgValue;

    // Calculate contrast ratio with resolved values
    const ratio = getContrastRatio(resolvedFg, resolvedBg);

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
