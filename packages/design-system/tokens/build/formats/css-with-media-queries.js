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
    const resolveReference = (value) => {
      if (typeof value === 'string' && value.startsWith('{')) {
        const refPath = value.replace(/[{}]/g, '').split('.');
        return `var(--${prefix}-${refPath.join('-')})`;
      }
      return value;
    };

    const formatShadowValue = (value) => {
      const { offsetX, offsetY, blur, spread, color } = value || {};
      const parts = [offsetX, offsetY, blur, spread, color]
        .map(resolveReference)
        .filter(Boolean);
      return parts.join(' ');
    };

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
      // Use transformed value (token.$value or token.value), not original
      const value = token.$value || token.value || token.original?.$value;
      
      if ((token.$type || token.type) === 'shadow' && value && typeof value === 'object') {
        return formatShadowValue(value);
      }
      return resolveReference(value);
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
    const immutableTokens = []; // modeAware: false (primitives, layout)
    const modeAwareTokens = []; // modeAware: true (core, semantic, component)
    const responsiveTokensByBreakpoint = {
      base: [],
      sm: [],
      md: [],
      lg: [],
      xl: [],
      '2xl': [],
    };

    dictionary.allTokens.forEach((token) => {
      const modeAware = token.$extensions?.lufa?.modeAware || token.original?.$extensions?.lufa?.modeAware;
      const modes = token.$extensions?.lufa?.modes || token.original?.$extensions?.lufa?.modes;
      
      // ADR-011: Use modeAware flag to determine token behavior
      if (modeAware === true && modes) {
        modeAwareTokens.push({ token, modes });
      } else if (isResponsiveToken(token)) {
        const breakpoint = getTokenBreakpoint(token);
        if (responsiveTokensByBreakpoint[breakpoint]) {
          responsiveTokensByBreakpoint[breakpoint].push(token);
        }
      } else {
        // Immutable tokens (primitives, layout) - no mode selectors
        immutableTokens.push(token);
      }
    });

    let output = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';

    // 1. IMMUTABLE TOKENS - Always constant (no mode/theme variation)
    output += '/* ========================================\n';
    output += ' * IMMUTABLE TOKENS\n';
    output += ' * These never change regardless of mode or theme\n';
    output += ' * Layer: Primitives, Layout\n';
    output += ' * ======================================== */\n';
    output += ':root {\n';

    // Immutable tokens (primitives, layout) - ONLY in :root
    immutableTokens.forEach((token) => {
      const cssVarName = `--${prefix}-${token.path.join('-')}`;
      const value = formatValue(token, dictionary);
      const comment = token.$description ? ` /** ${token.$description} */` : '';
      output += `  ${cssVarName}: ${value};${comment}\n`;
    });

    // Responsive base tokens (also immutable)
    responsiveTokensByBreakpoint.base.forEach((token) => {
      const cssVarName = getResponsiveCSSVarName(token);
      const value = formatValue(token, dictionary);
      const comment = token.$description ? ` /** ${token.$description} */` : '';
      output += `  ${cssVarName}: ${value};${comment}\n`;
    });

    output += '}\n\n';

    // 2. MODE-AWARE TOKENS - Vary by [data-mode] attribute
    if (modeAwareTokens.length > 0) {
      output += '/* ========================================\n';
      output += ' * MODE-AWARE TOKENS\n';
      output += ' * These change based on [data-mode] attribute\n';
      output += ' * Layer: Core, Semantic, Component\n';
      output += ' * ======================================== */\n';
      output += ":root,\n[data-mode='light'] {\n";

      // Mode-aware tokens (light mode values)
      modeAwareTokens.forEach(({ token }) => {
        const cssVarName = `--${prefix}-${token.path.join('-')}`;
        const value = formatValue(token, dictionary);
        const comment = token.$description ? ` /** ${token.$description} */` : '';
        output += `  ${cssVarName}: ${value};${comment}\n`;
      });

      output += '}\n\n';
    }

    // 3. Responsive media queries
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

    // 4. Dark mode overrides (only for mode-aware tokens)
    if (modeAwareTokens.length > 0) {
      output += "[data-mode='dark'] {\n";
      modeAwareTokens.forEach(({ token, modes }) => {
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

      // 5. High contrast mode overrides (only for mode-aware tokens)
      output += "[data-mode='high-contrast'] {\n";
      modeAwareTokens.forEach(({ token, modes }) => {
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
