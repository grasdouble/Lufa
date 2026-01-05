import { readFileSync, statSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';
import { converter } from 'culori';
import * as vscode from 'vscode';

import bundledPrimitivesMap from './default-primitives-colors.map.json';
import bundledTokensMap from './default-tokens-colors.map.json';

type PrimitivesColorMap = {
  version: number;
  generatedAt?: string;
  css: Record<string, string>;
  paths: Record<string, string>;
};

type TokensColorMap = {
  version: number;
  generatedAt?: string;
  css: Record<string, string>;
  paths: Record<string, string>;
};

type ColorMap = {
  version: number;
  generatedAt?: string;
  css: Record<string, string>;
  paths: Record<string, string>;
};

const isValidPrimitivesMap = (data: unknown): data is PrimitivesColorMap => {
  if (typeof data !== 'object' || data === null) return false;
  const map = data as Record<string, unknown>;
  return (
    typeof map.version === 'number' &&
    (map.generatedAt === undefined || typeof map.generatedAt === 'string') &&
    typeof map.css === 'object' &&
    map.css !== null &&
    typeof map.paths === 'object' &&
    map.paths !== null
  );
};

const isValidTokensMap = (data: unknown): data is TokensColorMap => {
  if (typeof data !== 'object' || data === null) return false;
  const map = data as Record<string, unknown>;
  return (
    typeof map.version === 'number' &&
    (map.generatedAt === undefined || typeof map.generatedAt === 'string') &&
    typeof map.css === 'object' &&
    map.css !== null &&
    typeof map.paths === 'object' &&
    map.paths !== null
  );
};

const toRgb = converter('rgb');

let cachedMap: ColorMap | null = null;
let cachedPrimitivesPath: string | null = null;
let cachedPrimitivesMtime = 0;
let cachedTokensPath: string | null = null;
let cachedTokensMtime = 0;
let outputChannel: vscode.OutputChannel | null = null;
let lastStatus: string | null = null;
let primitivesWatcher: vscode.FileSystemWatcher | null = null;
let tokensWatcher: vscode.FileSystemWatcher | null = null;

const logOnce = (message: string): void => {
  if (!outputChannel) return;
  if (lastStatus === message) return;
  outputChannel.appendLine(message);
  lastStatus = message;
};

const isPathInWorkspace = (path: string): boolean => {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) return false;
  return folders.some((folder) => path.startsWith(folder.uri.fsPath));
};

const getPrimitivesMapPath = (): string | null => {
  const config = vscode.workspace.getConfiguration('lufaColorPreview');
  const configured = config.get<string>('primitivesMapPath');

  if (!configured) return null;

  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    logOnce('lufa: No workspace folder found; cannot resolve custom primitives map path.');
    return null;
  }

  const resolvedPath = isAbsolute(configured) ? configured : join(folders[0].uri.fsPath, configured);

  if (!isAbsolute(configured) && !isPathInWorkspace(resolvedPath)) {
    logOnce(`lufa: Security warning - Custom primitives path is outside workspace: ${resolvedPath}`);
    return null;
  }

  return resolvedPath;
};

const getTokensMapPath = (): string | null => {
  const config = vscode.workspace.getConfiguration('lufaColorPreview');
  const configured = config.get<string>('tokensMapPath');

  if (!configured) return null;

  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    logOnce('lufa: No workspace folder found; cannot resolve custom tokens map path.');
    return null;
  }

  const resolvedPath = isAbsolute(configured) ? configured : join(folders[0].uri.fsPath, configured);

  if (!isAbsolute(configured) && !isPathInWorkspace(resolvedPath)) {
    logOnce(`lufa: Security warning - Custom tokens path is outside workspace: ${resolvedPath}`);
    return null;
  }

  return resolvedPath;
};

