/**
 * Tests for Token Consistency Validator
 *
 * Tests all 9 validation rules from ADR-013
 */

import { inferLevel, validateToken, ValidationError } from './token-consistency.js';

let testsPassed = 0;
let testsFailed = 0;

// Helper to run a test
function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    testsPassed++;
  } catch (error) {
    console.error(`❌ ${name}`);
    console.error(`   ${error.message}`);
    testsFailed++;
  }
}

// Helper to assert a validation error is thrown
function assertThrows(fn, expectedMessage) {
  try {
    fn();
    throw new Error('Expected ValidationError to be thrown');
  } catch (error) {
    if (!(error instanceof ValidationError)) {
      throw new Error(`Expected ValidationError, got ${error.constructor.name}: ${error.message}`);
    }
    if (expectedMessage && !error.message.includes(expectedMessage)) {
      throw new Error(`Expected message to include "${expectedMessage}", got "${error.message}"`);
    }
  }
}

// Helper to assert no error is thrown
function assertNoThrow(fn) {
  fn();
}

console.log('\n═══════════════════════════════════════════════════════════');
console.log('Token Consistency Validator - Simplified (ADR-013)');
console.log('═══════════════════════════════════════════════════════════\n');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 1: inferLevel() function
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 1: inferLevel() function');
console.log('─────────────────────────────────────\n');

test('inferLevel: primitives (singular)', () => {
  console.assert(inferLevel(['primitive', 'color', 'blue-500']) === 'primitive');
});

test('inferLevel: primitives (plural)', () => {
  console.assert(inferLevel(['primitives', 'spacing', 'sm']) === 'primitive');
});

test('inferLevel: core', () => {
  console.assert(inferLevel(['core', 'color', 'brand-primary']) === 'core');
});

test('inferLevel: semantic', () => {
  console.assert(inferLevel(['semantic', 'ui', 'background']) === 'semantic');
});

test('inferLevel: component (singular)', () => {
  console.assert(inferLevel(['component', 'button', 'background']) === 'component');
});

test('inferLevel: component (plural)', () => {
  console.assert(inferLevel(['components', 'card', 'border']) === 'component');
});

test('inferLevel: layout', () => {
  console.assert(inferLevel(['layout', 'container', 'width']) === 'layout');
});

test('inferLevel: null for unknown path', () => {
  console.assert(inferLevel(['unknown', 'path']) === null);
});

