/**
 * CSS Utilities Configuration for Divider Component
 *
 * This configuration defines the utility classes for the Divider component.
 * Classes are generated based on orientation, variant, thickness, spacing, and lineStyle combinations.
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
  },

  utilities: {
    // ==========================================
    // ORIENTATION - Horizontal or Vertical
    // ==========================================
    orientation: {
      property: ['width', 'height', 'display'],
      values: {
        horizontal: ['100%', 'var(--divider-thickness, var(--lufa-component-divider-thickness-thin))', 'block'],
        vertical: ['var(--divider-thickness, var(--lufa-component-divider-thickness-thin))', '100%', 'inline-block'],
      },
    },

    // ==========================================
    // VARIANT - Color variants
    // ==========================================
    variant: {
      property: 'background-color',
      values: {
        default: 'var(--lufa-component-divider-color-default)',
        subtle: 'var(--lufa-component-divider-color-subtle)',
        strong: 'var(--lufa-component-divider-color-strong)',
      },
    },

    // ==========================================
    // THICKNESS - Line thickness
    // ==========================================
    thickness: {
      property: '--divider-thickness',
      values: {
        thin: 'var(--lufa-component-divider-thickness-thin)',
        medium: 'var(--lufa-component-divider-thickness-medium)',
        thick: 'var(--lufa-component-divider-thickness-thick)',
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
      property: 'background-image',
      values: {
        solid: 'none',
        dashed:
          'repeating-linear-gradient(to right, currentColor 0, currentColor 8px, transparent 8px, transparent 12px)',
      },
    },
  },

  // Custom classes that don't fit the utility pattern
  custom: {
    // Override for horizontal + dashed combination
    'orientation-horizontal.line-style-dashed': {
      'background-image':
        'repeating-linear-gradient(to right, var(--lufa-component-divider-color-default) 0, var(--lufa-component-divider-color-default) 8px, transparent 8px, transparent 12px)',
    },
    // Override for vertical + dashed combination
    'orientation-vertical.line-style-dashed': {
      'background-image':
        'repeating-linear-gradient(to bottom, var(--lufa-component-divider-color-default) 0, var(--lufa-component-divider-color-default) 8px, transparent 8px, transparent 12px)',
    },
  },
};