const loadPrimitivesMap = (primitivesPath: string | null): PrimitivesColorMap | null => {
  // Use bundled map if no custom path is configured
  if (!primitivesPath) {
    if (isValidPrimitivesMap(bundledPrimitivesMap)) {
      return bundledPrimitivesMap;
    }
    logOnce('lufa: Bundled primitives map is invalid');
    return null;
  }

  try {
    const stat = statSync(primitivesPath);
    if (cachedPrimitivesPath === primitivesPath && cachedPrimitivesMtime === stat.mtimeMs && cachedMap?.paths) {
      return { version: cachedMap.version, generatedAt: cachedMap.generatedAt, paths: cachedMap.paths };
    }

    const raw = readFileSync(primitivesPath, 'utf8');
    const parsed: unknown = JSON.parse(raw);

    if (!isValidPrimitivesMap(parsed)) {
      cachedPrimitivesPath = primitivesPath;
      cachedPrimitivesMtime = 0;
      logOnce(`lufa: Invalid primitives map structure at ${primitivesPath}. Using bundled map.`);
      return bundledPrimitivesMap as PrimitivesColorMap;
    }

    cachedPrimitivesPath = primitivesPath;
    cachedPrimitivesMtime = stat.mtimeMs;
    logOnce(`lufa: Loaded primitives map from ${primitivesPath} (version ${parsed.version})`);

    return parsed;
  } catch (error) {
    cachedPrimitivesPath = primitivesPath;
    cachedPrimitivesMtime = 0;

    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      logOnce(`lufa: Primitives map not found at ${primitivesPath}. Using bundled map.`);
    } else {
      const errorMsg = error instanceof Error ? error.message : String(error);
      logOnce(`lufa: Error loading primitives map: ${errorMsg}. Using bundled map.`);
    }
    return bundledPrimitivesMap as PrimitivesColorMap;
  }
};

const loadTokensMap = (tokensPath: string | null): TokensColorMap | null => {
  // Use bundled map if no custom path is configured
  if (!tokensPath) {
    if (isValidTokensMap(bundledTokensMap)) {
      return bundledTokensMap;
    }
    logOnce('lufa: Bundled tokens map is invalid');
    return null;
  }

  try {
    const stat = statSync(tokensPath);
    if (cachedTokensPath === tokensPath && cachedTokensMtime === stat.mtimeMs && cachedMap?.css && cachedMap?.paths) {
      return {
        version: cachedMap.version,
        generatedAt: cachedMap.generatedAt,
        css: cachedMap.css,
        paths: cachedMap.paths,
      };
    }

    const raw = readFileSync(tokensPath, 'utf8');
    const parsed: unknown = JSON.parse(raw);

    if (!isValidTokensMap(parsed)) {
      cachedTokensPath = tokensPath;
      cachedTokensMtime = 0;
      logOnce(`lufa: Invalid tokens map structure at ${tokensPath}. Using bundled map.`);
      return bundledTokensMap as TokensColorMap;
    }

    cachedTokensPath = tokensPath;
    cachedTokensMtime = stat.mtimeMs;
    logOnce(`lufa: Loaded tokens map from ${tokensPath} (version ${parsed.version})`);

    return parsed;
  } catch (error) {
    cachedTokensPath = tokensPath;
    cachedTokensMtime = 0;

    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      logOnce(`lufa: Tokens map not found at ${tokensPath}. Using bundled map.`);
    } else {
      const errorMsg = error instanceof Error ? error.message : String(error);
      logOnce(`lufa: Error loading tokens map: ${errorMsg}. Using bundled map.`);
    }
    return bundledTokensMap as TokensColorMap;
  }
};

const loadColorMap = (): ColorMap | null => {
  const primitivesPath = getPrimitivesMapPath();
  const tokensPath = getTokensMapPath();

  // Load primitives and tokens separately
  const primitivesMap = loadPrimitivesMap(primitivesPath);
  const tokensMap = loadTokensMap(tokensPath);

  if (!primitivesMap || !tokensMap) {
    logOnce('lufa: Failed to load primitives or tokens map');
    return null;
  }

  // Merge the two maps (primitives.css + tokens.css, primitives.paths + tokens.paths)
  const mergedMap: ColorMap = {
    version: Math.max(primitivesMap.version, tokensMap.version),
    generatedAt: tokensMap.generatedAt ?? primitivesMap.generatedAt,
    css: { ...primitivesMap.css, ...tokensMap.css },
    paths: { ...primitivesMap.paths, ...tokensMap.paths },
  };

  cachedMap = mergedMap;
  if (!primitivesPath && !tokensPath) {
    logOnce('lufa: Using bundled color maps');
  }

  return mergedMap;
};

const addColor = (
  colors: vscode.ColorInformation[],
  document: vscode.TextDocument,
  start: number,
  end: number,
  value: string,
  tokenName?: string
): void => {
  const rgb = toRgb(value);
  if (!rgb) {
    const config = vscode.workspace.getConfiguration('lufaColorPreview');
    const debug = config.get<boolean>('debug') ?? false;
    if (debug && outputChannel) {
      outputChannel.appendLine(`lufa: Failed to parse color: "${value}"${tokenName ? ` (token: ${tokenName})` : ''}`);
    }
    return;
  }

  const color = new vscode.Color(rgb.r, rgb.g, rgb.b, rgb.alpha ?? 1);
  const range = new vscode.Range(document.positionAt(start), document.positionAt(end));
  colors.push(new vscode.ColorInformation(range, color));
};

