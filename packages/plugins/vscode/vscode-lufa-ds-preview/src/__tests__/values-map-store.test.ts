import { existsSync, readFileSync, statSync } from 'node:fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createValuesMapStore } from '../values-map-store';
import type { WorkspaceFolder } from 'vscode';

const vscodeMocks = vi.hoisted(() => {
  const state = {
    workspaceFolders: [] as WorkspaceFolder[],
    configState: {
      objectConfig: undefined as unknown,
      flatConfig: {} as Record<string, unknown>,
    },
  };

  const getConfiguration = vi.fn((section?: string) => {
    if (section) {
      return {
        get: (key: string) => state.configState.flatConfig[key],
      };
    }

    return {
      get: (key: string) => (key === 'lufaDsPreview' ? state.configState.objectConfig : undefined),
    };
  });

  return {
    state,
    getConfiguration,
    createFileSystemWatcher: vi.fn(),
  };
});

vi.mock('vscode', () => ({
  workspace: {
    workspaceFolders: vscodeMocks.state.workspaceFolders,
    getConfiguration: vscodeMocks.getConfiguration,
    createFileSystemWatcher: vscodeMocks.createFileSystemWatcher,
  },
}));

vi.mock('node:fs', () => ({
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
  statSync: vi.fn(),
}));

const primitivesMap = {
  version: 1,
  generatedAt: '2026-01-04',
  css: {
    '--lufa-primitive-color-primary': 'rgb(255 0 0)',
  },
  paths: {
    'primitives.color.chromatic.red[500]': 'rgb(255 0 0)',
  },
};

const tokensMap = {
  version: 3,
  css: {
    '--lufa-token-color-secondary': 'rgb(0 255 0)',
  },
  paths: {
    'tokens.color.text.primary': 'rgb(0 0 255)',
  },
};

describe('createValuesMapStore', () => {
  beforeEach(() => {
    vi.mocked(existsSync).mockReset();
    vi.mocked(readFileSync).mockReset();
    vi.mocked(statSync).mockReset();
    vscodeMocks.getConfiguration.mockClear();

    vscodeMocks.state.workspaceFolders.length = 0;
    vscodeMocks.state.configState.objectConfig = undefined;
    vscodeMocks.state.configState.flatConfig = {};
  });

  it('should merge configured primitives and tokens maps', () => {
    const logOnce = vi.fn();
    const store = createValuesMapStore(logOnce);

    vscodeMocks.state.workspaceFolders.push({ uri: { fsPath: '/repo' } } as WorkspaceFolder);
    vscodeMocks.state.configState.flatConfig = {
      primitivesMapPath: 'primitives.json',
      tokensMapPath: 'tokens.json',
    };

    vi.mocked(existsSync).mockReturnValue(false);
    vi.mocked(statSync).mockImplementation((path) => ({
      mtimeMs: String(path).includes('primitives') ? 1 : 2,
    }) as ReturnType<typeof statSync>);
    vi.mocked(readFileSync).mockImplementation((path) => {
      if (String(path).includes('primitives')) {
        return JSON.stringify(primitivesMap);
      }
      return JSON.stringify(tokensMap);
    });

    store.setExtensionRootPath('/extension');

    const map = store.loadValuesMap();

    expect(map?.version).toBe(3);
    expect(map?.generatedAt).toBe('2026-01-04');
    expect(map?.css).toEqual({
      '--lufa-primitive-color-primary': 'rgb(255 0 0)',
      '--lufa-token-color-secondary': 'rgb(0 255 0)',
    });
    expect(map?.paths).toEqual({
      'primitives.color.chromatic.red[500]': 'rgb(255 0 0)',
      'tokens.color.text.primary': 'rgb(0 0 255)',
    });
  });

  it('should expose debug configuration', () => {
    const logOnce = vi.fn();
    const store = createValuesMapStore(logOnce);

    vscodeMocks.state.configState.objectConfig = {
      debug: true,
    };

    expect(store.isDebugEnabled()).toBe(true);
  });
});
