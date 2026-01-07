/**
 * Shared helpers for token map validation and locating packaged map files.
 */
import { join } from 'node:path';

type TokenMap = {
  version: number;
  generatedAt?: string;
  css: Record<string, string>;
  paths: Record<string, string>;
};

/**
 * Check whether a JSON payload matches the token map shape.
 */
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

/**
 * Resolve a packaged map path when the file exists in the extension bundle.
 */
const getEmbeddedMapPath = (
  extensionRootPath: string | null,
  mapFile: string,
  exists: (path: string) => boolean
): string | null => {
  if (!extensionRootPath) return null;
  const embeddedPath = join(extensionRootPath, 'dist', 'maps', mapFile);
  return exists(embeddedPath) ? embeddedPath : null;
};

export { getEmbeddedMapPath, isValidMap };
export type { TokenMap };
