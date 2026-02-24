/**
 * Generate WCAG Contrast Metadata for Color Tokens
 *
 * This script automatically calculates and adds wcagAALarge and wcagAAA metadata
 * to color tokens based on actual contrast ratios.
 *
 * Run this as a Style Dictionary preprocessor to enrich tokens before build.
 */

import { generateWCAGMetadata } from '../utils/wcag-contrast.js';

/**
 * Extract all solid color tokens from the token tree
 * (excludes alpha/transparent colors)
 * @param {object} tokens - Token dictionary
 * @returns {Array<{name: string, value: string, path: string[]}>}
 */
function extractSolidColors(tokens, path = []) {
  const colors = [];

  function traverse(obj, currentPath) {
    // Skip if obj is null/undefined or not an object
    if (!obj || typeof obj !== 'object') {
      return;
    }

    if (obj.$value !== undefined && obj.$type === 'color') {
      // Only include solid hex colors (not alpha/transparent)
      if (typeof obj.$value === 'string' && obj.$value.startsWith('#') && obj.$value.length === 7) {
        colors.push({
          name: currentPath.join('-'),
          value: obj.$value,
          path: currentPath,
          token: obj,
        });
      }
    } else {
      // Traverse deeper
      Object.entries(obj).forEach(([key, value]) => {
        if (value && typeof value === 'object' && !key.startsWith('$')) {
          traverse(value, [...currentPath, key]);
        }
      });
    }
  }

  traverse(tokens, path);
  return colors;
}

/**
 * Add WCAG metadata to color tokens
 * @param {object} tokens - Token dictionary (mutated in place)
 */
export function addWCAGMetadata(tokens) {
  // Ensure tokens exists
  if (!tokens) {
    console.warn('⚠️  No tokens found in dictionary');
    return tokens;
  }

  // Extract all solid colors
  const solidColors = extractSolidColors(tokens);

  console.log(`\n📊 Generating WCAG metadata for ${solidColors.length} solid color tokens...`);

  let enrichedCount = 0;

  // For each color, calculate which other colors meet WCAG requirements
  solidColors.forEach(({ value, token, name, path }) => {
    // Generate WCAG metadata
    const wcagData = generateWCAGMetadata(value, solidColors);

    // Only add metadata if there are compliant colors
    if (wcagData.wcagAALarge.length > 0 || wcagData.wcagAAA.length > 0) {
      // Ensure $extensions.lufa exists
      if (!token.$extensions) {
        token.$extensions = {};
      }
      if (!token.$extensions.lufa) {
        token.$extensions.lufa = {};
      }

      // Add WCAG metadata
      token.$extensions.lufa.wcagAALarge = wcagData.wcagAALarge;
      token.$extensions.lufa.wcagAAA = wcagData.wcagAAA;

      enrichedCount++;
    }
  });

  console.log(`✅ Added WCAG metadata to ${enrichedCount} color tokens`);
  console.log(`   - ${solidColors.length - enrichedCount} colors have no compliant pairs\n`);

  return tokens;
}

/**
 * Style Dictionary preprocessor (v5 format)
 * This function is called by Style Dictionary before building
 *
 * In SD v5, the preprocessor receives the dictionary object itself (not dictionary.tokens)
 */
export default {
  name: 'add-wcag-metadata',
  preprocessor: (dictionary) => {
    // In SD v5, dictionary IS the tokens object
    addWCAGMetadata(dictionary);
    return dictionary;
  },
};
