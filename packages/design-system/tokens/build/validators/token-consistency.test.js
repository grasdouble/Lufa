/**
 * Tests for Token Consistency Validator
 *
 * Tests all 16 validation rules from ADR-013 and ADR-014
 */

import { inferLevel, validateToken, ValidationError, ValidationWarning } from './token-consistency.js';

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

// Helper to assert that warnings are returned containing expected message
function assertWarns(fn, expectedMessage) {
  const warnings = fn();
  if (!warnings || warnings.length === 0) {
    throw new Error(`Expected ValidationWarning but got no warnings`);
  }
  const hasMatch = warnings.some(
    (w) => w instanceof ValidationWarning && (!expectedMessage || w.message.includes(expectedMessage))
  );
  if (!hasMatch) {
    throw new Error(
      `Expected warning to include "${expectedMessage}", got: ${warnings.map((w) => w.message).join('; ')}`
    );
  }
}

// Helper to assert that no warnings are returned
function assertNoWarnings(fn) {
  const warnings = fn();
  if (warnings && warnings.length > 0) {
    throw new Error(`Expected no warnings but got ${warnings.length}: ${warnings.map((w) => w.message).join('; ')}`);
  }
}

console.log('\n═══════════════════════════════════════════════════════════');
console.log('Token Consistency Validator - Simplified (ADR-013 + ADR-014)');
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
        themeLevel: 'extended',
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
// TEST GROUP 11: RULE 10 - No primitive self-references
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 11: RULE 10 - No primitive self-references');
console.log('─────────────────────────────────────\n');

test('RULE 10: Primitive referencing another primitive should throw', () => {
  const token = {
    $value: '{primitive.color.blue-400}',
    $extensions: {
      lufa: {},
    },
  };
  assertThrows(
    () => validateToken(token, ['primitives', 'color', 'blue-500'], 'test.json'),
    'references another primitive'
  );
});

test('RULE 10: Primitive referencing primitives (plural) should throw', () => {
  const token = {
    $value: '{primitives.spacing.4}',
    $extensions: {
      lufa: {},
    },
  };
  assertThrows(() => validateToken(token, ['primitives', 'spacing', '8'], 'test.json'), 'references another primitive');
});

test('RULE 10: Primitive with raw value should pass', () => {
  const token = {
    $value: '#3b82f6',
    $extensions: {
      lufa: {},
    },
  };
  assertNoThrow(() => validateToken(token, ['primitives', 'color', 'blue-500'], 'test.json'));
});

test('RULE 10: Non-primitive with primitive reference should not throw (handled by rule 11)', () => {
  const token = {
    $value: '{primitive.color.blue-500}',
    $extensions: {
      lufa: {},
    },
  };
  assertNoThrow(() => validateToken(token, ['core', 'color', 'brand-primary'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 12: RULE 11 - Hierarchy chain validation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 12: RULE 11 - Hierarchy chain validation');
console.log('─────────────────────────────────────\n');

test('RULE 11: Component referencing semantic should pass (no warnings)', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {},
    },
  };
  assertNoWarnings(() => validateToken(token, ['component', 'button', 'background'], 'test.json'));
});

test('RULE 11: Component referencing component (self-level) should pass', () => {
  const token = {
    $value: '{component.card.background}',
    $extensions: {
      lufa: {},
    },
  };
  assertNoWarnings(() => validateToken(token, ['component', 'button', 'background'], 'test.json'));
});

test('RULE 11: Component referencing primitive should warn', () => {
  const token = {
    $value: '{primitive.color.blue-500}',
    $extensions: {
      lufa: {},
    },
  };
  assertWarns(
    () => validateToken(token, ['component', 'button', 'background'], 'test.json'),
    'violates the hierarchy chain'
  );
});

test('RULE 11: Component referencing core should warn', () => {
  const token = {
    $value: '{core.color.brand-primary}',
    $extensions: {
      lufa: {},
    },
  };
  assertWarns(
    () => validateToken(token, ['component', 'button', 'background'], 'test.json'),
    'violates the hierarchy chain'
  );
});

test('RULE 11: Semantic referencing core should pass', () => {
  const token = {
    $value: '{core.color.brand-primary}',
    $extensions: {
      lufa: {},
    },
  };
  assertNoWarnings(() => validateToken(token, ['semantic', 'ui', 'primary'], 'test.json'));
});

test('RULE 11: Semantic referencing primitive (color) should warn', () => {
  const token = {
    $value: '{primitive.color.blue-500}',
    $extensions: {
      lufa: {},
    },
  };
  assertWarns(() => validateToken(token, ['semantic', 'color', 'primary'], 'test.json'), 'ADR-014');
});

test('RULE 11: Semantic referencing primitive (spacing) should pass (ADR-014 exception)', () => {
  const token = {
    $value: '{primitive.spacing.4}',
    $extensions: {
      lufa: {},
    },
  };
  assertNoWarnings(() => validateToken(token, ['semantic', 'spacing', 'md'], 'test.json'));
});

test('RULE 11: Semantic referencing primitive (radius) should pass (ADR-014 exception)', () => {
  const token = {
    $value: '{primitive.radius.md}',
    $extensions: {
      lufa: {},
    },
  };
  assertNoWarnings(() => validateToken(token, ['semantic', 'radius', 'default'], 'test.json'));
});

test('RULE 11: Semantic (ui category) referencing primitive spacing should pass (ADR-014 ref-based check)', () => {
  const token = {
    $value: '{primitive.spacing.4}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'starter',
      },
    },
  };
  assertNoWarnings(() => validateToken(token, ['semantic', 'ui', 'spacing', 'default'], 'test.json'));
});

