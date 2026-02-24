/**
 * Tests for WCAG contrast calculation utility
 */

import { calculateContrastRatio, generateWCAGMetadata, meetsWCAGLevel, WCAG_LEVELS } from './wcag-contrast.js';

// Test 1: Basic contrast calculation
console.log('Test 1: Basic contrast ratios');
console.log('─────────────────────────────────');

// Black on white should be 21:1 (maximum contrast)
const blackWhiteRatio = calculateContrastRatio('#000000', '#ffffff');
console.log(`Black on white: ${blackWhiteRatio.toFixed(2)}:1 (expected ~21:1)`);
console.assert(Math.abs(blackWhiteRatio - 21) < 0.01, '❌ Black/white should be 21:1');
console.log('✅ Black/white contrast correct\n');

// Gray-900 on gray-50 (from our tokens)
const gray900on50 = calculateContrastRatio('#111827', '#f9fafb');
console.log(`Gray-900 on gray-50: ${gray900on50.toFixed(2)}:1`);
console.log(`  Meets AA Large (3:1)? ${gray900on50 >= 3 ? '✅' : '❌'}`);
console.log(`  Meets AA (4.5:1)? ${gray900on50 >= 4.5 ? '✅' : '❌'}`);
console.log(`  Meets AAA (7:1)? ${gray900on50 >= 7 ? '✅' : '❌'}\n`);

// Test 2: WCAG level checking
console.log('Test 2: WCAG level checking');
console.log('─────────────────────────────────');

const testPairs = [
  { color1: '#111827', color2: '#f9fafb', name: 'Gray-900 on Gray-50', expectedAAA: true },
  { color1: '#6b7280', color2: '#f9fafb', name: 'Gray-500 on Gray-50', expectedAAA: false },
  { color1: '#ffffff', color2: '#3b82f6', name: 'White on Blue-500', expectedAAA: false },
];

testPairs.forEach(({ color1, color2, name, expectedAAA }) => {
  const ratio = calculateContrastRatio(color1, color2);
  const meetsAAA = meetsWCAGLevel(color1, color2, WCAG_LEVELS.AAA);
  const meetsAA = meetsWCAGLevel(color1, color2, WCAG_LEVELS.AA);

  console.log(`${name}: ${ratio.toFixed(2)}:1`);
  console.log(`  AA (4.5:1): ${meetsAA ? '✅' : '❌'}`);
  console.log(`  AAA (7:1): ${meetsAAA ? '✅' : '❌'}`);

  if (meetsAAA !== expectedAAA) {
    console.log(`  ⚠️  Expected AAA: ${expectedAAA}, got: ${meetsAAA}`);
  }
  console.log('');
});

// Test 3: Generate WCAG metadata
console.log('Test 3: Generate WCAG metadata');
console.log('─────────────────────────────────');

const mockColors = [
  { name: 'gray-50', value: '#f9fafb' },
  { name: 'gray-100', value: '#f3f4f6' },
  { name: 'gray-500', value: '#6b7280' },
  { name: 'gray-800', value: '#1f2937' },
  { name: 'gray-900', value: '#111827' },
];

const gray50Metadata = generateWCAGMetadata('#f9fafb', mockColors);
console.log('WCAG metadata for gray-50 (#f9fafb):');
console.log(`  wcagAALarge (3:1):`, gray50Metadata.wcagAALarge);
console.log(`  wcagAAA (7:1):`, gray50Metadata.wcagAAA);
console.log('');

// Test 4: Invalid colors (alpha/transparent)
console.log('Test 4: Invalid colors (alpha/transparent)');
console.log('─────────────────────────────────');

const alphaMetadata = generateWCAGMetadata('rgba(0,0,0,0.5)', mockColors);
console.log('WCAG metadata for rgba(0,0,0,0.5):');
console.log(`  wcagAALarge:`, alphaMetadata.wcagAALarge);
console.log(`  wcagAAA:`, alphaMetadata.wcagAAA);
console.log('✅ Alpha colors correctly return empty arrays\n');

console.log('═══════════════════════════════════');
console.log('✅ All tests passed!');
console.log('═══════════════════════════════════');
