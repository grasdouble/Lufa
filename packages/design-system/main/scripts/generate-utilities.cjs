#!/usr/bin/env node

/**
 * Utilities Generator - Generic Script
 *
 * Generates CSS utility classes for components based on their config files.
 * This script is reusable for Box, Text, Stack, and any future components.
 *
 * Usage:
 *   node scripts/generate-utilities.js Box
 *   node scripts/generate-utilities.js Text
 *   node scripts/generate-utilities.js Stack
 *   node scripts/generate-utilities.js --all  (generates all components)
 *
 * @example
 * // Config file structure (box.utilities.config.js):
 * module.exports = {
 *   component: 'Box',
 *   outputFile: 'Box.module.css',
 *   utilities: {
 *     padding: {
 *       property: 'padding',
 *       values: {
 *         sm: '--semantic-ui-spacing-compact',
 *         md: '--semantic-ui-spacing-default',
 *       }
 *     }
 *   }
 * };
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ==========================================
// Configuration
// ==========================================

const FOUNDATION_DIR = path.join(__dirname, '../src/foundation');
const CONTENT_DIR = path.join(__dirname, '../src/content');
const INTERACTION_DIR = path.join(__dirname, '../src/interaction');

const COMPONENT_CONFIGS = {
  // Foundation components
  Box: path.join(FOUNDATION_DIR, 'Box/box.utilities.config.cjs'),
  Stack: path.join(FOUNDATION_DIR, 'Stack/stack.utilities.config.cjs'),
  Cluster: path.join(FOUNDATION_DIR, 'Cluster/cluster.utilities.config.cjs'),
  Flex: path.join(FOUNDATION_DIR, 'Flex/flex.utilities.config.cjs'),
  Grid: path.join(FOUNDATION_DIR, 'Grid/grid.utilities.config.cjs'),
  Container: path.join(FOUNDATION_DIR, 'Container/container.utilities.config.cjs'),
  Center: path.join(FOUNDATION_DIR, 'Center/center.utilities.config.cjs'),
  Bleed: path.join(FOUNDATION_DIR, 'Bleed/bleed.utilities.config.cjs'),

  Divider: path.join(FOUNDATION_DIR, 'Divider/divider.utilities.config.cjs'),
  AspectRatio: path.join(FOUNDATION_DIR, 'AspectRatio/aspect-ratio.utilities.config.cjs'),

  // Content components
  Text: path.join(CONTENT_DIR, 'Text/text.utilities.config.cjs'),
  Icon: path.join(CONTENT_DIR, 'Icon/icon.utilities.config.cjs'),
  Badge: path.join(CONTENT_DIR, 'Badge/badge.utilities.config.cjs'),

  // Interaction components
  Button: path.join(INTERACTION_DIR, 'Button/button.utilities.config.cjs'),
};

// ==========================================
// CSS Generation Functions
// ==========================================

/**
 * Generate CSS class for a single utility value
 * @param {string} utilityName - Name of the utility (e.g., 'padding')
 * @param {string} valueName - Name of the value (e.g., 'md')
 * @param {string|string[]} property - CSS property name(s)
 * @param {string|string[]} cssValue - CSS value(s) (token or raw value)
 * @returns {string} CSS class string
 */
function generateCSSClass(utilityName, valueName, property, cssValue) {
  const className = `.${utilityName}-${valueName}`;
  const properties = Array.isArray(property) ? property : [property];

  // Handle values based on type:
  // - If cssValue is string and properties is array → replicate value for all properties
  // - If cssValue is array → map 1:1 with properties
  let values;
  if (Array.isArray(cssValue)) {
    values = cssValue;
    // Validate array lengths match
    if (properties.length !== values.length) {
      throw new Error(
        `Mismatch: ${properties.length} properties but ${values.length} values for ${utilityName}-${valueName}`
      );
    }
  } else {
    // Single value - replicate for all properties
    values = properties.map(() => cssValue);
  }

  // Generate CSS property-value pairs
  const cssProperties = properties
    .map((prop, index) => {
      const val = values[index];
      // Check if value is a CSS custom property (starts with --)
      const finalValue = typeof val === 'string' && val.startsWith('--') ? `var(${val})` : val;
      return `  ${prop}: ${finalValue};`;
    })
    .join('\n');

  return `${className} {\n${cssProperties}\n}`;
}

/**
 * Generate all CSS classes for a utility
 * @param {string} utilityName - Name of the utility (e.g., 'padding')
 * @param {object} utilityConfig - Utility configuration
 * @returns {string[]} Array of CSS class strings
 */
function generateUtilityClasses(utilityName, utilityConfig) {
  const { property, properties, values } = utilityConfig;
  const cssProperty = properties || property;

  const classes = [];

  for (const [valueName, cssValue] of Object.entries(values)) {
    const cssClass = generateCSSClass(utilityName, valueName, cssProperty, cssValue);
    classes.push(cssClass);
  }

  return classes;
}

