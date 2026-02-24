/**
 * Theme Accessibility Validation Script
 *
 * Validates that all theme CSS files meet WCAG 2.2 AA contrast requirements.
 *
 * Usage:
 *   tsx scripts/validate-a11y.ts                  # check all themes
 *   tsx scripts/validate-a11y.ts --theme ocean     # check one theme
 *   tsx scripts/validate-a11y.ts --verbose         # show resolved token values
 *
 * Checks performed per theme × mode (light / dark / high-contrast):
 *
 *   BLOCKING (failures → exit 1):
 *   - text-primary   on background     → AA  (4.5:1)
 *   - text-secondary on background     → AA  (4.5:1)
 *   - text-tertiary  on background     → AA-Large / UI (3:1)
 *   - text-primary   on surface        → AA  (4.5:1)
 *   - text-secondary on surface        → AA  (4.5:1)
 *   - brand-primary  on background     → AA  (4.5:1)  — links
 *   - brand-secondary on background    → AA  (4.5:1)  — secondary links/buttons
 *   - brand-visited  on background     → AA  (4.5:1)  — visited links
 *   - semantic-success  on success-subtle  → AA  (4.5:1)  — badges, alerts
 *   - semantic-error    on error-subtle    → AA  (4.5:1)  — badges, alerts
 *   - semantic-warning  on warning-subtle  → AA  (4.5:1)  — badges, alerts
 *   - semantic-info     on info-subtle     → AA  (4.5:1)  — badges, alerts
 *
 *   ADVISORY (failures → warning only, exit 0):
 *   - border-default on background     → UI component (3:1)
 *   - border-strong  on background     → UI component (3:1)
 *   Note: decorative borders are exempt from WCAG 1.4.11; advisory checks
 *   surface potential issues without breaking CI for intentional design choices.
 */

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const themeFilter = args.includes('--theme') ? args[args.indexOf('--theme') + 1] : null;
const verbose = args.includes('--verbose');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type WcagLevel = 'AA' | 'AA-Large' | 'AAA';

type ContrastPair = {
  label: string;
  fg: string; // CSS variable name (without --)
  bg: string;
  required: number; // minimum ratio
  level: WcagLevel;
  blocking: boolean; // false → advisory warning only
};

type CheckResult = {
  passed: boolean;
  label: string;
  fgValue: string;
  bgValue: string;
  ratio: number;
  required: number;
  level: WcagLevel;
  blocking: boolean;
  skipped: boolean;
  skipReason?: string;
};

type ModeReport = {
  mode: 'light' | 'dark' | 'high-contrast';
  results: CheckResult[];
  blockingPassed: boolean;
};

type ThemeReport = {
  theme: string;
  modes: ModeReport[];
  passed: boolean; // only considers blocking checks
};

// ---------------------------------------------------------------------------
// WCAG pairs to validate
// ---------------------------------------------------------------------------

