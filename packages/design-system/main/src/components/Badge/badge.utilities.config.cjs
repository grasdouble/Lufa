/**
 * Badge Component - Utility Classes Configuration
 *
 * This configuration defines all utility classes that will be generated
 * for the Badge component. The script `generate-utilities.js` reads this
 * file and generates Badge.module.css automatically.
 *
 * Architecture: Single-dimensional design
 * - VARIANT: Semantic color intention (default, success, error, warning, info)
 * - SIZE: Dimensions and padding (sm, md, lg)
 * - DOT: Optional notification dot indicator
 *
 * @see packages/design-system/main/scripts/generate-utilities.js
 */

module.exports = {
  component: 'Badge',
  outputFile: 'Badge.module.css',

  // Base CSS for the component (non-utility fundamental styles)
  base: {
    display: 'inline-flex',
    'align-items': 'center',
    gap: 'var(--lufa-semantic-ui-spacing-tight)', // 4px gap between dot and content
    'font-family': 'inherit',
    'font-weight': 'var(--lufa-primitive-typography-font-weight-medium)',
    'line-height': '1',
    'text-align': 'center',
    'white-space': 'nowrap',
    'border-radius': 'var(--lufa-component-badge-border-radius)', // Pill shape (full)
    'user-select': 'none',
  },

  utilities: {
    // ==========================================
    // VARIANT - Semantic Color Intention (5 values)
    // ==========================================
    variant: {
      property: ['background-color', 'color'],
      values: {
        default: ['var(--lufa-component-badge-default-background)', 'var(--lufa-component-badge-default-text)'],
        success: ['var(--lufa-component-badge-success-background)', 'var(--lufa-component-badge-success-text)'],
        error: ['var(--lufa-component-badge-error-background)', 'var(--lufa-component-badge-error-text)'],
        warning: ['var(--lufa-component-badge-warning-background)', 'var(--lufa-component-badge-warning-text)'],
        info: ['var(--lufa-component-badge-info-background)', 'var(--lufa-component-badge-info-text)'],
      },
    },

    // ==========================================
    // SIZES - Dimensions and Padding
    // ==========================================
    size: {
      property: ['padding', 'font-size'],
      values: {
        sm: [
          'var(--lufa-component-badge-padding-sm)', // 2px 6px
          'var(--lufa-component-badge-font-size-sm)', // 10px
        ],
        md: [
          'var(--lufa-component-badge-padding-md)', // 4px 8px
          'var(--lufa-component-badge-font-size-md)', // 12px
        ],
        lg: [
          'var(--lufa-component-badge-padding-lg)', // 6px 12px
          'var(--lufa-component-badge-font-size-lg)', // 14px
        ],
      },
    },
  },

  // ==========================================
  // CUSTOM CLASSES - Non-utility specific styles
  // ==========================================
  custom: {
    // Badge content wrapper (for proper spacing with dot)
    'badge-content': {
      display: 'inline-block',
    },

    // Dot indicator
    'badge-dot': {
      display: 'inline-block',
      width: 'var(--lufa-component-badge-dot-size)', // 6px
      height: 'var(--lufa-component-badge-dot-size)',
      'border-radius': '50%',
      'background-color': 'currentColor',
      'flex-shrink': '0',
    },

    // Badge with dot (add left padding for visual balance)
    'badge-with-dot': {
      'padding-left': 'var(--lufa-semantic-ui-spacing-tight)', // Slightly less than default padding
    },
  },
};
