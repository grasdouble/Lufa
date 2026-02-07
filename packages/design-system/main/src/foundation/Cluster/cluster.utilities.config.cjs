/**
 * Cluster Component - Utility Classes Configuration
 *
 * This configuration defines all utility classes that will be generated
 * for the Cluster component. The script `generate-utilities.js` reads this
 * file and generates Cluster.module.css automatically.
 *
 * Cluster is a layout component for wrapping collections with intelligent spacing.
 * Based on "The Cluster" pattern by Heydon Pickering from Every Layout.
 *
 * @see packages/design-system/main/scripts/generate-utilities.js
 */

module.exports = {
  component: 'Cluster',
  outputFile: 'Cluster.module.css',

  // Base CSS for the component (non-utility fundamental styles)
  base: {
    display: 'flex',
    'flex-wrap': 'wrap',
  },

  utilities: {
    // ==========================================
    // LAYOUT - Spacing (Gap)
    // ==========================================
    spacing: {
      property: 'gap',
      values: {
        tight: '--lufa-semantic-ui-spacing-tight', // 4px
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
        'flex-start': 'flex-start',
        center: 'center',
        'flex-end': 'flex-end',
        baseline: 'baseline',
        stretch: 'stretch',
      },
    },

    // ==========================================
    // LAYOUT - Justify Content
    // ==========================================
    justify: {
      property: 'justify-content',
      values: {
        'flex-start': 'flex-start',
        center: 'center',
        'flex-end': 'flex-end',
        'space-between': 'space-between',
        'space-around': 'space-around',
      },
    },
  },
};
