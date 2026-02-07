/**
 * Button Component - Utility Classes Configuration
 *
 * This configuration defines all utility classes that will be generated
 * for the Button component. The script `generate-utilities.js` reads this
 * file and generates Button.module.css automatically.
 *
 * Architecture: Two-dimensional design
 * - TYPE: Visual style approach (solid, outline, ghost)
 * - VARIANT: Semantic color intention (primary, secondary, success, danger, warning, info, neutral)
 *
 * Note: Background colors for type+variant combinations are handled in
 * Button.additional.module.css using compound selectors (e.g., .type-solid.variant-primary)
 *
 * @see packages/design-system/main/scripts/generate-utilities.js
 * @see packages/design-system/main/src/components/Button/Button.additional.module.css
 */

module.exports = {
  component: 'Button',
  outputFile: 'Button.module.css',

  // Base CSS for the component (non-utility fundamental styles)
  base: {
    display: 'inline-flex',
    'align-items': 'center',
    'justify-content': 'center',
    gap: 'var(--lufa-semantic-ui-spacing-compact)', // 8px gap for icons
    cursor: 'pointer',
    'font-family': 'inherit',
    'font-weight': 'var(--lufa-primitive-typography-font-weight-semibold)',
    'text-decoration': 'none',
    'border-radius': 'var(--lufa-component-button-border-radius)', // Default radius (8px)
    transition: 'all var(--lufa-semantic-ui-transition-fast)',
    'user-select': 'none',
    'white-space': 'nowrap',
  },

  utilities: {
    // ==========================================
    // TYPE - Visual Style Approach (3 values)
    // ==========================================
    // Note: Background colors are set in Button.additional.module.css
    // based on type+variant combination
    type: {
      property: ['border-width', 'border-style'],
      values: {
        solid: ['0', 'none'],
        outline: ['1px', 'solid'],
        ghost: ['0', 'none'],
      },
    },

    // ==========================================
    // VARIANT - Semantic Color Intention (7 values)
    // ==========================================
    // Note: These are marker classes only
    // Actual colors are applied in Button.additional.module.css
    variant: {
      property: 'content',
      values: {
        primary: '""',
        secondary: '""',
        success: '""',
        danger: '""',
        warning: '""',
        info: '""',
        neutral: '""',
      },
    },

    // ==========================================
    // SIZES - Dimensions and Padding
    // ==========================================
    size: {
      property: ['height', 'padding-left', 'padding-right', 'font-size'],
      values: {
        sm: [
          'var(--lufa-component-button-height-sm)', // 32px
          'var(--lufa-semantic-ui-spacing-compact)', // 8px
          'var(--lufa-semantic-ui-spacing-compact)',
          'var(--lufa-component-button-font-size-sm)', // 14px
        ],
        md: [
          'var(--lufa-component-button-height-md)', // 40px
          'var(--lufa-semantic-ui-spacing-default)', // 16px
          'var(--lufa-semantic-ui-spacing-default)',
          'var(--lufa-component-button-font-size-md)', // 16px
        ],
        lg: [
          'var(--lufa-component-button-height-lg)', // 48px
          'var(--lufa-semantic-ui-spacing-comfortable)', // 24px
          'var(--lufa-semantic-ui-spacing-comfortable)',
          'var(--lufa-component-button-font-size-lg)', // 18px
        ],
      },
    },

    // ==========================================
    // RADIUS - Border Radius
    // ==========================================
    radius: {
      property: 'border-radius',
      values: {
        none: '0px', // Sharp corners
        sm: 'var(--lufa-semantic-ui-radius-small)', // 2px - subtle rounding
        base: 'var(--lufa-semantic-ui-radius-default)', // 8px - default (same as base)
        md: 'var(--lufa-semantic-ui-radius-medium)', // 12px - emphasized rounding
        full: 'var(--lufa-semantic-ui-radius-full)', // 9999px - pill shape
      },
    },

    // ==========================================
    // FULL WIDTH
    // ==========================================
    fullWidth: {
      property: 'width',
      values: {
        true: '100%',
      },
    },

    // ==========================================
    // DISABLED STATE
    // ==========================================
    disabled: {
      property: ['opacity', 'cursor', 'pointer-events'],
      values: {
        true: [
          'var(--lufa-component-button-disabled-opacity)', // 0.5
          'var(--lufa-component-button-disabled-cursor)', // not-allowed
          'none',
        ],
      },
    },

    // ==========================================
    // LOADING STATE
    // ==========================================
    loading: {
      property: ['opacity', 'cursor'],
      values: {
        true: ['0.7', 'wait'],
      },
    },
  },
};
