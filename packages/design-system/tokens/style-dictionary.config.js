import StyleDictionary from 'style-dictionary';

/**
 * Custom format: JSON with full metadata (for documentation)
 * Preserves value, $type, $description, and $extensions in nested structure
 */
StyleDictionary.registerFormat({
  name: 'json/nested-with-metadata',
  format: ({ dictionary }) => {
    const buildNestedObject = (obj, token) => {
      const path = token.path;
      let current = obj;

      // Navigate/create nested structure
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }

      // Add token with full metadata
      const lastKey = path[path.length - 1];

      current[lastKey] = {
        value: token.value || token.$value, // ✅ Fallback to $value if value is undefined
        type: token.$type || token.type,
        ...(token.$description && { description: token.$description }),
        ...(token.$extensions && { extensions: token.$extensions }),
      };

      return obj;
    };

    const output = dictionary.allTokens.reduce(buildNestedObject, {});
    return JSON.stringify(output, null, 2);
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
    json: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens-values.json',
          format: 'json/nested', // ✅ Test le format natif
        },
        {
          destination: 'tokens-metadata.json',
          format: 'json/nested-with-metadata',
        },
      ],
    },
  },
};
