/**
 * Box Component - Utility Classes Configuration
 *
 * This configuration defines all utility classes that will be generated
 * for the Box component. The script `generate-utilities.js` reads this
 * file and generates Box.module.css automatically.
 *
 * @see packages/design-system/main/scripts/generate-utilities.js
 */

module.exports = {
  component: 'Box',
  outputFile: 'Box.module.css',

  utilities: {
    // ==========================================
    // SPACING - Padding
    // ==========================================
    padding: {
      property: 'padding',
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact', // 8px
        default: '--lufa-semantic-ui-spacing-default', // 16px
        comfortable: '--lufa-semantic-ui-spacing-comfortable', // 24px
        spacious: '--lufa-semantic-ui-spacing-spacious', // 32px
      },
    },

    paddingX: {
      properties: ['padding-left', 'padding-right'],
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact',
        default: '--lufa-semantic-ui-spacing-default',
        comfortable: '--lufa-semantic-ui-spacing-comfortable',
        spacious: '--lufa-semantic-ui-spacing-spacious',
      },
    },

    paddingY: {
      properties: ['padding-top', 'padding-bottom'],
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact',
        default: '--lufa-semantic-ui-spacing-default',
        comfortable: '--lufa-semantic-ui-spacing-comfortable',
        spacious: '--lufa-semantic-ui-spacing-spacious',
      },
    },

    paddingTop: {
      property: 'padding-top',
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact',
        default: '--lufa-semantic-ui-spacing-default',
        comfortable: '--lufa-semantic-ui-spacing-comfortable',
        spacious: '--lufa-semantic-ui-spacing-spacious',
      },
    },

    paddingRight: {
      property: 'padding-right',
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact',
        default: '--lufa-semantic-ui-spacing-default',
        comfortable: '--lufa-semantic-ui-spacing-comfortable',
        spacious: '--lufa-semantic-ui-spacing-spacious',
      },
    },

    paddingBottom: {
      property: 'padding-bottom',
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact',
        default: '--lufa-semantic-ui-spacing-default',
        comfortable: '--lufa-semantic-ui-spacing-comfortable',
        spacious: '--lufa-semantic-ui-spacing-spacious',
      },
    },

    paddingLeft: {
      property: 'padding-left',
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact',
        default: '--lufa-semantic-ui-spacing-default',
        comfortable: '--lufa-semantic-ui-spacing-comfortable',
        spacious: '--lufa-semantic-ui-spacing-spacious',
      },
    },

    // ==========================================
    // SPACING - Margin
    // ==========================================
    margin: {
      property: 'margin',
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact',
        default: '--lufa-semantic-ui-spacing-default',
        comfortable: '--lufa-semantic-ui-spacing-comfortable',
        spacious: '--lufa-semantic-ui-spacing-spacious',
      },
    },

    marginX: {
      properties: ['margin-left', 'margin-right'],
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact',
        default: '--lufa-semantic-ui-spacing-default',
        comfortable: '--lufa-semantic-ui-spacing-comfortable',
        spacious: '--lufa-semantic-ui-spacing-spacious',
      },
    },

    marginY: {
      properties: ['margin-top', 'margin-bottom'],
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact',
        default: '--lufa-semantic-ui-spacing-default',
        comfortable: '--lufa-semantic-ui-spacing-comfortable',
        spacious: '--lufa-semantic-ui-spacing-spacious',
      },
    },

    marginTop: {
      property: 'margin-top',
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact',
        default: '--lufa-semantic-ui-spacing-default',
        comfortable: '--lufa-semantic-ui-spacing-comfortable',
        spacious: '--lufa-semantic-ui-spacing-spacious',
      },
    },

    marginRight: {
      property: 'margin-right',
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact',
        default: '--lufa-semantic-ui-spacing-default',
        comfortable: '--lufa-semantic-ui-spacing-comfortable',
        spacious: '--lufa-semantic-ui-spacing-spacious',
      },
    },

    marginBottom: {
      property: 'margin-bottom',
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact',
        default: '--lufa-semantic-ui-spacing-default',
        comfortable: '--lufa-semantic-ui-spacing-comfortable',
        spacious: '--lufa-semantic-ui-spacing-spacious',
      },
    },

    marginLeft: {
      property: 'margin-left',
      values: {
        none: '--lufa-primitive-spacing-0', // 0px - Fixed bug ADR-007
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact',
        default: '--lufa-semantic-ui-spacing-default',
        comfortable: '--lufa-semantic-ui-spacing-comfortable',
        spacious: '--lufa-semantic-ui-spacing-spacious',
      },
    },

    // ==========================================
    // BACKGROUND
    // ==========================================
    background: {
      property: 'background-color',
      values: {
        page: '--lufa-semantic-ui-background-page',
        surface: '--lufa-semantic-ui-background-surface',
        success: '--lufa-semantic-ui-background-success',
        error: '--lufa-semantic-ui-background-error',
        warning: '--lufa-semantic-ui-background-warning',
        info: '--lufa-semantic-ui-background-info',
        overlay: '--lufa-semantic-ui-overlay-backdrop',
        'on-primary': '--lufa-semantic-ui-background-on-primary',
        'on-secondary': '--lufa-semantic-ui-background-on-secondary',
        'on-success': '--lufa-semantic-ui-background-on-success',
        'on-error': '--lufa-semantic-ui-background-on-error',
        'on-warning': '--lufa-semantic-ui-background-on-warning',
        'on-info': '--lufa-semantic-ui-background-on-info',
      },
    },

    // ==========================================
    // BORDER - Radius
    // ==========================================
    borderRadius: {
      property: 'border-radius',
      values: {
        none: '0',
        small: '--lufa-semantic-ui-border-radius-small',
        default: '--lufa-semantic-ui-border-radius-default',
        medium: '--lufa-semantic-ui-border-radius-medium',
        large: '--lufa-semantic-ui-border-radius-large',
        full: '--lufa-semantic-ui-border-radius-full',
      },
    },

    // ==========================================
    // BORDER - Width
    // ==========================================
    borderWidth: {
      property: ['border-width', 'border-style'],
      values: {
        none: ['0', 'none'],
        thin: ['var(--lufa-semantic-ui-border-width-thin)', 'solid'],
        medium: ['var(--lufa-semantic-ui-border-width-medium)', 'solid'],
        thick: ['var(--lufa-semantic-ui-border-width-thick)', 'solid'],
      },
    },

    // ==========================================
    // BORDER - Color
    // ==========================================
    borderColor: {
      property: 'border-color',
      values: {
        default: '--lufa-semantic-ui-border-default',
        strong: '--lufa-semantic-ui-border-strong',
        success: '--lufa-semantic-ui-border-success',
        error: '--lufa-semantic-ui-border-error',
        warning: '--lufa-semantic-ui-border-warning',
        info: '--lufa-semantic-ui-border-info',
      },
    },

    // ==========================================
    // DISPLAY
    // ==========================================
    display: {
      property: 'display',
      values: {
        block: 'block',
        'inline-block': 'inline-block',
        flex: 'flex',
        'inline-flex': 'inline-flex',
        grid: 'grid',
        none: 'none',
      },
    },
  },
};
