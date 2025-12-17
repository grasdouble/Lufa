import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const currentDir = dirname(filename);

const srcDir = resolve(currentDir, '../src');
const distDir = resolve(currentDir, '../dist');

mkdirSync(distDir, { recursive: true });

const themes = ['ocean.css', 'forest.css'] as const;

for (const theme of themes) {
    const src = resolve(srcDir, theme);
    const dest = resolve(distDir, theme);
    copyFileSync(src, dest);
    console.log(`✅ Copied ${theme}`);
}

console.log('✅ All themes copied to dist/');
