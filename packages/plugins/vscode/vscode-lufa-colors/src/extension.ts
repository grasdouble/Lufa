import { readFileSync, statSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';
import { converter } from 'culori';
import * as vscode from 'vscode';

import bundledPrimitivesMap from './defaultMap/default-primitives.map.json';
import bundledTokensMap from './defaultMap/default-tokens.map.json';

type TokenMap = {
  version: number;
  generatedAt?: string;
  css: Record<string, string>;
  paths: Record<string, string>;
};

type LufaColorPreviewConfig = {
  primitivesMapPath?: string;
  tokensMapPath?: string;
  debug?: boolean;
};

const isValidMap = (data: unknown): data is TokenMap => {
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

let cachedValuesMap: TokenMap | null = null;
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

const resolveConfiguredPath = (configured: string | undefined, label: string): string | null => {
  if (!configured) return null;

  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    logOnce(`lufa: No workspace folder found; cannot resolve custom ${label} path.`);
    return null;
  }

  const resolvedPath = isAbsolute(configured) ? configured : join(folders[0].uri.fsPath, configured);

  if (!isAbsolute(configured) && !isPathInWorkspace(resolvedPath)) {
    logOnce(`lufa: Security warning - Custom ${label} path is outside workspace: ${resolvedPath}`);
    return null;
  }

  return resolvedPath;
};

const readObjectConfig = (): LufaColorPreviewConfig => {
  const raw = vscode.workspace.getConfiguration().get<unknown>('lufaColorPreview');
  if (!raw || typeof raw !== 'object') return {};
  const value = raw as Record<string, unknown>;
  return {
    primitivesMapPath: typeof value.primitivesMapPath === 'string' ? value.primitivesMapPath : undefined,
    tokensMapPath: typeof value.tokensMapPath === 'string' ? value.tokensMapPath : undefined,
    debug: typeof value.debug === 'boolean' ? value.debug : undefined,
  };
};

const readFlatConfig = (): LufaColorPreviewConfig => {
  const config = vscode.workspace.getConfiguration('lufaColorPreview');
  return {
    primitivesMapPath: config.get<string>('primitivesMapPath'),
    tokensMapPath: config.get<string>('tokensMapPath'),
    debug: config.get<boolean>('debug'),
  };
};

const getLufaConfig = (): LufaColorPreviewConfig => {
  const objectConfig = readObjectConfig();
  const flatConfig = readFlatConfig();
  return {
    primitivesMapPath: objectConfig.primitivesMapPath ?? flatConfig.primitivesMapPath,
    tokensMapPath: objectConfig.tokensMapPath ?? flatConfig.tokensMapPath,
    debug: objectConfig.debug ?? flatConfig.debug,
  };
};

const isDebugEnabled = (): boolean => getLufaConfig().debug ?? false;

const getPrimitivesMapPath = (): string | null => {
  return resolveConfiguredPath(getLufaConfig().primitivesMapPath, 'primitives map');
};

const getTokensMapPath = (): string | null => {
  return resolveConfiguredPath(getLufaConfig().tokensMapPath, 'tokens map');
};

const loadPrimitivesMap = (primitivesPath: string | null): TokenMap | null => {
  if (!primitivesPath) {
    if (isValidMap(bundledPrimitivesMap)) {
      return bundledPrimitivesMap;
    }
    logOnce('lufa: Bundled primitives map is invalid');
    return null;
  }

  try {
    const stat = statSync(primitivesPath);
    if (
      cachedPrimitivesPath === primitivesPath &&
      cachedPrimitivesMtime === stat.mtimeMs &&
      cachedValuesMap?.paths
    ) {
      return {
        version: cachedValuesMap.version,
        generatedAt: cachedValuesMap.generatedAt,
        paths: cachedValuesMap.paths,
        css: cachedValuesMap.css,
      };
    }

    const raw = readFileSync(primitivesPath, 'utf8');
    const parsed: unknown = JSON.parse(raw);

    if (!isValidMap(parsed)) {
      cachedPrimitivesPath = primitivesPath;
      cachedPrimitivesMtime = 0;
      logOnce(`lufa: Invalid primitives map structure at ${primitivesPath}. Using bundled map.`);
      return bundledPrimitivesMap as TokenMap;
    }

    cachedPrimitivesPath = primitivesPath;
    cachedPrimitivesMtime = stat.mtimeMs;
    logOnce(`lufa: Loaded primitives map from ${primitivesPath} (version ${parsed.version})`);

    return parsed as TokenMap;
  } catch (error) {
    cachedPrimitivesPath = primitivesPath;
    cachedPrimitivesMtime = 0;

    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      logOnce(`lufa: Primitives map not found at ${primitivesPath}. Using bundled map.`);
    } else {
      const errorMsg = error instanceof Error ? error.message : String(error);
      logOnce(`lufa: Error loading primitives map: ${errorMsg}. Using bundled map.`);
    }
    return bundledPrimitivesMap as TokenMap;
  }
};

