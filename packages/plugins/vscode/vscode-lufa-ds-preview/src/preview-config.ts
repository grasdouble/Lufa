/**
 * Helpers for parsing and merging VS Code configuration values for the extension.
 */
type LufaPreviewConfig = {
  tokensMapPath?: string;
  debug?: boolean;
};

type FlatConfigReader = {
  get<T>(key: string): T | undefined;
};

/**
 * Parse the object-style workspace configuration for the extension.
 */
const parseObjectConfig = (raw: unknown): LufaPreviewConfig => {
  if (!raw || typeof raw !== 'object') return {};
  const value = raw as Record<string, unknown>;
  return {
    tokensMapPath: typeof value.tokensMapPath === 'string' ? value.tokensMapPath : undefined,
    debug: typeof value.debug === 'boolean' ? value.debug : undefined,
  };
};

/**
 * Parse the flat configuration section for the extension.
 */
const parseFlatConfig = (config: FlatConfigReader): LufaPreviewConfig => {
  return {
    tokensMapPath: config.get<string>('tokensMapPath'),
    debug: config.get<boolean>('debug'),
  };
};

/**
 * Merge object and flat config values with object config taking precedence.
 */
const mergePreviewConfig = (objectConfig: LufaPreviewConfig, flatConfig: LufaPreviewConfig): LufaPreviewConfig => {
  return {
    tokensMapPath: objectConfig.tokensMapPath ?? flatConfig.tokensMapPath,
    debug: objectConfig.debug ?? flatConfig.debug,
  };
};

export { mergePreviewConfig, parseFlatConfig, parseObjectConfig };
export type { FlatConfigReader, LufaPreviewConfig };
