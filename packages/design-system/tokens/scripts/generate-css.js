import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Import token tokens
import { colors } from "../dist/tokens/colors.js";
import { spacing } from "../dist/tokens/spacing.js";
import { radius } from "../dist/tokens/radius.js";
import { shadows } from "../dist/tokens/shadows.js";
import { zIndex } from "../dist/tokens/zIndex.js";
import { breakpoints } from "../dist/tokens/breakpoints.js";
import { maxWidth } from "../dist/tokens/maxWidth.js";
import typography from "../dist/tokens/typography.js";
import { container } from "../dist/tokens/container.js";
import { transition } from "../dist/tokens/transition.js";
import { blur } from "../dist/tokens/blur.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, "../dist");

mkdirSync(distDir, { recursive: true });

// Generate Lufa-prefixed tokens
let lufaCss = ":root {\n";

// Colors with lufa prefix
lufaCss += "  /* Colors */\n";
for (const [category, shades] of Object.entries(colors)) {
  for (const [shade, value] of Object.entries(shades)) {
    lufaCss += `  --lufa-color-${category}-${shade}: ${value};\n`;
  }
}

// Spacing with lufa prefix
lufaCss += "\n  /* Spacing */\n";
for (const [key, value] of Object.entries(spacing)) {
  lufaCss += `  --lufa-spacing-${key}: ${value};\n`;
}

// Radius with lufa prefix
lufaCss += "\n  /* Border Radius */\n";
for (const [key, value] of Object.entries(radius)) {
  lufaCss += `  --lufa-radius-${key}: ${value};\n`;
}

// Shadows with lufa prefix
lufaCss += "\n  /* Shadows */\n";
for (const [key, value] of Object.entries(shadows)) {
  lufaCss += `  --lufa-shadow-${key}: ${value};\n`;
}

// Z-Index with lufa prefix
lufaCss += "\n  /* Z-Index */\n";
for (const [key, value] of Object.entries(zIndex)) {
  lufaCss += `  --lufa-z-index-${key}: ${value};\n`;
}

// Breakpoints with lufa prefix
lufaCss += "\n  /* Breakpoints */\n";
for (const [key, value] of Object.entries(breakpoints)) {
  lufaCss += `  --lufa-breakpoint-${key}: ${value};\n`;
}

// Max Width with lufa prefix
lufaCss += "\n  /* Max Width */\n";
for (const [key, value] of Object.entries(maxWidth)) {
  lufaCss += `  --lufa-max-width-${key}: ${value};\n`;
}

// Typography with lufa prefix
lufaCss += "\n  /* Typography - Font Sizes */\n";
for (const [key, value] of Object.entries(typography.fontSize)) {
  lufaCss += `  --lufa-font-size-${key}: ${value};\n`;
}

lufaCss += "\n  /* Typography - Line Heights */\n";
for (const [key, value] of Object.entries(typography.lineHeight)) {
  lufaCss += `  --lufa-line-height-${key}: ${value};\n`;
}

lufaCss += "\n  /* Typography - Font Weights */\n";
for (const [key, value] of Object.entries(typography.fontWeight)) {
  lufaCss += `  --lufa-font-weight-${key}: ${value};\n`;
}

lufaCss += "\n  /* Typography - Letter Spacing */\n";
for (const [key, value] of Object.entries(typography.letterSpacing)) {
  lufaCss += `  --lufa-letter-spacing-${key}: ${value};\n`;
}

// Container with lufa prefix
lufaCss += "\n  /* Container */\n";
for (const [key, value] of Object.entries(container)) {
  lufaCss += `  --lufa-container-${key}: ${value};\n`;
}

// Transition with lufa prefix
lufaCss += "\n  /* Transition */\n";
for (const [key, value] of Object.entries(transition)) {
  lufaCss += `  --lufa-transition-${key}: ${value};\n`;
}

// Blur with lufa prefix
lufaCss += "\n  /* Blur */\n";
for (const [key, value] of Object.entries(blur)) {
  lufaCss += `  --lufa-blur-${key}: ${value};\n`;
}

lufaCss += "}\n";

writeFileSync(resolve(distDir, "styles.css"), lufaCss);
console.log("✅ Generated styles.css");
