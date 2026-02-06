/**
 * Text Component - Utility Classes Configuration
 *
 * This configuration defines all utility classes that will be generated
 * for the Text component. The script `generate-utilities.js` reads this
 * file and generates Text.module.css automatically.
 *
 * @see packages/design-system/main/scripts/generate-utilities.js
 */

module.exports = {
  component: 'Text',
  outputFile: 'Text.module.css',

  utilities: {
    // ==========================================
    // TYPOGRAPHY - Variant (Size)
    // ==========================================
    variant: {
      property: 'font-size',
      values: {
        h1: '--lufa-semantic-typography-heading-1', // 48px
        h2: '--lufa-semantic-typography-heading-2', // 36px
        h3: '--lufa-semantic-typography-heading-3', // 30px
        h4: '--lufa-semantic-typography-heading-4', // 24px
        h5: '--lufa-semantic-typography-heading-5', // 20px
        h6: '--lufa-semantic-typography-heading-6', // 18px
        'body-large': '--lufa-semantic-typography-body-large', // 18px
        body: '--lufa-semantic-typography-body', // 16px
        'body-small': '--lufa-semantic-typography-body-small', // 14px
        caption: '--lufa-semantic-typography-caption', // 12px
        label: '--lufa-semantic-typography-label', // 14px
      },
    },

    // ==========================================
    // TYPOGRAPHY - Color
    // ==========================================
    color: {
      property: 'color',
      values: {
        primary: '--lufa-semantic-ui-text-primary',
        secondary: '--lufa-semantic-ui-text-secondary',
        tertiary: '--lufa-semantic-ui-text-tertiary',
        success: '--lufa-semantic-ui-text-success',
        error: '--lufa-semantic-ui-text-error',
        warning: '--lufa-semantic-ui-text-warning',
        info: '--lufa-semantic-ui-text-info',
        inverse: '--lufa-semantic-ui-background-on-primary', // White text
      },
    },

    // ==========================================
    // TYPOGRAPHY - Weight
    // ==========================================
    weight: {
      property: 'font-weight',
      values: {
        normal: '--lufa-primitive-typography-font-weight-normal',
        medium: '--lufa-primitive-typography-font-weight-medium',
        semibold: '--lufa-primitive-typography-font-weight-semibold',
        bold: '--lufa-primitive-typography-font-weight-bold',
      },
    },

    // ==========================================
    // TYPOGRAPHY - Alignment
    // ==========================================
    align: {
      property: 'text-align',
      values: {
        left: 'left',
        center: 'center',
        right: 'right',
        justify: 'justify',
      },
    },

    // ==========================================
    // TYPOGRAPHY - Transform
    // ==========================================
    transform: {
      property: 'text-transform',
      values: {
        none: 'none',
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
      },
    },
  },
};
