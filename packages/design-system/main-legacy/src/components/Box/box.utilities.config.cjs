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
        none: '--semantic-ui-spacing-tight', // 4px
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact', // 8px
        default: '--semantic-ui-spacing-default', // 16px
        comfortable: '--semantic-ui-spacing-comfortable', // 24px
        spacious: '--semantic-ui-spacing-spacious', // 32px
      },
    },

    paddingX: {
      properties: ['padding-left', 'padding-right'],
      values: {
        none: '--semantic-ui-spacing-tight',
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact',
        default: '--semantic-ui-spacing-default',
        comfortable: '--semantic-ui-spacing-comfortable',
        spacious: '--semantic-ui-spacing-spacious',
      },
    },

    paddingY: {
      properties: ['padding-top', 'padding-bottom'],
      values: {
        none: '--semantic-ui-spacing-tight',
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact',
        default: '--semantic-ui-spacing-default',
        comfortable: '--semantic-ui-spacing-comfortable',
        spacious: '--semantic-ui-spacing-spacious',
      },
    },

    paddingTop: {
      property: 'padding-top',
      values: {
        none: '--semantic-ui-spacing-tight',
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact',
        default: '--semantic-ui-spacing-default',
        comfortable: '--semantic-ui-spacing-comfortable',
        spacious: '--semantic-ui-spacing-spacious',
      },
    },

    paddingRight: {
      property: 'padding-right',
      values: {
        none: '--semantic-ui-spacing-tight',
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact',
        default: '--semantic-ui-spacing-default',
        comfortable: '--semantic-ui-spacing-comfortable',
        spacious: '--semantic-ui-spacing-spacious',
      },
    },

    paddingBottom: {
      property: 'padding-bottom',
      values: {
        none: '--semantic-ui-spacing-tight',
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact',
        default: '--semantic-ui-spacing-default',
        comfortable: '--semantic-ui-spacing-comfortable',
        spacious: '--semantic-ui-spacing-spacious',
      },
    },

    paddingLeft: {
      property: 'padding-left',
      values: {
        none: '--semantic-ui-spacing-tight',
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact',
        default: '--semantic-ui-spacing-default',
        comfortable: '--semantic-ui-spacing-comfortable',
        spacious: '--semantic-ui-spacing-spacious',
      },
    },

    // ==========================================
    // SPACING - Margin
    // ==========================================
    margin: {
      property: 'margin',
      values: {
        none: '--semantic-ui-spacing-tight',
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact',
        default: '--semantic-ui-spacing-default',
        comfortable: '--semantic-ui-spacing-comfortable',
        spacious: '--semantic-ui-spacing-spacious',
      },
    },

    marginX: {
      properties: ['margin-left', 'margin-right'],
      values: {
        none: '--semantic-ui-spacing-tight',
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact',
        default: '--semantic-ui-spacing-default',
        comfortable: '--semantic-ui-spacing-comfortable',
        spacious: '--semantic-ui-spacing-spacious',
      },
    },

    marginY: {
      properties: ['margin-top', 'margin-bottom'],
      values: {
        none: '--semantic-ui-spacing-tight',
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact',
        default: '--semantic-ui-spacing-default',
        comfortable: '--semantic-ui-spacing-comfortable',
        spacious: '--semantic-ui-spacing-spacious',
      },
    },

    marginTop: {
      property: 'margin-top',
      values: {
        none: '--semantic-ui-spacing-tight',
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact',
        default: '--semantic-ui-spacing-default',
        comfortable: '--semantic-ui-spacing-comfortable',
        spacious: '--semantic-ui-spacing-spacious',
      },
    },

    marginRight: {
      property: 'margin-right',
      values: {
        none: '--semantic-ui-spacing-tight',
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact',
        default: '--semantic-ui-spacing-default',
        comfortable: '--semantic-ui-spacing-comfortable',
        spacious: '--semantic-ui-spacing-spacious',
      },
    },

    marginBottom: {
      property: 'margin-bottom',
      values: {
        none: '--semantic-ui-spacing-tight',
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact',
        default: '--semantic-ui-spacing-default',
        comfortable: '--semantic-ui-spacing-comfortable',
        spacious: '--semantic-ui-spacing-spacious',
      },
    },

    marginLeft: {
      property: 'margin-left',
      values: {
        none: '--semantic-ui-spacing-tight',
        tight: '--semantic-ui-spacing-tight',
        compact: '--semantic-ui-spacing-compact',
        default: '--semantic-ui-spacing-default',
        comfortable: '--semantic-ui-spacing-comfortable',
        spacious: '--semantic-ui-spacing-spacious',
      },
    },

    // ==========================================
    // BACKGROUND
    // ==========================================
    background: {
      property: 'background-color',
      values: {
        page: '--semantic-ui-background-page',
        surface: '--semantic-ui-background-surface',
        success: '--semantic-ui-background-success',
        error: '--semantic-ui-background-error',
        warning: '--semantic-ui-background-warning',
        info: '--semantic-ui-background-info',
        overlay: '--semantic-ui-background-overlay',
        'on-primary': '--semantic-ui-background-on-primary',
        'on-secondary': '--semantic-ui-background-on-secondary',
        'on-success': '--semantic-ui-background-on-success',
        'on-error': '--semantic-ui-background-on-error',
        'on-warning': '--semantic-ui-background-on-warning',
        'on-info': '--semantic-ui-background-on-info',
      },
    },

    // ==========================================
    // BORDER - Radius
    // ==========================================
    borderRadius: {
      property: 'border-radius',
      values: {
        none: '0',
        small: '--semantic-ui-radius-small',
        default: '--semantic-ui-radius-default',
        medium: '--semantic-ui-radius-medium',
        large: '--semantic-ui-radius-large',
        full: '--semantic-ui-radius-full',
      },
    },

    // ==========================================
    // BORDER - Width
    // ==========================================
    borderWidth: {
      property: 'border-width',
      values: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '4px',
      },
    },

    // ==========================================
    // BORDER - Color
    // ==========================================
    borderColor: {
      property: 'border-color',
      values: {
        default: '--semantic-ui-border-default',
        strong: '--semantic-ui-border-strong',
        success: '--semantic-ui-border-success',
        error: '--semantic-ui-border-error',
        warning: '--semantic-ui-border-warning',
        info: '--semantic-ui-border-info',
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
