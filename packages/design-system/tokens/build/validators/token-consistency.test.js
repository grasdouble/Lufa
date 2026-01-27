/**
 * Test Suite for Token Consistency Validator
 * 
 * Tests all 6 validation rules:
 * 1. Primitives cannot be themeable or mode-aware
 * 2. Modes require modeAware
 * 3. Themes require themeable
 * 4. Layout tokens must be structural constants
 * 5. Tokens with modes must have all three: light, dark, high-contrast
 * 6. No typo "themable"
 * 
 * @see ADR-011: Token Architecture - Primitives as Immutable Constants
 */

import { validateToken, ValidationError } from './token-consistency.js';
import assert from 'assert';

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

// Test statistics
let passed = 0;
let failed = 0;
const startTime = Date.now();

/**
 * Test runner function
 */
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`${colors.green}✓${colors.reset} ${name}`);
  } catch (error) {
    failed++;
    console.error(`${colors.red}✗${colors.reset} ${name}`);
    console.error(`${colors.red}  ${error.message}${colors.reset}`);
    if (error.stack) {
      console.error(`${colors.dim}${error.stack}${colors.reset}`);
    }
  }
}

/**
 * Helper to assert validation error is thrown
 */
function assertValidationError(token, path, expectedMessageFragment) {
  try {
    validateToken(token, path, 'test.json');
    throw new Error('Expected validation to throw ValidationError');
  } catch (error) {
    assert(error instanceof ValidationError, `Expected ValidationError but got ${error.constructor.name}`);
    assert(
      error.message.includes(expectedMessageFragment),
      `Expected error message to include "${expectedMessageFragment}" but got: "${error.message}"`
    );
    assert.strictEqual(error.tokenPath, path.join('.'));
    assert.strictEqual(error.file, 'test.json');
  }
}

/**
 * Helper to assert validation passes
 */
function assertValidationPasses(token, path) {
  try {
    validateToken(token, path, 'test.json');
  } catch (error) {
    throw new Error(`Expected validation to pass but got error: ${error.message}`);
  }
}

console.log(`${colors.cyan}🧪 Token Consistency Validator Test Suite${colors.reset}\n`);

// ============================================================================
// RULE 1: Primitives Cannot Be Themeable or Mode-Aware
// ============================================================================

console.log(`${colors.yellow}Rule 1: Primitives Cannot Be Themeable or Mode-Aware${colors.reset}`);

test('Reject primitive with themeable: true', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'primitive',
        themeable: true,
        modeAware: false,
      },
    },
  };
  assertValidationError(token, ['primitive', 'color', 'blue', '600'], 'themeable=true');
});

test('Reject primitive with modeAware: true', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'primitive',
        themeable: false,
        modeAware: true,
      },
    },
  };
  assertValidationError(token, ['primitive', 'color', 'blue', '600'], 'modeAware=true');
});

test('Reject primitive with modes object', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'primitive',
        themeable: false,
        modeAware: false,
        modes: {
          light: '#2563eb',
          dark: '#3b82f6',
          'high-contrast': '#1e40af',
        },
      },
    },
  };
  assertValidationError(token, ['primitive', 'color', 'blue', '600'], 'modes object');
});

test('Accept primitive with themeable: false, modeAware: false', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'primitive',
        themeable: false,
        modeAware: false,
      },
    },
  };
  assertValidationPasses(token, ['primitive', 'color', 'blue', '600']);
});

// ============================================================================
// RULE 2: Modes Require modeAware
// ============================================================================

console.log(`\n${colors.yellow}Rule 2: Modes Require modeAware${colors.reset}`);

test('Reject token with modes but modeAware: false', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themeable: false,
        modeAware: false,
        modes: {
          light: '{color.blue.600}',
          dark: '{color.blue.400}',
          'high-contrast': '{color.blue.800}',
        },
      },
    },
  };
  assertValidationError(token, ['semantic', 'color', 'primary'], 'modeAware is not true');
});

test('Reject token with modes but modeAware undefined', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themeable: false,
        modes: {
          light: '{color.blue.600}',
          dark: '{color.blue.400}',
          'high-contrast': '{color.blue.800}',
        },
      },
    },
  };
  assertValidationError(token, ['semantic', 'color', 'primary'], 'modeAware is not true');
});

