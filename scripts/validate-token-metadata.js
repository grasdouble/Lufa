#!/usr/bin/env node

/**
 * Token Metadata Validator (ADR-011 Compatible)
 *
 * This is a wrapper script that calls the token consistency validator
 * from the design-system/tokens package. It validates:
 * - Primitives must be immutable (themeable: false, modeAware: false)
 * - Only modeAware tokens can have modes object
 * - Layout tokens must be structural constants
 * - Tokens with modes must have all three: light, dark, high-contrast
 * - No usage of deprecated "themable" typo
 *
 * @see ADR-011: Token Architecture - Primitives as Immutable Constants
 * @see packages/design-system/tokens/build/validators/token-consistency.js
 */
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { validateTokenFiles } from '../packages/design-system/tokens/build/validators/token-consistency.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Token source directory
const tokensDir = join(__dirname, '../packages/design-system/tokens/src');

// Run validation
const exitCode = validateTokenFiles(tokensDir);
process.exit(exitCode);
