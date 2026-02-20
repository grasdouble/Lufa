import { describe, expect, it } from 'vitest';

import { createCssColorVarDirectRe, createCssColorVarInVarRe, createOklchColorRe } from '../css-var-patterns';

describe('CSS patterns', () => {
  it('should match color CSS var() usage', () => {
    const cssVarInVarRe = createCssColorVarInVarRe();
    const text = 'color: var(--lufa-core-color-brand-500);';
    const matches = [...text.matchAll(cssVarInVarRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][1]).toBe('--lufa-core-color-brand-500');
  });

  it('should match color CSS variable declarations', () => {
    const cssVarDirectRe = createCssColorVarDirectRe();
    const text = '--lufa-primitive-color-neutral-neutral-900: oklch(20% 0.1 180);';
    const matches = [...text.matchAll(cssVarDirectRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][1]).toBe('--lufa-primitive-color-neutral-neutral-900');
  });

  it('should not match non-color CSS vars with color regex', () => {
    const cssVarInVarRe = createCssColorVarInVarRe();
    const text = 'border-radius: var(--lufa-semantic-ui-border-radius-sm);';
    const matches = [...text.matchAll(cssVarInVarRe)];

    expect(matches).toHaveLength(0);
  });

  it('should match oklch() color values', () => {
    const oklchRe = createOklchColorRe();
    const text = 'box-shadow: 0 0 0 2px oklch(70% 0.1 200 / 0.5);';
    const matches = [...text.matchAll(oklchRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('oklch(70% 0.1 200 / 0.5)');
  });
});