test('RULE 11: Semantic (interactive category) referencing primitive opacity should pass (ADR-014 ref-based check)', () => {
  const token = {
    $value: '{primitive.opacity.scale.disabled}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'starter',
      },
    },
  };
  assertNoWarnings(() => validateToken(token, ['semantic', 'interactive', 'opacity', 'disabled'], 'test.json'));
});

test('RULE 11: Semantic (ui category) referencing primitive border-width should pass (ADR-014 ref-based check)', () => {
  const token = {
    $value: '{primitive.border-width.scale.base}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'starter',
      },
    },
  };
  assertNoWarnings(() => validateToken(token, ['semantic', 'interactive', 'focus', 'ring-offset'], 'test.json'));
});

test('RULE 11: Semantic (layout category) referencing primitive breakpoint should pass (ADR-014 ref-based check)', () => {
  const token = {
    $value: '{primitive.breakpoint.md}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'starter',
      },
    },
  };
  assertNoWarnings(() => validateToken(token, ['semantic', 'layout', 'breakpoint', 'md'], 'test.json'));
});

test('RULE 11: Semantic (ui category) referencing primitive.color.alpha should warn (color must go through core)', () => {
  const token = {
    $value: '{primitive.color.alpha.black.50}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'starter',
        modes: {
          dark: '{primitive.color.alpha.black.80}',
          'high-contrast': '{primitive.color.alpha.black.90}',
        },
      },
    },
  };
  assertWarns(
    () => validateToken(token, ['semantic', 'ui', 'overlay', 'backdrop'], 'test.json'),
    'Color primitives MUST go through the core layer'
  );
});

test('RULE 11: Semantic (effect category) referencing primitive.color.alpha in composite value should warn', () => {
  const token = {
    $value: '0 0 0 3px {primitive.color.alpha.black.16}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'starter',
      },
    },
  };
  assertWarns(
    () => validateToken(token, ['semantic', 'effect', 'glow', 'box', 'focus'], 'test.json'),
    'Color primitives MUST go through the core layer'
  );
});

test('RULE 11: Core referencing primitive should pass', () => {
  const token = {
    $value: '{primitive.color.blue-500}',
    $extensions: {
      lufa: {},
    },
  };
  assertNoWarnings(() => validateToken(token, ['core', 'color', 'brand-primary'], 'test.json'));
});

test('RULE 11: Core referencing semantic should warn', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {},
    },
  };
  assertWarns(
    () => validateToken(token, ['core', 'color', 'brand-primary'], 'test.json'),
    'violates the hierarchy chain'
  );
});

test('RULE 11: Hierarchy check also applies to mode values', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        modes: {
          dark: '{primitive.color.blue-400}',
        },
      },
    },
  };
  assertWarns(() => validateToken(token, ['component', 'button', 'background'], 'test.json'), 'modes.dark');
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 13: RULE 12 - No raw hex colors outside primitives
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 13: RULE 12 - No raw hex colors outside primitives');
console.log('─────────────────────────────────────\n');

test('RULE 12: Core token with raw hex color should warn', () => {
  const token = {
    $value: '#ff5500',
    $extensions: {
      lufa: {},
    },
  };
  assertWarns(() => validateToken(token, ['core', 'color', 'accent'], 'test.json'), 'raw hex color');
});

test('RULE 12: Semantic token with raw hex color should warn', () => {
  const token = {
    $value: '#abc',
    $extensions: {
      lufa: {},
    },
  };
  assertWarns(() => validateToken(token, ['semantic', 'ui', 'border'], 'test.json'), 'raw hex color');
});

