import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import * as primitives from "../dist/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, "../dist");

mkdirSync(distDir, { recursive: true });

const toKebab = (segment) =>
  String(segment)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();

const appendTokens = (object, path = [], tokens = []) => {
  for (const [key, value] of Object.entries(object)) {
    const nextPath = [...path, toKebab(key)];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      appendTokens(value, nextPath, tokens);
    } else {
      tokens.push({ name: nextPath.join("-"), value });
    }
  }

  return tokens;
};

const tokens = appendTokens(primitives);

// Generate CSS custom properties
let css = ":root {\n";
for (const token of tokens) {
  css += `  --lufa-primitive-${token.name}: ${token.value};\n`;
}
css += "}\n";

writeFileSync(resolve(distDir, "styles.css"), css);
console.log("✅ Generated styles.css");
