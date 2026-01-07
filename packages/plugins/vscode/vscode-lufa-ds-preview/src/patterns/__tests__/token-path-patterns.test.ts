import { describe, expect, it } from 'vitest';
import { createColorPathRe } from '../token-path-patterns';

describe('TS patterns', () => {
  it('should match primitives.color paths', () => {
    const colorPathRe = createColorPathRe();
    const text = 'const color = primitives.color.chromatic.red[500];';
    const matches = [...text.matchAll(colorPathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('primitives.color.chromatic.red[500]');
  });

  it('should match neutral primitives.color paths', () => {
    const colorPathRe = createColorPathRe();
    const text = 'const gray = primitives.color.neutral.neutral[900];';
    const matches = [...text.matchAll(colorPathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('primitives.color.neutral.neutral[900]');
  });

  it('should match neutral primitives.color black/white paths', () => {
    const colorPathRe = createColorPathRe();
    const text = 'const black = primitives.color.neutral.black;';
    const matches = [...text.matchAll(colorPathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('primitives.color.neutral.black');
  });

  it('should not match partial primitives.color expressions', () => {
    const colorPathRe = createColorPathRe();
    const text = 'myprimitives.color.chromatic.red[500]'; // No word boundary
    const matches = [...text.matchAll(colorPathRe)];

    expect(matches).toHaveLength(0);
  });

  it('should match multiple primitives.color paths in one line', () => {
    const colorPathRe = createColorPathRe();
    const text = 'colors: [primitives.color.chromatic.blue[400], primitives.color.neutral.gray[700]]';
    const matches = [...text.matchAll(colorPathRe)];

    expect(matches).toHaveLength(2);
    expect(matches[0][0]).toBe('primitives.color.chromatic.blue[400]');
    expect(matches[1][0]).toBe('primitives.color.neutral.gray[700]');
  });

  it('should match bracketed primitives.color paths', () => {
    const colorPathRe = createColorPathRe();
    const text = 'const color = primitives.color.neutral["blue-gray"][500];';
    const matches = [...text.matchAll(colorPathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('primitives.color.neutral["blue-gray"][500]');
  });

  it('should match tokens.color paths', () => {
    const colorPathRe = createColorPathRe();
    const text = 'const color = tokens.color.text.primary;';
    const matches = [...text.matchAll(colorPathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('tokens.color.text.primary');
  });

  it('should match bracketed tokens.color paths', () => {
    const colorPathRe = createColorPathRe();
    const text = 'const color = tokens.color["brand-primary"].default;';
    const matches = [...text.matchAll(colorPathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('tokens.color["brand-primary"].default');
  });
});
