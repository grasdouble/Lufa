#!/usr/bin/env node

/**
 * Lufa Design System CLI
 *
 * Commands:
 *   lufa-ds-cli validate <theme-file>                  All checks (completeness + format + a11y)
 *   lufa-ds-cli validate <theme-file> --a11y            WCAG AA contrast check only
 *   lufa-ds-cli validate <theme-file> --format          Format check only
 *   lufa-ds-cli validate <theme-file> --completeness    Completeness check only
 *   lufa-ds-cli validate --dir <directory>              All checks on every CSS file in a directory
 *   lufa-ds-cli validate --a11y --dir <directory>       A11y check only on every CSS file in a directory
 *   lufa-ds-cli template [level] [--output-name <name>] Create a theme CSS file in the CWD
 */
import { readFile } from 'fs/promises';
import { readdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { resolve as resolvePath } from 'node:path';
import { createInterface } from 'node:readline/promises';
import chalk from 'chalk';
import { Command } from 'commander';

import type { A11yResult } from './validators/a11y.js';
import { parseCSSFile } from './utils/parse-css.js';
import { validateA11y } from './validators/a11y.js';
import { validateCompleteness } from './validators/completeness.js';
import { validateFormat } from './validators/format.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TemplateLevel = 'starter' | 'extended' | 'advanced';

type ValidateOptions = {
  a11y?: boolean;
  format?: boolean;
  completeness?: boolean;
  dir?: string;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TEMPLATE_LEVELS: TemplateLevel[] = ['starter', 'extended', 'advanced'];

const TEMPLATE_EXPORT_MAP: Record<TemplateLevel, string> = {
  starter: '@grasdouble/lufa_design-system-tokens/themeable-starter',
  extended: '@grasdouble/lufa_design-system-tokens/themeable-extended',
  advanced: '@grasdouble/lufa_design-system-tokens/themeable-advanced',
};

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function handleFatalError(error: unknown): never {
  if (error instanceof Error) {
    console.error(chalk.red(`✗ Error: ${error.message}`));
  } else {
    console.error(chalk.red('✗ An unexpected error occurred'));
  }
  process.exit(2);
}

async function promptOutputName(): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question('Output file name (without .css): ');
  rl.close();
  return answer.trim();
}

function resolveFiles(themeFile: string | undefined, dir: string | undefined): string[] {
  if (dir) {
    const entries = readdirSync(dir).filter((f) => f.endsWith('.css'));
    if (entries.length === 0) {
      console.error(chalk.red(`✗ No CSS files found in: ${dir}`));
      process.exit(2);
    }
    return entries.map((f) => resolvePath(dir, f));
  }

  if (themeFile) {
    return [themeFile];
  }

  console.error(chalk.red('✗ Provide a <theme-file> or use --dir <directory>'));
  process.exit(2);
}

// ---------------------------------------------------------------------------
// Display helpers
// ---------------------------------------------------------------------------

function printA11yResult(a11yResult: A11yResult): void {
  for (const modeResult of a11yResult.modes) {
    const modeLabel = `[${modeResult.mode}]`;

    if (modeResult.valid) {
      const skipNote = modeResult.skipped > 0 ? chalk.gray(` (${modeResult.skipped} skipped)`) : '';
      console.log(chalk.green(`  ✓ ${modeLabel} ${modeResult.totalChecks} checks passed`) + skipNote);
    } else {
      console.log(
        chalk.red(`  ✗ ${modeLabel} ${modeResult.violations.length} violation(s)`) +
          chalk.gray(` (${modeResult.totalChecks} checks, ${modeResult.skipped} skipped)`)
      );
      for (const { foreground, background, ratio, required, type } of modeResult.violations) {
        const standard = type === 'text' ? 'Text' : 'UI';
        console.log(
          chalk.red(`      ${foreground} on ${background} — ${ratio}:1 (needs ${required}:1 WCAG AA ${standard})`)
        );
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Business logic — validate checks
// ---------------------------------------------------------------------------

async function runCheckAll(file: string): Promise<boolean> {
  const properties = await parseCSSFile(file);
  const [completenessResult, a11yResult] = await Promise.all([validateCompleteness(properties), validateA11y(file)]);
  const formatResult = validateFormat(properties);

  // Completeness
  if (!completenessResult.valid) {
    completenessResult.missingTokens.forEach((token) => console.log(chalk.red(`  ✗ Missing required token: ${token}`)));
  } else {
    console.log(chalk.green(`  ✓ Completeness — all required tokens present`));
  }

  if (completenessResult.extraTokens.length > 0) {
    completenessResult.extraTokens.forEach((token) =>
      console.log(chalk.yellow(`  ⚠ Extra token (not in design system): ${token}`))
    );
  }

  // Format
  if (!formatResult.valid) {
    formatResult.errors.forEach(({ token, line, expectedFormat }) =>
      console.log(chalk.red(`  ✗ ${token} (line ${line}): Invalid format — ${expectedFormat}`))
    );
  } else {
    console.log(chalk.green(`  ✓ Format — all token values are valid`));
  }

  // A11y (detailed per mode)
  console.log('');
  console.log(chalk.bold('  A11y (WCAG AA):'));
  printA11yResult(a11yResult);

  return completenessResult.valid && formatResult.valid && a11yResult.valid;
}

async function runCheckA11y(file: string): Promise<boolean> {
  const a11yResult = await validateA11y(file);
  printA11yResult(a11yResult);
  return a11yResult.valid;
}

async function runCheckFormat(file: string): Promise<boolean> {
  const properties = await parseCSSFile(file);
  const formatResult = validateFormat(properties);

  if (!formatResult.valid) {
    formatResult.errors.forEach(({ token, line, expectedFormat }) =>
      console.log(chalk.red(`  ✗ ${token} (line ${line}): Invalid format — ${expectedFormat}`))
    );
  } else {
    console.log(chalk.green(`  ✓ All token values are valid`));
  }

  return formatResult.valid;
}

async function runCheckCompleteness(file: string): Promise<boolean> {
  const properties = await parseCSSFile(file);
  const completenessResult = await validateCompleteness(properties);

  if (!completenessResult.valid) {
    completenessResult.missingTokens.forEach((token) => console.log(chalk.red(`  ✗ Missing required token: ${token}`)));
  } else {
    console.log(chalk.green(`  ✓ All required tokens are present`));
  }

  if (completenessResult.extraTokens.length > 0) {
    completenessResult.extraTokens.forEach((token) =>
      console.log(chalk.yellow(`  ⚠ Extra token (not in design system): ${token}`))
    );
  }

  return completenessResult.valid;
}

function selectCheck(options: ValidateOptions): (file: string) => Promise<boolean> {
  if (options.a11y) return runCheckA11y;
  if (options.format) return runCheckFormat;
  if (options.completeness) return runCheckCompleteness;
  return runCheckAll;
}

// ---------------------------------------------------------------------------
// Business logic — template command
// ---------------------------------------------------------------------------

async function runTemplate(level: TemplateLevel, outputName: string): Promise<void> {
  const exportPath = TEMPLATE_EXPORT_MAP[level];
  const templatePath = new URL(import.meta.resolve(exportPath));
  const content = await readFile(templatePath, 'utf-8');

  const fileName = `${outputName}.css`;
  const outputPath = resolvePath(process.cwd(), fileName);

  await writeFile(outputPath, content, 'utf-8');
  console.log(chalk.green(`✓ Created ${fileName}`));
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const program = new Command();

program
  .name('lufa-ds-cli')
  .description('Lufa Design System CLI')
  .version('0.1.0')
  .enablePositionalOptions()
  .addHelpCommand(true);

// ---------------------------------------------------------------------------
// Sub-command: validate
// ---------------------------------------------------------------------------

program
  .command('validate [theme-file]')
  .description('Validate a theme CSS file against Lufa Design System requirements')
  .option('--a11y', 'Run WCAG AA contrast check only')
  .option('--format', 'Run format check only')
  .option('--completeness', 'Run completeness check only')
  .option('-d, --dir <directory>', 'Validate all *.css files in a directory')
  .action(async (themeFile: string | undefined, options: ValidateOptions) => {
    try {
      const files = resolveFiles(themeFile, options.dir);
      const runCheck = selectCheck(options);

      let allValid = true;

      for (const file of files) {
        const fileLabel = files.length > 1 ? chalk.bold(file.split('/').pop()) : file;
        console.log(chalk.cyan(`🔍 ${fileLabel}\n`));

        const valid = await runCheck(file);
        if (!valid) allValid = false;

        console.log('');
      }

      if (allValid) {
        console.log(chalk.green.bold('✅ All checks passed!\n'));
        process.exit(0);
      } else {
        console.log(chalk.red.bold('❌ Validation failed\n'));
        process.exit(1);
      }
    } catch (error) {
      handleFatalError(error);
    }
  });

// ---------------------------------------------------------------------------
// Sub-command: template
// ---------------------------------------------------------------------------

program
  .command('template [level]')
  .description(`Create a theme CSS file in the current directory (levels: ${TEMPLATE_LEVELS.join(', ')})`)
  .option('-o, --output-name <name>', 'Output file name without the .css extension')
  .action(async (levelArg: string | undefined, options: { outputName?: string }) => {
    try {
      const level: TemplateLevel = (levelArg as TemplateLevel) ?? 'starter';
      if (!TEMPLATE_LEVELS.includes(level)) {
        console.error(chalk.red(`✗ Invalid level: "${levelArg}". Must be one of: ${TEMPLATE_LEVELS.join(', ')}`));
        process.exit(2);
      }

      const outputName = options.outputName ?? (await promptOutputName());
      if (!outputName) {
        console.error(chalk.red('✗ Output file name is required'));
        process.exit(2);
      }

      await runTemplate(level, outputName);
    } catch (error) {
      handleFatalError(error);
    }
  });

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const argv = process.argv.slice(2);
const normalizedArgs = argv[0] === '--' ? argv.slice(1) : argv;
program.parse(normalizedArgs, { from: 'user' });