const CONTRAST_PAIRS: ContrastPair[] = [
  {
    label: 'text-primary / background',
    fg: 'lufa-core-neutral-text-primary',
    bg: 'lufa-core-neutral-background',
    required: 4.5,
    level: 'AA',
    blocking: true,
  },
  {
    label: 'text-secondary / background',
    fg: 'lufa-core-neutral-text-secondary',
    bg: 'lufa-core-neutral-background',
    required: 4.5,
    level: 'AA',
    blocking: true,
  },
  {
    label: 'text-tertiary / background',
    fg: 'lufa-core-neutral-text-tertiary',
    bg: 'lufa-core-neutral-background',
    required: 3.0,
    level: 'AA-Large',
    blocking: true,
  },
  {
    label: 'text-primary / surface',
    fg: 'lufa-core-neutral-text-primary',
    bg: 'lufa-core-neutral-surface-default',
    required: 4.5,
    level: 'AA',
    blocking: true,
  },
  {
    label: 'text-secondary / surface',
    fg: 'lufa-core-neutral-text-secondary',
    bg: 'lufa-core-neutral-surface-default',
    required: 4.5,
    level: 'AA',
    blocking: true,
  },
  {
    label: 'brand-primary / background',
    fg: 'lufa-core-brand-primary-default',
    bg: 'lufa-core-neutral-background',
    required: 4.5,
    level: 'AA',
    blocking: true,
  },
  {
    label: 'brand-secondary / background',
    fg: 'lufa-core-brand-secondary-default',
    bg: 'lufa-core-neutral-background',
    required: 4.5,
    level: 'AA',
    blocking: true,
  },
  {
    label: 'brand-visited / background',
    fg: 'lufa-core-brand-accent-visited',
    bg: 'lufa-core-neutral-background',
    required: 4.5,
    level: 'AA',
    blocking: true,
  },
  // Semantic tokens: success/error/warning/info on their subtle backgrounds
  // Used in badges, alerts, banners - critical for status communication
  {
    label: 'semantic-success / success-subtle',
    fg: 'lufa-core-semantic-success-default',
    bg: 'lufa-core-semantic-success-subtle',
    required: 4.5,
    level: 'AA',
    blocking: true,
  },
  {
    label: 'semantic-error / error-subtle',
    fg: 'lufa-core-semantic-error-default',
    bg: 'lufa-core-semantic-error-subtle',
    required: 4.5,
    level: 'AA',
    blocking: true,
  },
  {
    label: 'semantic-warning / warning-subtle',
    fg: 'lufa-core-semantic-warning-default',
    bg: 'lufa-core-semantic-warning-subtle',
    required: 4.5,
    level: 'AA',
    blocking: true,
  },
  {
    label: 'semantic-info / info-subtle',
    fg: 'lufa-core-semantic-info-default',
    bg: 'lufa-core-semantic-info-subtle',
    required: 4.5,
    level: 'AA',
    blocking: true,
  },
  // Advisory: decorative borders may legitimately have lower contrast
  {
    label: 'border-default / background',
    fg: 'lufa-core-neutral-border-default',
    bg: 'lufa-core-neutral-background',
    required: 3.0,
    level: 'AA-Large',
    blocking: false,
  },
  {
    label: 'border-strong / background',
    fg: 'lufa-core-neutral-border-strong',
    bg: 'lufa-core-neutral-background',
    required: 3.0,
    level: 'AA-Large',
    blocking: false,
  },
];

// ---------------------------------------------------------------------------
// Color utilities
// ---------------------------------------------------------------------------

/**
 * Parse a hex color string (3, 6, or 8 digits) to [r, g, b].
 * 8-digit hex (with alpha channel) has its alpha stripped.
 */
