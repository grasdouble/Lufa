import { describe, expect, it } from 'vitest';
import {
  createCssVarDirectRe,
  createCssVarInVarRe,
  createPrimitivePathRe,
  createTokenPathRe,
} from '../patterns';

describe('Regex Patterns', () => {
  it('should match CSS var() usage', () => {
    const cssVarInVarRe = createCssVarInVarRe();
    const text = 'color: var(--lufa-color-text-primary);';
    const matches = [...text.matchAll(cssVarInVarRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][1]).toBe('--lufa-color-text-primary');
  });

  it('should match CSS var() with fallback', () => {
    const cssVarInVarRe = createCssVarInVarRe();
    const text = 'color: var(--lufa-color-text-primary, #000);';
    const matches = [...text.matchAll(cssVarInVarRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][1]).toBe('--lufa-color-text-primary');
  });

  it('should match CSS variable declarations', () => {
    const cssVarDirectRe = createCssVarDirectRe();
    const text = '--lufa-color-background: oklch(20% 0.1 180);';
    const matches = [...text.matchAll(cssVarDirectRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][1]).toBe('--lufa-color-background');
  });

  it('should match primitives.color paths', () => {
    const primitivePathRe = createPrimitivePathRe();
    const text = 'const color = primitives.color.chromatic.red[500];';
    const matches = [...text.matchAll(primitivePathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('primitives.color.chromatic.red[500]');
  });

  it('should match neutral primitives.color paths', () => {
    const primitivePathRe = createPrimitivePathRe();
    const text = 'const gray = primitives.color.neutral.neutral[900];';
    const matches = [...text.matchAll(primitivePathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('primitives.color.neutral.neutral[900]');
  });

  it('should not match partial primitives.color expressions', () => {
    const primitivePathRe = createPrimitivePathRe();
    const text = 'myprimitives.color.chromatic.red[500]'; // No word boundary
    const matches = [...text.matchAll(primitivePathRe)];

    expect(matches).toHaveLength(0);
  });

  it('should match multiple primitives.color paths in one line', () => {
    const primitivePathRe = createPrimitivePathRe();
    const text = 'colors: [primitives.color.chromatic.blue[400], primitives.color.neutral.gray[700]]';
    const matches = [...text.matchAll(primitivePathRe)];

    expect(matches).toHaveLength(2);
    expect(matches[0][0]).toBe('primitives.color.chromatic.blue[400]');
    expect(matches[1][0]).toBe('primitives.color.neutral.gray[700]');
  });

  it('should match tokens.color paths', () => {
    const tokenPathRe = createTokenPathRe();
    const text = 'const color = tokens.color.text.primary;';
    const matches = [...text.matchAll(tokenPathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('tokens.color.text.primary');
  });

  it('should match primitive CSS var() usage', () => {
    const cssVarInVarRe = createCssVarInVarRe();
    const text = 'color: var(--lufa-primitive-neutral-900);';
    const matches = [...text.matchAll(cssVarInVarRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][1]).toBe('--lufa-primitive-neutral-900');
  });

  it('should match primitive CSS variable declarations', () => {
    const cssVarDirectRe = createCssVarDirectRe();
    const text = '--lufa-primitive-neutral-900: oklch(20% 0.1 180);';
    const matches = [...text.matchAll(cssVarDirectRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][1]).toBe('--lufa-primitive-neutral-900');
  });
});
