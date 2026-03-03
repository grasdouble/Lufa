import StyleDictionary from 'style-dictionary';

import wcagPreprocessor from './build/preprocessors/add-wcag-metadata.js';
import { shadowCssShorthandCustom } from './build/transforms/shadow-css-shorthand-custom.js';
import { sizeRemFluid } from './build/transforms/size-rem-fluid.js';

// Register WCAG preprocessor
StyleDictionary.registerPreprocessor(wcagPreprocessor);

// Register custom transform for size/rem that handles fluid clamp values
StyleDictionary.registerTransform(sizeRemFluid);

// Register custom shadow shorthand transform (replaces built-in to avoid size/rem warnings)
StyleDictionary.registerTransform(shadowCssShorthandCustom);

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
 * Custom format: CSS themeable token template
 *
 * Generates a CSS template file for theme authors to override themeable tokens.
 * Outputs 3 selector blocks: light, dark, high-contrast.
 *
 * Options:
 *   - outputReferences: boolean — if true, uses var(--lufa-*) references instead of resolved values
 *   - prefix: string — CSS variable prefix (default: 'lufa')
 *   - themeLevelFilter: 'starter' | 'extended' | 'advanced' — cumulative level filter
 */
StyleDictionary.registerFormat({
  name: 'css/themeable-tokens',
  format: ({ dictionary, options }) => {
    const prefix = options.prefix || 'lufa';
    const { outputReferences, themeLevelFilter } = options;

    // Helper: resolve token value or reference
    const formatValue = (token) => {
      if (
        outputReferences &&
        token.original.$value &&
        typeof token.original.$value === 'string' &&
        token.original.$value.includes('{')
      ) {
        return token.original.$value.replace(/\{([^}]+)\}/g, (_, refContent) => {
          const refPath = refContent.split('.');
          return `var(--${prefix}-${refPath.join('-')})`;
        });
      }
      return token.$value ?? token.value ?? token.original?.$value;
    };

    // Helper: resolve a modes value string (may contain {ref})
    const formatModeValue = (modeValue) => {
      if (typeof modeValue === 'string' && modeValue.includes('{')) {
        return modeValue.replace(/\{([^}]+)\}/g, (_, refContent) => {
          const refPath = refContent.split('.');
          return `var(--${prefix}-${refPath.join('-')})`;
        });
      }
      return modeValue;
    };

    // Filter: themeable + has modes
    const hasModes = (token) => {
      const modes = token.$extensions?.lufa?.modes || token.original?.$extensions?.lufa?.modes;
      return modes && typeof modes === 'object' && Object.keys(modes).length > 0;
    };

    const isThemeable = (token) =>
      token.$extensions?.lufa?.themeable === true || token.original?.$extensions?.lufa?.themeable === true;

    // For level-filtered outputs: include all themeable tokens (with or without modes).
    // For generic outputs (all): keep the hasModes requirement.
    let filtered = dictionary.allTokens.filter((t) =>
      themeLevelFilter ? isThemeable(t) : isThemeable(t) && hasModes(t)
    );

    // Filter by themeLevel (cumulative: starter ⊂ extended ⊂ advanced)
    if (themeLevelFilter) {
      const LEVEL_ORDER = ['starter', 'extended', 'advanced'];
      const maxIndex = LEVEL_ORDER.indexOf(themeLevelFilter);
      const allowedLevels = LEVEL_ORDER.slice(0, maxIndex + 1);
      filtered = filtered.filter((t) => {
        const tl = t.$extensions?.lufa?.themeLevel || t.original?.$extensions?.lufa?.themeLevel;
        return allowedLevels.includes(tl);
      });
    }

    if (filtered.length === 0) {
      return '/**\n * Do not edit directly, this file was auto-generated.\n */\n';
    }

    const tokenData = filtered.map((token) => {
      const modes = token.$extensions?.lufa?.modes || token.original?.$extensions?.lufa?.modes;
      return { token, modes };
    });

    let output = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';

    // 1. Light mode
    output += "[data-theme='your-theme-name'],\n[data-theme='your-theme-name'][data-mode='light'] {\n";
    tokenData.forEach(({ token }) => {
      const cssVarName = `--${prefix}-${token.path.join('-')}`;
      const value = formatValue(token);
      output += `  ${cssVarName}: ${value};\n`;
    });
    output += '}\n\n';

    // 2. Dark mode
    output += "[data-theme='your-theme-name'][data-mode='dark'] {\n";
    tokenData.forEach(({ token, modes }) => {
      const cssVarName = `--${prefix}-${token.path.join('-')}`;
      const darkValue = formatModeValue((modes && modes.dark) || formatValue(token));
      output += `  ${cssVarName}: ${darkValue};\n`;
    });
    output += '}\n\n';

    // 3. High-contrast mode
    output += "[data-theme='your-theme-name'][data-mode='high-contrast'] {\n";
    tokenData.forEach(({ token, modes }) => {
      const cssVarName = `--${prefix}-${token.path.join('-')}`;
      const hcValue = formatModeValue((modes && modes['high-contrast']) || (modes && modes.dark) || formatValue(token));
      output += `  ${cssVarName}: ${hcValue};\n`;
    });
    output += '}\n';

    return output;
  },
});

