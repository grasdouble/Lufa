/**
 * Stack Component - Utility Classes Configuration
 *
 * This configuration defines all utility classes that will be generated
 * for the Stack component. The script `generate-utilities.js` reads this
 * file and generates Stack.module.css automatically.
 *
 * @see packages/design-system/main/scripts/generate-utilities.js
 */

module.exports = {
  component: 'Stack',
  outputFile: 'Stack.module.css',

  // Base CSS for the component (non-utility fundamental styles)
  base: {
    display: 'flex',
  },

  utilities: {
    // ==========================================
    // LAYOUT - Direction
    // ==========================================
    direction: {
      property: 'flex-direction',
      values: {
        vertical: 'column',
        horizontal: 'row',
      },
    },

    // ==========================================
    // LAYOUT - Spacing (Gap)
    // ==========================================
    spacing: {
      property: 'gap',
      values: {
        none: '0', // 4px
        tight: '--lufa-semantic-ui-spacing-tight',
        compact: '--lufa-semantic-ui-spacing-compact', // 8px
        default: '--lufa-semantic-ui-spacing-default', // 16px
        comfortable: '--lufa-semantic-ui-spacing-comfortable', // 24px
        spacious: '--lufa-semantic-ui-spacing-spacious', // 32px
      },
    },

    // ==========================================
    // LAYOUT - Align Items
    // ==========================================
    align: {
      property: 'align-items',
      values: {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        stretch: 'stretch',
        baseline: 'baseline',
      },
    },

    // ==========================================
    // LAYOUT - Justify Content
    // ==========================================
    justify: {
      property: 'justify-content',
      values: {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        'space-between': 'space-between',
        'space-around': 'space-around',
        'space-evenly': 'space-evenly',
      },
    },

    // ==========================================
    // LAYOUT - Flex Wrap
    // ==========================================
    wrap: {
      property: 'flex-wrap',
      values: {
        nowrap: 'nowrap',
        wrap: 'wrap',
        'wrap-reverse': 'wrap-reverse',
      },
    },
  },
};
