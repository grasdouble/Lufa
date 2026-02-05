module.exports = {
  component: 'Flex',
  outputFile: 'Flex.module.css',
  base: {
    display: 'flex',
  },
  utilities: {
    // Direction
    direction: {
      property: 'flex-direction',
      values: {
        row: 'row',
        column: 'column',
        'row-reverse': 'row-reverse',
        'column-reverse': 'column-reverse',
      },
    },
    // Wrap
    wrap: {
      property: 'flex-wrap',
      values: {
        nowrap: 'nowrap',
        wrap: 'wrap',
        'wrap-reverse': 'wrap-reverse',
      },
    },
    // Alignment (Main Axis)
    justify: {
      property: 'justify-content',
      values: {
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        between: 'space-between',
        around: 'space-around',
        evenly: 'space-evenly',
      },
    },
    // Alignment (Cross Axis)
    align: {
      property: 'align-items',
      values: {
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        baseline: 'baseline',
        stretch: 'stretch',
      },
    },
    // Gap (using semantic spacing tokens)
    gap: {
      property: 'gap',
      values: {
        tight: 'var(--lufa-semantic-ui-spacing-tight)',
        compact: 'var(--lufa-semantic-ui-spacing-compact)',
        default: 'var(--lufa-semantic-ui-spacing-default)',
        comfortable: 'var(--lufa-semantic-ui-spacing-comfortable)',
        spacious: 'var(--lufa-semantic-ui-spacing-spacious)',
      },
    },
    // Inline flex option
    inline: {
      property: 'display',
      values: {
        true: 'inline-flex',
      },
    },
  },
};
