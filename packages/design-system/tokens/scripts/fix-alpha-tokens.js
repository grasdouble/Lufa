import { readFileSync, writeFileSync } from 'fs';

const filePath = './src/primitives/color/palette.json';
let content = readFileSync(filePath, 'utf-8');

// Replace all instances of "themable": true under alpha tokens
// with "level": "primitive", "category": "color", "themeable": false, "modeAware": false
content = content.replace(
  /"themable": true\s*\n\s*}/g,
  '"level": "primitive",\n                "category": "color",\n                "themeable": false,\n                "modeAware": false\n              }'
);

writeFileSync(filePath, content, 'utf-8');
console.log('✓ Fixed alpha tokens');
