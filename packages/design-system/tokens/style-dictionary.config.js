import StyleDictionary from 'style-dictionary';

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
          format: 'typescript/es6-declarations',
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
