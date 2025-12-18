import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as primitives from '../dist/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, '../dist');

mkdirSync(distDir, { recursive: true });

interface Token {
  name: string;
  value: string | number;
  path: string[];
}

interface GroupedTokens {
  [category: string]: Token[];
}

interface CategoryStat {
  name: string;
  count: number;
}

/**
 * Convert camelCase or PascalCase to kebab-case
 * Handles numeric keys properly
 */
const toKebab = (segment: string | number): string =>
  String(segment)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();

/**
 * Recursively traverse primitives object and extract all tokens
 */
const appendTokens = (object: Record<string, unknown>, path: string[] = [], tokens: Token[] = []): Token[] => {
  for (const [key, value] of Object.entries(object)) {
    const nextPath = [...path, toKebab(key)];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      appendTokens(value as Record<string, unknown>, nextPath, tokens);
    } else {
      tokens.push({ name: nextPath.join('-'), value: value as string | number, path: [...path, key] });
    }
  }

  return tokens;
};

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
    grouped[category].sort((a, b) => {
      // Try to parse the last segment as a number for better sorting
      const aLast = a.path[a.path.length - 1];
      const bLast = b.path[b.path.length - 1];
      const aNum = parseFloat(aLast);
      const bNum = parseFloat(bLast);

      // If both are numbers, sort numerically
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return aNum - bNum;
      }

      // Otherwise, sort alphabetically by full token name
      return a.name.localeCompare(b.name);
    });
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
const allTokens: Token[] = appendTokens(primitives as Record<string, unknown>);
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
