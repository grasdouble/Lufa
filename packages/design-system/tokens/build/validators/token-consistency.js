/**
 * Token Consistency Validator
 *
 * Enforces architectural rules for token metadata:
 * - Primitives must be immutable (themeable: false, modeAware: false)
 * - Only modeAware tokens can have modes object
 * - Layout tokens must be structural constants
 * - Tokens with modes must have all three: light, dark, high-contrast
 * - Tokens cannot be both fluid AND responsive (mutually exclusive)
 *
 * @see ADR-011: Token Architecture - Primitives as Immutable Constants
 * @see ADR-006: Responsive Spacing Architecture
 * @see ADR-008: Responsive Typography Strategy
 * @see docs/FLUID_VS_RESPONSIVE.md
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

class ValidationError extends Error {
  constructor(message, tokenPath, file) {
    super(message);
    this.tokenPath = tokenPath;
    this.file = file;
    this.name = 'ValidationError';
  }
}

/**
 * Recursively find all .json files in a directory
 */
function findJsonFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findJsonFiles(filePath, fileList);
    } else if (extname(file) === '.json') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Recursively validate all tokens in an object
 */
function validateTokens(obj, path = [], file = '', errors = []) {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...path, key];

    // Skip metadata keys
    if (key.startsWith('$')) {
      continue;
    }

    // If this is a token (has $value or $extensions)
    if (value && typeof value === 'object') {
      if ('$value' in value || '$extensions' in value) {
        try {
          validateToken(value, currentPath, file);
        } catch (error) {
          errors.push(error);
        }
      }

      // Recurse into nested objects
      if (!('$value' in value)) {
        validateTokens(value, currentPath, file, errors);
      }
    }
  }

  return errors;
}

/**
 * Validate a single token's metadata
 */
function validateToken(token, path, file) {
  const extensions = token.$extensions?.lufa;

  if (!extensions) {
    // No lufa extensions - skip validation
    return;
  }

  const { level, themeable, modeAware, modes, themes, fluid, responsive } = extensions;
  const tokenPath = path.join('.');

  // Rule 1: Primitives cannot be themeable or mode-aware
  if (level === 'primitive') {
    if (themeable === true) {
      throw new ValidationError(
        `Primitive token "${tokenPath}" cannot have themeable=true. Primitives are immutable constants.`,
        tokenPath,
        file
      );
    }

    if (modeAware === true) {
      throw new ValidationError(
        `Primitive token "${tokenPath}" cannot have modeAware=true. Primitives do not vary by mode.`,
        tokenPath,
        file
      );
    }

    if (modes) {
      throw new ValidationError(
        `Primitive token "${tokenPath}" cannot have a modes object. Mode switching happens at semantic layer.`,
        tokenPath,
        file
      );
    }
  }

  // Rule 2: Only modeAware tokens can have modes object
  if (modes && modeAware !== true) {
    throw new ValidationError(
      `Token "${tokenPath}" has a modes object but modeAware is not true. Set modeAware: true or remove modes.`,
      tokenPath,
      file
    );
  }

  // Rule 3: Only themeable tokens can have themes object
  if (themes && themeable !== true) {
    throw new ValidationError(
      `Token "${tokenPath}" has a themes object but themeable is not true. Set themeable: true or remove themes.`,
      tokenPath,
      file
    );
  }

  // Rule 4: Layout tokens must be structural constants
  if (level === 'layout') {
    if (themeable === true) {
      throw new ValidationError(
        `Layout token "${tokenPath}" cannot have themeable=true. Layout tokens are structural constants.`,
        tokenPath,
        file
      );
    }

    if (modeAware === true) {
      throw new ValidationError(
        `Layout token "${tokenPath}" cannot have modeAware=true. Layout tokens do not vary by mode.`,
        tokenPath,
        file
      );
    }
  }

  // Rule 5: Tokens with modes must have all three: light, dark, high-contrast
  if (modes) {
    const requiredModes = ['light', 'dark', 'high-contrast'];
    const missingModes = requiredModes.filter((mode) => !(mode in modes));

    if (missingModes.length > 0) {
      throw new ValidationError(
        `Token "${tokenPath}" is missing required modes: ${missingModes.join(', ')}. All mode-aware tokens must define light, dark, and high-contrast.`,
        tokenPath,
        file
      );
    }
  }

  // Rule 6: Check for old typo "themable" (should be "themeable")
  if ('themable' in extensions) {
    throw new ValidationError(
      `Token "${tokenPath}" uses deprecated "themable" (typo). Use "themeable" instead.`,
      tokenPath,
      file
    );
  }

  // Rule 7: Tokens cannot be both fluid AND responsive (mutually exclusive)
  // @see ADR-006 (Responsive Spacing) and ADR-008 (Fluid Typography)
  // @see docs/FLUID_VS_RESPONSIVE.md for explanation
  if (fluid === true && responsive !== undefined) {
    throw new ValidationError(
      `Token "${tokenPath}" cannot be both fluid (CSS clamp) AND responsive (media queries). These approaches are mutually exclusive. Use fluid for typography scaling, responsive for layout spacing. See docs/FLUID_VS_RESPONSIVE.md`,
      tokenPath,
      file
    );
  }
}

/**
 * Main validation function
 */
function validateTokenFiles(srcDir) {
  console.log(`${colors.cyan}🔍 Token Consistency Validator${colors.reset}`);
  console.log(`${colors.blue}Scanning: ${srcDir}${colors.reset}\n`);

  const startTime = Date.now();
  const jsonFiles = findJsonFiles(srcDir);
  let totalErrors = [];

  console.log(`Found ${jsonFiles.length} token files\n`);

  jsonFiles.forEach((file) => {
    try {
      const content = readFileSync(file, 'utf-8');
      const tokens = JSON.parse(content);
      const errors = validateTokens(tokens, [], file);

      if (errors.length > 0) {
        totalErrors = [...totalErrors, ...errors];
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(`${colors.red}✗ Invalid JSON in ${file}${colors.reset}`);
        totalErrors.push(error);
      } else if (!(error instanceof ValidationError)) {
        console.error(`${colors.red}✗ Error processing ${file}:${colors.reset}`, error.message);
        totalErrors.push(error);
      }
    }
  });

  const duration = Date.now() - startTime;

  // Print results
  console.log(`\n${'─'.repeat(60)}\n`);

  if (totalErrors.length === 0) {
    console.log(`${colors.green}✓ All tokens valid!${colors.reset}`);
    console.log(`${colors.green}✓ Validated ${jsonFiles.length} files in ${duration}ms${colors.reset}\n`);
    return 0;
  } else {
    console.error(`${colors.red}✗ Found ${totalErrors.length} validation error(s):${colors.reset}\n`);

    totalErrors.forEach((error, index) => {
      if (error instanceof ValidationError) {
        console.error(`${colors.yellow}${index + 1}.${colors.reset} ${colors.red}${error.message}${colors.reset}`);
        console.error(`   File: ${colors.cyan}${error.file}${colors.reset}`);
        console.error(`   Path: ${colors.blue}${error.tokenPath}${colors.reset}\n`);
      } else {
        console.error(`${colors.yellow}${index + 1}.${colors.reset} ${error.message}\n`);
      }
    });

    console.error(`${colors.red}Validation failed in ${duration}ms${colors.reset}\n`);
    return 1;
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const srcDir = join(__dirname, '../../src');
  const exitCode = validateTokenFiles(srcDir);
  process.exit(exitCode);
}

export { validateTokenFiles, validateToken, ValidationError };
