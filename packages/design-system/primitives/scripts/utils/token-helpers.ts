/**
 * Shared utilities for token generation scripts
 */

export interface Token {
  name: string;
  value: string | number;
  path: string[];
}

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

type NaturalPart = string | number;

const splitForNaturalSort = (value: string): NaturalPart[] => {
  return value
    .split(/(\d+)/)
    .filter(Boolean)
    .map((part) => (/^\d+$/.test(part) ? Number(part) : part));
};

export const naturalCompare = (left: string, right: string): number => {
  if (left === right) return 0;
  const leftParts = splitForNaturalSort(left);
  const rightParts = splitForNaturalSort(right);
  const length = Math.min(leftParts.length, rightParts.length);

  for (let index = 0; index < length; index += 1) {
    const leftPart = leftParts[index];
    const rightPart = rightParts[index];
    if (leftPart === rightPart) continue;
    if (typeof leftPart === 'number' && typeof rightPart === 'number') {
      return leftPart - rightPart;
    }
    return String(leftPart).localeCompare(String(rightPart));
  }

  return leftParts.length - rightParts.length;
};

export const sortByNaturalKey = <T>(items: T[], getKey: (item: T) => string): T[] => {
  return items
    .map((item, index) => ({ item, index }))
    .sort((left, right) => {
      const order = naturalCompare(getKey(left.item), getKey(right.item));
      if (order !== 0) return order;
      return left.index - right.index;
    })
    .map(({ item }) => item);
};

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
 * Convert path segments to kebab-case string
 * Example: ['color', 'red', '500'] -> '-color-red-500'
 */
export const toKebabPath = (segments: string[]): string => {
  return segments
    .map((segment, index) => {
      if (index === 0) return '';
      return toKebab(segment);
    })
    .join('-');
};

/**
 * Recursively traverse an object and extract all tokens with their paths
 */
export const extractTokens = (object: Record<string, unknown>, path: string[] = [], tokens: Token[] = []): Token[] => {
  for (const [key, value] of Object.entries(object)) {
    const nextPath = [...path, key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      extractTokens(value as Record<string, unknown>, nextPath, tokens);
    } else {
      tokens.push({
        name: nextPath.map(toKebab).join('-'),
        value: value as string | number,
        path: nextPath,
      });
    }
  }

  return tokens;
};

/**
 * Recursively flatten object paths into a flat key-value map
 */
export const flattenPaths = (
  obj: Record<string, unknown>,
  segments: string[],
  pathFormatter: (segments: string[]) => string,
  result: Record<string, string> = {}
): Record<string, string> => {
  if (typeof obj === 'string' || typeof obj === 'number') {
    result[pathFormatter(segments)] = String(obj);
    return result;
  }

  if (!obj || typeof obj !== 'object') return result;

  for (const [key, value] of Object.entries(obj)) {
    flattenPaths(value as Record<string, unknown>, [...segments, key], pathFormatter, result);
  }

  return result;
};