test('Accept token with modes and modeAware: true', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themeable: false,
        modeAware: true,
        modes: {
          light: '{color.blue.600}',
          dark: '{color.blue.400}',
          'high-contrast': '{color.blue.800}',
        },
      },
    },
  };
  assertValidationPasses(token, ['semantic', 'color', 'primary']);
});

// ============================================================================
// RULE 3: Themes Require Themeable
// ============================================================================

console.log(`\n${colors.yellow}Rule 3: Themes Require Themeable${colors.reset}`);

test('Reject token with themes but themeable: false', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themeable: false,
        modeAware: false,
        themes: {
          default: '{color.blue.600}',
          brand: '{color.purple.600}',
        },
      },
    },
  };
  assertValidationError(token, ['semantic', 'color', 'primary'], 'themeable is not true');
});

test('Reject token with themes but themeable undefined', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        modeAware: false,
        themes: {
          default: '{color.blue.600}',
          brand: '{color.purple.600}',
        },
      },
    },
  };
  assertValidationError(token, ['semantic', 'color', 'primary'], 'themeable is not true');
});

test('Accept token with themes and themeable: true', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themeable: true,
        modeAware: false,
        themes: {
          default: '{color.blue.600}',
          brand: '{color.purple.600}',
        },
      },
    },
  };
  assertValidationPasses(token, ['semantic', 'color', 'primary']);
});

// ============================================================================
// RULE 4: Layout Tokens Must Be Structural Constants
// ============================================================================

console.log(`\n${colors.yellow}Rule 4: Layout Tokens Must Be Structural Constants${colors.reset}`);

test('Reject layout token with themeable: true', () => {
  const token = {
    $value: '16px',
    $extensions: {
      lufa: {
        level: 'layout',
        themeable: true,
        modeAware: false,
      },
    },
  };
  assertValidationError(token, ['layout', 'spacing', 'base'], 'themeable=true');
});

test('Reject layout token with modeAware: true', () => {
  const token = {
    $value: '16px',
    $extensions: {
      lufa: {
        level: 'layout',
        themeable: false,
        modeAware: true,
      },
    },
  };
  assertValidationError(token, ['layout', 'spacing', 'base'], 'modeAware=true');
});

test('Accept layout token with themeable: false, modeAware: false', () => {
  const token = {
    $value: '16px',
    $extensions: {
      lufa: {
        level: 'layout',
        themeable: false,
        modeAware: false,
      },
    },
  };
  assertValidationPasses(token, ['layout', 'spacing', 'base']);
});

// ============================================================================
// RULE 5: Tokens with Modes Must Have All Three
// ============================================================================

console.log(`\n${colors.yellow}Rule 5: Tokens with Modes Must Have All Three${colors.reset}`);

test('Reject token missing light mode', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themeable: false,
        modeAware: true,
        modes: {
          dark: '{color.blue.400}',
          'high-contrast': '{color.blue.800}',
        },
      },
    },
  };
  assertValidationError(token, ['semantic', 'color', 'primary'], 'missing required modes: light');
});

test('Reject token missing dark mode', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themeable: false,
        modeAware: true,
        modes: {
          light: '{color.blue.600}',
          'high-contrast': '{color.blue.800}',
        },
      },
    },
  };
  assertValidationError(token, ['semantic', 'color', 'primary'], 'missing required modes: dark');
});

test('Reject token missing high-contrast mode', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themeable: false,
        modeAware: true,
        modes: {
          light: '{color.blue.600}',
          dark: '{color.blue.400}',
        },
      },
    },
  };
  assertValidationError(token, ['semantic', 'color', 'primary'], 'missing required modes: high-contrast');
});

test('Reject token missing multiple modes', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themeable: false,
        modeAware: true,
        modes: {
          light: '{color.blue.600}',
        },
      },
    },
  };
  assertValidationError(token, ['semantic', 'color', 'primary'], 'missing required modes');
});

