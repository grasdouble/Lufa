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
 * 9. No 'themeable' on primitives (always immutable)
 * 10. Primitives cannot reference other primitives (no-primitive-self-references)
 * 11. Reference hierarchy chain must be respected (hierarchy-chain-validation)
 * 12. No raw hex colors outside primitives (no-raw-hex-colors-outside-primitives)
 * 13. Component z-index must reference semantic tokens (z-index-must-reference-semantic)
 * 14. If 'themeable' is true, 'themeLevel' must be defined
 * 15. If 'themeLevel' is defined, 'themeable' must be true
 * 16. 'themeLevel' must be one of: starter | extended | advanced
 *
 * @see ADR-013: Token Metadata Simplification
 * @see ADR-014: Non-color primitive reference exception
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

class ValidationWarning extends Error {
  constructor(message, tokenPath, file) {
    super(message);
    this.tokenPath = tokenPath;
    this.file = file;
    this.name = 'ValidationWarning';
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
 * Extract all {reference.path} tokens from a string value
 */
function extractReferences(value) {
  const refs = [];
  const regex = /\{([^}]+)\}/g;
  let match;
  while ((match = regex.exec(value)) !== null) {
    refs.push(match[1]);
  }
  return refs;
}

/**
 * Check if a reference violates the hierarchy chain for a given level.
 * Returns a violation message string, or null if the reference is valid.
 *
 * ADR-014 exception: Semantic tokens MAY reference non-color primitives
 * directly (spacing, radius, motion, etc.). Only `primitive.color.*`
 * references must go through the core layer.
 */
function checkHierarchyViolation(level, ref) {
  const refParts = ref.split('.');
  const refLevel = refParts[0].toLowerCase();
  const normalizedRefLevel =
    refLevel === 'primitives' ? 'primitive' : refLevel === 'components' ? 'component' : refLevel;

  if (level === 'component') {
    // component → {semantic.*} or {component.*} (self-level OK)
    if (normalizedRefLevel !== 'semantic' && normalizedRefLevel !== 'component') {
      return `Component tokens should reference {semantic.*} or {component.*}, not {${ref}}.`;
    }
  } else if (level === 'semantic') {
    // semantic → {core.*} or {semantic.*} (self-level OK)
    // Exception (ADR-014): MAY reference {primitive.*} for non-color categories
    if (normalizedRefLevel === 'primitive') {
      const refCategory = refParts.length > 1 ? refParts[1].toLowerCase() : '';
      if (refCategory === 'color') {
        return `Semantic tokens should reference {core.*} or {semantic.*}. Color primitives MUST go through the core layer (ADR-014).`;
      }
      // Non-color primitive — ADR-014 exception applies
      return null;
    }
    if (normalizedRefLevel !== 'core' && normalizedRefLevel !== 'semantic') {
      return `Semantic tokens should reference {core.*} or {semantic.*}, not {${ref}}.`;
    }
  } else if (level === 'core') {
    // core → {primitive.*} or {core.*} (self-level OK)
    if (normalizedRefLevel !== 'primitive' && normalizedRefLevel !== 'core') {
      return `Core tokens should reference {primitive.*} or {core.*}, not {${ref}}.`;
    }
  }

  return null;
}

/**
 * Check if a string value contains a raw hex color (#xxx or #xxxxxx)
 */
function containsRawHexColor(value) {
  // Match standalone hex colors: #RGB, #RGBA, #RRGGBB, #RRGGBBAA
  return /(?:^|[^&])#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?:\b|$)/.test(value);
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
function validateTokens(obj, path = [], file = '', errors = [], warnings = []) {
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
          const tokenWarnings = validateToken(value, currentPath, file);
          if (tokenWarnings && tokenWarnings.length > 0) {
            warnings.push(...tokenWarnings);
          }
        } catch (error) {
          errors.push(error);
        }
      }

      // Recurse into nested objects
      if (!('$value' in value)) {
        validateTokens(value, currentPath, file, errors, warnings);
      }
    }
  }

  return { errors, warnings };
}

/**
 * Validate a single token's metadata
 */
