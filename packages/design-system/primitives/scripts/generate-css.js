import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import * as primitives from "../dist/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, "../dist");

mkdirSync(distDir, { recursive: true });

/**
 * Convert camelCase or PascalCase to kebab-case
 * Handles numeric keys properly
 */
const toKebab = (segment) =>
  String(segment)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();

/**
 * Recursively traverse primitives object and extract all tokens
 */
const appendTokens = (object, path = [], tokens = []) => {
  for (const [key, value] of Object.entries(object)) {
    const nextPath = [...path, toKebab(key)];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      appendTokens(value, nextPath, tokens);
    } else {
      tokens.push({ name: nextPath.join("-"), value, path: [...path, key] });
    }
  }

  return tokens;
};

/**
 * Group tokens by their top-level category for organized CSS output
 */
const groupTokensByCategory = (tokens) => {
  const grouped = {};

  for (const token of tokens) {
    const category = token.path[0] || "misc";
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
const getCategoryName = (key) => {
  const names = {
    borderWidths: "BORDER WIDTHS",
    borderStyles: "BORDER STYLES",
    radius: "BORDER RADIUS",
    colorChromatics: "COLOR CHROMATICS",
    colorNeutrals: "COLOR NEUTRALS",
    blur: "BLUR EFFECTS",
    opacity: "OPACITY",
    shadows: "SHADOWS",
    zIndex: "Z-INDEX",
    iconSizes: "ICON SIZES",
    iconStrokes: "ICON STROKES",
    breakpoints: "BREAKPOINTS",
    grid: "GRID",
    easing: "EASING",
    timing: "TIMING",
    aspectRatio: "ASPECT RATIO",
    maxWidth: "MAX WIDTH",
    sizes: "SIZES",
    spacing: "SPACING",
    fontFamilies: "FONT FAMILIES",
    fontSizes: "FONT SIZES",
    fontWeights: "FONT WEIGHTS",
    letterSpacings: "LETTER SPACING",
    lineHeights: "LINE HEIGHTS",
  };

  return names[key] || key.toUpperCase();
};

// Extract all tokens
const allTokens = appendTokens(primitives);
const groupedTokens = groupTokensByCategory(allTokens);

// Generate CSS with organized sections
let css = "/**\n";
css += " * Lufa Design System - Primitive Tokens\n";
css += " * Auto-generated CSS custom properties\n";
css += " * DO NOT EDIT MANUALLY\n";
css += " */\n\n";
css += ":root {\n";

// Sort categories for consistent output
const sortedCategories = Object.keys(groupedTokens).sort();

for (const category of sortedCategories) {
  const tokens = groupedTokens[category];
  const categoryName = getCategoryName(category);

  css += `\n  /* ${categoryName} */\n`;

  for (const token of tokens) {
    css += `  --lufa-primitive-${token.name}: ${token.value};\n`;
  }
}

css += "}\n";

// Write CSS file
writeFileSync(resolve(distDir, "style.css"), css);

// Log summary
console.log("✅ Generated style.css");
console.log(`📊 Total tokens: ${allTokens.length}`);
console.log(`📁 Categories: ${sortedCategories.length}`);

// Log tokens per category
const categoryStats = sortedCategories.map((cat) => ({
  name: getCategoryName(cat),
  count: groupedTokens[cat].length,
}));

console.log("\n📈 Tokens by category:");
categoryStats.forEach(({ name, count }) => {
  console.log(`   ${name}: ${count}`.padEnd(40, " "));
});
