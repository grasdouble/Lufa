import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Import foundation tokens
import { semantic } from "../dist/colors-semantic.js";
import { spacing } from "../dist/spacing.js";
import { radius } from "../dist/radius.js";
import { shadows } from "../dist/shadows.js";
import { zIndex } from "../dist/zIndex.js";
import { breakpoints } from "../dist/breakpoints.js";
import typography from "../dist/typography.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, "../dist");

mkdirSync(distDir, { recursive: true });

let css = ":root {\n";

// Semantic Colors
css += "  /* Semantic Colors */\n";
for (const [category, colors] of Object.entries(semantic)) {
  for (const [shade, value] of Object.entries(colors)) {
    css += `  --color-${category}-${shade}: ${value};\n`;
  }
}

// Spacing
css += "\n  /* Spacing */\n";
for (const [key, value] of Object.entries(spacing)) {
  css += `  --spacing-${key}: ${value};\n`;
}

// Radius
css += "\n  /* Border Radius */\n";
for (const [key, value] of Object.entries(radius)) {
  css += `  --radius-${key}: ${value};\n`;
}

// Shadows
css += "\n  /* Shadows */\n";
for (const [key, value] of Object.entries(shadows)) {
  css += `  --shadow-${key}: ${value};\n`;
}

// Z-Index
css += "\n  /* Z-Index */\n";
for (const [key, value] of Object.entries(zIndex)) {
  css += `  --z-index-${key}: ${value};\n`;
}

// Breakpoints
css += "\n  /* Breakpoints */\n";
for (const [key, value] of Object.entries(breakpoints)) {
  css += `  --breakpoint-${key}: ${value};\n`;
}

// Typography
css += "\n  /* Typography - Font Sizes */\n";
for (const [key, value] of Object.entries(typography.fontSize)) {
  css += `  --font-size-${key}: ${value};\n`;
}

css += "\n  /* Typography - Line Heights */\n";
for (const [key, value] of Object.entries(typography.lineHeight)) {
  css += `  --line-height-${key}: ${value};\n`;
}

css += "\n  /* Typography - Font Weights */\n";
for (const [key, value] of Object.entries(typography.fontWeight)) {
  css += `  --font-weight-${key}: ${value};\n`;
}

css += "\n  /* Typography - Letter Spacing */\n";
for (const [key, value] of Object.entries(typography.letterSpacing)) {
  css += `  --letter-spacing-${key}: ${value};\n`;
}

css += "}\n";

writeFileSync(resolve(distDir, "tokens.css"), css);
console.log("✅ Generated tokens.css");
