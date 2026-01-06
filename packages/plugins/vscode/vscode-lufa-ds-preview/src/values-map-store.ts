/**
 * Cache and watcher management for primitives/tokens maps and config resolution.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';
import * as vscode from 'vscode';
import { mergePreviewConfig, parseFlatConfig, parseObjectConfig } from './config-utils';
import { getEmbeddedMapPath, isValidMap } from './map-utils';
import type { LufaPreviewConfig } from './config-utils';
import type { TokenMap } from './map-utils';

type ValuesMapStore = {
  loadValuesMap: () => TokenMap | null;
  setupMapWatchers: (context: vscode.ExtensionContext) => void;
  resetAllCache: () => void;
  dispose: () => void;
  setExtensionRootPath: (path: string | null) => void;
  isDebugEnabled: () => boolean;
};

type LogOnce = (message: string) => void;

/**
 * Create a map store for loading and watching token maps with caching.
 */
const createValuesMapStore = (logOnce: LogOnce): ValuesMapStore => {
  let cachedValuesMap: TokenMap | null = null;
  let cachedPrimitivesPath: string | null = null;
  let cachedPrimitivesMtime = 0;
  let cachedTokensPath: string | null = null;
  let cachedTokensMtime = 0;
  let primitivesWatcher: vscode.FileSystemWatcher | null = null;
  let tokensWatcher: vscode.FileSystemWatcher | null = null;
  let extensionRootPath: string | null = null;

  /**
   * Read and merge Lufa preview configuration values.
   */
  const getLufaPreviewConfig = (): LufaPreviewConfig => {
    const raw = vscode.workspace.getConfiguration().get<unknown>('lufaDsPreview');
    const objectConfig = parseObjectConfig(raw);
    const flatConfig = parseFlatConfig(vscode.workspace.getConfiguration('lufaDsPreview'));
    return mergePreviewConfig(objectConfig, flatConfig);
  };

  /**
   * Check whether debug logging is enabled.
   */
  const isDebugEnabled = (): boolean => getLufaPreviewConfig().debug ?? false;

  /**
   * Ensure a path is within a workspace folder to avoid unsafe access.
   */
  const isPathInWorkspace = (path: string): boolean => {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) return false;
    return folders.some((folder) => path.startsWith(folder.uri.fsPath));
  };

  /**
   * Resolve configured map paths, enforcing workspace boundaries.
   */
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

  /**
   * Resolve the embedded primitives map path from the extension bundle.
   */
  const getPackagedPrimitivesMapPath = (): string | null => {
    return getEmbeddedMapPath(extensionRootPath, 'primitives.map.json', existsSync);
  };

  /**
   * Resolve the embedded tokens map path from the extension bundle.
   */
  const getPackagedTokensMapPath = (): string | null => {
    return getEmbeddedMapPath(extensionRootPath, 'tokens.map.json', existsSync);
  };

  /**
   * Resolve the active primitives map path using config and packaged fallbacks.
   */
  const getPrimitivesMapPath = (): string | null => {
    const configured = getLufaPreviewConfig().primitivesMapPath;
    const resolved = configured ? resolveConfiguredPath(configured, 'primitives map') : null;
    return resolved ?? getPackagedPrimitivesMapPath();
  };

  /**
   * Resolve the active tokens map path using config and packaged fallbacks.
   */
  const getTokensMapPath = (): string | null => {
    const configured = getLufaPreviewConfig().tokensMapPath;
    const resolved = configured ? resolveConfiguredPath(configured, 'tokens map') : null;
    return resolved ?? getPackagedTokensMapPath();
  };

  /**
   * Load and validate the primitives map with caching and logging.
   */
  const loadPrimitivesMap = (primitivesPath: string | null): TokenMap | null => {
    if (!primitivesPath) {
      logOnce('lufa: No primitives map path available.');
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
        logOnce(`lufa: Invalid primitives map structure at ${primitivesPath}.`);
        return null;
      }

      cachedPrimitivesPath = primitivesPath;
      cachedPrimitivesMtime = stat.mtimeMs;
      logOnce(`lufa: Loaded primitives map from ${primitivesPath} (version ${parsed.version})`);

      return parsed as TokenMap;
    } catch (error) {
      cachedPrimitivesPath = primitivesPath;
      cachedPrimitivesMtime = 0;

      if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
        logOnce(
          `lufa: Primitives map not found at ${primitivesPath}. Build @grasdouble/lufa_design-system-primitives or set lufaDsPreview.primitivesMapPath.`
        );
      } else {
        const errorMsg = error instanceof Error ? error.message : String(error);
        logOnce(`lufa: Error loading primitives map: ${errorMsg}.`);
      }
      return null;
    }
  };

  /**
   * Load and validate the tokens map with caching and logging.
   */
  const loadTokensMap = (tokensPath: string | null): TokenMap | null => {
    if (!tokensPath) {
      logOnce('lufa: No tokens map path available.');
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
        logOnce(`lufa: Invalid tokens map structure at ${tokensPath}.`);
        return null;
      }

      cachedTokensPath = tokensPath;
      cachedTokensMtime = stat.mtimeMs;
      logOnce(`lufa: Loaded tokens map from ${tokensPath} (version ${parsed.version})`);

      return parsed as TokenMap;
    } catch (error) {
      cachedTokensPath = tokensPath;
      cachedTokensMtime = 0;

      if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
        logOnce(
          `lufa: Tokens map not found at ${tokensPath}. Build @grasdouble/lufa_design-system-tokens or set lufaDsPreview.tokensMapPath.`
        );
      } else {
        const errorMsg = error instanceof Error ? error.message : String(error);
        logOnce(`lufa: Error loading tokens map: ${errorMsg}.`);
      }
      return null;
    }
  };

  /**
   * Load and merge primitives/tokens maps into a single values map.
   */
  const loadValuesMap = (): TokenMap | null => {
    const config = getLufaPreviewConfig();
    const configuredPrimitivesPath = config.primitivesMapPath
      ? resolveConfiguredPath(config.primitivesMapPath, 'primitives map')
      : null;
    const configuredTokensPath = config.tokensMapPath ? resolveConfiguredPath(config.tokensMapPath, 'tokens map') : null;
    const packagedPrimitivesPath = getPackagedPrimitivesMapPath();
    const packagedTokensPath = getPackagedTokensMapPath();

    let primitivesMap = loadPrimitivesMap(configuredPrimitivesPath ?? packagedPrimitivesPath);
    let tokensMap = loadTokensMap(configuredTokensPath ?? packagedTokensPath);

    if (!primitivesMap && configuredPrimitivesPath && packagedPrimitivesPath) {
      logOnce(`lufa: Falling back to packaged primitives map at ${packagedPrimitivesPath}.`);
      primitivesMap = loadPrimitivesMap(packagedPrimitivesPath);
    }

    if (!tokensMap && configuredTokensPath && packagedTokensPath) {
      logOnce(`lufa: Falling back to packaged tokens map at ${packagedTokensPath}.`);
      tokensMap = loadTokensMap(packagedTokensPath);
    }

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
    if (!config.primitivesMapPath && !config.tokensMapPath) {
      logOnce('lufa: Using packaged maps from the extension bundle');
    }

    return mergedMap;
  };

  /**
   * Clear cached map values and timestamps.
   */
  const resetAllCache = (): void => {
    cachedValuesMap = null;
    cachedPrimitivesMtime = 0;
    cachedPrimitivesPath = null;
    cachedTokensMtime = 0;
    cachedTokensPath = null;
  };

  /**
   * Dispose file watchers for map changes.
   */
  const disposeWatchers = (): void => {
    primitivesWatcher?.dispose();
    primitivesWatcher = null;
    tokensWatcher?.dispose();
    tokensWatcher = null;
  };

  /**
   * Create file watchers for primitives and tokens maps.
   */
  const setupMapWatchers = (context: vscode.ExtensionContext): void => {
    const primitivesMapPath = getPrimitivesMapPath();
    const tokensMapPath = getTokensMapPath();

    disposeWatchers();

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
          logOnce(`lufa: Primitives map deleted: ${primitivesMapPath}.`);
        });

        context.subscriptions.push(primitivesWatcher);
        logOnce(`lufa: Watching primitives map for changes: ${primitivesMapPath}`);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        logOnce(`lufa: Failed to setup primitives file watcher: ${errorMsg}`);
      }
    }

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
          logOnce(`lufa: Tokens map deleted: ${tokensMapPath}.`);
        });

        context.subscriptions.push(tokensWatcher);
        logOnce(`lufa: Watching tokens map for changes: ${tokensMapPath}`);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        logOnce(`lufa: Failed to setup tokens file watcher: ${errorMsg}`);
      }
    }
  };

  /**
   * Dispose watchers and reset cached state.
   */
  const dispose = (): void => {
    disposeWatchers();
    resetAllCache();
    extensionRootPath = null;
  };

  /**
   * Store the extension root path for locating packaged maps.
   */
  const setExtensionRootPath = (path: string | null): void => {
    extensionRootPath = path;
  };

  return {
    loadValuesMap,
    setupMapWatchers,
    resetAllCache,
    dispose,
    setExtensionRootPath,
    isDebugEnabled,
  };
};

export { createValuesMapStore };
export type { ValuesMapStore };