/**
 * Generate base CSS classes (non-utility fundamental styles)
 * @param {object} baseConfig - Base configuration object
 * @param {string} componentName - Component name for class generation
 * @returns {string} Base CSS classes
 */
function generateBaseClasses(baseConfig, componentName) {
  if (!baseConfig) return '';

  const className = `.${componentName.toLowerCase()}`;
  const properties = Object.entries(baseConfig)
    .map(([prop, value]) => `  ${prop}: ${value};`)
    .join('\n');

  return `/* Base ${componentName} class */\n${className} {\n${properties}\n}`;
}

/**
 * Generate custom CSS classes (non-utility component-specific styles)
 * @param {object} customConfig - Custom classes configuration
 * @returns {string[]} Array of CSS class strings
 */
function generateCustomClasses(customConfig) {
  if (!customConfig) return [];

  const classes = [];

  for (const [className, styles] of Object.entries(customConfig)) {
    const properties = Object.entries(styles)
      .map(([prop, value]) => `  ${prop}: ${value};`)
      .join('\n');

    classes.push(`.${className} {\n${properties}\n}`);
  }

  return classes;
}

/**
 * Generate CSS blocks for compound selectors (multi-class combinations with optional pseudo-states)
 *
 * Config format:
 * compounds: [
 *   {
 *     selector: '.button.type-solid.variant-primary',
 *     comment: 'Solid + Primary (Blue)',          // optional
 *     properties: { 'background-color': 'var(--token)', color: 'white' },
 *     states: {                                   // optional
 *       ':hover:not(:disabled)': { 'background-color': 'var(--token-hover)' },
 *     }
 *   }
 * ]
 *
 * @param {Array} compounds - Array of compound selector configs
 * @returns {string[]} Array of CSS block strings
 */
function generateCompounds(compounds) {
  if (!compounds || compounds.length === 0) return [];

  const blocks = [];
  for (const { selector, comment, properties, states } of compounds) {
    if (comment) blocks.push(`/* ${comment} */`);

    const props = Object.entries(properties)
      .map(([prop, val]) => `  ${prop}: ${val};`)
      .join('\n');
    blocks.push(`${selector} {\n${props}\n}`);

    if (states) {
      for (const [stateSuffix, stateProps] of Object.entries(states)) {
        const statePropsStr = Object.entries(stateProps)
          .map(([prop, val]) => `  ${prop}: ${val};`)
          .join('\n');
        blocks.push(`${selector}${stateSuffix} {\n${statePropsStr}\n}`);
      }
    }
  }
  return blocks;
}

/**
 * Generate CSS blocks for standalone selectors (e.g. :focus-visible, complex child selectors)
 *
 * Config format:
 * selectors: [
 *   {
 *     selector: '.button:focus-visible',
 *     properties: { outline: '...', 'outline-offset': '...' }
 *   }
 * ]
 *
 * @param {Array} selectors - Array of selector configs
 * @returns {string[]} Array of CSS block strings
 */
function generateSelectors(selectors) {
  if (!selectors || selectors.length === 0) return [];

  return selectors.map(({ selector, comment, properties }) => {
    const lines = [];
    if (comment) lines.push(`/* ${comment} */`);
    const props = Object.entries(properties)
      .map(([prop, val]) => `  ${prop}: ${val};`)
      .join('\n');
    lines.push(`${selector} {\n${props}\n}`);
    return lines.join('\n');
  });
}

/**
 * Generate @keyframes blocks
 *
 * Config format:
 * keyframes: [
 *   {
 *     name: 'spin',
 *     steps: {
 *       from: { transform: 'rotate(0deg)' },
 *       to:   { transform: 'rotate(360deg)' },
 *     }
 *   }
 * ]
 *
 * @param {Array} keyframes - Array of keyframe configs
 * @returns {string[]} Array of @keyframes block strings
 */
function generateKeyframes(keyframes) {
  if (!keyframes || keyframes.length === 0) return [];

  return keyframes.map(({ name, steps }) => {
    const stepsStr = Object.entries(steps)
      .map(([step, props]) => {
        const propsStr = Object.entries(props)
          .map(([prop, val]) => `    ${prop}: ${val};`)
          .join('\n');
        return `  ${step} {\n${propsStr}\n  }`;
      })
      .join('\n');
    return `@keyframes ${name} {\n${stepsStr}\n}`;
  });
}

/**
 * Generate complete CSS file for a component
 * @param {object} config - Component configuration
 * @returns {string} Complete CSS file content
 */
