/**
 * Completeness Validator
 *
 * Validates that all required tokens are defined in the theme
 */

import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import type { CSSCustomProperty } from '../utils/parse-css.js';

export type CompletenessResult = {
  valid: boolean;
  totalRequired: number;
  totalDefined: number;
  missingTokens: string[];
  extraTokens: string[];
};

/**
 * Get list of all required token names from the design system
 *
 * These are the 438 tokens that MUST be defined in any custom theme
 */
export async function getRequiredTokens(): Promise<string[]> {
  // Read the tokens metadata JSON file from the tokens package
  // This contains all 438 tokens in the design system
  try {
    // Resolve path to tokens-metadata.json in the tokens package
    // When running from CLI, node_modules will be in parent directories
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Try to resolve from node_modules
    const metadataPath = join(__dirname, '../../../tokens/dist/tokens-metadata.json');

    const metadataContent = await readFile(metadataPath, 'utf-8');
    const tokensMetadata = JSON.parse(metadataContent) as Record<string, unknown>;

    return extractTokenNamesFromMetadata(tokensMetadata);
  } catch (error) {
    throw new Error(
      'Failed to load required tokens from @grasdouble/lufa_design-system-tokens. ' +
        'Make sure the package is installed and built. ' +
        `Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Convert camelCase to kebab-case
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Extract all token names from metadata JSON
 */
function extractTokenNamesFromMetadata(metadata: Record<string, unknown>, prefix = ''): string[] {
  const names: string[] = [];

  for (const [key, value] of Object.entries(metadata)) {
    // Convert camelCase keys to kebab-case for CSS custom properties
    const kebabKey = camelToKebab(key);
    const currentPath = prefix ? `${prefix}-${kebabKey}` : kebabKey;

    if (value && typeof value === 'object') {
      // Check if this is a token (has 'value' property)
      if ('value' in value) {
        names.push(`--lufa-${currentPath}`);
      } else {
        // Recurse into nested objects
        names.push(...extractTokenNamesFromMetadata(value as Record<string, unknown>, currentPath));
      }
    }
  }

  return names;
}

/**
 * Validate that all required tokens are defined
 */
export async function validateCompleteness(properties: CSSCustomProperty[]): Promise<CompletenessResult> {
  const requiredTokens = await getRequiredTokens();
  const definedTokens = new Set(properties.map((p) => p.name));

  // Find missing tokens (required but not defined)
  const missingTokens = requiredTokens.filter((token) => !definedTokens.has(token));

  // Find extra tokens (defined but not required)
  // These are not errors, just informational
  const extraTokens = properties.map((p) => p.name).filter((token) => !requiredTokens.includes(token));

  const valid = missingTokens.length === 0;

  return {
    valid,
    totalRequired: requiredTokens.length,
    totalDefined: properties.length,
    missingTokens,
    extraTokens,
  };
}
