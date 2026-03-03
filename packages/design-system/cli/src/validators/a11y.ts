/**
 * Accessibility (A11y) Validator
 *
 * Validates WCAG 2.2 AA contrast requirements for theme CSS files — official
 * Lufa themes or any custom theme that follows the Lufa token structure.
 *
 * Parses each `data-mode` block independently (light / dark / high-contrast)
 * and checks every color pair for every mode.
 *
 * Color pairs are derived entirely from the design system token metadata via
 * `getColorPairsToCheck()` — a combination of explicit `contrastWith`
 * annotations and a sibling-inference algorithm. No hardcoded pairs.
 *
 * Resolution strategy (mirrors the browser cascade):
 *   1. Load the DS base tokens (tokens.css) — all semantic / component vars
 *      are declared as var() references pointing to core / primitive tokens.
 *   2. Merge the theme overrides per mode — themes redefine core tokens with
 *      hex values (e.g. --lufa-core-color-brand-primary-default: #0e7490).
 *   3. Resolve var() chains until a hex value is reached.
 *
 */

import { readFileSync } from 'node:fs';

import { getColorPairsToCheck } from '../utils/contrast.js';
import { resolveCSSVarValue } from '../utils/parse-css.js';
import { getContrastRatio, meetsWCAG_AA_Text, meetsWCAG_AA_UI } from '../utils/wcag.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type A11yMode = 'light' | 'dark' | 'high-contrast';

export type A11yViolation = {
  foreground: string;
  background: string;
  ratio: number;
  required: number;
  type: 'text' | 'ui';
  mode: A11yMode;
};

export type A11yModeResult = {
  mode: A11yMode;
  valid: boolean;
  violations: A11yViolation[];
  totalChecks: number;
  skipped: number;
};

export type A11yResult = {
  /** True only when ALL modes pass */
  valid: boolean;
  modes: A11yModeResult[];
  totalViolations: number;
};

// ---------------------------------------------------------------------------
// Token map type
// ---------------------------------------------------------------------------

/** varName (with --) → raw value (hex or var() reference) */
type TokenMap = Map<string, string>;

// ---------------------------------------------------------------------------
// CSS parsers
// ---------------------------------------------------------------------------

/**
 * Parse a flat CSS file and return all --lufa-* custom property declarations
 * from every rule block, intentionally ignoring selectors (no mode distinction).
 *
 * ## Why selectors are ignored here
 *
 * This function is exclusively used to load `tokens.css` — the DS base layer.
 * `tokens.css` is structured as three blocks:
 *
 *   1. `[data-theme], [data-theme][data-mode='light']`  — 697 vars:
 *        all primitive values + all semantic/component var() chain scaffolding
 *        + light-mode core color hex values as the baseline.
 *   2. `[data-theme][data-mode='dark']`                 — 53 vars:
 *        core color hex overrides for dark mode.
 *   3. `[data-theme][data-mode='high-contrast']`        — 53 vars:
 *        core color hex overrides for high-contrast mode.
 *
 * Flattening all three blocks (last-write-wins) means the 53 core color tokens
 * end up with high-contrast hex values in the resulting map. This is harmless
 * because the base map's purpose here is NOT to supply final color values —
 * it is only used so that `resolveCSSVarValue()` can walk the var() chains
 * (semantic → core → primitive). The actual mode-specific hex values are
 * always provided by the theme file via `parseThemeFileByMode()`, and theme
 * tokens are spread on top of base tokens in the merge step (see `validateA11y`),
 * so they unconditionally overwrite whatever leaked from the dark/HC blocks.
 *
 * ## What this means for theme authors
 *
 * Themes do NOT need to work around this. A theme's `[data-mode='dark']` block
 * always wins over anything in the base map. The flat base map is purely
 * structural scaffolding, not a source of truth for colors.
 */