function validateToken(token, path, file) {
  const extensions = token.$extensions?.lufa;
  const tokenPath = path.join('.');
  const level = inferLevel(path);
  const warnings = [];

  if (!extensions) {
    // No lufa extensions - skip validation
    return warnings;
  }

  const { modes, fluid, responsive } = extensions;

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

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 10: Primitives cannot reference other primitives
  //          (no-primitive-self-references)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (level === 'primitive' && token.$value && typeof token.$value === 'string') {
    if (/\{primitive[s]?\./.test(token.$value)) {
      throw new ValidationError(
        `Primitive token "${tokenPath}" references another primitive via "${token.$value}". Primitives must define raw values only.`,
        tokenPath,
        file
      );
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 11: Reference hierarchy chain must be respected
  //          (hierarchy-chain-validation)
  //
  //  component → {semantic.*} or {component.*}
  //  semantic  → {core.*} or {semantic.*}
  //              Exception (ADR-014): MAY reference {primitive.*}
  //              for non-color categories (checked via ref category)
  //  core      → {primitive.*} or {core.*}
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (level && level !== 'primitive' && level !== 'layout') {
    const valuesToCheck = [];

    // Check $value
    if (token.$value && typeof token.$value === 'string') {
      valuesToCheck.push({ label: '$value', value: token.$value });
    }

    // Check mode values
    if (modes && typeof modes === 'object') {
      for (const [modeName, modeValue] of Object.entries(modes)) {
        if (typeof modeValue === 'string') {
          valuesToCheck.push({ label: `modes.${modeName}`, value: modeValue });
        }
      }
    }

    for (const { label, value } of valuesToCheck) {
      const refs = extractReferences(value);
      for (const ref of refs) {
        const violation = checkHierarchyViolation(level, ref);
        if (violation) {
          warnings.push(
            new ValidationWarning(
              `Token "${tokenPath}" (${level}) has ${label} referencing "${ref}" which violates the hierarchy chain. ${violation}`,
              tokenPath,
              file
            )
          );
        }
      }
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 12: No raw hex colors outside primitives
  //          (no-raw-hex-colors-outside-primitives)
  //
  //  Exception: clamp() values in core layout tokens
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (level && level !== 'primitive') {
    const valuesToCheck = [];

    if (token.$value && typeof token.$value === 'string') {
      valuesToCheck.push({ label: '$value', value: token.$value });
    }

    if (modes && typeof modes === 'object') {
      for (const [modeName, modeValue] of Object.entries(modes)) {
        if (typeof modeValue === 'string') {
          valuesToCheck.push({ label: `modes.${modeName}`, value: modeValue });
        }
      }
    }

    for (const { label, value } of valuesToCheck) {
      // Exception: clamp() values in core layout tokens are allowed
      if (level === 'core' && /clamp\(/.test(value)) {
        continue;
      }

      if (containsRawHexColor(value)) {
        warnings.push(
          new ValidationWarning(
            `Token "${tokenPath}" (${level}) has raw hex color in ${label}: "${value}". Non-primitive tokens should reference design tokens instead.`,
            tokenPath,
            file
          )
        );
      }
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 13: Component z-index must reference semantic tokens
  //          (z-index-must-reference-semantic)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (level === 'component' && path.some((seg) => seg.toLowerCase().includes('z-index'))) {
    if (token.$value && typeof token.$value === 'string') {
      if (!/{semantic\./.test(token.$value)) {
        warnings.push(
          new ValidationWarning(
            `Component token "${tokenPath}" contains a z-index that does not reference a semantic token. Got: "${token.$value}". Component z-index values should reference {semantic.*} tokens.`,
            tokenPath,
            file
          )
        );
      }
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 14: If 'themeable' is true, 'themeLevel' must be defined
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (extensions.themeable === true && !('themeLevel' in extensions)) {
    throw new ValidationError(
      `Token "${tokenPath}" has "themeable: true" but is missing "themeLevel". All themeable tokens must define a themeLevel (e.g. "starter", "advanced", "extended").`,
      tokenPath,
      file
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 15: If 'themeLevel' is defined, 'themeable' must be true
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if ('themeLevel' in extensions && extensions.themeable !== true) {
    throw new ValidationError(
      `Token "${tokenPath}" has "themeLevel" defined but "themeable" is not true. Remove "themeLevel" or set "themeable: true".`,
      tokenPath,
      file
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULE 16: 'themeLevel' must be one of: starter | extended | advanced
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const VALID_THEME_LEVELS = ['starter', 'extended', 'advanced'];
  if ('themeLevel' in extensions && !VALID_THEME_LEVELS.includes(extensions.themeLevel)) {
    throw new ValidationError(
      `Token "${tokenPath}" has invalid "themeLevel" value: "${extensions.themeLevel}". Must be one of: ${VALID_THEME_LEVELS.join(', ')}.`,
      tokenPath,
      file
    );
  }

  return warnings;
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
  let totalWarnings = [];

  console.log(`Found ${jsonFiles.length} token files\n`);

  jsonFiles.forEach((file) => {
    try {
      const content = readFileSync(file, 'utf-8');
      const tokens = JSON.parse(content);
      const { errors, warnings } = validateTokens(tokens, [], file);

      if (errors.length > 0) {
        totalErrors = [...totalErrors, ...errors];
      }
      if (warnings.length > 0) {
        totalWarnings = [...totalWarnings, ...warnings];
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

  if (totalWarnings.length > 0) {
    console.warn(`${colors.yellow}⚠ Found ${totalWarnings.length} validation warning(s):${colors.reset}\n`);

    totalWarnings.forEach((warning, index) => {
      if (warning instanceof ValidationWarning) {
        console.warn(`${colors.yellow}${index + 1}. ${warning.message}${colors.reset}`);
        console.warn(`   File: ${colors.cyan}${warning.file}${colors.reset}`);
        console.warn(`   Path: ${colors.blue}${warning.tokenPath}${colors.reset}\n`);
      } else {
        console.warn(`${colors.yellow}${index + 1}. ${warning.message}${colors.reset}\n`);
      }
    });
  }

  if (totalErrors.length === 0) {
    console.log(`${colors.green}✓ All tokens valid!${colors.reset}`);
    console.log(`${colors.green}✓ Validated ${jsonFiles.length} files in ${duration}ms${colors.reset}`);
    if (totalWarnings.length > 0) {
      console.log(`${colors.yellow}⚠ ${totalWarnings.length} warning(s) found (non-blocking)${colors.reset}`);
    }
    console.log('');
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

export {
  validateTokenFiles,
  validateToken,
  validateTokens,
  ValidationError,
  ValidationWarning,
  inferLevel,
  extractReferences,
  checkHierarchyViolation,
  containsRawHexColor,
};
