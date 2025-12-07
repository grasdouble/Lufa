import { copyFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcDir = resolve(__dirname, "../src");
const distDir = resolve(__dirname, "../dist");

// Create dist directory
mkdirSync(distDir, { recursive: true });

// Copy theme files
const themes = ["ocean.css", "forest.css"];

themes.forEach((theme) => {
  const src = resolve(srcDir, theme);
  const dest = resolve(distDir, theme);
  copyFileSync(src, dest);
  console.log(`✅ Copied ${theme}`);
});

console.log("✅ All themes copied to dist/");
