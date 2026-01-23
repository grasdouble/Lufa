import StyleDictionary from 'style-dictionary';

// Register custom format for TypeScript declarations with @deprecated warnings
StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations-deprecated',
  format: ({ dictionary }) => {
    return dictionary.allTokens
      .map((token) => {
        const cssVarName = `lufa-${token.path.join('-')}`;
        return `/**
 * @deprecated DO NOT use in React components. Use CSS custom properties instead.
 * 
 * This export is ONLY for Storybook documentation, design token viewers, and tests.
 * React components MUST use CSS Modules with CSS variables for theming support.
 * 
 * @example
 * // ❌ BAD - Not themable
 * import { ${token.name} } from '@grasdouble/lufa_design-system-tokens';
 * const styles = { color: ${token.name} };
 * 
 * // ✅ GOOD - Use CSS Modules with CSS variables
 * .button { color: var(--${cssVarName}); }
 * 
 * @see packages/design-system/tokens/docs/USAGE_GUIDELINES.md
 */
export const ${token.name}: string;`;
      })
      .join('\n\n');
  },
});

export default {
  log: {
    verbosity: 'default',
  },
  source: [
    'src/primitives/**/*.json',
    'src/core/**/*.json',
    'src/semantic/**/*.json',
    'src/component/**/*.json',
    '!src/**/index.json', // Exclude index.json files to avoid metadata collisions
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'lufa', // CSS variables: --lufa-primitive-color-blue-600
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true, // Preserves 4-level token cascade
          },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      prefix: 'lufa', // JS exports: LufaPrimitiveColorBlue600
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations-deprecated', // Custom format with @deprecated
        },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens-docs.json',
          format: 'json/nested',
        },
      ],
    },
  },
};
