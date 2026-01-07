import { describe, expect, it } from 'vitest';
import { mergePreviewConfig, parseFlatConfig, parseObjectConfig } from '../config-utils';

const createFlatConfig = (values: Record<string, unknown>) => {
  return {
    get<T>(key: string): T | undefined {
      return values[key] as T | undefined;
    },
  };
};

describe('parseObjectConfig', () => {
  it('should return empty config for invalid input', () => {
    expect(parseObjectConfig(null)).toEqual({});
    expect(parseObjectConfig('string')).toEqual({});
  });

  it('should parse valid object config values', () => {
    const raw = {
      primitivesMapPath: 'primitives.json',
      tokensMapPath: 'tokens.json',
      debug: true,
    };

    expect(parseObjectConfig(raw)).toEqual({
      primitivesMapPath: 'primitives.json',
      tokensMapPath: 'tokens.json',
      debug: true,
    });
  });

  it('should ignore invalid object config values', () => {
    const raw = {
      primitivesMapPath: 123,
      tokensMapPath: false,
      debug: 'yes',
    };

    expect(parseObjectConfig(raw)).toEqual({
      primitivesMapPath: undefined,
      tokensMapPath: undefined,
      debug: undefined,
    });
  });
});

describe('parseFlatConfig', () => {
  it('should read values from flat config', () => {
    const flatConfig = createFlatConfig({
      primitivesMapPath: 'primitives.json',
      tokensMapPath: 'tokens.json',
      debug: false,
    });

    expect(parseFlatConfig(flatConfig)).toEqual({
      primitivesMapPath: 'primitives.json',
      tokensMapPath: 'tokens.json',
      debug: false,
    });
  });
});

describe('mergePreviewConfig', () => {
  it('should prefer object config values when present', () => {
    const merged = mergePreviewConfig(
      { primitivesMapPath: 'object.json', debug: true },
      { primitivesMapPath: 'flat.json', tokensMapPath: 'flat-tokens.json', debug: false }
    );

    expect(merged).toEqual({
      primitivesMapPath: 'object.json',
      tokensMapPath: 'flat-tokens.json',
      debug: true,
    });
  });
});
