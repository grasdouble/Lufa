#!/usr/bin/env node

/**
 * Lufa Design System - Theme Validation CLI
 *
 * Validates custom themes against Lufa Design System requirements
 */
import { readFile } from 'fs/promises';
import chalk from 'chalk';
import { Command } from 'commander';

import { parseCSSFile } from './utils/parse-css.js';
import { validateCompleteness } from './validators/completeness.js';
import { validateContrast } from './validators/contrast.js';
import { validateFormat } from './validators/format.js';

const program = new Command();

type CLIOptions = {
  template?: boolean;
  verbose?: boolean;
  color?: boolean;
};

program
  .name('lufa-validate-theme')
  .description('Validate a custom theme for Lufa Design System')
  .version('0.1.0')
  .argument('[theme-file]', 'Path to the theme CSS file to validate')
  .option('-t, --template', 'Output a theme template instead of validating')
  .option('-v, --verbose', 'Show detailed validation output')
  .option('--no-color', 'Disable colored output')
  .action(async (themeFile: string | undefined, options: CLIOptions) => {
    try {
      // Handle --template option
      if (options.template) {
        await outputTemplate();
        return;
      }

      // Validate that theme file was provided
      if (!themeFile) {
        console.error(chalk.red('✗ Error: Theme file path is required'));
        console.log('');
        console.log('Usage: lufa-validate-theme <theme-file>');
        console.log('   or: lufa-validate-theme --template');
        process.exit(2);
      }

      // Parse the theme CSS file
      console.log(chalk.cyan(`🔍 Validating theme: ${themeFile}\n`));

      const properties = await parseCSSFile(themeFile);
      console.log(chalk.gray(`Found ${properties.length} custom properties\n`));

      // Run all validations
      let hasErrors = false;

      // 1. Completeness validation
      console.log(chalk.bold('1. Completeness Check'));
      const completenessResult = await validateCompleteness(properties);

      if (completenessResult.valid) {
        console.log(chalk.green(`✓ All ${completenessResult.totalRequired} required tokens are defined`));
      } else {
        hasErrors = true;
        console.log(
          chalk.red(
            `✗ Missing ${completenessResult.missingTokens.length} tokens ` +
              `(${completenessResult.totalDefined}/${completenessResult.totalRequired})`
          )
        );

        if (options.verbose || completenessResult.missingTokens.length <= 10) {
          console.log(chalk.gray('  Missing tokens:'));
          completenessResult.missingTokens.slice(0, 10).forEach((token) => {
            console.log(chalk.gray(`    - ${token}`));
          });
          if (completenessResult.missingTokens.length > 10) {
            console.log(chalk.gray(`    ... and ${completenessResult.missingTokens.length - 10} more`));
          }
        }
      }
      console.log('');

      // 2. Contrast validation
      console.log(chalk.bold('2. Contrast Check (WCAG AA)'));
      const contrastResult = validateContrast(properties);

      if (contrastResult.valid) {
        console.log(chalk.green(`✓ All ${contrastResult.totalChecks} color pairs meet WCAG AA standards`));
      } else {
        hasErrors = true;
        console.log(chalk.red(`✗ ${contrastResult.violations.length} contrast violations found`));

        if (options.verbose || contrastResult.violations.length <= 5) {
          console.log(chalk.gray('  Violations:'));
          contrastResult.violations.slice(0, 5).forEach((violation) => {
            console.log(
              chalk.gray(
                `    - ${violation.foreground} on ${violation.background}: ` +
                  `${violation.ratio}:1 (needs ${violation.required}:1 for ${violation.type})`
              )
            );
          });
          if (contrastResult.violations.length > 5) {
            console.log(chalk.gray(`    ... and ${contrastResult.violations.length - 5} more`));
          }
        }
      }
      console.log('');

      // 3. Format validation
      console.log(chalk.bold('3. Format Check'));
      const formatResult = validateFormat(properties);

      if (formatResult.valid) {
        console.log(chalk.green(`✓ All ${formatResult.totalChecked} token values have valid formats`));
      } else {
        hasErrors = true;
        console.log(chalk.red(`✗ ${formatResult.errors.length} format errors found`));

        if (options.verbose || formatResult.errors.length <= 5) {
          console.log(chalk.gray('  Errors:'));
          formatResult.errors.slice(0, 5).forEach((error) => {
            console.log(
              chalk.gray(
                `    - ${error.token} (line ${error.line}): "${error.value}" ` + `(expected: ${error.expectedFormat})`
              )
            );
          });
          if (formatResult.errors.length > 5) {
            console.log(chalk.gray(`    ... and ${formatResult.errors.length - 5} more`));
          }
        }
      }
      console.log('');

      // Final result
      if (hasErrors) {
        console.log(chalk.red.bold('❌ Theme validation failed\n'));
        console.log(chalk.gray('Run with --verbose to see all errors'));
        process.exit(1);
      } else {
        console.log(chalk.green.bold('✅ Theme is valid!\n'));
        process.exit(0);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(`✗ Error: ${error.message}`));
      } else {
        console.error(chalk.red('✗ An unexpected error occurred'));
      }
      process.exit(2);
    }
  });

/**
 * Output the theme template
 */
async function outputTemplate() {
  try {
    // Read the template file from dist/templates (after build)
    // The path is relative to the compiled cli.js file in dist/
    const templatePath = new URL('./templates/theme-template.css', import.meta.url);
    const template = await readFile(templatePath, 'utf-8');
    console.log(template);
  } catch (error) {
    console.error(chalk.red('✗ Failed to load theme template'));
    if (error instanceof Error) {
      console.error(chalk.gray(error.message));
    }
    process.exit(2);
  }
}

const argv = process.argv.slice(2);
const normalizedArgs = argv[0] === '--' ? argv.slice(1) : argv;
program.parse(normalizedArgs, { from: 'user' });
