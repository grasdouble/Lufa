/**
 * Input Component - Utilities Generator Config
 *
 * Source of truth for Input.module.css.
 * Run `pnpm generate:utilities Input` to regenerate the CSS file.
 */

module.exports = {
  component: 'Input',
  outputFile: 'Input.module.css',

  base: {
    display: 'inline-block',
    'box-sizing': 'border-box',
    width: '100%',
    'padding-block': 'var(--lufa-component-input-padding-md-block)',
    'padding-inline': 'var(--lufa-component-input-padding-md-inline)',
    'font-family': 'inherit',
    'font-size': 'var(--lufa-component-input-font-size-md)',
    'line-height': 'var(--lufa-core-typography-body-line-height)',
    color: 'var(--lufa-component-input-text-default)',
    'background-color': 'var(--lufa-component-input-background-default)',
    border: 'var(--lufa-component-input-border-width) solid var(--lufa-component-input-border-default)',
    'border-radius': 'var(--lufa-component-input-border-radius)',
    transition:
      'border-color var(--lufa-semantic-ui-transition-duration-fast), box-shadow var(--lufa-semantic-ui-transition-duration-fast)',
    outline: 'none',
  },

  utilities: {
    error: {
      property: 'border-color',
      values: {
        true: 'var(--lufa-component-input-border-error)',
      },
    },
    disabled: {
      property: ['background-color', 'color', 'border-color', 'cursor'],
      values: {
        true: [
          'var(--lufa-component-input-background-disabled)',
          'var(--lufa-component-input-text-disabled)',
          'var(--lufa-component-input-border-disabled)',
          'var(--lufa-component-input-state-disabled-cursor)',
        ],
      },
    },
    fullWidth: {
      property: ['width', 'display'],
      values: {
        true: ['100%', 'block'],
      },
    },
  },

  selectors: [
    {
      comment: 'Placeholder text color',
      selector: '.input::placeholder',
      properties: {
        color: 'var(--lufa-component-input-text-placeholder)',
      },
    },
    {
      comment: 'Focus ring (keyboard navigation)',
      selector: '.input:focus-visible',
      properties: {
        'border-color': 'var(--lufa-component-input-border-focus)',
        'box-shadow':
          '0 0 0 var(--lufa-component-shared-focus-outline-width) var(--lufa-component-shared-focus-outline-color)',
      },
    },
    {
      comment: 'Error + Focus — red focus ring',
      selector: '.input.error:focus-visible',
      properties: {
        'box-shadow': '0 0 0 var(--lufa-component-shared-focus-outline-width) var(--lufa-component-input-border-error)',
      },
    },
  ],
};