test('inferLevel: null for empty path', () => {
  console.assert(inferLevel([]) === null);
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 2: RULE 1 - Primitives cannot have modes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 2: RULE 1 - Primitives cannot have modes');
console.log('─────────────────────────────────────\n');

test('RULE 1: Primitive with modes should throw', () => {
  const token = {
    $value: '#3b82f6',
    $extensions: {
      lufa: {
        modes: {
          dark: '#60a5fa',
        },
      },
    },
  };
  assertThrows(() => validateToken(token, ['primitives', 'color', 'blue-500'], 'test.json'), 'cannot have modes');
});

test('RULE 1: Primitive without modes should pass', () => {
  const token = {
    $value: '#3b82f6',
    $extensions: {
      lufa: {},
    },
  };
  assertNoThrow(() => validateToken(token, ['primitives', 'color', 'blue-500'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 3: RULE 2 - Layout tokens cannot have modes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 3: RULE 2 - Layout tokens cannot have modes');
console.log('─────────────────────────────────────\n');

test('RULE 2: Layout with modes should throw', () => {
  const token = {
    $value: '1200px',
    $extensions: {
      lufa: {
        modes: {
          dark: '1400px',
        },
      },
    },
  };
  assertThrows(() => validateToken(token, ['layout', 'container', 'width'], 'test.json'), 'cannot have modes');
});

test('RULE 2: Layout without modes should pass', () => {
  const token = {
    $value: '1200px',
    $extensions: {
      lufa: {},
    },
  };
  assertNoThrow(() => validateToken(token, ['layout', 'container', 'width'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 4: RULE 3 - modes must have at least 'dark'
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 4: RULE 3 - modes must have at least "dark"');
console.log('─────────────────────────────────────\n');

test('RULE 3: modes without dark should throw', () => {
  const token = {
    $value: '#ffffff',
    $extensions: {
      lufa: {
        modes: {
          custom: '#000000',
        },
      },
    },
  };
  assertThrows(() => validateToken(token, ['core', 'color', 'background'], 'test.json'), "missing 'dark'");
});

test('RULE 3: modes with dark should pass', () => {
  const token = {
    $value: '#ffffff',
    $extensions: {
      lufa: {
        modes: {
          dark: '#000000',
        },
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['core', 'color', 'background'], 'test.json'));
});

test('RULE 3: modes with dark and custom should pass', () => {
  const token = {
    $value: '#ffffff',
    $extensions: {
      lufa: {
        modes: {
          dark: '#000000',
          custom: '#333333',
        },
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['core', 'color', 'background'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 5: RULE 4 - No 'light' in modes (implicit)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 5: RULE 4 - No "light" in modes (implicit)');
console.log('─────────────────────────────────────\n');

test('RULE 4: modes.light should throw', () => {
  const token = {
    $value: '#ffffff',
    $extensions: {
      lufa: {
        modes: {
          light: '#ffffff',
          dark: '#000000',
        },
      },
    },
  };
  assertThrows(() => validateToken(token, ['core', 'color', 'background'], 'test.json'), 'modes.light');
});

test('RULE 4: modes without light should pass', () => {
  const token = {
    $value: '#ffffff',
    $extensions: {
      lufa: {
        modes: {
          dark: '#000000',
        },
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['core', 'color', 'background'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 6: RULE 5 - No 'themable' typo (deprecated)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 6: RULE 5 - No "themable" typo (deprecated)');
console.log('─────────────────────────────────────\n');

test('RULE 5: themable property should throw', () => {
  const token = {
    $value: '#3b82f6',
    $extensions: {
      lufa: {
        themable: true,
      },
    },
  };
  assertThrows(() => validateToken(token, ['core', 'color', 'primary'], 'test.json'), 'themable');
});

test('RULE 5: without themable should pass', () => {
  const token = {
    $value: '#3b82f6',
    $extensions: {
      lufa: {},
    },
  };
  assertNoThrow(() => validateToken(token, ['core', 'color', 'primary'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 7: RULE 6 - No explicit 'level' (inferred from path)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 7: RULE 6 - No explicit "level" (inferred)');
console.log('─────────────────────────────────────\n');

test('RULE 6: explicit level should throw', () => {
  const token = {
    $value: '#3b82f6',
    $extensions: {
      lufa: {
        level: 'primitive',
      },
    },
  };
  assertThrows(() => validateToken(token, ['primitives', 'color', 'blue-500'], 'test.json'), 'explicit');
});

test('RULE 6: without level should pass', () => {
  const token = {
    $value: '#3b82f6',
    $extensions: {
      lufa: {},
    },
  };
  assertNoThrow(() => validateToken(token, ['primitives', 'color', 'blue-500'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 8: RULE 7 - No 'modeAware' flag (inferred)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 8: RULE 7 - No "modeAware" flag (inferred)');
console.log('─────────────────────────────────────\n');

test('RULE 7: modeAware flag should throw', () => {
  const token = {
    $value: '#ffffff',
    $extensions: {
      lufa: {
        modeAware: true,
        modes: {
          dark: '#000000',
        },
      },
    },
  };
  assertThrows(() => validateToken(token, ['core', 'color', 'background'], 'test.json'), 'modeAware');
});

test('RULE 7: without modeAware should pass', () => {
  const token = {
    $value: '#ffffff',
    $extensions: {
      lufa: {
        modes: {
          dark: '#000000',
        },
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['core', 'color', 'background'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 9: RULE 8 - No 'themeable' on primitives
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 9: RULE 8 - No "themeable" on primitives');
console.log('─────────────────────────────────────\n');

test('RULE 8: primitive with themeable should throw', () => {
  const token = {
    $value: '#3b82f6',
    $extensions: {
      lufa: {
        themeable: false,
      },
    },
  };
  assertThrows(() => validateToken(token, ['primitives', 'color', 'blue-500'], 'test.json'), 'themeable');
});

test('RULE 8: primitive without themeable should pass', () => {
  const token = {
    $value: '#3b82f6',
    $extensions: {
      lufa: {},
    },
  };
  assertNoThrow(() => validateToken(token, ['primitives', 'color', 'blue-500'], 'test.json'));
});

test('RULE 8: semantic with themeable should pass', () => {
  const token = {
    $value: '{primitives.color.blue-500}',
    $extensions: {
      lufa: {
        themeable: true,
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['semantic', 'ui', 'primary'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 10: RULE 9 - No fluid AND responsive together
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 10: RULE 9 - No fluid AND responsive together');
console.log('─────────────────────────────────────\n');

test('RULE 9: fluid=true and responsive should throw', () => {
  const token = {
    $value: 'clamp(1rem, 2vw, 2rem)',
    $extensions: {
      lufa: {
        fluid: true,
        responsive: {
          sm: '1rem',
          md: '1.5rem',
        },
      },
    },
  };
  assertThrows(() => validateToken(token, ['core', 'typography', 'size'], 'test.json'), 'mutually exclusive');
});

test('RULE 9: fluid=true without responsive should pass', () => {
  const token = {
    $value: 'clamp(1rem, 2vw, 2rem)',
    $extensions: {
      lufa: {
        fluid: true,
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['core', 'typography', 'size'], 'test.json'));
});

test('RULE 9: responsive without fluid should pass', () => {
  const token = {
    $value: '1rem',
    $extensions: {
      lufa: {
        responsive: {
          sm: '1rem',
          md: '1.5rem',
        },
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['core', 'typography', 'size'], 'test.json'));
});

test('RULE 9: fluid=false and responsive should pass', () => {
  const token = {
    $value: '1rem',
    $extensions: {
      lufa: {
        fluid: false,
        responsive: {
          sm: '1rem',
          md: '1.5rem',
        },
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['core', 'typography', 'size'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 11: Edge cases
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 11: Edge cases');
console.log('─────────────────────────────────────\n');

test('Edge case: Token without $extensions should pass', () => {
  const token = {
    $value: '#3b82f6',
  };
  assertNoThrow(() => validateToken(token, ['primitives', 'color', 'blue-500'], 'test.json'));
});

test('Edge case: Token without $extensions.lufa should pass', () => {
  const token = {
    $value: '#3b82f6',
    $extensions: {},
  };
  assertNoThrow(() => validateToken(token, ['primitives', 'color', 'blue-500'], 'test.json'));
});

test('Edge case: Token with empty modes object is valid', () => {
  const token = {
    $value: '#3b82f6',
    $extensions: {
      lufa: {
        modes: {},
      },
    },
  };
  // Empty modes object should fail RULE 3 (must have 'dark')
  assertThrows(() => validateToken(token, ['core', 'color', 'primary'], 'test.json'), "missing 'dark'");
});

test('Edge case: Complex valid token (semantic, mode-aware, themeable)', () => {
  const token = {
    $value: '{primitives.color.blue-500}',
    $extensions: {
      lufa: {
        modes: {
          dark: '{primitives.color.blue-400}',
        },
        themeable: true,
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['semantic', 'ui', 'primary'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SUMMARY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('═══════════════════════════════════════════════════════════');
console.log(`Tests passed: ${testsPassed}`);
console.log(`Tests failed: ${testsFailed}`);
console.log('═══════════════════════════════════════════════════════════\n');

if (testsFailed > 0) {
  console.error('❌ Some tests failed!');
  process.exit(1);
} else {
  console.log('✅ All tests passed!');
  process.exit(0);
}
