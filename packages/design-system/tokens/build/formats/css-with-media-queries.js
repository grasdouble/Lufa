import { isResponsiveToken, getTokenBreakpoint, getMediaQuery } from '../transforms/responsive.js';

/**
 * Custom Format: CSS with Media Queries for Responsive Tokens
 * 
 * Generates CSS with:
 * 1. Base styles in :root (including responsive base values)
 * 2. Media query overrides for responsive variants
 * 3. [data-mode] selectors for theme modes
 * 
 * Example output:
 * :root {
 *   --lufa-core-layout-page-padding: 16px;
 * }
 * 
 * @media (min-width: 768px) {
 *   :root {
 *     --lufa-core-layout-page-padding: 24px;
 *   }
 * }
 */

/**
 * Format responsive tokens with media queries
 */
export const cssWithMediaQueries = {
  name: 'css/variables-with-media-queries',
  format: ({ dictionary, options }) => {
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
      return token.value || token.original?.$value || token.$value;
    };

    // Helper: Get CSS variable name for responsive token
    // Converts "page-padding-base" → "page-padding"
    const getResponsiveCSSVarName = (token) => {
      const path = [...token.path];
      const breakpoint = getTokenBreakpoint(token);
      
      // Only remove breakpoint suffix if token is actually part of responsive group
      // This prevents false positives where token name naturally ends with "md", "lg", etc.
      if (isResponsiveToken(token) && 
          ['base', 'sm', 'md', 'lg', 'xl', '2xl'].includes(path[path.length - 1])) {
        path.pop();
      }
      
      return `--${prefix}-${path.join('-')}`;
    };

    // Categorize tokens
    const staticTokens = [];
    const responsiveTokensByBreakpoint = {
      base: [],
      sm: [],
      md: [],
      lg: [],
      xl: [],
      '2xl': [],
    };
    const tokensWithModes = [];

    dictionary.allTokens.forEach((token) => {
      const modes = token.$extensions?.lufa?.modes || token.original?.$extensions?.lufa?.modes;
      
      if (modes) {
        tokensWithModes.push({ token, modes });
      } else if (isResponsiveToken(token)) {
        const breakpoint = getTokenBreakpoint(token);
        if (responsiveTokensByBreakpoint[breakpoint]) {
          responsiveTokensByBreakpoint[breakpoint].push(token);
        }
      } else {
        staticTokens.push(token);
      }
    });

    let output = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';

    // 1. Base styles (:root and [data-mode='light'])
    output += ":root,\n[data-mode='light'] {\n";

    // Static tokens (no responsive variants, no modes)
    staticTokens.forEach((token) => {
      const cssVarName = `--${prefix}-${token.path.join('-')}`;
      const value = formatValue(token, dictionary);
      const comment = token.$description ? ` /** ${token.$description} */` : '';
      output += `  ${cssVarName}: ${value};${comment}\n`;
    });

    // Responsive base tokens
    responsiveTokensByBreakpoint.base.forEach((token) => {
      const cssVarName = getResponsiveCSSVarName(token);
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

    // 2. Responsive media queries
    const breakpointsToGenerate = ['sm', 'md', 'lg', 'xl', '2xl'];
    
    breakpointsToGenerate.forEach((breakpoint) => {
      const tokens = responsiveTokensByBreakpoint[breakpoint];
      if (tokens.length > 0) {
        const mediaQuery = getMediaQuery(breakpoint);
        output += `@media ${mediaQuery} {\n`;
        output += '  :root {\n';
        
        tokens.forEach((token) => {
          const cssVarName = getResponsiveCSSVarName(token);
          const value = formatValue(token, dictionary);
          const comment = token.$description ? ` /** ${token.$description} */` : '';
          output += `    ${cssVarName}: ${value};${comment}\n`;
        });
        
        output += '  }\n';
        output += '}\n\n';
      }
    });

    // 3. Dark mode
    if (tokensWithModes.length > 0) {
      output += "[data-mode='dark'] {\n";
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

      // 4. High contrast mode
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
};

export default cssWithMediaQueries;
