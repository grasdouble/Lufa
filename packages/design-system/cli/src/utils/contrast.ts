/**
 * Contrast — Color Pair Provider
 *
 * Builds the list of (foreground, background, type) color pairs that must be
 * checked for WCAG AA contrast.  Pairs are derived from two sources, in
 * priority order:
 *
 * 1. Explicit metadata: tokens carrying `extensions.lufa.contrastWith` (array
 *    of dot-notation token paths) and `extensions.lufa.contrastType`
 *    ("text" | "ui").  Set directly in the token source files for
 *    cross-namespace pairs and multi-background checks that cannot be inferred
 *    automatically.
 *
 * 2. Dynamic inference: sibling-based algorithm that tries to find a
 *    `-background` sibling for any `-text` or `-border` token in the same
 *    namespace.  This handles the majority of same-namespace pairs
 *    (e.g. badge.variant.*.text → badge.variant.*.background).
 *
 * There are no hardcoded EXPLICIT_PAIRS — all contrast knowledge lives in the
 * token metadata.
 *
 * NOTE: This module only *provides* pairs.  Actual WCAG validation is
 * performed by `a11y.ts`.
 */

import { readFile } from 'fs/promises';

type ColorPair = [string, string, 'text' | 'ui'];

/**
 * Convert camelCase to kebab-case
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convert a dot-notation token path (as used in sources / metadata keys) to a CSS var suffix.
 * e.g. "semantic.ui.background.page" → "semantic-ui-background-page"
 * Each segment is individually converted from camelCase to kebab-case, then joined with "-".
 */
function dotPathToCssSuffix(dotPath: string): string {
  return dotPath.split('.').map(camelToKebab).join('-');
}

type TokenMetadata = {
  value: unknown;
  type: string;
  extensions?: {
    lufa?: {
      contrastWith?: string[];
      contrastType?: 'text' | 'ui';
    };
  };
};

/**
 * Recursively walk the metadata and collect:
 * - All color token paths (for the sibling-fallback algorithm)
 * - All explicit (contrastWith) pairs from metadata annotations
 */
function extractFromMetadata(
  obj: Record<string, unknown>,
  prefix = ''
): { colorPaths: string[]; explicitPairs: ColorPair[] } {
  const colorPaths: string[] = [];
  const explicitPairs: ColorPair[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const kebabKey = camelToKebab(key);
    const currentPath = prefix ? `${prefix}-${kebabKey}` : kebabKey;

    if (value && typeof value === 'object') {
      const token = value as TokenMetadata;
      if ('value' in token && token.type === 'color') {
        colorPaths.push(currentPath);

        // Check for explicit contrastWith annotation
        const lufaExt = token.extensions?.lufa;
        if (lufaExt?.contrastWith && Array.isArray(lufaExt.contrastWith)) {
          const contrastType = lufaExt.contrastType ?? 'text';
          for (const bgDotPath of lufaExt.contrastWith) {
            const bgSuffix = dotPathToCssSuffix(bgDotPath);
            explicitPairs.push([currentPath, bgSuffix, contrastType]);
          }
        }
      } else if (!('value' in token)) {
        const nested = extractFromMetadata(value as Record<string, unknown>, currentPath);
        colorPaths.push(...nested.colorPaths);
        explicitPairs.push(...nested.explicitPairs);
      }
    }
  }

  return { colorPaths, explicitPairs };
}

/**
 * Determine if a token path suffix indicates it should be checked as a
 * foreground (text or border) and what background it pairs with.
 *
 * Rules:
 * - Tokens ending in -text* (excluding -placeholder, -label, -helper-*): type 'text'
 * - Tokens containing -border- or ending in -border (excluding -color suffix): type 'ui'
 * - Skip: -disabled (WCAG exempt), overlay/backdrop/scrim/focus-ring/focus-outline (not foreground)
 * - Skip: primitive and core namespaces
 * - Background pairing: replace -text or -border segment with -background in the same path
 *   If no such sibling exists → skip (handled by contrastWith annotations for cross-namespace cases)
 */