const loadTokensMap = (tokensPath: string | null): TokenMap | null => {
  if (!tokensPath) {
    if (isValidMap(bundledTokensMap)) {
      return bundledTokensMap;
    }
    logOnce('lufa: Bundled tokens map is invalid');
    return null;
  }

  try {
    const stat = statSync(tokensPath);
    if (cachedTokensPath === tokensPath && cachedTokensMtime === stat.mtimeMs && cachedValuesMap?.paths) {
      return {
        version: cachedValuesMap.version,
        generatedAt: cachedValuesMap.generatedAt,
        paths: cachedValuesMap.paths,
        css: cachedValuesMap.css,
      };
    }

    const raw = readFileSync(tokensPath, 'utf8');
    const parsed: unknown = JSON.parse(raw);

    if (!isValidMap(parsed)) {
      cachedTokensPath = tokensPath;
      cachedTokensMtime = 0;
      logOnce(`lufa: Invalid tokens map structure at ${tokensPath}. Using bundled map.`);
      return bundledTokensMap as TokenMap;
    }

    cachedTokensPath = tokensPath;
    cachedTokensMtime = stat.mtimeMs;
    logOnce(`lufa: Loaded tokens map from ${tokensPath} (version ${parsed.version})`);

    return parsed as TokenMap;
  } catch (error) {
    cachedTokensPath = tokensPath;
    cachedTokensMtime = 0;

    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      logOnce(`lufa: Tokens map not found at ${tokensPath}. Using bundled map.`);
    } else {
      const errorMsg = error instanceof Error ? error.message : String(error);
      logOnce(`lufa: Error loading tokens map: ${errorMsg}. Using bundled map.`);
    }
    return bundledTokensMap as TokenMap;
  }
};

const loadValuesMap = (): TokenMap | null => {
  const primitivesPath = getPrimitivesMapPath();
  const tokensPath = getTokensMapPath();

  const primitivesMap = loadPrimitivesMap(primitivesPath);
  const tokensMap = loadTokensMap(tokensPath);

  if (!primitivesMap || !tokensMap) {
    logOnce('lufa: Failed to load primitives or tokens map');
    return null;
  }

  const mergedMap: TokenMap = {
    version: Math.max(primitivesMap.version, tokensMap.version),
    generatedAt: tokensMap.generatedAt ?? primitivesMap.generatedAt,
    css: { ...primitivesMap.css, ...tokensMap.css },
    paths: { ...primitivesMap.paths, ...tokensMap.paths },
  };

  cachedValuesMap = mergedMap;
  if (!primitivesPath && !tokensPath) {
    logOnce('lufa: Using bundled maps');
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
    const debug = isDebugEnabled();
    if (debug && outputChannel) {
      outputChannel.appendLine(`lufa: Failed to parse color: "${value}"${tokenName ? ` (token: ${tokenName})` : ''}`);
    }
    return;
  }

  const color = new vscode.Color(rgb.r, rgb.g, rgb.b, rgb.alpha ?? 1);
  const range = new vscode.Range(document.positionAt(start), document.positionAt(end));
  colors.push(new vscode.ColorInformation(range, color));
};

const tokenHoverRe =
  /--lufa-[a-zA-Z0-9-]+|(?:tokens|primitives|tokenColor)\.[A-Za-z_$][A-Za-z0-9_$]*(?:\.(?:[A-Za-z_$][A-Za-z0-9_$]*)|\[(?:\d+|["'][^"']+["'])\])+/;