/**
 * Custom format: CSS with multi-mode support (Simplified)
 *
 * Generates CSS with [data-mode] selectors for light, dark, and high-contrast modes.
 *
 * Infers mode-awareness from presence of 'modes' object (no modeAware flag needed).
 * Light mode is implicit ($value), only dark and high-contrast need to be in modes.
 *
 * @see ADR-013: Token Metadata Simplification
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
      // Return the transformed value (SD v5: lives in token.$value after transforms, token.value is undefined)
      // Fallback chain: transformed $value → legacy value → original $value (raw)
      return token.$value ?? token.value ?? token.original?.$value;
    };

    // Helper: Check if token has modes (mode-aware is inferred)
    const hasModes = (token) => {
      const modes = token.$extensions?.lufa?.modes || token.original?.$extensions?.lufa?.modes;
      return modes && typeof modes === 'object' && Object.keys(modes).length > 0;
    };

    // Separate tokens with and without modes
    const tokensWithModes = [];
    const tokensWithoutModes = [];

    dictionary.allTokens.forEach((token) => {
      if (hasModes(token)) {
        const modes = token.$extensions?.lufa?.modes || token.original?.$extensions?.lufa?.modes;
        tokensWithModes.push({ token, modes });
      } else {
        tokensWithoutModes.push(token);
      }
    });

    let output = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';

    // 1. Light mode ([data-mode='light'] only - no :root)
    // Light mode uses $value (implicit)
    output += "[data-theme],\n[data-theme][data-mode='light'] {\n";

    // Tokens without modes (immutable - always same value)
    tokensWithoutModes.forEach((token) => {
      const cssVarName = `--${prefix}-${token.path.join('-')}`;
      const value = formatValue(token, dictionary);
      const comment = token.$description ? ` /** ${token.$description} */` : '';
      output += `  ${cssVarName}: ${value};${comment}\n`;
    });

    // Tokens with modes (light mode = $value)
    tokensWithModes.forEach(({ token }) => {
      const cssVarName = `--${prefix}-${token.path.join('-')}`;
      const value = formatValue(token, dictionary); // Light = $value (implicit)
      const comment = token.$description ? ` /** ${token.$description} */` : '';
      output += `  ${cssVarName}: ${value};${comment}\n`;
    });

    output += '}\n\n';

    // 2. Dark mode
    if (tokensWithModes.length > 0) {
      output += "[data-theme][data-mode='dark'] {\n";
      tokensWithModes.forEach(({ token, modes }) => {
        const cssVarName = `--${prefix}-${token.path.join('-')}`;
        let darkValue = modes.dark;

        if (!darkValue) {
          console.warn(`⚠️  Token ${token.path.join('.')} has modes but missing 'dark' - using $value`);
          darkValue = formatValue(token, dictionary);
        }

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

      // 3. High contrast mode (optional - fallback to dark if missing)
      output += "[data-theme][data-mode='high-contrast'] {\n";
      tokensWithModes.forEach(({ token, modes }) => {
        const cssVarName = `--${prefix}-${token.path.join('-')}`;
        let highContrastValue = modes['high-contrast'];

        // If no high-contrast, fallback to dark mode
        if (!highContrastValue) {
          highContrastValue = modes.dark;
        }

        // Resolve reference if needed
        if (typeof highContrastValue === 'string' && highContrastValue.includes('{')) {
          highContrastValue = highContrastValue.replace(/\{([^}]+)\}/g, (_, refContent) => {
            const refPath = refContent.split('.');
            return `var(--${prefix}-${refPath.join('-')})`;
          });
        }

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
  // Preprocessors run before building (enrich tokens)
  preprocessors: ['add-wcag-metadata'],
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
          format: 'css/variables-with-modes', // Use modes format (light/dark/high-contrast) without media queries
          options: {
            outputReferences: true, // Preserves 4-level token cascade
            prefix: 'lufa',
          },
        },
        {
          destination: 'themeable-tokens.css',
          format: 'css/themeable-tokens',
          options: {
            outputReferences: true,
            prefix: 'lufa',
          },
        },
        {
          destination: 'themeable-tokens-starter.css',
          format: 'css/themeable-tokens',
          options: {
            outputReferences: true,
            prefix: 'lufa',
            themeLevelFilter: 'starter',
          },
        },
        {
          destination: 'themeable-tokens-extended.css',
          format: 'css/themeable-tokens',
          options: {
            outputReferences: true,
            prefix: 'lufa',
            themeLevelFilter: 'extended',
          },
        },
        {
          destination: 'themeable-tokens-advanced.css',
          format: 'css/themeable-tokens',
          options: {
            outputReferences: true,
            prefix: 'lufa',
            themeLevelFilter: 'advanced',
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