function deriveSiblingPairs(colorTokenPaths: string[], explicitPairKeys: Set<string>): ColorPair[] {
  const tokenSet = new Set(colorTokenPaths);
  const pairs: ColorPair[] = [];

  // Tokens to skip (not contrast foregrounds)
  const SKIP_PATTERNS = [
    'primitive',
    'core',
    '-disabled',
    'overlay',
    'backdrop',
    'scrim',
    'focus-ring',
    'focus-background',
    'focus-outline',
    '-placeholder',
    '-label',
    'helper-text',
    'divider',
    'close-button',
    'shared-',
    '-backdrop',
    '-modal-backdrop',
    'modal-close',
  ];

  for (const tokenPath of colorTokenPaths) {
    if (SKIP_PATTERNS.some((p) => tokenPath.includes(p))) continue;

    let type: 'text' | 'ui' | null = null;

    // Determine if it's a text foreground
    if (
      tokenPath.includes('-text') &&
      !tokenPath.includes('-placeholder') &&
      !tokenPath.includes('-label') &&
      !tokenPath.includes('helper-text')
    ) {
      type = 'text';
    }
    // Determine if it's a border foreground
    else if (tokenPath.includes('-border') && !tokenPath.endsWith('-color')) {
      type = 'ui';
    }

    if (!type) continue;

    // Try to find a sibling background by replacing -text or -border with -background
    // e.g. "component-badge-variant-default-text" → "component-badge-variant-default-background"
    // e.g. "component-input-border-default" → "component-input-background-default"
    const bgCandidate = tokenPath
      .replace(/(.*)-text(-|$)/, '$1-background$2')
      .replace(/(.*)-border(-|$)/, '$1-background$2');

    if (bgCandidate !== tokenPath && tokenSet.has(bgCandidate)) {
      const pairKey = `${tokenPath}|${bgCandidate}`;
      // Only add if this pair isn't already covered by an explicit contrastWith annotation
      if (!explicitPairKeys.has(pairKey)) {
        pairs.push([tokenPath, bgCandidate, type]);
      }
    }
    // If no sibling background found → skip; cross-namespace cases are handled by contrastWith
  }

  return pairs;
}

/**
 * Build the final list of color pairs to check:
 * 1. Explicit pairs from contrastWith annotations (come first)
 * 2. Sibling-inferred pairs (fallback for tokens without contrastWith)
 * Deduplication is handled by tracking seen (fg|bg) keys.
 */
function buildColorPairs(explicitPairs: ColorPair[], siblingPairs: ColorPair[]): ColorPair[] {
  const seen = new Set<string>();
  const result: ColorPair[] = [];

  for (const pair of [...explicitPairs, ...siblingPairs]) {
    const key = `${pair[0]}|${pair[1]}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(pair);
    }
  }

  return result;
}

/**
 * Load color pairs to check by reading the design system token metadata.
 * Pairs are fully derived from metadata — no hardcoded lists.
 */
export async function getColorPairsToCheck(): Promise<ColorPair[]> {
  try {
    const metadataPath = new URL(import.meta.resolve('@grasdouble/lufa_design-system-tokens/metadata'));
    const metadataContent = await readFile(metadataPath, 'utf-8');
    const tokensMetadata = JSON.parse(metadataContent) as Record<string, unknown>;

    const { colorPaths, explicitPairs } = extractFromMetadata(tokensMetadata);

    // Build a set of explicit pair keys so sibling algo can skip already-covered pairs
    const explicitPairKeys = new Set(explicitPairs.map(([fg, bg]) => `${fg}|${bg}`));
    const siblingPairs = deriveSiblingPairs(colorPaths, explicitPairKeys);

    return buildColorPairs(explicitPairs, siblingPairs);
  } catch (error) {
    throw new Error(
      'Failed to load token metadata from @grasdouble/lufa_design-system-tokens. ' +
        'Make sure the package is installed and built.',
      { cause: error }
    );
  }
}
