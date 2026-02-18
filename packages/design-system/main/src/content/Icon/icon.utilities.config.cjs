/**
 * Icon Component - Utility Classes Configuration
 *
 * This configuration defines all utility classes that will be generated
 * for the Icon component. The script `generate-utilities.js` reads this
 * file and generates Icon.module.css automatically.
 *
 * @see packages/design-system/main/scripts/generate-utilities.js
 */

module.exports = {
  component: 'Icon',
  outputFile: 'Icon.module.css',

  // Base CSS for the component (non-utility fundamental styles)
  base: {
    display: 'inline-flex',
    'align-items': 'center',
    'justify-content': 'center',
    'flex-shrink': '0',
  },

  utilities: {
    // ==========================================
    // SIZE VARIANTS
    // ==========================================
    size: {
      property: ['width', 'height'],
      values: {
        xs: '--lufa-component-shared-icon-size-xs', // 16px
        sm: '--lufa-component-shared-icon-size-sm', // 20px
        md: '--lufa-component-shared-icon-size-md', // 24px
        lg: '--lufa-component-shared-icon-size-lg', // 32px
        xl: '--lufa-component-shared-icon-size-xl', // 40px
      },
    },

    // ==========================================
    // COLOR VARIANTS
    // ==========================================
    color: {
      property: 'color',
      values: {
        currentColor: 'currentColor',
        primary: '--lufa-semantic-ui-text-primary',
        secondary: '--lufa-semantic-ui-text-secondary',
        success: '--lufa-semantic-ui-text-success',
        error: '--lufa-semantic-ui-text-error',
        warning: '--lufa-semantic-ui-text-warning',
        info: '--lufa-semantic-ui-text-info',
        muted: '--lufa-semantic-ui-text-tertiary',
      },
    },
  },

  // ==========================================
  // STANDALONE SELECTORS
  // ==========================================
  selectors: [
    // Visually hidden text for screen readers (used by title prop)
    {
      selector: '.visually-hidden',
      properties: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        'white-space': 'nowrap',
        'border-width': '0',
      },
    },
  ],
};
