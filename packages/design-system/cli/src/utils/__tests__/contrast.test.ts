import { describe, expect, it } from 'vitest';

import { getColorPairsToCheck } from '../contrast.js';

describe('getColorPairsToCheck', () => {
  it('returns a non-empty array of color pairs', async () => {
    const pairs = await getColorPairsToCheck();
    expect(Array.isArray(pairs)).toBe(true);
    expect(pairs.length).toBeGreaterThan(40);
  });

  it('every pair is a [string, string, "text" | "ui"] triplet', async () => {
    const pairs = await getColorPairsToCheck();
    for (const pair of pairs) {
      expect(pair).toHaveLength(3);
      expect(typeof pair[0]).toBe('string');
      expect(typeof pair[1]).toBe('string');
      expect(['text', 'ui']).toContain(pair[2]);
    }
  });

  it('pair paths use kebab-case CSS var suffixes (no dots, no camelCase segments)', async () => {
    const pairs = await getColorPairsToCheck();
    for (const [fg, bg] of pairs) {
      expect(fg).not.toContain('.');
      expect(bg).not.toContain('.');
      // Should not contain uppercase letters
      expect(fg).toBe(fg.toLowerCase());
      expect(bg).toBe(bg.toLowerCase());
    }
  });

  it('produces no duplicate (fg|bg) pairs', async () => {
    const pairs = await getColorPairsToCheck();
    const keys = pairs.map(([fg, bg]) => `${fg}|${bg}`);
    const uniqueKeys = new Set(keys);
    expect(keys.length).toBe(uniqueKeys.size);
  });

  it('includes at least one explicit contrastWith pair (cross-namespace)', async () => {
    const pairs = await getColorPairsToCheck();
    // Explicit cross-namespace pairs link semantic/component tokens to
    // semantic-ui-background-page or similar backgrounds that differ from the
    // foreground's own namespace.
    const hasExplicit = pairs.some(([fg, bg]) => {
      // A cross-namespace pair: fg is in component/semantic namespace, bg is in semantic-ui
      return fg.startsWith('component-') && bg.includes('background');
    });
    expect(hasExplicit).toBe(true);
  });

  it('includes sibling-inferred pairs (same namespace -text → -background)', async () => {
    const pairs = await getColorPairsToCheck();
    // Sibling pairs: badge.variant.*.text → badge.variant.*.background
    const hasSibling = pairs.some(
      ([fg, bg]) =>
        fg.includes('-text') && bg.includes('-background') && fg.replace(/-text(-|$)/, '-background$1') === bg
    );
    expect(hasSibling).toBe(true);
  });

  it('does not include primitive or core namespace tokens as foreground', async () => {
    const pairs = await getColorPairsToCheck();
    for (const [fg] of pairs) {
      expect(fg.startsWith('primitive')).toBe(false);
      expect(fg.startsWith('core')).toBe(false);
    }
  });

  it('does not include disabled tokens', async () => {
    const pairs = await getColorPairsToCheck();
    for (const [fg, bg] of pairs) {
      expect(fg).not.toContain('-disabled');
      expect(bg).not.toContain('-disabled');
    }
  });

  it('returns the same result on repeated calls (deterministic)', async () => {
    const pairs1 = await getColorPairsToCheck();
    const pairs2 = await getColorPairsToCheck();
    expect(pairs1).toEqual(pairs2);
  });
});
