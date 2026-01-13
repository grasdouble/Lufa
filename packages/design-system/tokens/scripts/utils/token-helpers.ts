/**
 * Shared utilities for token generation scripts
 */

export interface TokenEntry {
  name: string;
  value: string | number;
}

const TOKEN_CSS_PREFIX = '--lufa-token-';

/**
 * Check if a string represents a numeric key
 */
export const isNumericKey = (key: string): boolean => /^[0-9]+$/.test(key);

/**
 * Convert camelCase or PascalCase to kebab-case
 * Handles numeric keys properly
 */
export const toKebab = (segment: string | number): string =>
  String(segment)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();

/**
 * Convert path segments to dot notation path with bracket notation for numeric keys
 * Example: ['color', 'red', '500'] -> 'color.red[500]'
 */
export const toPath = (segments: string[]): string => {
  return segments.reduce((acc, segment, index) => {
    if (index === 0) return segment;
    if (isNumericKey(segment)) return `${acc}[${segment}]`;
    return `${acc}.${segment}`;
  }, '');
};

/**
 * Process tokens object and return entries in their original order
 */
export const processTokens = (obj: Record<string, unknown>): [string, unknown][] => {
  return Object.entries(obj);
};

/**
 * Process nested object (like grid or colors) and return formatted entries
 */
export const processNestedTokens = (obj: Record<string, Record<string, unknown>>, prefix: string): TokenEntry[] => {
  const entries: TokenEntry[] = [];
  for (const [category, values] of Object.entries(obj)) {
    const categoryEntries = processTokens(values);
    for (const [key, value] of categoryEntries) {
      entries.push({
        name: `${prefix}-${toKebab(category)}-${toKebab(key)}`,
        value: value as string | number,
      });
    }
  }
  return entries;
};

/**
 * Recursively flatten object paths into a flat key-value map
 */
export const flattenPaths = (obj: Record<string, unknown>, segments: string[], out: Record<string, string>): void => {
  if (typeof obj === 'string' || typeof obj === 'number') {
    out[toPath(segments)] = String(obj);
    return;
  }

  if (!obj || typeof obj !== 'object') return;

  for (const [key, value] of Object.entries(obj)) {
    flattenPaths(value as Record<string, unknown>, [...segments, key], out);
  }
};

/**
 * Generate CSS section with proper formatting
 */
export const generateSection = (title: string, entries: TokenEntry[]): string => {
  let css = `\n  /* ${title} */\n`;
  for (const { name, value } of entries) {
    css += `  ${TOKEN_CSS_PREFIX}${name}: ${value};\n`;
  }
  return css;
};
