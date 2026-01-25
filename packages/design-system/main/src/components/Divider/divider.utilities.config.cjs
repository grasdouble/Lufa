/**
 * CSS Utilities Configuration for Divider Component
 *
 * This configuration defines the utility classes for the Divider component.
 * Classes are generated based on orientation, emphasis, spacing, and lineStyle combinations.
 *
 * Generated CSS will be in Divider.module.css
 */

module.exports = {
  component: 'Divider',
  outputFile: 'Divider.module.css',

  // Base styles applied to all dividers
  base: {
    border: '0',
    margin: '0',
    '--divider-color': 'var(--lufa-component-divider-emphasis-default-color)',
    '--divider-thickness': 'var(--lufa-component-divider-emphasis-default-thickness)',
    '--divider-length': '100%',
  },

  utilities: {
    // ==========================================
    // ORIENTATION - Horizontal or Vertical
    // ==========================================
    orientation: {
      property: ['width', 'height', 'display'],
      values: {
        horizontal: ['var(--divider-length)', 'var(--divider-thickness)', 'block'],
        vertical: ['var(--divider-thickness)', 'var(--divider-length)', 'inline-block'],
      },
    },

    // ==========================================
    // EMPHASIS - Combined color + thickness
    // ==========================================
    emphasis: {
      property: ['--divider-color', '--divider-thickness'],
      values: {
        subtle: [
          'var(--lufa-component-divider-emphasis-subtle-color)',
          'var(--lufa-component-divider-emphasis-subtle-thickness)',
        ],
        default: [
          'var(--lufa-component-divider-emphasis-default-color)',
          'var(--lufa-component-divider-emphasis-default-thickness)',
        ],
        moderate: [
          'var(--lufa-component-divider-emphasis-moderate-color)',
          'var(--lufa-component-divider-emphasis-moderate-thickness)',
        ],
        strong: [
          'var(--lufa-component-divider-emphasis-strong-color)',
          'var(--lufa-component-divider-emphasis-strong-thickness)',
        ],
        bold: [
          'var(--lufa-component-divider-emphasis-bold-color)',
          'var(--lufa-component-divider-emphasis-bold-thickness)',
        ],
      },
    },

    // ==========================================
    // SPACING - Margin around divider
    // ==========================================
    spacing: {
      property: ['margin-top', 'margin-bottom', 'margin-left', 'margin-right'],
      values: {
        compact: [
          'var(--lufa-component-divider-spacing-compact)',
          'var(--lufa-component-divider-spacing-compact)',
          'var(--lufa-component-divider-spacing-compact)',
          'var(--lufa-component-divider-spacing-compact)',
        ],
        default: [
          'var(--lufa-component-divider-spacing-default)',
          'var(--lufa-component-divider-spacing-default)',
          'var(--lufa-component-divider-spacing-default)',
          'var(--lufa-component-divider-spacing-default)',
        ],
        comfortable: [
          'var(--lufa-component-divider-spacing-comfortable)',
          'var(--lufa-component-divider-spacing-comfortable)',
          'var(--lufa-component-divider-spacing-comfortable)',
          'var(--lufa-component-divider-spacing-comfortable)',
        ],
      },
    },

    // ==========================================
    // LINE STYLE - Solid or Dashed
    // ==========================================
    'line-style': {
      property: 'background-color',
      values: {
        solid: 'var(--divider-color)',
        dashed: 'transparent',
      },
    },

    // ==========================================
    // LENGTH - Control divider length (base)
    // ==========================================
    length: {
      property: '--divider-length',
      values: {
        full: 'var(--lufa-component-divider-length-full)',
        medium: 'var(--lufa-component-divider-length-medium)',
        short: 'var(--lufa-component-divider-length-short)',
      },
    },
  },

  // Custom classes that don't fit the utility pattern
  custom: {
    // Override for horizontal + dashed combination (uses --divider-color CSS variable)
    'orientation-horizontal.line-style-dashed': {
      'background-image':
        'repeating-linear-gradient(to right, var(--divider-color) 0, var(--divider-color) 8px, transparent 8px, transparent 12px)',
    },
    // Override for vertical + dashed combination (uses --divider-color CSS variable)
    'orientation-vertical.line-style-dashed': {
      'background-image':
        'repeating-linear-gradient(to bottom, var(--divider-color) 0, var(--divider-color) 8px, transparent 8px, transparent 12px)',
    },

    // Horizontal dividers with length - centered with margin-inline
    'orientation-horizontal.length-medium': {
      'margin-inline': 'auto',
    },
    'orientation-horizontal.length-short': {
      'margin-inline': 'auto',
    },

    // Vertical dividers with length - centered with margin-block
    'orientation-vertical.length-medium': {
      'margin-block': 'auto',
    },
    'orientation-vertical.length-short': {
      'margin-block': 'auto',
    },
  },
};
