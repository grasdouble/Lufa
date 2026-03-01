#!/usr/bin/env node
/**
 * Merge All Token Source Files into a Single DTCG JSON
 *
 * Reads all JSON files from src/ (primitives, core, semantic, component)
 * and deep-merges them into one file preserving the raw DTCG format:
 *   - $value (with {references} unresolved)
 *   - $type, $description, $extensions
 *
 * Output: dist/tokens-merged.json
 *
 * Usage:
 *   node scripts/merge-tokens.mjs
 *   node scripts/merge-tokens.mjs --output path/to/output.json
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { glob } from 'glob';

const TOKENS_ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const SRC_DIR = resolve(TOKENS_ROOT, 'src');
const DEFAULT_OUTPUT = resolve(TOKENS_ROOT, 'dist', 'tokens-source-merged.json');

/**
 * Deep merge two objects. Source values overwrite target values.
 * Both objects are plain JSON — no arrays to worry about in DTCG tokens.
 */
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Parse --output flag
const outputFlag = process.argv.indexOf('--output');
const outputPath =
  outputFlag !== -1 && process.argv[outputFlag + 1] ? resolve(process.argv[outputFlag + 1]) : DEFAULT_OUTPUT;

// Match the same glob pattern as style-dictionary.config.js
const patterns = [
  'src/primitives/**/*.json',
  'src/core/**/*.json',
  'src/semantic/**/*.json',
  'src/component/**/*.json',
];
const ignorePatterns = ['src/**/index.json'];

const files = patterns.flatMap((pattern) => glob.sync(pattern, { cwd: TOKENS_ROOT, ignore: ignorePatterns }));

if (files.length === 0) {
  console.error('❌ No token JSON files found in src/');
  process.exit(1);
}

// Sort files by hierarchy level for predictable merge order
const levelOrder = { primitives: 0, core: 1, semantic: 2, component: 3 };
files.sort((a, b) => {
  const levelA = levelOrder[a.split('/')[1]] ?? 99;
  const levelB = levelOrder[b.split('/')[1]] ?? 99;
  return levelA - levelB || a.localeCompare(b);
});

// Merge all files
const merged = {};
let fileCount = 0;

for (const file of files) {
  const fullPath = resolve(TOKENS_ROOT, file);
  try {
    const content = JSON.parse(readFileSync(fullPath, 'utf-8'));
    deepMerge(merged, content);
    fileCount++;
  } catch (err) {
    console.error(`❌ Failed to parse ${file}: ${err.message}`);
    process.exit(1);
  }
}

// Ensure output directory exists
mkdirSync(dirname(outputPath), { recursive: true });

// Write merged output
writeFileSync(outputPath, JSON.stringify(merged, null, 2) + '\n', 'utf-8');

const sizeKB = (Buffer.byteLength(JSON.stringify(merged, null, 2)) / 1024).toFixed(1);
console.log(`✅ Merged ${fileCount} token files → ${outputPath}`);
console.log(`   Size: ${sizeKB} KB`);
