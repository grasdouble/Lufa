/**
 * Token Consistency Validator - Simplified Version
 *
 * Enforces simplified architectural rules:
 *
 * 1. Primitives cannot have modes (always immutable)
 * 2. Layout tokens cannot have modes (structural constants)
 * 3. If modes exists, must have at least 'dark' mode
 * 4. No 'light' in modes (it's implicit = $value)
 * 5. No 'themable' typo (deprecated)
 * 6. No explicit 'level' (inferred from path)
 * 7. No 'modeAware' flag (inferred from modes presence)
 * 8. Tokens cannot be both fluid AND responsive
 *
 * @see ADR-013: Token Metadata Simplification
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
 * Infer token level from path
 */
function inferLevel(path) {
  if (!path || path.length === 0) return null;
  const firstSegment = path[0].toLowerCase();

  if (['primitive', 'primitives'].includes(firstSegment)) return 'primitive';
  if (['core'].includes(firstSegment)) return 'core';
  if (['semantic'].includes(firstSegment)) return 'semantic';
  if (['component', 'components'].includes(firstSegment)) return 'component';
  if (['layout'].includes(firstSegment)) return 'layout';

  return null;
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
  const tokenPath = path.join('.');
  const level = inferLevel(path);

  if (!extensions) {
    // No lufa extensions - skip validation
    return;
  }

  const { modes, themes, fluid, responsive } = extensions;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 1: Primitives CANNOT have modes (always immutable)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (level === 'primitive' && modes) {
    throw new ValidationError(
      `Primitive token "${tokenPath}" cannot have modes. Primitives are immutable constants. Mode switching happens at core/semantic layer.`,
      tokenPath,
      file
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 2: Layout tokens CANNOT have modes (structural constants)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (level === 'layout' && modes) {
    throw new ValidationError(
      `Layout token "${tokenPath}" cannot have modes. Layout tokens are structural constants.`,
      tokenPath,
      file
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 3: If modes exists, must have at least 'dark' mode
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (modes) {
    if (!modes.dark) {
      throw new ValidationError(
        `Token "${tokenPath}" has modes but missing 'dark'. All mode-aware tokens must define at least dark mode.`,
        tokenPath,
        file
      );
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 4: No 'light' in modes (it's implicit = $value)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (modes?.light) {
    throw new ValidationError(
      `Token "${tokenPath}" has modes.light but this is redundant. Light mode is implicit (= $value). Remove modes.light.`,
      tokenPath,
      file
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 5: No 'themable' typo (deprecated)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if ('themable' in extensions) {
    throw new ValidationError(
      `Token "${tokenPath}" uses deprecated "themable" (typo). Remove this property - it's no longer used.`,
      tokenPath,
      file
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 6: No explicit 'level' (inferred from path)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if ('level' in extensions) {
    throw new ValidationError(
      `Token "${tokenPath}" has explicit 'level' property but this is inferred from path. Remove it. Inferred level: "${level}"`,
      tokenPath,
      file
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 7: No 'modeAware' flag (inferred from modes presence)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if ('modeAware' in extensions) {
    throw new ValidationError(
      `Token "${tokenPath}" has 'modeAware' flag but this is inferred from presence of 'modes' object. Remove it.`,
      tokenPath,
      file
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 8: No 'themeable' on primitives (always false)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (level === 'primitive' && 'themeable' in extensions) {
    throw new ValidationError(
      `Primitive token "${tokenPath}" has 'themeable' property but primitives are always immutable. Remove it.`,
      tokenPath,
      file
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 9: Tokens cannot be both fluid AND responsive
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (fluid === true && responsive !== undefined) {
    throw new ValidationError(
      `Token "${tokenPath}" cannot be both fluid (CSS clamp) AND responsive (media queries). These approaches are mutually exclusive.`,
      tokenPath,
      file
    );
  }
}

/**
 * Main validation function
 */
function validateTokenFiles(srcDir) {
  console.log(`${colors.cyan}🔍 Token Consistency Validator (Simplified)${colors.reset}`);
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

export { validateTokenFiles, validateToken, ValidationError, inferLevel };
