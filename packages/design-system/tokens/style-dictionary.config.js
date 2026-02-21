import StyleDictionary from 'style-dictionary';

import { cssWithMediaQueries } from './build/formats/css-with-media-queries.js';
import { responsiveTransform } from './build/transforms/responsive.js';
import { shadowCssShorthandCustom } from './build/transforms/shadow-css-shorthand-custom.js';
import { sizeRemFluid } from './build/transforms/size-rem-fluid.js';

// Register custom transform for responsive tokens
StyleDictionary.registerTransform(responsiveTransform);

// Register custom transform for size/rem that handles fluid clamp values
StyleDictionary.registerTransform(sizeRemFluid);

// Register custom shadow shorthand transform (replaces built-in to avoid size/rem warnings)
StyleDictionary.registerTransform(shadowCssShorthandCustom);

// Register custom format for CSS with media queries
StyleDictionary.registerFormat(cssWithMediaQueries);

/**
 * Custom format: VSCode extension map format
 * Generates tokens.map.json for the Lufa DS Preview VS Code extension
 * Format: { version, generatedAt, css: { varName: value }, paths: { tokenPath: value } }
 */
StyleDictionary.registerFormat({
  name: 'json/vscode-map',
  format: ({ dictionary }) => {
    const css = {};
    const paths = {};

    // Process all tokens
    dictionary.allTokens.forEach((token) => {
      // Add to paths map (e.g., "primitive.color.blue[500]": "oklch(60% 0.15 250)")
      const pathKey = token.path.join('.');
      paths[pathKey] = token.value || token.$value;

      // Add to css map (e.g., "--lufa-primitive-color-blue-500": "oklch(60% 0.15 250)")
      const cssVarName = `--lufa-${token.path.join('-')}`;
      css[cssVarName] = token.value || token.$value;
    });

    const output = {
      version: 1,
      generatedAt: new Date().toISOString(),
      css,
      paths,
    };

    return JSON.stringify(output, null, 2);
  },
});

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
        value: token.$value || token.value || token.original?.$value, // Prioritize transformed value
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

    // Helper: Resolve token value or reference (handles multiple {ref} in one value)
    const formatValue = (token, dictionary) => {
      if (
        outputReferences &&
        token.original.$value &&
        typeof token.original.$value === 'string' &&
        token.original.$value.includes('{')
      ) {
        // Handle single or multiple {ref} in one value
        return token.original.$value.replace(/\{([^}]+)\}/g, (_, refContent) => {
          const refPath = refContent.split('.');
          return `var(--${prefix}-${refPath.join('-')})`;
        });
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

    // 1. Default theme (:root and [data-mode='light'])
    output += ":root,\n[data-mode='light'] {\n";

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
      output += "[data-mode='dark'] {\n";
      tokensWithModes.forEach(({ token, modes }) => {
        const cssVarName = `--${prefix}-${token.path.join('-')}`;
        let darkValue = modes.dark;

        // Resolve reference if needed (handles multiple {ref} in one value)
        if (typeof darkValue === 'string' && darkValue.includes('{')) {
          darkValue = darkValue.replace(/\{([^}]+)\}/g, (_, refContent) => {
            const refPath = refContent.split('.');
            return `var(--${prefix}-${refPath.join('-')})`;
          });
        }

        output += `  ${cssVarName}: ${darkValue};\n`;
      });
      output += '}\n\n';

      // 3. High contrast mode
      output += "[data-mode='high-contrast'] {\n";
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
    verbosity: 'verbose',
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
      // No transformGroup - use explicit transforms list to avoid built-in size/rem
      prefix: 'lufa', // CSS variables: --lufa-primitive-color-blue-600
      buildPath: 'dist/',
      transforms: [
        // 1. ATTRIBUTE TRANSFORMS (add metadata)
        'attribute/cti',
        'attribute/responsive', // Custom: responsive breakpoint metadata

        // 2. NAME TRANSFORMS
        'name/kebab',

        // 3. VALUE TRANSFORMS
        'time/seconds',
        'html/icon',
        'size/rem/fluid', // Custom: handles both px and fluid clamp()
        'color/css',
        'asset/url',
        'fontFamily/css',
        'cubicBezier/css',

        // 4. SHORTHAND TRANSFORMS (composite types)
        'strokeStyle/css/shorthand', // For SVG strokes (future-proof)
        'border/css/shorthand', // For border tokens (future-proof)
        'typography/css/shorthand', // For typography tokens (future-proof)
        'transition/css/shorthand', // For transition tokens (future-proof)
        'shadow/css/shorthand-custom', // Custom: shadow without size/rem warnings
      ],
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables-with-media-queries', // Use custom format with media queries
          options: {
            outputReferences: true, // Preserves 4-level token cascade
            prefix: 'lufa',
          },
        },
      ],
    },
    json: {
      buildPath: 'dist/',
      transforms: [
        'attribute/cti',
        'name/kebab',
        'time/seconds',
        'size/rem/fluid', // Custom transform that handles both simple px and fluid clamp()
        'color/hex',
      ],
      files: [
        {
          destination: 'tokens-values.json',
          format: 'json/nested',
        },
        {
          destination: 'tokens-metadata.json',
          format: 'json/nested-with-metadata',
        },
        {
          destination: 'tokens.map.json',
          format: 'json/vscode-map',
        },
      ],
    },
  },
};
