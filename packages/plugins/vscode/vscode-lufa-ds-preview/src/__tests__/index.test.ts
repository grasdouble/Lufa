import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { activate, deactivate } from '../index';
import type { ExtensionContext } from 'vscode';

const vscodeMocks = vi.hoisted(() => {
  let outputChannel: { appendLine: ReturnType<typeof vi.fn>; dispose: ReturnType<typeof vi.fn> } | null = null;

  const createOutputChannel = vi.fn(() => {
    outputChannel = {
      appendLine: vi.fn(),
      dispose: vi.fn(),
    };

    return outputChannel;
  });

  const registerColorProvider = vi.fn(() => ({ dispose: vi.fn() }));
  const registerHoverProvider = vi.fn(() => ({ dispose: vi.fn() }));
  const onDidChangeConfiguration = vi.fn(() => ({ dispose: vi.fn() }));
  const createFileSystemWatcher = vi.fn(() => ({
    onDidChange: vi.fn(),
    onDidCreate: vi.fn(),
    onDidDelete: vi.fn(),
    dispose: vi.fn(),
  }));
  const getConfiguration = vi.fn(() => ({
    get: () => undefined,
  }));

  const reset = () => {
    createOutputChannel.mockClear();
    registerColorProvider.mockClear();
    registerHoverProvider.mockClear();
    onDidChangeConfiguration.mockClear();
    createFileSystemWatcher.mockClear();
    getConfiguration.mockClear();
    outputChannel = null;
  };

  return {
    createOutputChannel,
    registerColorProvider,
    registerHoverProvider,
    onDidChangeConfiguration,
    createFileSystemWatcher,
    getConfiguration,
    getOutputChannel: () => outputChannel,
    reset,
  };
});

vi.mock('vscode', () => ({
  workspace: {
    workspaceFolders: [],
    getConfiguration: vscodeMocks.getConfiguration,
    createFileSystemWatcher: vscodeMocks.createFileSystemWatcher,
    onDidChangeConfiguration: vscodeMocks.onDidChangeConfiguration,
  },
  window: {
    createOutputChannel: vscodeMocks.createOutputChannel,
  },
  languages: {
    registerColorProvider: vscodeMocks.registerColorProvider,
    registerHoverProvider: vscodeMocks.registerHoverProvider,
  },
  MarkdownString: class {
    appendMarkdown() {}
  },
  Hover: class {
    constructor() {}
  },
  Color: class {
    constructor() {}
  },
  Range: class {
    constructor() {}
  },
  ColorInformation: class {
    constructor() {}
  },
}));

const createContext = (): ExtensionContext => {
  return {
    subscriptions: [],
    extensionPath: '/__missing__',
  } as ExtensionContext;
};

describe('extension activation', () => {
  beforeEach(() => {
    vscodeMocks.reset();
  });

  afterEach(() => {
    deactivate();
  });

  it('should register color and hover providers with expected selectors', () => {
    const context = createContext();

    activate(context);

    expect(vscodeMocks.createOutputChannel).toHaveBeenCalledWith('Lufa DS Preview');
    expect(vscodeMocks.registerColorProvider).toHaveBeenCalledTimes(1);
    expect(vscodeMocks.registerHoverProvider).toHaveBeenCalledTimes(1);

    const expectedSelector = [
      { scheme: 'file', language: 'css' },
      { scheme: 'file', language: 'scss' },
      { scheme: 'file', language: 'postcss' },
      { scheme: 'file', language: 'tailwindcss' },
      { scheme: 'file', language: 'typescript' },
      { scheme: 'file', language: 'typescriptreact' },
    ];

    const [colorSelector, colorProvider] = vscodeMocks.registerColorProvider.mock.calls[0];
    const [hoverSelector, hoverProvider] = vscodeMocks.registerHoverProvider.mock.calls[0];

    expect(colorSelector).toEqual(expectedSelector);
    expect(hoverSelector).toEqual(expectedSelector);
    expect(typeof colorProvider.provideDocumentColors).toBe('function');
    expect(typeof hoverProvider.provideHover).toBe('function');
    expect(context.subscriptions.length).toBe(4);
  });

  it('should dispose the output channel on deactivate', () => {
    const context = createContext();

    activate(context);

    const outputChannel = vscodeMocks.getOutputChannel();
    expect(outputChannel).not.toBeNull();

    deactivate();

    expect(outputChannel?.dispose).toHaveBeenCalledTimes(1);
  });
});