const addQuoteVariants = (value: string, candidates: Set<string>): void => {
  if (value.includes('["')) {
    candidates.add(value.replace(/\["([^"]+)"\]/g, "['$1']"));
  }
  if (value.includes("['")) {
    candidates.add(value.replace(/\['([^']+)'\]/g, '["$1"]'));
  }
};

const getPathCandidates = (path: string): string[] => {
  const candidates = new Set<string>();

  const addCandidate = (value: string): void => {
    candidates.add(value);
    addQuoteVariants(value, candidates);
  };

  addCandidate(path);
  if (path.startsWith('tokenColor.')) {
    addCandidate(`tokens.color.${path.slice('tokenColor.'.length)}`);
  }

  return [...candidates];
};

const lookupValue = (map: Record<string, string> | undefined, keys: string[]): string | null => {
  if (!map) return null;
  for (const key of keys) {
    const value = map[key];
    if (value) return value;
  }
  return null;
};

const resolveTokenValue = (tokenText: string): string | null => {
  const valuesMap = loadValuesMap();

  if (tokenText.startsWith('--lufa-')) {
    return lookupValue(valuesMap?.css, [tokenText]) ?? null;
  }

  const candidates = getPathCandidates(tokenText);
  return lookupValue(valuesMap?.paths, candidates) ?? null;
};

const setupMapWatcher = (context: vscode.ExtensionContext): void => {
  const primitivesMapPath = getPrimitivesMapPath();
  const tokensMapPath = getTokensMapPath();

  // Dispose existing watchers
  primitivesWatcher?.dispose();
  tokensWatcher?.dispose();

  // Primitives watcher
  if (primitivesMapPath) {
    try {
      primitivesWatcher = vscode.workspace.createFileSystemWatcher(primitivesMapPath);

      const handlePrimitivesChange = () => {
        cachedValuesMap = null;
        cachedPrimitivesMtime = 0;
        cachedPrimitivesPath = null;
        logOnce(`lufa: Primitives map changed, cache invalidated: ${primitivesMapPath}`);
      };

      primitivesWatcher.onDidChange(handlePrimitivesChange);
      primitivesWatcher.onDidCreate(handlePrimitivesChange);
      primitivesWatcher.onDidDelete(() => {
        cachedValuesMap = null;
        cachedPrimitivesMtime = 0;
        cachedPrimitivesPath = null;
        logOnce(`lufa: Primitives map deleted: ${primitivesMapPath}. Falling back to bundled map.`);
      });

      context.subscriptions.push(primitivesWatcher);
      logOnce(`lufa: Watching primitives map for changes: ${primitivesMapPath}`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      logOnce(`lufa: Failed to setup primitives file watcher: ${errorMsg}`);
    }
  }

  // Tokens watcher
  if (tokensMapPath) {
    try {
      tokensWatcher = vscode.workspace.createFileSystemWatcher(tokensMapPath);

      const handleTokensChange = () => {
        cachedValuesMap = null;
        cachedTokensMtime = 0;
        cachedTokensPath = null;
        logOnce(`lufa: Tokens map changed, cache invalidated: ${tokensMapPath}`);
      };

      tokensWatcher.onDidChange(handleTokensChange);
      tokensWatcher.onDidCreate(handleTokensChange);
      tokensWatcher.onDidDelete(() => {
        cachedValuesMap = null;
        cachedTokensMtime = 0;
        cachedTokensPath = null;
        logOnce(`lufa: Tokens map deleted: ${tokensMapPath}. Falling back to bundled map.`);
      });

      context.subscriptions.push(tokensWatcher);
      logOnce(`lufa: Watching tokens map for changes: ${tokensMapPath}`);
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

  // Setup file watcher for maps
  setupMapWatcher(context);

  // Re-setup watcher when configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('lufaColorPreview')) {
        logOnce('lufa: Configuration changed, re-initializing map watchers');
        cachedValuesMap = null;
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
      const map = loadValuesMap();
      if (!map) return [];

      const debug = isDebugEnabled();

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
      // Match token color paths: tokens.color.text.primary or tokenColor.background.primary
      const tokenPathRe = /\b(?:tokens\.color|tokenColor)(?:\.[a-zA-Z_][a-zA-Z0-9_]*)+/g;

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
        const lookupKeys = getPathCandidates(pathName);
        const value = lookupValue(map.paths, lookupKeys);
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

  const hoverProvider: vscode.HoverProvider = {
    provideHover(document, position) {
      const range = document.getWordRangeAtPosition(position, tokenHoverRe);
      if (!range) return;

      const tokenText = document.getText(range);
      const value = resolveTokenValue(tokenText);
      if (!value) return;

      const markdown = new vscode.MarkdownString();
      markdown.appendMarkdown(`\`${tokenText}\` = \`${value}\``);
      return new vscode.Hover(markdown, range);
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
  context.subscriptions.push(vscode.languages.registerHoverProvider(selector, hoverProvider));
}

export function deactivate(): void {
  primitivesWatcher?.dispose();
  primitivesWatcher = null;
  tokensWatcher?.dispose();
  tokensWatcher = null;
  outputChannel?.dispose();
  outputChannel = null;
  cachedValuesMap = null;
  cachedPrimitivesMtime = 0;
  cachedPrimitivesPath = null;
  cachedTokensMtime = 0;
  cachedTokensPath = null;
}
