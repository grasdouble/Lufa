import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

interface TokenMap {
  version: number;
  generatedAt: string;
  css: Record<string, string>;
  paths: Record<string, string>;
}

const isNumericKey = (key: string): boolean => /^[0-9]+$/.test(key);
const isValidIdentifier = (key: string): boolean => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);

const toSafePath = (segments: string[]): string => {
  return segments.reduce((acc, segment, index) => {
    if (index === 0) return segment;
    if (isNumericKey(segment)) return `${acc}[${segment}]`;
    if (!isValidIdentifier(segment)) return `${acc}[${JSON.stringify(segment)}]`;
    return `${acc}.${segment}`;
  }, '');
};

/**
 * Resolve a CSS variable reference to its actual value
 * @param value - String that may contain var(--lufa-token-*)
 * @param cssMap - Map of CSS variable names to their actual values
 * @returns The resolved value or the original if not a CSS variable
 */
const resolveCssVariable = (value: string, cssMap: Record<string, string>): string => {
  // Match var(--lufa-token-name) or var(--lufa-token-name, fallback)
  const varMatch = /^var\(--lufa-token-([a-z0-9-]+)(?:,\s*[^)]+)?\)$/i.exec(value);
  if (varMatch) {
    const varName = `--lufa-token-${varMatch[1]}`;
    return cssMap[varName] ?? value;
  }
  return value;
};

const flattenPaths = (
  obj: unknown,
  segments: string[],
  out: Record<string, string>,
  cssMap: Record<string, string>
): void => {
  if (typeof obj === 'string' || typeof obj === 'number') {
    const stringValue = String(obj);
    // Resolve CSS variable references to actual values
    const resolvedValue = resolveCssVariable(stringValue, cssMap);
    out[toSafePath(segments)] = resolvedValue;
    return;
  }

  if (!obj || typeof obj !== 'object') return;

  if (Array.isArray(obj)) {
    obj.forEach((value, index) => flattenPaths(value, [...segments, String(index)], out, cssMap));
    return;
  }

  for (const [key, value] of Object.entries(obj)) {
    flattenPaths(value, [...segments, key], out, cssMap);
  }
};

const parseCssVariables = (cssText: string): Record<string, string> => {
  const css: Record<string, string> = {};
  const varRe = /(--lufa-token-[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match: RegExpExecArray | null = null;
  while ((match = varRe.exec(cssText)) !== null) {
    css[match[1]] = match[2].trim();
  }
  return css;
};

const buildPaths = (
  moduleExports: Record<string, unknown>,
  root: string,
  cssMap: Record<string, string>
): Record<string, string> => {
  const paths: Record<string, string> = {};
  // Use the default export as the canonical root to avoid `tokens.default.*` paths.
  const defaultExport = moduleExports.default;

  if (defaultExport && typeof defaultExport === 'object') {
    flattenPaths(defaultExport, [root], paths, cssMap);
  }

  for (const [name, value] of Object.entries(moduleExports)) {
    if (name === 'default') continue;
    if (typeof value === 'function' || value === undefined) continue;
    if (value && typeof value === 'object') {
      flattenPaths(value, [root, name], paths, cssMap);
      continue;
    }
    const stringValue = String(value);
    paths[toSafePath([root, name])] = resolveCssVariable(stringValue, cssMap);
  }
  return paths;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, '../dist');
const cssFile = resolve(distDir, 'style.css');
const outputFile = resolve(distDir, 'tokens.map.json');

const buildMap = async (): Promise<TokenMap> => {
  const css = parseCssVariables(readFileSync(cssFile, 'utf8'));
  const moduleExports = (await import(pathToFileURL(resolve(distDir, 'index.js')).href)) as Record<string, unknown>;
  const paths = buildPaths(moduleExports, 'tokens', css);

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    css,
    paths,
  };
};

mkdirSync(distDir, { recursive: true });
writeFileSync(outputFile, `${JSON.stringify(await buildMap(), null, 2)}\n`);

console.log(`Generated tokens map: ${outputFile}`);