const setupMapWatcher = (context: vscode.ExtensionContext): void => {
  const primitivesPath = getPrimitivesMapPath();
  const tokensPath = getTokensMapPath();

  // Dispose existing watchers
  primitivesWatcher?.dispose();
  tokensWatcher?.dispose();

  // Primitives watcher
  if (primitivesPath) {
    try {
      primitivesWatcher = vscode.workspace.createFileSystemWatcher(primitivesPath);

      const handlePrimitivesChange = () => {
        cachedMap = null;
        cachedPrimitivesMtime = 0;
        cachedPrimitivesPath = null;
        logOnce(`lufa: Primitives map changed, cache invalidated: ${primitivesPath}`);
      };

      primitivesWatcher.onDidChange(handlePrimitivesChange);
      primitivesWatcher.onDidCreate(handlePrimitivesChange);
      primitivesWatcher.onDidDelete(() => {
        cachedMap = null;
        cachedPrimitivesMtime = 0;
        cachedPrimitivesPath = null;
        logOnce(`lufa: Primitives map deleted: ${primitivesPath}. Falling back to bundled map.`);
      });

      context.subscriptions.push(primitivesWatcher);
      logOnce(`lufa: Watching primitives map for changes: ${primitivesPath}`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      logOnce(`lufa: Failed to setup primitives file watcher: ${errorMsg}`);
    }
  }

  // Tokens watcher
  if (tokensPath) {
    try {
      tokensWatcher = vscode.workspace.createFileSystemWatcher(tokensPath);

      const handleTokensChange = () => {
        cachedMap = null;
        cachedTokensMtime = 0;
        cachedTokensPath = null;
        logOnce(`lufa: Tokens map changed, cache invalidated: ${tokensPath}`);
      };

      tokensWatcher.onDidChange(handleTokensChange);
      tokensWatcher.onDidCreate(handleTokensChange);
      tokensWatcher.onDidDelete(() => {
        cachedMap = null;
        cachedTokensMtime = 0;
        cachedTokensPath = null;
        logOnce(`lufa: Tokens map deleted: ${tokensPath}. Falling back to bundled map.`);
      });

      context.subscriptions.push(tokensWatcher);
      logOnce(`lufa: Watching tokens map for changes: ${tokensPath}`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      logOnce(`lufa: Failed to setup tokens file watcher: ${errorMsg}`);
    }
  }
};

export function activate(context: vscode.ExtensionContext): void {
  outputChannel = vscode.window.createOutputChannel('Lufa Color Preview');
  outputChannel.appendLine('lufa: Extension activated.');
  context.subscriptions.push(outputChannel);

  // Setup file watcher for color map
  setupMapWatcher(context);

  // Re-setup watcher when configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (
        e.affectsConfiguration('lufaColorPreview.mapPath') ||
        e.affectsConfiguration('lufaColorPreview.primitivesMapPath') ||
        e.affectsConfiguration('lufaColorPreview.tokensMapPath')
      ) {
        logOnce('lufa: Configuration changed, re-initializing color map watchers');
        cachedMap = null;
        cachedMtime = 0;
        cachedPath = null;
        cachedPrimitivesMtime = 0;
        cachedPrimitivesPath = null;
        cachedTokensMtime = 0;
        cachedTokensPath = null;
        setupMapWatcher(context);
      }
    })
  );

  const provider: vscode.DocumentColorProvider = {
    provideDocumentColors(document) {
      const map = loadColorMap();
      if (!map) return [];

      const config = vscode.workspace.getConfiguration('lufaColorPreview');
      const debug = config.get<boolean>('debug') ?? false;

      if (debug && outputChannel) {
        outputChannel.appendLine(`\nlufa: === Processing ${document.fileName} ===`);
        outputChannel.appendLine(`lufa: Language: ${document.languageId}`);
        outputChannel.appendLine(`lufa: CSS tokens available: ${Object.keys(map.css).length}`);
        outputChannel.appendLine(`lufa: Path tokens available: ${Object.keys(map.paths).length}`);
      }

      const text = document.getText();
      const colors: vscode.ColorInformation[] = [];

      // Match CSS color variables in TWO places:
      // 1. Inside var() usage: var(--lufa-color-...) or var(--lufa-primitive-...)
      // 2. Direct declarations: --lufa-color-*: ... or --lufa-primitive-*: ...
      const cssVarInVarRe = /var\(\s*(--lufa-(?:color|primitive)-[a-zA-Z0-9-]+)\s*(?:,[^)]+)?\)/gi;
      const cssVarDirectRe = /(--lufa-(?:color|primitive)-[a-zA-Z0-9-]+)(?=\s*:)/gi;

      // Match var() usages
      for (const match of text.matchAll(cssVarInVarRe)) {
        if (match.index === undefined) continue;
        const varName = match[1];
        const value = map.css[varName];
        if (!value) {
          if (debug && outputChannel) {
            outputChannel.appendLine(`lufa:   ❌ CSS var not found in map: ${varName}`);
          }
          continue;
        }
        if (debug && outputChannel) {
          outputChannel.appendLine(`lufa:   ✅ CSS var matched: ${varName} = ${value}`);
        }
        addColor(colors, document, match.index, match.index + match[0].length, value, varName);
      }

      // Match direct CSS variable declarations
      for (const match of text.matchAll(cssVarDirectRe)) {
        if (match.index === undefined) continue;
        const varName = match[1];
        const value = map.css[varName];
        if (!value) {
          if (debug && outputChannel) {
            outputChannel.appendLine(`lufa:   ❌ CSS declaration not found in map: ${varName}`);
          }
          continue;
        }
        if (debug && outputChannel) {
          outputChannel.appendLine(`lufa:   ✅ CSS declaration matched: ${varName} = ${value}`);
        }
        addColor(colors, document, match.index, match.index + varName.length, value, varName);
      }

      // Match primitives.color paths: primitives.color.chromatic.red[500] or primitives.color.neutral.neutral[900]
      // Pattern: primitives.color.{category}.{name}[{number}] where category is chromatic/neutral
      // Important: \d+ matches one or more digits (including 0, 50, 500, etc.)
      // Word boundary ensures we don't match partial expressions
      const primitivePathRe = /\bprimitives.color\.(?:chromatic|neutral)\.[a-zA-Z_][a-zA-Z0-9_]*\[\d+\]/g;
      // Match tokenColor paths: token.color.text.primary or tokenColor.background.primary
      // Pattern: token(Color)?. followed by nested properties
      const tokenPathRe = /\btokenColor(?:\.[a-zA-Z_][a-zA-Z0-9_]*)+/g;

      if (debug && outputChannel) {
        const allMatches = [...text.matchAll(primitivePathRe)];
        outputChannel.appendLine(`lufa:   Found ${allMatches.length} primitives.color references`);
      }

      for (const match of text.matchAll(primitivePathRe)) {
        if (match.index === undefined) continue;
        const pathName = match[0];
        const value = map.paths[pathName];
        if (!value) {
          if (debug && outputChannel) {
            outputChannel.appendLine(`lufa:   ❌ Primitive path not found in map: ${pathName}`);
          }
          continue;
        }
        if (debug && outputChannel) {
          outputChannel.appendLine(`lufa:   ✅ Primitive path matched: ${pathName} = ${value}`);
        }
        addColor(colors, document, match.index, match.index + match[0].length, value, pathName);
      }

      if (debug && outputChannel) {
        const allTokenMatches = [...text.matchAll(tokenPathRe)];
        outputChannel.appendLine(`lufa:   Found ${allTokenMatches.length} tokenColor references`);
      }

      for (const match of text.matchAll(tokenPathRe)) {
        if (match.index === undefined) continue;
        const pathName = match[0];
        const value = map.paths[pathName];
        if (!value) {
          if (debug && outputChannel) {
            outputChannel.appendLine(`lufa:   ❌ Token path not found in map: ${pathName}`);
          }
          continue;
        }
        if (debug && outputChannel) {
          outputChannel.appendLine(`lufa:   ✅ Token path matched: ${pathName} = ${value}`);
        }
        addColor(colors, document, match.index, match.index + match[0].length, value, pathName);
      }

      if (debug && outputChannel) {
        outputChannel.appendLine(`lufa: Total colors found: ${colors.length}\n`);
      }

      return colors;
    },
    provideColorPresentations() {
      return [];
    },
  };

  const selector: vscode.DocumentSelector = [
    { scheme: 'file', language: 'css' },
    { scheme: 'file', language: 'scss' },
    { scheme: 'file', language: 'postcss' },
    { scheme: 'file', language: 'tailwindcss' },
    { scheme: 'file', language: 'typescript' },
    { scheme: 'file', language: 'typescriptreact' },
  ];

  context.subscriptions.push(vscode.languages.registerColorProvider(selector, provider));
}

export function deactivate(): void {
  primitivesWatcher?.dispose();
  primitivesWatcher = null;
  tokensWatcher?.dispose();
  tokensWatcher = null;
  outputChannel?.dispose();
  outputChannel = null;
  cachedMap = null;
  cachedPrimitivesMtime = 0;
  cachedPrimitivesPath = null;
  cachedTokensMtime = 0;
  cachedTokensPath = null;
}
