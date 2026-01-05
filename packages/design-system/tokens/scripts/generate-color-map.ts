import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { color } from '../dist/tokens/color/colors.js';
import { flattenPaths, processNestedTokens } from './utils/token-helpers.js';

interface ColorMap {
  version: number;
  generatedAt: string;
  css: Record<string, string>;
  paths: Record<string, string>;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, '../dist');
const outputFile = resolve(distDir, 'tokens-colors.map.json');

const buildMap = (): ColorMap => {
  const css: Record<string, string> = {};
  const paths: Record<string, string> = {};

  const colorEntries = processNestedTokens(color as Record<string, Record<string, unknown>>, 'color');
  for (const entry of colorEntries) {
    css[`--lufa-${entry.name}`] = String(entry.value);
  }

  flattenPaths(color as Record<string, unknown>, ['tokens.color'], paths);

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    css,
    paths,
  };
};

mkdirSync(distDir, { recursive: true });
writeFileSync(outputFile, `${JSON.stringify(buildMap(), null, 2)}\n`);

console.log(`✓ Generated tokens color map: ${outputFile}`);
