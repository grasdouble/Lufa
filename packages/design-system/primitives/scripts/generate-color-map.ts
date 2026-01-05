import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { color } from '../dist/index.js';
import { flattenPaths, toKebabPath, toPath } from './utils/token-helpers.js';

interface ColorMap {
  version: number;
  generatedAt: string;
  css: Record<string, string>;
  paths: Record<string, string>;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, '../dist');
const outputFile = resolve(distDir, 'primitives-colors.map.json');

const buildMap = (): ColorMap => {
  const paths = flattenPaths(color as Record<string, unknown>, ['primitives.color'], toPath);

  const css = flattenPaths(
    color as Record<string, unknown>,
    ['color'],
    (segments) =>
      `--lufa-primitive-${segments
        .map((s) =>
          s
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace(/_/g, '-')
            .toLowerCase()
        )
        .join('-')}`
  );

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    css,
    paths,
  };
};

mkdirSync(distDir, { recursive: true });
writeFileSync(outputFile, `${JSON.stringify(buildMap(), null, 2)}\n`);

console.log(`✓ Generated primitives color map: ${outputFile}`);
