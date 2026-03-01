/**
 * Tests for WCAG contrast calculation utility
 */

import { calculateContrastRatio, generateWCAGMetadata, meetsWCAGLevel, WCAG_LEVELS } from './wcag-contrast.js';

// ---------------------------------------------------------------------------
// Assertion helper — throws so the process exits with code 1 on failure
// ---------------------------------------------------------------------------
function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ ${name}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

// Test 1: Basic contrast calculation
console.log('\nTest 1: Basic contrast ratios');
console.log('─────────────────────────────────');

test('Black on white should be ~21:1', () => {
  const ratio = calculateContrastRatio('#000000', '#ffffff');
  assert(Math.abs(ratio - 21) < 0.01, `Expected ~21 but got ${ratio.toFixed(4)}`);
});

test('White on white should be 1:1', () => {
  const ratio = calculateContrastRatio('#ffffff', '#ffffff');
  assert(Math.abs(ratio - 1) < 0.01, `Expected ~1 but got ${ratio.toFixed(4)}`);
});

// Test 2: WCAG level checking
console.log('\nTest 2: WCAG level checking');
console.log('─────────────────────────────────');

const testPairs = [
  { color1: '#111827', color2: '#f9fafb', name: 'Gray-900 on Gray-50', expectedAAA: true },
  { color1: '#6b7280', color2: '#f9fafb', name: 'Gray-500 on Gray-50', expectedAAA: false },
  { color1: '#ffffff', color2: '#3b82f6', name: 'White on Blue-500', expectedAAA: false },
];

testPairs.forEach(({ color1, color2, name, expectedAAA }) => {
  test(`${name} AAA expectation matches`, () => {
    const meetsAAA = meetsWCAGLevel(color1, color2, WCAG_LEVELS.AAA);
    assert(meetsAAA === expectedAAA, `Expected AAA=${expectedAAA} for "${name}" but got AAA=${meetsAAA}`);
  });
});

test('Gray-900 on Gray-50 meets AA (4.5:1)', () => {
  const meetsAA = meetsWCAGLevel('#111827', '#f9fafb', WCAG_LEVELS.AA);
  assert(meetsAA === true, 'Expected Gray-900 on Gray-50 to meet AA');
});

// Test 3: Generate WCAG metadata
console.log('\nTest 3: Generate WCAG metadata');
console.log('─────────────────────────────────');

const mockColors = [
  { name: 'gray-50', value: '#f9fafb' },
  { name: 'gray-100', value: '#f3f4f6' },
  { name: 'gray-500', value: '#6b7280' },
  { name: 'gray-800', value: '#1f2937' },
  { name: 'gray-900', value: '#111827' },
];

test('generateWCAGMetadata returns wcagAALarge and wcagAAA arrays', () => {
  const metadata = generateWCAGMetadata('#f9fafb', mockColors);
  assert(Array.isArray(metadata.wcagAALarge), 'wcagAALarge should be an array');
  assert(Array.isArray(metadata.wcagAAA), 'wcagAAA should be an array');
});

test('generateWCAGMetadata: gray-900 appears in AAA pairs for gray-50', () => {
  const metadata = generateWCAGMetadata('#f9fafb', mockColors);
  const hasGray900 = metadata.wcagAAA.some((entry) => entry.includes('gray-900'));
  assert(hasGray900, 'gray-900 (#111827) should meet AAA on gray-50 (#f9fafb)');
});

// Test 4: Invalid colors (alpha/transparent)
console.log('\nTest 4: Invalid colors (alpha/transparent)');
console.log('─────────────────────────────────');

test('Alpha colors return empty arrays in generateWCAGMetadata', () => {
  const metadata = generateWCAGMetadata('rgba(0,0,0,0.5)', mockColors);
  assert(Array.isArray(metadata.wcagAALarge), 'wcagAALarge should be an array for alpha color');
  assert(Array.isArray(metadata.wcagAAA), 'wcagAAA should be an array for alpha color');
  assert(metadata.wcagAALarge.length === 0, 'wcagAALarge should be empty for alpha color');
  assert(metadata.wcagAAA.length === 0, 'wcagAAA should be empty for alpha color');
});

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log('\n' + '═'.repeat(50));
if (failed > 0) {
  console.error(`❌ ${failed} test(s) FAILED, ${passed} passed`);
  console.error('═'.repeat(50));
  process.exit(1);
} else {
  console.log(`✅ All ${passed} tests passed!`);
  console.log('═'.repeat(50));
}