test('Accept token with all three modes', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themeable: false,
        modeAware: true,
        modes: {
          light: '{color.blue.600}',
          dark: '{color.blue.400}',
          'high-contrast': '{color.blue.800}',
        },
      },
    },
  };
  assertValidationPasses(token, ['semantic', 'color', 'primary']);
});

// ============================================================================
// RULE 6: No Typo "themable"
// ============================================================================

console.log(`\n${colors.yellow}Rule 6: No Typo "themable"${colors.reset}`);

test('Reject token with "themable" (typo)', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themable: true, // Typo!
        modeAware: false,
      },
    },
  };
  assertValidationError(token, ['semantic', 'color', 'primary'], 'themable');
});

test('Accept token with "themeable" (correct spelling)', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themeable: true,
        modeAware: false,
      },
    },
  };
  assertValidationPasses(token, ['semantic', 'color', 'primary']);
});

// ============================================================================
// ADDITIONAL EDGE CASES
// ============================================================================

console.log(`\n${colors.yellow}Additional Edge Cases${colors.reset}`);

test('Skip validation for tokens without $extensions.lufa', () => {
  const token = {
    $value: '#2563eb',
  };
  assertValidationPasses(token, ['color', 'blue', '600']);
});

test('Skip validation for tokens with $extensions but no lufa', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      otherSystem: {
        foo: 'bar',
      },
    },
  };
  assertValidationPasses(token, ['color', 'blue', '600']);
});

test('Validate token with only $extensions (no $value)', () => {
  const token = {
    $extensions: {
      lufa: {
        level: 'primitive',
        themeable: true,
        modeAware: false,
      },
    },
  };
  assertValidationError(token, ['color', 'blue', '600'], 'themeable=true');
});

test('Accept semantic token with modeAware: true and themeable: true', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themeable: true,
        modeAware: true,
        modes: {
          light: '{color.blue.600}',
          dark: '{color.blue.400}',
          'high-contrast': '{color.blue.800}',
        },
      },
    },
  };
  assertValidationPasses(token, ['semantic', 'color', 'primary']);
});

test('Accept token with complex nested path', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'primitive',
        themeable: false,
        modeAware: false,
      },
    },
  };
  assertValidationPasses(token, ['primitive', 'color', 'brand', 'primary', 'base', '600']);
});

test('Validation error includes correct path for nested token', () => {
  const token = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'primitive',
        themeable: true,
        modeAware: false,
      },
    },
  };
  try {
    validateToken(token, ['a', 'b', 'c', 'd'], 'nested.json');
    assert.fail('Expected validation to throw');
  } catch (error) {
    assert(error instanceof ValidationError);
    assert.strictEqual(error.tokenPath, 'a.b.c.d');
    assert.strictEqual(error.file, 'nested.json');
  }
});

// ============================================================================
// PERFORMANCE TEST
// ============================================================================

console.log(`\n${colors.yellow}Performance Test${colors.reset}`);

test('Validate 500+ tokens in <500ms', () => {
  const validToken = {
    $value: '#2563eb',
    $extensions: {
      lufa: {
        level: 'semantic',
        themeable: false,
        modeAware: true,
        modes: {
          light: '{color.blue.600}',
          dark: '{color.blue.400}',
          'high-contrast': '{color.blue.800}',
        },
      },
    },
  };

  const perfStart = Date.now();
  for (let i = 0; i < 500; i++) {
    validateToken(validToken, ['semantic', 'color', `token${i}`], 'perf-test.json');
  }
  const perfDuration = Date.now() - perfStart;

  assert(perfDuration < 500, `Performance test failed: ${perfDuration}ms > 500ms`);
  console.log(`  ${colors.dim}(Validated 500 tokens in ${perfDuration}ms)${colors.reset}`);
});

// ============================================================================
// TEST SUMMARY
// ============================================================================

const duration = Date.now() - startTime;

console.log(`\n${'─'.repeat(60)}`);

if (failed === 0) {
  console.log(`${colors.green}✓ All ${passed} tests passed in ${duration}ms${colors.reset}\n`);
  process.exit(0);
} else {
  console.log(`${colors.red}✗ ${failed} test(s) failed, ${passed} passed in ${duration}ms${colors.reset}\n`);
  process.exit(1);
}
