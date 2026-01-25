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

/**
 * Custom format: CSS with multi-mode support
 * Generates CSS with [data-theme] selectors for light, dark, and high-contrast modes
 */
StyleDictionary.registerFormat({
  name: 'css/variables-with-modes',
  format: ({ dictionary, options, file }) => {
    const prefix = options.prefix || 'lufa';
    const { outputReferences } = options;

    // Helper: Resolve token value or reference
    const formatValue = (token, dictionary) => {
      if (
        outputReferences &&
        token.original.$value &&
        typeof token.original.$value === 'string' &&
        token.original.$value.startsWith('{')
      ) {
        // Extract reference path
        const refPath = token.original.$value.replace(/[{}]/g, '').split('.');
        const cssVarName = `--${prefix}-${refPath.join('-')}`;
        return `var(${cssVarName})`;
      }
      // Return the transformed value, or fallback to original $value
      return token.value || token.original?.$value || token.$value;
    };

    // Separate tokens with and without modes
    const tokensWithModes = [];
    const tokensWithoutModes = [];

    dictionary.allTokens.forEach((token) => {
      const modes = token.$extensions?.lufa?.modes || token.original?.$extensions?.lufa?.modes;
      if (modes) {
        tokensWithModes.push({ token, modes });
      } else {
        tokensWithoutModes.push(token);
      }
    });

    let output = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';

    // 1. Default theme (:root and [data-theme='light'])
    output += ":root,\n[data-theme='light'] {\n";

    // Tokens without modes (always in :root)
    tokensWithoutModes.forEach((token) => {
      const cssVarName = `--${prefix}-${token.path.join('-')}`;
      const value = formatValue(token, dictionary);
      const comment = token.$description ? ` /** ${token.$description} */` : '';
      output += `  ${cssVarName}: ${value};${comment}\n`;
    });

    // Tokens with modes (light mode values)
    tokensWithModes.forEach(({ token }) => {
      const cssVarName = `--${prefix}-${token.path.join('-')}`;
      const value = formatValue(token, dictionary);
      const comment = token.$description ? ` /** ${token.$description} */` : '';
      output += `  ${cssVarName}: ${value};${comment}\n`;
    });

    output += '}\n\n';

    // 2. Dark mode
    if (tokensWithModes.length > 0) {
      output += "[data-theme='dark'] {\n";
      tokensWithModes.forEach(({ token, modes }) => {
        const cssVarName = `--${prefix}-${token.path.join('-')}`;
        let darkValue = modes.dark;

        // Resolve reference if needed
        if (typeof darkValue === 'string' && darkValue.startsWith('{')) {
          const refPath = darkValue.replace(/[{}]/g, '').split('.');
          darkValue = `var(--${prefix}-${refPath.join('-')})`;
        }

        output += `  ${cssVarName}: ${darkValue};\n`;
      });
      output += '}\n\n';

      // 3. High contrast mode
      output += "[data-theme='high-contrast'] {\n";
      tokensWithModes.forEach(({ token, modes }) => {
        const cssVarName = `--${prefix}-${token.path.join('-')}`;
        const highContrastValue = modes['high-contrast'];
        output += `  ${cssVarName}: ${highContrastValue};\n`;
      });
      output += '}\n';
    }

    return output;
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
          format: 'css/variables-with-modes',
          options: {
            outputReferences: true, // Preserves 4-level token cascade
            prefix: 'lufa',
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
          format: 'json/nested',
        },
        {
          destination: 'tokens-metadata.json',
          format: 'json/nested-with-metadata',
        },
      ],
    },
  },
};