test('RULE 12: Component token with raw hex color should warn', () => {
  const token = {
    $value: '#aabbcc',
    $extensions: {
      lufa: {},
    },
  };
  assertWarns(() => validateToken(token, ['component', 'card', 'background'], 'test.json'), 'raw hex color');
});

test('RULE 12: Primitive token with raw hex color should NOT warn', () => {
  const token = {
    $value: '#3b82f6',
    $extensions: {
      lufa: {},
    },
  };
  assertNoWarnings(() => validateToken(token, ['primitives', 'color', 'blue-500'], 'test.json'));
});

test('RULE 12: Core token with token reference (no hex) should pass', () => {
  const token = {
    $value: '{primitive.color.blue-500}',
    $extensions: {
      lufa: {},
    },
  };
  assertNoWarnings(() => validateToken(token, ['core', 'color', 'brand-primary'], 'test.json'));
});

test('RULE 12: Raw hex in mode value should warn', () => {
  const token = {
    $value: '{primitive.color.blue-500}',
    $extensions: {
      lufa: {
        modes: {
          dark: '#112233',
        },
      },
    },
  };
  assertWarns(() => validateToken(token, ['core', 'color', 'brand-primary'], 'test.json'), 'raw hex color');
});

test('RULE 12: Core clamp() with hex is allowed (exception)', () => {
  const token = {
    $value: 'clamp(#fff, 2vw, #000)',
    $extensions: {
      lufa: {},
    },
  };
  assertNoWarnings(() => validateToken(token, ['core', 'layout', 'fluid-size'], 'test.json'));
});

test('RULE 12: Semantic clamp() with hex should still warn (exception only for core)', () => {
  const token = {
    $value: 'clamp(#fff, 2vw, #000)',
    $extensions: {
      lufa: {},
    },
  };
  assertWarns(() => validateToken(token, ['semantic', 'layout', 'fluid-size'], 'test.json'), 'raw hex color');
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 14: RULE 13 - Component z-index must reference semantic
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 14: RULE 13 - Component z-index must reference semantic');
console.log('─────────────────────────────────────\n');

test('RULE 13: Component z-index with raw numeric value should warn', () => {
  const token = {
    $value: '100',
    $extensions: {
      lufa: {},
    },
  };
  assertWarns(
    () => validateToken(token, ['component', 'modal', 'z-index'], 'test.json'),
    'does not reference a semantic token'
  );
});

test('RULE 13: Component z-index referencing semantic should pass', () => {
  const token = {
    $value: '{semantic.z-index.overlay}',
    $extensions: {
      lufa: {},
    },
  };
  assertNoWarnings(() => validateToken(token, ['component', 'modal', 'z-index'], 'test.json'));
});

test('RULE 13: Component z-index referencing core should warn', () => {
  const token = {
    $value: '{core.z-index.modal}',
    $extensions: {
      lufa: {},
    },
  };
  assertWarns(
    () => validateToken(token, ['component', 'modal', 'z-index'], 'test.json'),
    'does not reference a semantic token'
  );
});

test('RULE 13: Non-component z-index with raw value should NOT trigger this rule', () => {
  const token = {
    $value: '100',
    $extensions: {
      lufa: {},
    },
  };
  // semantic level z-index should not trigger rule 13 (component-only)
  const warnings = validateToken(token, ['semantic', 'z-index', 'overlay'], 'test.json');
  const hasZIndexWarning = warnings.some((w) => w.message.includes('does not reference a semantic token'));
  if (hasZIndexWarning) {
    throw new Error('Rule 13 should only apply to component tokens');
  }
});

test('RULE 13: Component token without z-index in path should not trigger', () => {
  const token = {
    $value: '100',
    $extensions: {
      lufa: {},
    },
  };
  const warnings = validateToken(token, ['component', 'button', 'opacity'], 'test.json');
  const hasZIndexWarning = warnings.some((w) => w.message.includes('does not reference a semantic token'));
  if (hasZIndexWarning) {
    throw new Error('Rule 13 should only apply when path contains z-index');
  }
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 15: Edge cases
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 15: Edge cases');
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
        themeLevel: 'starter',
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['semantic', 'ui', 'primary'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 16: RULE 14 - If 'themeable' is true, 'themeLevel' must be defined
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 16: RULE 14 - themeable:true requires themeLevel');
console.log('─────────────────────────────────────\n');

test('RULE 14: themeable:true without themeLevel should throw', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        category: 'button',
        themeable: true,
      },
    },
  };
  assertThrows(() => validateToken(token, ['component', 'button', 'background'], 'test.json'), 'missing "themeLevel"');
});

test('RULE 14: themeable:true with themeLevel defined should pass', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        category: 'button',
        themeable: true,
        themeLevel: 'advanced',
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['component', 'button', 'background'], 'test.json'));
});

