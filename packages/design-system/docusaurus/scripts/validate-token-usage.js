#!/usr/bin/env node

/**
 * Token Usage Validator
 *
 * Scans all source files in src/ and reports CSS custom properties
 * (--lufa-*) that are referenced but NOT defined in
 * packages/design-system/tokens/dist/tokens.css.
 *
 * Scanned file types:
 *   - *.css          (CSS overrides, theme files)
 *   - *.tsx / *.ts   (React components and pages)
 *   - *.mdx          (MDX documentation pages with inline styles)
 *
 * Usage:
 *   node scripts/validate-token-usage.js
 *   node scripts/validate-token-usage.js --verbose   (also list per-file breakdown)
 *   node scripts/validate-token-usage.js --unused    (also report defined-but-unused tokens)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ──────────────────────────────────────────────
// Paths
// ──────────────────────────────────────────────

const TOKENS_CSS = path.join(__dirname, '../../tokens/dist/tokens.css');

const COMPONENTS_DIR = path.join(__dirname, '../src');

// ──────────────────────────────────────────────
// CLI flags
// ──────────────────────────────────────────────

const args = process.argv.slice(2);
const VERBOSE = args.includes('--verbose') || args.includes('-v');
const SHOW_UNUSED = args.includes('--unused') || args.includes('-u');

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
 * Strips CSS block comments and JS/TS template literal fragments before scanning
 * to avoid false positives from comment references (e.g. "--lufa-core-*")
 * and dynamic variable construction (e.g. `--lufa-semantic-ui-text-${color}`).
 */
function extractTokens(content) {
  // Remove CSS /* ... */ block comments
  const noBlockComments = content.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove JS/TS // line comments
  const noLineComments = noBlockComments.replace(/\/\/.*/g, '');

  const matches = noLineComments.match(/--lufa-[a-z0-9-]+/g) ?? [];

  return new Set(
    matches
      // A valid token never ends with a trailing dash (those are partial names from template literals)
      .filter((t) => !t.endsWith('-'))
  );
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

const tokensCssContent = fs.readFileSync(TOKENS_CSS, 'utf-8');

// Tokens are defined as `  --lufa-foo-bar: ...;`  (left-hand side of a declaration)
const definedTokens = new Set([...tokensCssContent.matchAll(/^\s*(--lufa-[a-z0-9-]+)\s*:/gm)].map((m) => m[1]));

console.log(
  `${CYAN}${BOLD}Token Usage Validator${RESET}\n` +
    `${DIM}tokens.css: ${path.relative(process.cwd(), TOKENS_CSS)}${RESET}\n` +
    `${DIM}components: ${path.relative(process.cwd(), COMPONENTS_DIR)}${RESET}\n`
);

console.log(`  ${GREEN}✓ ${definedTokens.size} tokens defined in tokens.css${RESET}\n`);

// ──────────────────────────────────────────────
// 2. Scan source files
// ──────────────────────────────────────────────

const FILES_TO_SCAN = collectFiles(COMPONENTS_DIR, ['.css', '.tsx', '.ts', '.mdx']);

// Map: token → Set of file paths using it
const usedTokenMap = new Map(); // token → Set<relativeFilePath>

for (const filePath of FILES_TO_SCAN) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const tokens = extractTokens(content);
  const rel = path.relative(COMPONENTS_DIR, filePath);

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
  console.log(
    `${RED}${BOLD}✗ ${missingTokens.length} token(s) referenced in src but NOT defined in tokens.css:${RESET}\n`
  );

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
    console.log(`${GREEN}✓ All defined tokens are used by at least one file${RESET}\n`);
  } else {
    console.log(
      `${YELLOW}${BOLD}⚠ ${unusedTokens.length} token(s) defined in tokens.css but not referenced in src:${RESET}\n`
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

    const rel = path.relative(COMPONENTS_DIR, filePath);
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