function hexToRgb(hex: string): [number, number, number] | null {
  const cleaned = hex.trim().replace(/^#/, '');

  if (cleaned.length === 3) {
    return [
      parseInt(cleaned[0] + cleaned[0], 16),
      parseInt(cleaned[1] + cleaned[1], 16),
      parseInt(cleaned[2] + cleaned[2], 16),
    ];
  }

  if (cleaned.length === 6 || cleaned.length === 8) {
    // For 8-digit hex, ignore alpha (last 2 chars) — opaque rendering assumed
    return [parseInt(cleaned.slice(0, 2), 16), parseInt(cleaned.slice(2, 4), 16), parseInt(cleaned.slice(4, 6), 16)];
  }

  return null;
}

/** WCAG relative luminance (IEC 61966-2-1) */
function relativeLuminance(r: number, g: number, b: number): number {
  const linearize = (c: number): number => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/** WCAG contrast ratio between two hex colors */
function contrastRatio(hex1: string, hex2: string): number | null {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return null;
  const l1 = relativeLuminance(...rgb1);
  const l2 = relativeLuminance(...rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ---------------------------------------------------------------------------
// CSS parser
// ---------------------------------------------------------------------------

type ModeTokens = Map<string, string>; // varName → hexValue

/**
 * Parse a theme CSS file and extract token hex values per mode.
 *
 * Strategy: split the file into header+body blocks, extract data-mode from
 * any selector in the header. This is order-independent and handles both
 * single-selector and multi-selector blocks correctly.
 */
function parseThemeFile(filePath: string): Map<string, ModeTokens> {
  const content = readFileSync(filePath, 'utf-8');
  const modeMap = new Map<string, ModeTokens>();

  // Match CSS rule blocks: everything before { as header, content inside {} as body
  const blockPattern = /([^{]+)\{([^}]+)\}/g;
  let match: RegExpExecArray | null;

  while ((match = blockPattern.exec(content)) !== null) {
    const header = match[1];
    const body = match[2];

    // Isolate the actual CSS selector by stripping any preceding comments.
    // The header regex captures from the previous `}` (or file start), which
    // may include JSDoc/block comments that mention data-mode in usage examples.
    const lastCommentEnd = header.lastIndexOf('*/');
    const selector = lastCommentEnd >= 0 ? header.slice(lastCommentEnd + 2) : header;

    // Only process blocks containing at least one data-theme selector
    if (!selector.includes('data-theme')) continue;

    // Extract mode from any data-mode attribute present in the selector (order-independent)
    const modeMatch = /data-mode=['"]([^'"]+)['"]/.exec(selector);
    const mode = modeMatch ? modeMatch[1] : 'light';

    const tokens: ModeTokens = modeMap.get(mode) ?? new Map<string, string>();

    // Extract hex-valued --lufa-* variable declarations
    // Supports 3, 6, and 8-digit hex
    const varPattern = /--(lufa-[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3}(?:[0-9a-fA-F]{2})?)?)\b/g;
    let varMatch: RegExpExecArray | null;
    while ((varMatch = varPattern.exec(body)) !== null) {
      tokens.set(varMatch[1], varMatch[2]);
    }

    modeMap.set(mode, tokens);
  }

  return modeMap;
}

// ---------------------------------------------------------------------------
// Validator
// ---------------------------------------------------------------------------

const ALL_THEMES = [
  'coffee',
  'cyberpunk',
  'forest',
  'matrix',
  'nordic',
  'ocean',
  'steampunk',
  'sunset',
  'volcano',
  'volt',
] as const;

type ThemeName = (typeof ALL_THEMES)[number];

class A11yValidator {
  private srcDir: string;
  private themes: readonly ThemeName[];

  constructor(srcDir: string, themes: readonly ThemeName[]) {
    this.srcDir = srcDir;
    this.themes = themes;
  }

  public validate(): boolean {
    console.log('🎨 Lufa Theme Accessibility Validator');
    console.log('WCAG 2.2 AA — blocking checks + advisory border warnings\n');

    const reports: ThemeReport[] = [];
    for (const theme of this.themes) {
      reports.push(this.validateTheme(theme));
    }

    return this.printSummary(reports);
  }

  private validateTheme(theme: ThemeName): ThemeReport {
    const filePath = resolve(this.srcDir, `${theme}.css`);
    const modeMap = parseThemeFile(filePath);
    const modeReports: ModeReport[] = [];

    for (const mode of ['light', 'dark', 'high-contrast'] as const) {
      const tokens = modeMap.get(mode);
      if (!tokens) {
        console.warn(`  ⚠️  ${theme} [${mode}] — no CSS block found, skipping`);
        continue;
      }
      modeReports.push(this.validateMode(tokens, mode));
    }

    const passed = modeReports.every((m) => m.blockingPassed);
    return { theme, modes: modeReports, passed };
  }

  private validateMode(tokens: ModeTokens, mode: 'light' | 'dark' | 'high-contrast'): ModeReport {
    const results: CheckResult[] = [];

    for (const pair of CONTRAST_PAIRS) {
      const fgValue = tokens.get(pair.fg);
      const bgValue = tokens.get(pair.bg);

      if (!fgValue || !bgValue) {
        results.push({
          passed: true, // not a violation — just missing
          skipped: true,
          skipReason: !fgValue ? `token '--${pair.fg}' not found` : `token '--${pair.bg}' not found`,
          label: pair.label,
          fgValue: fgValue ?? '(missing)',
          bgValue: bgValue ?? '(missing)',
          ratio: 0,
          required: pair.required,
          level: pair.level,
          blocking: pair.blocking,
        });
        continue;
      }

      const ratio = contrastRatio(fgValue, bgValue);
      if (ratio === null) {
        results.push({
          passed: true,
          skipped: true,
          skipReason: `color format not supported (not hex): fg=${fgValue} bg=${bgValue}`,
          label: pair.label,
          fgValue,
          bgValue,
          ratio: 0,
          required: pair.required,
          level: pair.level,
          blocking: pair.blocking,
        });
        continue;
      }

      const rounded = Math.round(ratio * 100) / 100;
      results.push({
        passed: rounded >= pair.required,
        skipped: false,
        label: pair.label,
        fgValue,
        bgValue,
        ratio: rounded,
        required: pair.required,
        level: pair.level,
        blocking: pair.blocking,
      });
    }

    const blockingPassed = results.every((r) => r.skipped || !r.blocking || r.passed);
    return { mode, results, blockingPassed };
  }

  private printSummary(reports: ThemeReport[]): boolean {
    let totalBlockingFails = 0;
    let totalAdvisoryFails = 0;
    let totalSkipped = 0;

    for (const themeReport of reports) {
      const icon = themeReport.passed ? '✅' : '❌';
      console.log(`${icon} ${themeReport.theme.toUpperCase()}`);

      for (const modeReport of themeReport.modes) {
        const blockingFails = modeReport.results.filter((r) => !r.skipped && r.blocking && !r.passed);
        const advisoryFails = modeReport.results.filter((r) => !r.skipped && !r.blocking && !r.passed);
        const skipped = modeReport.results.filter((r) => r.skipped);

        if (blockingFails.length === 0 && advisoryFails.length === 0) {
          const skipNote = skipped.length > 0 ? ` (${skipped.length} skipped)` : '';
          console.log(`   ✓ [${modeReport.mode}] all checks passed${skipNote}`);
        } else {
          const parts: string[] = [];
          if (blockingFails.length > 0) parts.push(`${blockingFails.length} error(s)`);
          if (advisoryFails.length > 0) parts.push(`${advisoryFails.length} warning(s)`);
          console.log(`   ✗ [${modeReport.mode}] ${parts.join(', ')}:`);

          for (const f of blockingFails) {
            console.log(`     ❌ ${f.label.padEnd(34)} ${f.ratio}:1  (min ${f.required}:1 WCAG ${f.level})`);
            if (verbose) console.log(`        fg=${f.fgValue}  bg=${f.bgValue}`);
          }
          for (const f of advisoryFails) {
            console.log(
              `     ⚠️  ${f.label.padEnd(33)} ${f.ratio}:1  (min ${f.required}:1 WCAG ${f.level}) [advisory]`
            );
            if (verbose) console.log(`        fg=${f.fgValue}  bg=${f.bgValue}`);
          }

          totalBlockingFails += blockingFails.length;
          totalAdvisoryFails += advisoryFails.length;
        }

        if (verbose && skipped.length > 0) {
          for (const s of skipped) {
            console.log(`     ⏭  ${s.label}: ${s.skipReason}`);
          }
        }
        totalSkipped += skipped.length;
      }
      console.log('');
    }

    const passedThemes = reports.filter((r) => r.passed).length;
    const totalThemes = reports.length;
    const totalChecks = reports.flatMap((r) => r.modes.flatMap((m) => m.results)).length;

    console.log('='.repeat(60));
    console.log(`\n📊 ${passedThemes}/${totalThemes} themes compliant`);
    console.log(`   ${totalChecks - totalSkipped} checks run, ${totalSkipped} skipped (non-hex or missing token)`);
    if (totalAdvisoryFails > 0) {
      console.log(`   ${totalAdvisoryFails} advisory warning(s) — border contrast (WCAG 1.4.11 decorative exemption)`);
    }

    if (totalBlockingFails === 0) {
      console.log('\n🎉 All blocking checks passed!\n');
      return true;
    } else {
      console.log(`\n❌ ${totalBlockingFails} blocking violation(s) — fix required.\n`);
      return false;
    }
  }
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const srcDir = resolve(__dirname, '..', 'src');

const themesToCheck: readonly ThemeName[] = themeFilter ? ALL_THEMES.filter((t) => t === themeFilter) : ALL_THEMES;

if (themeFilter && themesToCheck.length === 0) {
  console.error(`❌ Unknown theme: "${themeFilter}". Available: ${ALL_THEMES.join(', ')}`);
  process.exit(1);
}

const validator = new A11yValidator(srcDir, themesToCheck);
const success = validator.validate();
process.exit(success ? 0 : 1);
