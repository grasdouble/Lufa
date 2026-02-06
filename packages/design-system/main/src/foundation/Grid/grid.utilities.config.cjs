module.exports = {
  component: 'Grid',
  outputFile: 'Grid.module.css',
  base: {
    display: 'grid',
  },
  utilities: {
    // Template Columns (simple presets)
    columns: {
      property: 'grid-template-columns',
      values: {
        1: 'repeat(1, minmax(0, 1fr))',
        2: 'repeat(2, minmax(0, 1fr))',
        3: 'repeat(3, minmax(0, 1fr))',
        4: 'repeat(4, minmax(0, 1fr))',
        5: 'repeat(5, minmax(0, 1fr))',
        6: 'repeat(6, minmax(0, 1fr))',
        12: 'repeat(12, minmax(0, 1fr))',
      },
    },
    // Gap (using semantic spacing tokens)
    gap: {
      property: 'gap',
      values: {
        none: '0',
        tight: 'var(--lufa-semantic-ui-spacing-tight)',
        compact: 'var(--lufa-semantic-ui-spacing-compact)',
        default: 'var(--lufa-semantic-ui-spacing-default)',
        comfortable: 'var(--lufa-semantic-ui-spacing-comfortable)',
        spacious: 'var(--lufa-semantic-ui-spacing-spacious)',
      },
    },
    gapX: {
      property: 'column-gap',
      values: {
        none: '0',
        tight: 'var(--lufa-semantic-ui-spacing-tight)',
        compact: 'var(--lufa-semantic-ui-spacing-compact)',
        default: 'var(--lufa-semantic-ui-spacing-default)',
        comfortable: 'var(--lufa-semantic-ui-spacing-comfortable)',
        spacious: 'var(--lufa-semantic-ui-spacing-spacious)',
      },
    },
    gapY: {
      property: 'row-gap',
      values: {
        none: '0',
        tight: 'var(--lufa-semantic-ui-spacing-tight)',
        compact: 'var(--lufa-semantic-ui-spacing-compact)',
        default: 'var(--lufa-semantic-ui-spacing-default)',
        comfortable: 'var(--lufa-semantic-ui-spacing-comfortable)',
        spacious: 'var(--lufa-semantic-ui-spacing-spacious)',
      },
    },
    // Alignment
    align: {
      property: 'align-items',
      values: {
        start: 'start',
        end: 'end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
      },
    },
    justify: {
      property: 'justify-items',
      values: {
        start: 'start',
        end: 'end',
        center: 'center',
        stretch: 'stretch',
      },
    },
    // Inline grid
    inline: {
      property: 'display',
      values: {
        true: 'inline-grid',
      },
    },
  },
};
