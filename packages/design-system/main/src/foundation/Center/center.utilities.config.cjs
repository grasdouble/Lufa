module.exports = {
  component: 'Center',
  outputFile: 'Center.module.css',
  base: {
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
  },
  utilities: {
    inline: {
      property: 'display',
      values: {
        true: 'inline-flex',
      },
    },
  },
};
