#!/usr/bin/env tsx
/**
 * Copy tailwind.css and theme files to dist folder
 * This ensures the source Tailwind config is available for consumers
 * Foundation CSS files are generated directly to dist/ by generate:foundation
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
    // Copy and modify tailwind.css to import foundation files
    const srcPath = resolve(__dirname, '../src/tailwind.css');
    const destPath = resolve(__dirname, '../dist/tailwind.css');
    const destDir = dirname(destPath);

    if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true });
    }

    // Read the original file and add foundation imports
    let content = readFileSync(srcPath, 'utf-8');

    // Add foundation CSS imports and component styles after @import 'tailwindcss'
    const foundationImports = `
/* Import foundation CSS variables */
@import './foundation/colors.css';
@import './foundation/typography.css';
@import './foundation/spacing.css';
@import './foundation/radius.css';
@import './foundation/shadows.css';
@import './foundation/zIndex.css';
@import './foundation/breakpoints.css';

/* Import component styles */
@import './style.css';
`;

    content = content.replace("@import 'tailwindcss';", "@import 'tailwindcss';\n" + foundationImports);

    writeFileSync(destPath, content, 'utf-8');
    console.log('✅ Copied and modified tailwind.css to dist/');

    // Copy themes directory
    const themesDir = resolve(__dirname, '../src/themes');
    const destThemesDir = resolve(__dirname, '../dist/themes');

    if (!existsSync(destThemesDir)) {
        mkdirSync(destThemesDir, { recursive: true });
    }

    const themeFiles = readdirSync(themesDir);
    for (const file of themeFiles) {
        const srcFile = join(themesDir, file);
        const destFile = join(destThemesDir, file);

        if (statSync(srcFile).isFile() && file.endsWith('.css')) {
            copyFileSync(srcFile, destFile);
            console.log(`✅ Copied ${file} to dist/themes/`);
        }
    }

    console.log('✅ All Tailwind files copied successfully');
} catch (error) {
    console.error('❌ Failed to copy tailwind files:', error);
    process.exit(1);
}