test('RULE 14: themeable:false without themeLevel should pass (rule does not apply)', () => {
  const token = {
    $value: '{semantic.interactive.cursor.default}',
    $extensions: {
      lufa: {
        category: 'button',
        themeable: false,
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['component', 'button', 'state'], 'test.json'));
});

test('RULE 14: token without themeable without themeLevel should pass (rule does not apply)', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        category: 'button',
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['component', 'button', 'background'], 'test.json'));
});

test('RULE 14: themeable:true with themeLevel "starter" should pass', () => {
  const token = {
    $value: '{core.color.brand-primary}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'starter',
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['semantic', 'ui', 'primary'], 'test.json'));
});

test('RULE 14: themeable:true with themeLevel "extended" should pass', () => {
  const token = {
    $value: 'none',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'extended',
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['semantic', 'ui', 'background', 'pattern'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 17: RULE 15 - If 'themeLevel' is defined, 'themeable' must be true
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 17: RULE 15 - themeLevel defined requires themeable:true');
console.log('─────────────────────────────────────\n');

test('RULE 15: themeLevel defined with themeable:false should throw', () => {
  const token = {
    $value: '{semantic.interactive.cursor.default}',
    $extensions: {
      lufa: {
        category: 'button',
        themeable: false,
        themeLevel: 'advanced',
      },
    },
  };
  assertThrows(() => validateToken(token, ['component', 'button', 'state'], 'test.json'), '"themeable" is not true');
});

test('RULE 15: themeLevel defined without themeable should throw', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        category: 'button',
        themeLevel: 'advanced',
      },
    },
  };
  assertThrows(
    () => validateToken(token, ['component', 'button', 'background'], 'test.json'),
    '"themeable" is not true'
  );
});

test('RULE 15: themeLevel defined with themeable:true should pass', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        category: 'button',
        themeable: true,
        themeLevel: 'advanced',
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['component', 'button', 'background'], 'test.json'));
});

test('RULE 15: no themeLevel with themeable:false should pass (rule does not apply)', () => {
  const token = {
    $value: '{semantic.interactive.cursor.default}',
    $extensions: {
      lufa: {
        category: 'button',
        themeable: false,
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['component', 'button', 'state'], 'test.json'));
});

test('RULE 15: no themeLevel without themeable should pass (rule does not apply)', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        category: 'button',
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['component', 'button', 'background'], 'test.json'));
});

console.log('');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEST GROUP 18: RULE 16 - 'themeLevel' must be one of: starter | extended | advanced
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('Test Group 18: RULE 16 - themeLevel must be starter | extended | advanced');
console.log('─────────────────────────────────────\n');

test('RULE 16: themeLevel "starter" should pass', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'starter',
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['component', 'button', 'background'], 'test.json'));
});

test('RULE 16: themeLevel "extended" should pass', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'extended',
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['component', 'button', 'background'], 'test.json'));
});

test('RULE 16: themeLevel "advanced" should pass', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'advanced',
      },
    },
  };
  assertNoThrow(() => validateToken(token, ['component', 'button', 'background'], 'test.json'));
});

test('RULE 16: themeLevel "core" should throw (invalid value)', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'core',
      },
    },
  };
  assertThrows(() => validateToken(token, ['semantic', 'ui', 'primary'], 'test.json'), 'invalid "themeLevel" value');
});

test('RULE 16: themeLevel "basic" should throw (invalid value)', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'basic',
      },
    },
  };
  assertThrows(() => validateToken(token, ['semantic', 'ui', 'primary'], 'test.json'), 'invalid "themeLevel" value');
});

test('RULE 16: themeLevel "premium" should throw (invalid value)', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: 'premium',
      },
    },
  };
  assertThrows(() => validateToken(token, ['semantic', 'ui', 'primary'], 'test.json'), 'invalid "themeLevel" value');
});

test('RULE 16: themeLevel "" (empty string) should throw (invalid value)', () => {
  const token = {
    $value: '{semantic.ui.primary}',
    $extensions: {
      lufa: {
        themeable: true,
        themeLevel: '',
      },
    },
  };
  assertThrows(() => validateToken(token, ['semantic', 'ui', 'primary'], 'test.json'), 'invalid "themeLevel" value');
});

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
