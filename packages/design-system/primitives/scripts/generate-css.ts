import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Token } from './utils/token-helpers.js';
import primitives from '../dist/index.js';
import { extractTokens, sortByNaturalKey } from './utils/token-helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, '../dist');

mkdirSync(distDir, { recursive: true });

interface GroupedTokens {
  [category: string]: Token[];
}

interface CategoryStat {
  name: string;
  count: number;
}

/**
 * Group tokens by their top-level category for organized CSS output
 */
const groupTokensByCategory = (tokens: Token[]): GroupedTokens => {
  const grouped: GroupedTokens = {};

  for (const token of tokens) {
    const category = token.path[0] || 'misc';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(token);
  }

  // Sort tokens within each category
  for (const category of Object.keys(grouped)) {
    grouped[category] = sortByNaturalKey(grouped[category], (token) => token.name);
  }

  return grouped;
};

/**
 * Get category display name with proper formatting
 */
const getCategoryName = (key: string): string => {
  const names: Record<string, string> = {
    borderWidth: 'BORDER WIDTHS',
    borderStyle: 'BORDER STYLES',
    radius: 'BORDER RADIUS',
    color: 'COLOR',
    blur: 'BLUR EFFECTS',
    opacity: 'OPACITY',
    shadow: 'SHADOWS',
    zIndex: 'Z-INDEX',
    iconSize: 'ICON SIZES',
    iconStroke: 'ICON STROKES',
    breakpoint: 'BREAKPOINTS',
    gridColumns: 'GRID',
    easing: 'EASING',
    timing: 'TIMING',
    aspectRatio: 'ASPECT RATIO',
    maxWidth: 'MAX WIDTH',
    size: 'SIZES',
    spacing: 'SPACING',
    fontFamily: 'FONT FAMILIES',
    fontSize: 'FONT SIZES',
    fontWeight: 'FONT WEIGHTS',
    letterSpacing: 'LETTER SPACING',
    lineHeight: 'LINE HEIGHTS',
  };

  return names[key] || key.toUpperCase();
};

// Extract all tokens
const allTokens: Token[] = extractTokens(primitives as Record<string, unknown>);
const groupedTokens: GroupedTokens = groupTokensByCategory(allTokens);

// Generate CSS with organized sections
let css = '/**\n';
css += ' * Lufa Design System - Primitive Tokens\n';
css += ' * Auto-generated CSS custom properties\n';
css += ' * DO NOT EDIT MANUALLY\n';
css += ' */\n\n';
css += ':root {\n';

// Sort categories for consistent output
const sortedCategories: string[] = Object.keys(groupedTokens).sort();

for (const category of sortedCategories) {
  const tokens = groupedTokens[category];
  const categoryName = getCategoryName(category);

  css += `\n  /* ${categoryName} */\n`;

  for (const token of tokens) {
    css += `  --lufa-primitive-${token.name}: ${token.value};\n`;
  }
}

css += '}\n';

// Write CSS file
writeFileSync(resolve(distDir, 'style.css'), css);

// Log summary
console.log('✅ Generated style.css');
console.log(`📊 Total tokens: ${allTokens.length}`);
console.log(`📁 Categories: ${sortedCategories.length}`);

// Log tokens per category
const categoryStats: CategoryStat[] = sortedCategories.map((cat) => ({
  name: getCategoryName(cat),
  count: groupedTokens[cat].length,
}));

console.log('\n📈 Tokens by category:');
categoryStats.forEach(({ name, count }) => {
  console.log(`   ${name}: ${count}`.padEnd(40, ' '));
});
