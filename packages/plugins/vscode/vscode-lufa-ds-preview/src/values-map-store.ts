/**
 * Cache and watcher management for tokens maps and config resolution.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';
import * as vscode from 'vscode';

import type { LufaPreviewConfig } from './preview-config';
import type { TokenMap } from './values-map';
import { mergePreviewConfig, parseFlatConfig, parseObjectConfig } from './preview-config';
import { getEmbeddedMapPath, isValidMap } from './values-map';

type ValuesMapStore = {
  loadValuesMap: () => TokenMap | null;
  setupMapWatchers: (context: vscode.ExtensionContext) => void;
  resetAllCache: () => void;
  dispose: () => void;
  setExtensionRootPath: (path: string | null) => void;
  isDebugEnabled: () => boolean;
};

type LogOnce = (message: string) => void;

type MapCacheState = {
  path: string | null;
  mtime: number;
};

/**
 * Create a map store for loading and watching token maps with caching.
 */
const createValuesMapStore = (logOnce: LogOnce): ValuesMapStore => {
  let cachedValuesMap: TokenMap | null = null;
  const tokensCache: MapCacheState = { path: null, mtime: 0 };
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

  const resetMapCache = (cache: MapCacheState): void => {
    cache.path = null;
    cache.mtime = 0;
  };

  const invalidateMapCache = (cache: MapCacheState): void => {
    cachedValuesMap = null;
    resetMapCache(cache);
  };

  const getCachedMapSnapshot = (): TokenMap | null => {
    if (!cachedValuesMap) return null;
    return {
      version: cachedValuesMap.version,
      generatedAt: cachedValuesMap.generatedAt,
      paths: cachedValuesMap.paths,
      css: cachedValuesMap.css,
    };
  };

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
   * Resolve the embedded tokens map path from the extension bundle.
   */
  const getPackagedTokensMapPath = (): string | null => {
    return getEmbeddedMapPath(extensionRootPath, 'tokens.map.json', existsSync);
  };

  /**
   * Resolve the active tokens map path using config and packaged fallbacks.
   */
  const getTokensMapPath = (): string | null => {
    const configured = getLufaPreviewConfig().tokensMapPath;
    const resolved = configured ? resolveConfiguredPath(configured, 'tokens map') : null;
    return resolved ?? getPackagedTokensMapPath();
  };

  type MapLoadOptions = {
    label: 'tokens';
    mapPath: string | null;
    cache: MapCacheState;
    notFoundHint: string;
  };

  /**
   * Load and validate a map with caching and logging.
   */
  const loadMap = ({ label, mapPath, cache, notFoundHint }: MapLoadOptions): TokenMap | null => {
    if (!mapPath) {
      logOnce(`lufa: No ${label} map path available.`);
      return null;
    }

    const labelTitle = `${label[0].toUpperCase()}${label.slice(1)}`;

    try {
      const stat = statSync(mapPath);
      if (cache.path === mapPath && cache.mtime === stat.mtimeMs && cachedValuesMap?.paths) {
        return getCachedMapSnapshot();
      }

      const raw = readFileSync(mapPath, 'utf8');
      const parsed: unknown = JSON.parse(raw);

      if (!isValidMap(parsed)) {
        cache.path = mapPath;
        cache.mtime = 0;
        logOnce(`lufa: Invalid ${label} map structure at ${mapPath}.`);
        return null;
      }

      cache.path = mapPath;
      cache.mtime = stat.mtimeMs;
      logOnce(`lufa: Loaded ${label} map from ${mapPath} (version ${parsed.version})`);

      return parsed;
    } catch (error) {
      cache.path = mapPath;
      cache.mtime = 0;

      if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
        logOnce(`lufa: ${labelTitle} map not found at ${mapPath}. ${notFoundHint}`);
      } else {
        const errorMsg = error instanceof Error ? error.message : String(error);
        logOnce(`lufa: Error loading ${label} map: ${errorMsg}.`);
      }
      return null;
    }
  };

  const tokensNotFoundHint = 'Build @grasdouble/lufa_design-system-tokens or set lufaDsPreview.tokensMapPath.';

  /**
   * Load the tokens map.
   */
  const loadValuesMap = (): TokenMap | null => {
    const config = getLufaPreviewConfig();
    const configuredTokensPath = config.tokensMapPath
      ? resolveConfiguredPath(config.tokensMapPath, 'tokens map')
      : null;
    const packagedTokensPath = getPackagedTokensMapPath();

    let tokensMap = loadMap({
      label: 'tokens',
      mapPath: configuredTokensPath ?? packagedTokensPath,
      cache: tokensCache,
      notFoundHint: tokensNotFoundHint,
    });

    if (!tokensMap && configuredTokensPath && packagedTokensPath) {
      logOnce(`lufa: Falling back to packaged tokens map at ${packagedTokensPath}.`);
      tokensMap = loadMap({
        label: 'tokens',
        mapPath: packagedTokensPath,
        cache: tokensCache,
        notFoundHint: tokensNotFoundHint,
      });
    }

    if (!tokensMap) {
      logOnce('lufa: Failed to load tokens map');
      return null;
    }

    cachedValuesMap = tokensMap;
    if (!config.tokensMapPath) {
      logOnce('lufa: Using packaged tokens map from the extension bundle');
    }

    return tokensMap;
  };

  /**
   * Clear cached map values and timestamps.
   */
  const resetAllCache = (): void => {
    cachedValuesMap = null;
    resetMapCache(tokensCache);
  };

  /**
   * Dispose file watchers for map changes.
   */
  const disposeWatchers = (): void => {
    tokensWatcher?.dispose();
    tokensWatcher = null;
  };

  /**
   * Create file watchers for tokens maps.
   */
  const setupMapWatchers = (context: vscode.ExtensionContext): void => {
    const tokensMapPath = getTokensMapPath();

    disposeWatchers();

    const setupMapWatcher = (
      label: 'tokens',
      mapPath: string | null,
      cache: MapCacheState,
      setWatcher: (watcher: vscode.FileSystemWatcher | null) => void
    ): void => {
      if (!mapPath) return;

      const labelTitle = `${label[0].toUpperCase()}${label.slice(1)}`;

      try {
        const watcher = vscode.workspace.createFileSystemWatcher(mapPath);

        const handleChange = () => {
          invalidateMapCache(cache);
          logOnce(`lufa: ${labelTitle} map changed, cache invalidated: ${mapPath}`);
        };

        watcher.onDidChange(handleChange);
        watcher.onDidCreate(handleChange);
        watcher.onDidDelete(() => {
          invalidateMapCache(cache);
          logOnce(`lufa: ${labelTitle} map deleted: ${mapPath}.`);
        });

        setWatcher(watcher);
        context.subscriptions.push(watcher);
        logOnce(`lufa: Watching ${label} map for changes: ${mapPath}`);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        logOnce(`lufa: Failed to setup ${label} file watcher: ${errorMsg}`);
      }
    };

    setupMapWatcher('tokens', tokensMapPath, tokensCache, (watcher) => {
      tokensWatcher = watcher;
    });
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
