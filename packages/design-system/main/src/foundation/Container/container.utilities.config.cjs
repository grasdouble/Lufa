module.exports = {
  component: 'Container',
  outputFile: 'Container.module.css',
  base: {
    width: '100%',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'padding-left': 'var(--lufa-component-container-padding-default)',
    'padding-right': 'var(--lufa-component-container-padding-default)',
  },
  utilities: {
    fluid: {
      property: 'max-width',
      values: {
        true: '100%',
      },
    },
    // Breakpoints scaling
    size: {
      property: 'max-width',
      values: {
        xs: 'var(--lufa-component-container-max-width-xs)',
        sm: 'var(--lufa-component-container-max-width-sm)',
        md: 'var(--lufa-component-container-max-width-md)',
        lg: 'var(--lufa-component-container-max-width-lg)',
        xl: 'var(--lufa-component-container-max-width-xl)',
        '2xl': 'var(--lufa-component-container-max-width-2xl)',
      },
    },
  },
};
