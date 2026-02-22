#!/usr/bin/env node

/**
 * Token Usage Validator
 *
 * Scans source files in a given directory and reports CSS custom properties
 * (--lufa-*) that are referenced but NOT defined in this package's
 * dist/tokens.css.
 *
 * Usage:
 *   node path/to/validate-token-usage.js --dir <path>
 *   node path/to/validate-token-usage.js --dir <path> --ext .css,.ts,.tsx,.cjs
 *   node path/to/validate-token-usage.js --dir <path> --verbose
 *   node path/to/validate-token-usage.js --dir <path> --unused
 *
 * Options:
 *   --dir <path>   Directory to scan (required). Can be absolute or relative to cwd.
 *   --ext <list>   Comma-separated list of file extensions to scan.
 *                  Defaults to: .css,.ts,.tsx
 *   --verbose, -v  Also list a per-file token breakdown.
 *   --unused,  -u  Also report tokens defined in tokens.css but not referenced.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ──────────────────────────────────────────────
// Parse CLI arguments
// ──────────────────────────────────────────────

const args = process.argv.slice(2);

function getArg(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : undefined;
}

const dirArg = getArg('--dir');
const extArg = getArg('--ext');
const VERBOSE = args.includes('--verbose') || args.includes('-v');
const SHOW_UNUSED = args.includes('--unused') || args.includes('-u');

if (!dirArg) {
  console.error('Usage: node validate-token-usage.js --dir <path> [--ext .css,.ts,.tsx] [--verbose] [--unused]');
  process.exit(1);
}

const SCAN_DIR = path.resolve(process.cwd(), dirArg);
const EXTENSIONS = extArg ? extArg.split(',').map((e) => e.trim()) : ['.css', '.ts', '.tsx'];

// ──────────────────────────────────────────────
// Paths
// ──────────────────────────────────────────────

const TOKENS_CSS = path.join(__dirname, '../dist/tokens.css');

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

/** Recursively collect files matching given extensions */
function collectFiles(dir, extensions) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath, extensions));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

/** Extract all unique --lufa-* token names from a string.
 * Strips block comments and line comments before scanning to avoid false positives
 * from comment references (e.g. "--lufa-core-*") and dynamic variable construction
 * (e.g. `--lufa-semantic-ui-text-${color}`).
 */
function extractTokens(content) {
  const noBlockComments = content.replace(/\/\*[\s\S]*?\*\//g, '');
  const noLineComments = noBlockComments.replace(/\/\/.*/g, '');
  const matches = noLineComments.match(/--lufa-[a-z0-9-]+/g) ?? [];
  return new Set(matches.filter((t) => !t.endsWith('-')));
}

/** ANSI colours */
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

// ──────────────────────────────────────────────
// 1. Load defined tokens from tokens.css
// ──────────────────────────────────────────────

if (!fs.existsSync(TOKENS_CSS)) {
  console.error(`${RED}✗ tokens.css not found: ${TOKENS_CSS}${RESET}`);
  console.error(`  Run: pnpm --filter @grasdouble/lufa_design-system-tokens build`);
  process.exit(1);
}

if (!fs.existsSync(SCAN_DIR)) {
  console.error(`${RED}✗ Directory to scan not found: ${SCAN_DIR}${RESET}`);
  process.exit(1);
}

const tokensCssContent = fs.readFileSync(TOKENS_CSS, 'utf-8');
const definedTokens = new Set([...tokensCssContent.matchAll(/^\s*(--lufa-[a-z0-9-]+)\s*:/gm)].map((m) => m[1]));

console.log(
  `${CYAN}${BOLD}Token Usage Validator${RESET}\n` +
    `${DIM}tokens.css : ${path.relative(process.cwd(), TOKENS_CSS)}${RESET}\n` +
    `${DIM}scan dir   : ${path.relative(process.cwd(), SCAN_DIR)}${RESET}\n` +
    `${DIM}extensions : ${EXTENSIONS.join(', ')}${RESET}\n`
);

console.log(`  ${GREEN}✓ ${definedTokens.size} tokens defined in tokens.css${RESET}\n`);

// ──────────────────────────────────────────────
// 2. Scan files
// ──────────────────────────────────────────────

const FILES_TO_SCAN = collectFiles(SCAN_DIR, EXTENSIONS);

const usedTokenMap = new Map(); // token → Set<relativeFilePath>

for (const filePath of FILES_TO_SCAN) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const tokens = extractTokens(content);
  const rel = path.relative(SCAN_DIR, filePath);

  for (const token of tokens) {
    if (!usedTokenMap.has(token)) usedTokenMap.set(token, new Set());
    usedTokenMap.get(token).add(rel);
  }
}

const allUsedTokens = new Set(usedTokenMap.keys());

console.log(`  ${GREEN}✓ ${FILES_TO_SCAN.length} files scanned${RESET}`);
console.log(`  ${GREEN}✓ ${allUsedTokens.size} unique tokens referenced${RESET}\n`);

// ──────────────────────────────────────────────
// 3. Compute differences
// ──────────────────────────────────────────────

const missingTokens = [...allUsedTokens].filter((t) => !definedTokens.has(t)).sort();
const unusedTokens = [...definedTokens].filter((t) => !allUsedTokens.has(t)).sort();

// ──────────────────────────────────────────────
// 4. Report — missing tokens (errors)
// ──────────────────────────────────────────────

if (missingTokens.length === 0) {
  console.log(`${GREEN}${BOLD}✓ All referenced tokens exist in tokens.css${RESET}\n`);
} else {
  console.log(`${RED}${BOLD}✗ ${missingTokens.length} token(s) referenced but NOT defined in tokens.css:${RESET}\n`);

  for (const token of missingTokens) {
    const files = [...(usedTokenMap.get(token) ?? [])];
    console.log(`  ${RED}${token}${RESET}`);
    for (const f of files) {
      console.log(`    ${DIM}→ ${f}${RESET}`);
    }
  }
  console.log('');
}

// ──────────────────────────────────────────────
// 5. Report — unused tokens (informational, opt-in)
// ──────────────────────────────────────────────

if (SHOW_UNUSED) {
  if (unusedTokens.length === 0) {
    console.log(`${GREEN}✓ All defined tokens are referenced in at least one file${RESET}\n`);
  } else {
    console.log(
      `${YELLOW}${BOLD}⚠ ${unusedTokens.length} token(s) defined in tokens.css but not referenced:${RESET}\n`
    );
    for (const token of unusedTokens) {
      console.log(`  ${YELLOW}${token}${RESET}`);
    }
    console.log('');
  }
}

// ──────────────────────────────────────────────
// 6. Verbose — per-file breakdown
// ──────────────────────────────────────────────

if (VERBOSE) {
  console.log(`\n${CYAN}${BOLD}Per-file token usage:${RESET}\n`);
  for (const filePath of FILES_TO_SCAN) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const tokens = [...extractTokens(content)].sort();
    if (tokens.length === 0) continue;

    const rel = path.relative(SCAN_DIR, filePath);
    const invalid = tokens.filter((t) => !definedTokens.has(t));

    const label = invalid.length > 0 ? `${RED}✗${RESET}` : `${GREEN}✓${RESET}`;
    console.log(`  ${label} ${rel} ${DIM}(${tokens.length} tokens)${RESET}`);

    if (invalid.length > 0) {
      for (const t of invalid) {
        console.log(`      ${RED}✗ ${t}${RESET}`);
      }
    }
  }
  console.log('');
}

// ──────────────────────────────────────────────
// 7. Exit code
// ──────────────────────────────────────────────

if (missingTokens.length > 0) {
  process.exit(1);
}
