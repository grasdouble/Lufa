#!/usr/bin/env node

/**
 * Generate Valid Theme Fixture
 *
 * Copies tokens/dist/tokens.css into tests/fixtures/valid-theme.css,
 * replacing the StyleDictionary header with a fixture-specific one.
 *
 * This fixture is used for CLI validator testing — it should contain
 * all tokens with their correct resolved values.
 *
 * Usage:
 *   node scripts/generate-valid-theme-fixture.js
 *
 * Re-run whenever tokens are added/removed/renamed (after rebuilding tokens):
 *   pnpm --filter @grasdouble/lufa_design-system-cli run generate:fixture
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE = path.join(__dirname, '../../tokens/dist/tokens.css');
const OUTPUT = path.join(__dirname, '../tests/fixtures/valid-theme.css');

if (!fs.existsSync(SOURCE)) {
  throw new Error(`Source not found: ${SOURCE}\n  Run: pnpm ds:tokens:build`);
}

const now = new Date().toISOString();

const FIXTURE_HEADER = `/**
 * Lufa Design System - Valid Theme Fixture
 * Auto-generated from tokens.css for CLI validator testing.
 * DO NOT edit manually.
 * Generated: ${now}
 */\n`;

const SD_HEADER = /^\/\*\*\n \* Do not edit directly, this file was auto-generated\.\n \*\/\n\n/;

const raw = /** @type {string} */ (fs.readFileSync(SOURCE, 'utf-8'));
const body = raw.replace(SD_HEADER, '');

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, FIXTURE_HEADER + '\n' + body, 'utf-8');

const relOutput = path.relative(process.cwd(), OUTPUT);
console.log(`✓ ${relOutput} — regenerated from tokens.css`);
