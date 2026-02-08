import { describe, expect, it } from 'vitest';

import { mergePreviewConfig, parseFlatConfig, parseObjectConfig } from '../preview-config';

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
      tokensMapPath: 'tokens.json',
      debug: true,
    };

    expect(parseObjectConfig(raw)).toEqual({
      tokensMapPath: 'tokens.json',
      debug: true,
    });
  });

  it('should ignore invalid object config values', () => {
    const raw = {
      tokensMapPath: false,
      debug: 'yes',
    };

    expect(parseObjectConfig(raw)).toEqual({
      tokensMapPath: undefined,
      debug: undefined,
    });
  });
});

describe('parseFlatConfig', () => {
  it('should read values from flat config', () => {
    const flatConfig = createFlatConfig({
      tokensMapPath: 'tokens.json',
      debug: false,
    });

    expect(parseFlatConfig(flatConfig)).toEqual({
      tokensMapPath: 'tokens.json',
      debug: false,
    });
  });
});

describe('mergePreviewConfig', () => {
  it('should prefer object config values when present', () => {
    const merged = mergePreviewConfig(
      { tokensMapPath: 'object.json', debug: true },
      { tokensMapPath: 'flat-tokens.json', debug: false }
    );

    expect(merged).toEqual({
      tokensMapPath: 'object.json',
      debug: true,
    });
  });
});
