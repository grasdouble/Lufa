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
  },

  utilities: {
    // ==========================================
    // ORIENTATION - Horizontal or Vertical
    // ==========================================
    orientation: {
      property: ['width', 'height', 'display'],
      values: {
        horizontal: ['100%', 'var(--divider-thickness)', 'block'],
        vertical: ['var(--divider-thickness)', '100%', 'inline-block'],
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
  },

  // Custom classes that don't fit the utility pattern
  custom: {
    // Override for horizontal + dashed combination (uses --divider-color CSS variable)
    'orientation-horizontal.line-style-dashed': {
      'background-image':
        'repeating-linear-gradient(to right, var(--divider-color) 0, var(--divider-color) var(--lufa-component-divider-dash-size), transparent var(--lufa-component-divider-dash-size), transparent var(--lufa-component-divider-dash-gap))',
    },
    // Override for vertical + dashed combination (uses --divider-color CSS variable)
    'orientation-vertical.line-style-dashed': {
      'background-image':
        'repeating-linear-gradient(to bottom, var(--divider-color) 0, var(--divider-color) var(--lufa-component-divider-dash-size), transparent var(--lufa-component-divider-dash-size), transparent var(--lufa-component-divider-dash-gap))',
    },
  },
};
