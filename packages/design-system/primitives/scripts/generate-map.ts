import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { sortByNaturalKey } from './utils/token-helpers.js';

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

const flattenPaths = (obj: unknown, segments: string[], out: Record<string, string>): void => {
  if (typeof obj === 'string' || typeof obj === 'number') {
    out[toSafePath(segments)] = String(obj);
    return;
  }

  if (!obj || typeof obj !== 'object') return;

  if (Array.isArray(obj)) {
    obj.forEach((value, index) => flattenPaths(value, [...segments, String(index)], out));
    return;
  }

  for (const [key, value] of Object.entries(obj)) {
    flattenPaths(value, [...segments, key], out);
  }
};

type CssEntry = [string, string];

const parseCssVariables = (cssText: string): CssEntry[] => {
  const entries: CssEntry[] = [];
  const varRe = /(--lufa-[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match: RegExpExecArray | null = null;
  while ((match = varRe.exec(cssText)) !== null) {
    entries.push([match[1], match[2].trim()]);
  }
  return entries;
};

const buildPaths = (moduleExports: Record<string, unknown>, root: string): Record<string, string> => {
  const paths: Record<string, string> = {};
  for (const [name, value] of Object.entries(moduleExports)) {
    if (typeof value === 'function' || value === undefined) continue;
    if (value && typeof value === 'object') {
      flattenPaths(value, [root, name], paths);
      continue;
    }
    paths[toSafePath([root, name])] = String(value);
  }
  return paths;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, '../dist');
const cssFile = resolve(distDir, 'style.css');
const outputFile = resolve(distDir, 'primitives.map.json');

const buildMap = async (): Promise<TokenMap> => {
  const cssEntries = parseCssVariables(readFileSync(cssFile, 'utf8'));
  const css = Object.fromEntries(sortByNaturalKey(cssEntries, ([name]) => name));
  const moduleExports = (await import(pathToFileURL(resolve(distDir, 'index.js')).href)) as Record<
    string,
    unknown
  >;
  const paths = buildPaths(moduleExports, 'primitives');

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    css,
    paths,
  };
};

mkdirSync(distDir, { recursive: true });
writeFileSync(outputFile, `${JSON.stringify(await buildMap(), null, 2)}\n`);

console.log(`Generated primitives map: ${outputFile}`);