function generateCSSFile(config) {
  const { component, utilities, base, custom, compounds, selectors, keyframes } = config;

  // Header
  const header = `/**
 * ${component} Component - Generated Utility Classes
 * 
 * DO NOT EDIT MANUALLY - This file is auto-generated.
 * 
 * Generated by: packages/design-system/main/scripts/generate-utilities.cjs
 * Configuration: See component directory for ${component.toLowerCase()}.utilities.config.cjs
 * 
 * To regenerate: pnpm generate:utilities ${component}
 */

`;

  // Generate base classes if provided
  const allSections = [];

  if (base) {
    const baseSection = `/* ========================================== */\n/* BASE CLASS */\n/* ========================================== */\n\n${generateBaseClasses(base, component)}`;
    allSections.push(baseSection);
  }

  // Generate CSS classes for each utility
  for (const [utilityName, utilityConfig] of Object.entries(utilities)) {
    const utilityClasses = generateUtilityClasses(utilityName, utilityConfig);

    // Add section comment
    const section = `/* ========================================== */\n/* ${utilityName.toUpperCase()} */\n/* ========================================== */\n\n`;

    allSections.push(section + utilityClasses.join('\n\n'));
  }

  // Generate custom classes if provided
  if (custom) {
    const customClasses = generateCustomClasses(custom);
    const section = `/* ========================================== */\n/* CUSTOM CLASSES */\n/* ========================================== */\n\n`;
    allSections.push(section + customClasses.join('\n\n'));
  }

  // Generate compound selector blocks (type+variant combinations with states)
  if (compounds && compounds.length > 0) {
    const compoundBlocks = generateCompounds(compounds);
    const section = `/* ========================================== */\n/* COMPOUND SELECTORS (type + variant combinations) */\n/* ========================================== */\n\n`;
    allSections.push(section + compoundBlocks.join('\n\n'));
  }

  // Generate standalone selector blocks (focus, animations, etc.)
  if (selectors && selectors.length > 0) {
    const selectorBlocks = generateSelectors(selectors);
    const section = `/* ========================================== */\n/* STANDALONE SELECTORS */\n/* ========================================== */\n\n`;
    allSections.push(section + selectorBlocks.join('\n\n'));
  }

  // Generate @keyframes
  if (keyframes && keyframes.length > 0) {
    const keyframeBlocks = generateKeyframes(keyframes);
    const section = `/* ========================================== */\n/* KEYFRAMES */\n/* ========================================== */\n\n`;
    allSections.push(section + keyframeBlocks.join('\n\n'));
  }

  return header + allSections.join('\n\n') + '\n';
}

// ==========================================
// File System Operations
// ==========================================

/**
 * Write CSS file to disk and format with prettier
 * @param {string} outputPath - Output file path
 * @param {string} content - CSS content
 */
function writeCSSFile(outputPath, content) {
  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`✅ Generated: ${path.relative(process.cwd(), outputPath)}`);

  // Format with prettier
  try {
    execSync(`npx prettier --write "${outputPath}"`, { stdio: 'ignore' });
    console.log(`   ✨ Formatted with prettier`);
  } catch (error) {
    console.warn(`   ⚠️  Could not format with prettier: ${error.message}`);
  }
}

/**
 * Generate utilities for a single component
 * @param {string} componentName - Component name (Box, Text, Stack)
 */
function generateComponent(componentName) {
  const configPath = COMPONENT_CONFIGS[componentName];

  if (!configPath) {
    console.error(`❌ Unknown component: ${componentName}`);
    console.log(`   Available components: ${Object.keys(COMPONENT_CONFIGS).join(', ')}`);
    process.exit(1);
  }

  if (!fs.existsSync(configPath)) {
    console.error(`❌ Config file not found: ${configPath}`);
    process.exit(1);
  }

  // Load config
  console.log(`📖 Reading config: ${path.relative(process.cwd(), configPath)}`);
  const config = require(configPath);

  // Generate CSS
  console.log(`🔨 Generating CSS for ${componentName}...`);
  const cssContent = generateCSSFile(config);

  // Write to file
  const outputPath = path.join(path.dirname(configPath), config.outputFile);
  writeCSSFile(outputPath, cssContent);

  // Stats
  const classCount = Object.values(config.utilities).reduce((total, util) => {
    return total + Object.keys(util.values).length;
  }, 0);

  console.log(`   📊 Generated ${classCount} utility classes`);
  console.log('');
}

/**
 * Generate utilities for all components
 */
function generateAll() {
  console.log('🚀 Generating utilities for all components...\n');

  for (const componentName of Object.keys(COMPONENT_CONFIGS)) {
    generateComponent(componentName);
  }

  console.log('✨ All utilities generated successfully!\n');
}

// ==========================================
// CLI Interface
// ==========================================

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('❌ Usage: node generate-utilities.js <ComponentName>');
    console.error('   or: node generate-utilities.js --all');
    console.error(`   Available components: ${Object.keys(COMPONENT_CONFIGS).join(', ')}`);
    process.exit(1);
  }

  const target = args[0];

  if (target === '--all' || target === '-a') {
    generateAll();
  } else {
    generateComponent(target);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

// Export for programmatic use
module.exports = {
  generateComponent,
  generateAll,
  generateCSSFile,
};
