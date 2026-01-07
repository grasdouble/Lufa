/**
 * Utilities for resolving token values from maps and handling path variants.
 */
import type { TokenMap } from './map-utils';

/**
 * Add single-quote/double-quote path variants to a candidate set.
 */
const addQuoteVariants = (value: string, candidates: Set<string>): void => {
  if (value.includes('["')) {
    candidates.add(value.replace(/\["([^"]+)"\]/g, "['$1']"));
  }
  if (value.includes("['")) {
    candidates.add(value.replace(/\['([^']+)'\]/g, '["$1"]'));
  }
};

/**
 * Expand a token path into all viable lookup key variants.
 */
const getPathCandidates = (path: string): string[] => {
  const candidates = new Set<string>();

  const addCandidate = (value: string): void => {
    candidates.add(value);
    addQuoteVariants(value, candidates);
  };

  addCandidate(path);

  return [...candidates];
};

/**
 * Find the first matching value for a list of candidate keys.
 */
const lookupValue = (map: Record<string, string> | undefined, keys: string[]): string | null => {
  if (!map) return null;
  for (const key of keys) {
    const value = map[key];
    if (value) return value;
  }
  return null;
};

/**
 * Resolve a token or CSS variable from the provided values map.
 */
const resolveTokenValueFromMap = (tokenText: string, valuesMap: TokenMap | null): string | null => {
  if (!valuesMap) return null;

  if (tokenText.startsWith('--lufa-')) {
    return lookupValue(valuesMap.css, [tokenText]) ?? null;
  }

  const candidates = getPathCandidates(tokenText);
  return lookupValue(valuesMap.paths, candidates) ?? null;
};

export { getPathCandidates, lookupValue, resolveTokenValueFromMap };
