/**
 * Format Validator
 *
 * Validates that token values have correct formats
 */

import type { CSSCustomProperty } from '../utils/parse-css.js';
import { isCSSVarReference, isValidDimension, isValidDuration, isValidHexColor } from '../utils/parse-css.js';

export interface FormatError {
  token: string;
  value: string;
  expectedFormat: string;
  line: number;
}

export interface FormatResult {
  valid: boolean;
  errors: FormatError[];
  totalChecked: number;
}

/**
 * Determine expected format based on token name
 */
function getExpectedFormat(tokenName: string): string | null {
  // Color tokens
  if (tokenName.includes('-color-')) {
    return 'hex color (e.g., #3B82F6) or CSS variable reference (e.g., var(--lufa-...))';
  }

  // Spacing tokens
  if (tokenName.includes('-spacing-')) {
    return 'dimension (e.g., 16px, 1rem) or CSS variable reference';
  }

  // Duration tokens
  if (tokenName.includes('-duration-')) {
    return 'duration (e.g., 150ms, 0.15s) or CSS variable reference';
  }

  // Radius tokens
  if (tokenName.includes('-radius-')) {
    return 'dimension (e.g., 4px, 0.25rem) or CSS variable reference';
  }

  // Shadow tokens (more lenient - can be complex values)
  if (tokenName.includes('-shadow-')) {
    return 'shadow (e.g., 0px 2px 4px rgba(0,0,0,0.1)) or CSS variable reference';
  }

  // Font family tokens (very lenient)
  if (tokenName.includes('-font-family-')) {
    return 'font family stack';
  }

  // Font size tokens
  if (tokenName.includes('-font-size-')) {
    return 'dimension (e.g., 14px, 1rem) or CSS variable reference';
  }

  // Font weight tokens
  if (tokenName.includes('-font-weight-')) {
    return 'number (e.g., 400, 600) or CSS variable reference';
  }

  // Line height tokens
  if (tokenName.includes('-line-height-')) {
    return 'number (e.g., 1.5) or dimension (e.g., 24px) or CSS variable reference';
  }

  // Easing tokens
  if (tokenName.includes('-easing-')) {
    return 'cubic-bezier() or CSS variable reference';
  }

  // Z-index tokens
  if (tokenName.includes('-z-index-')) {
    return 'integer (e.g., 100, 1000) or CSS variable reference';
  }

  return null; // No specific format required
}

/**
 * Validate a single token value format
 */
function validateTokenFormat(property: CSSCustomProperty): FormatError | null {
  const { name, value, line } = property;
  const expectedFormat = getExpectedFormat(name);

  // If no specific format is expected, it's valid
  if (!expectedFormat) {
    return null;
  }

  // CSS variable references are always valid
  if (isCSSVarReference(value)) {
    return null;
  }

  // Validate based on token type
  if (name.includes('-color-')) {
    if (!isValidHexColor(value) && !value.startsWith('rgba(') && !value.startsWith('rgb(')) {
      return { token: name, value, expectedFormat, line };
    }
  } else if (name.includes('-spacing-') || name.includes('-radius-') || name.includes('-font-size-')) {
    if (!isValidDimension(value)) {
      return { token: name, value, expectedFormat, line };
    }
  } else if (name.includes('-duration-')) {
    if (!isValidDuration(value)) {
      return { token: name, value, expectedFormat, line };
    }
  } else if (name.includes('-font-weight-')) {
    const weight = parseInt(value, 10);
    if (isNaN(weight) || weight < 100 || weight > 900) {
      return { token: name, value, expectedFormat, line };
    }
  } else if (name.includes('-z-index-')) {
    const zIndex = parseInt(value, 10);
    if (isNaN(zIndex)) {
      return { token: name, value, expectedFormat, line };
    }
  }
  // For other types (shadows, font-family, easing, line-height), we're lenient

  return null;
}

/**
 * Validate all token formats
 */
export function validateFormat(properties: CSSCustomProperty[]): FormatResult {
  const errors: FormatError[] = [];

  for (const property of properties) {
    const error = validateTokenFormat(property);
    if (error) {
      errors.push(error);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    totalChecked: properties.length,
  };
}
