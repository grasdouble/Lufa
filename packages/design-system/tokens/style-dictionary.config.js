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
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'javascript/es6',
          options: {
            outputReferences: true,
          },
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