function parseFlatCSSTokens(content: string): TokenMap {
  const stripped = content.replace(/\/\*[\s\S]*?\*\//g, '');
  const tokens: TokenMap = new Map();

  const blockPattern = /[^{]*\{([^}]*)\}/g;
  let blockMatch: RegExpExecArray | null;

  while ((blockMatch = blockPattern.exec(stripped)) !== null) {
    const body = blockMatch[1];
    extractVarsFromBody(body, tokens);
  }

  return tokens;
}

/**
 * Parse a theme CSS file and return a token map per mode.
 *
 * Strategy: scan every CSS rule block. If its selector contains `data-theme`,
 * extract the optional `data-mode` attribute (default: "light") and collect
 * ALL `--lufa-*` variable declarations — both hex literals and var() references.
 */
function parseThemeFileByMode(content: string): Map<A11yMode, TokenMap> {
  const stripped = content.replace(/\/\*[\s\S]*?\*\//g, '');
  const modeMap = new Map<A11yMode, TokenMap>();

  const blockPattern = /([^{]+)\{([^}]*)\}/g;
  let match: RegExpExecArray | null;

  while ((match = blockPattern.exec(stripped)) !== null) {
    const selector = match[1];
    const body = match[2];

    if (!selector.includes('data-theme')) continue;

    const modeMatch = /data-mode=['"]([^'"]+)['"]/.exec(selector);
    const rawMode = modeMatch ? modeMatch[1] : 'light';
    const mode = (['light', 'dark', 'high-contrast'] as const).includes(rawMode as A11yMode)
      ? (rawMode as A11yMode)
      : 'light';

    const tokens: TokenMap = modeMap.get(mode) ?? new Map<string, string>();
    extractVarsFromBody(body, tokens);
    modeMap.set(mode, tokens);
  }

  return modeMap;
}

/**
 * Extract --lufa-* variable declarations (hex and var() references) from a
 * CSS rule body and add them to the provided map.
 */
function extractVarsFromBody(body: string, tokens: TokenMap): void {
  // Hex values (3, 6, or 8-digit)
  const hexPattern = /--(lufa-[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3}(?:[0-9a-fA-F]{2})?)?)\b/g;
  let m: RegExpExecArray | null;
  while ((m = hexPattern.exec(body)) !== null) {
    tokens.set(`--${m[1]}`, m[2]);
  }

  // var() references
  const varRefPattern = /--(lufa-[a-z0-9-]+)\s*:\s*(var\(--[^)]+\))/g;
  while ((m = varRefPattern.exec(body)) !== null) {
    // Hex declaration takes precedence
    if (!tokens.has(`--${m[1]}`)) {
      tokens.set(`--${m[1]}`, m[2]);
    }
  }
}

// ---------------------------------------------------------------------------
// Load DS base tokens from the package
// ---------------------------------------------------------------------------

let _baseTokensCache: TokenMap | null = null;

/**
 * Load the DS base tokens.css once and cache the result.
 * Returns a fresh copy so callers can safely merge without mutating the cache.
 */
function loadBaseTokens(): TokenMap {
  if (_baseTokensCache) {
    return new Map(_baseTokensCache);
  }

  const tokensPath = new URL(import.meta.resolve('@grasdouble/lufa_design-system-tokens/tokens.css'));
  const content = readFileSync(tokensPath, 'utf-8');
  _baseTokensCache = parseFlatCSSTokens(content);
  return new Map(_baseTokensCache);
}

// ---------------------------------------------------------------------------
// Per-mode validator
// ---------------------------------------------------------------------------

function validateMode(
  mergedTokens: TokenMap,
  mode: A11yMode,
  colorPairs: [string, string, 'text' | 'ui'][]
): A11yModeResult {
  const violations: A11yViolation[] = [];
  let skipped = 0;

  for (const [fgSuffix, bgSuffix, type] of colorPairs) {
    const fgName = `--lufa-${fgSuffix}`;
    const bgName = `--lufa-${bgSuffix}`;

    const fgRaw = mergedTokens.get(fgName);
    const bgRaw = mergedTokens.get(bgName);

    if (!fgRaw || !bgRaw) {
      skipped++;
      continue;
    }

    // Resolve var() chains down to hex
    const fgValue = resolveCSSVarValue(fgRaw, mergedTokens) ?? fgRaw;
    const bgValue = resolveCSSVarValue(bgRaw, mergedTokens) ?? bgRaw;

    const ratio = getContrastRatio(fgValue, bgValue);

    if (ratio === null) {
      // Non-hex after resolution — skip (caught by format validator)
      skipped++;
      continue;
    }

    const meetsStandard = type === 'text' ? meetsWCAG_AA_Text(ratio) : meetsWCAG_AA_UI(ratio);

    if (!meetsStandard) {
      violations.push({
        foreground: fgName,
        background: bgName,
        ratio: Math.round(ratio * 100) / 100,
        required: type === 'text' ? 4.5 : 3.0,
        type,
        mode,
      });
    }
  }

  return {
    mode,
    valid: violations.length === 0,
    violations,
    totalChecks: colorPairs.length - skipped,
    skipped,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Validate WCAG AA contrast for a theme CSS file across all its modes.
 *
 * @param themePath  Absolute or relative path to the theme CSS file.
 */
export async function validateA11y(themePath: string): Promise<A11yResult> {
  const colorPairs = await getColorPairsToCheck();
  const baseTokens = loadBaseTokens();

  const themeContent = readFileSync(themePath, 'utf-8');
  const themeModeMap = parseThemeFileByMode(themeContent);

  const modes: A11yModeResult[] = [];

  for (const mode of ['light', 'dark', 'high-contrast'] as const) {
    const themeTokens = themeModeMap.get(mode);
    if (!themeTokens) continue; // Mode not present in this file — skip silently

    // Merge: base first, then theme overrides on top (mirrors browser cascade)
    const merged: TokenMap = new Map([...baseTokens, ...themeTokens]);

    modes.push(validateMode(merged, mode, colorPairs));
  }

  const totalViolations = modes.reduce((sum, m) => sum + m.violations.length, 0);

  return {
    valid: modes.every((m) => m.valid),
    modes,
    totalViolations,
  };
}
