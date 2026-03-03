/**
 * Label Component - Utilities Generator Config
 *
 * Source of truth for Label.module.css.
 * Run `pnpm generate:utilities Label` to regenerate the CSS file.
 */

module.exports = {
  component: 'Label',
  outputFile: 'Label.module.css',

  base: {
    display: 'block',
    'font-family': 'inherit',
    'font-size': 'var(--lufa-component-input-label-font-size)',
    'font-weight': 'var(--lufa-primitive-typography-font-weight-medium)',
    color: 'var(--lufa-component-input-label-color)',
    'margin-bottom': 'var(--lufa-component-input-label-spacing)',
    'line-height': 'var(--lufa-primitive-typography-line-height-tight)',
  },

  utilities: {},
};
