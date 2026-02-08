import { describe, expect, it } from 'vitest';

import { createColorPathRe } from '../token-path-patterns';

describe('TS patterns', () => {
  it('should match primitive.color paths', () => {
    const colorPathRe = createColorPathRe();
    const text = 'const color = primitive.color.red.500;';
    const matches = [...text.matchAll(colorPathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('primitive.color.red.500');
  });

  it('should match primitive.color.gray paths', () => {
    const colorPathRe = createColorPathRe();
    const text = 'const gray = primitive.color.gray.900;';
    const matches = [...text.matchAll(colorPathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('primitive.color.gray.900');
  });

  it('should not match partial primitive.color expressions', () => {
    const colorPathRe = createColorPathRe();
    const text = 'myprimitive.color.red.500'; // No word boundary
    const matches = [...text.matchAll(colorPathRe)];

    expect(matches).toHaveLength(0);
  });

  it('should match multiple primitive.color paths in one line', () => {
    const colorPathRe = createColorPathRe();
    const text = 'colors: [primitive.color.blue.400, primitive.color.gray.700]';
    const matches = [...text.matchAll(colorPathRe)];

    expect(matches).toHaveLength(2);
    expect(matches[0][0]).toBe('primitive.color.blue.400');
    expect(matches[1][0]).toBe('primitive.color.gray.700');
  });

  it('should match bracketed primitive.color paths', () => {
    const colorPathRe = createColorPathRe();
    const text = 'const color = primitive.color["blue-gray"].500;';
    const matches = [...text.matchAll(colorPathRe)];

    expect(matches).toHaveLength(1);
    expect(matches[0][0]).toBe('primitive.color["blue-gray"].500');
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
