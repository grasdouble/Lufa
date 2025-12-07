import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { primitives } from "../dist/primitives.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, "../dist");

mkdirSync(distDir, { recursive: true });

// Generate CSS custom properties
let css = ":root {\n";

for (const [colorName, shades] of Object.entries(primitives)) {
  for (const [shade, value] of Object.entries(shades)) {
    css += `  --primitive-${colorName}-${shade}: ${value};\n`;
  }
}

css += "}\n";

writeFileSync(resolve(distDir, "primitives.css"), css);
console.log("✅ Generated primitives.css");
