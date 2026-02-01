import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Grid } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';

const meta = {
  title: '4. Primitives/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
      description: 'Number of columns',
    },
    gap: {
      control: 'select',
      options: ['tight', 'compact', 'default', 'comfortable', 'spacious'],
      description: 'Gap between items',
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch', 'baseline'],
      description: 'Align items (align-items)',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch'],
      description: 'Justify items (justify-items)',
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof Grid>;

const generateCode = (variant: 'two' | 'three' | 'four') => {
  if (variant === 'two') {
    return `<Grid columns={2} gap="default">\n  <div>Item</div>\n  <div>Item</div>\n</Grid>`;
  }

  if (variant === 'four') {
    return `<Grid columns={4} gap="tight">\n  <div>Item</div>\n  <div>Item</div>\n  <div>Item</div>\n  <div>Item</div>\n</Grid>`;
  }

  return `<Grid columns={3} gap="default">\n  <div>Item</div>\n  <div>Item</div>\n  <div>Item</div>\n</Grid>`;
};

const Item = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <div
    style={{
      backgroundColor: color,
      color: STORY_COLORS.neutral.white,
      padding: '1rem',
      borderRadius: '4px',
      textAlign: 'center',
      fontWeight: 600,
      border: `1px solid ${STORY_COLORS.neutral.borderMedium}`,
    }}
  >
    {children}
  </div>
);

export const PropColumns: Story = {
  name: 'Prop: columns',
  render: () => {
    const [hoveredVariant, setHoveredVariant] = React.useState<'two' | 'three' | 'four'>('three');
    const colors = [getColorByIndex(0), getColorByIndex(1), getColorByIndex(2)];

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            <div onMouseEnter={() => setHoveredVariant('two')}>
              <PropCard label="2 Columns" highlight={hoveredVariant === 'two'}>
                <Grid columns={2} gap="default" style={{ border: `2px dashed ${colors[0].main}`, padding: '1rem' }}>
                  {[1, 2, 3, 4].map((i) => (
                    <Item key={i} color={colors[0].main}>
                      {i}
                    </Item>
                  ))}
                </Grid>
              </PropCard>
            </div>

            <div onMouseEnter={() => setHoveredVariant('three')}>
              <PropCard label="3 Columns" highlight={hoveredVariant === 'three'}>
                <Grid columns={3} gap="default" style={{ border: `2px dashed ${colors[1].main}`, padding: '1rem' }}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Item key={i} color={colors[1].main}>
                      {i}
                    </Item>
                  ))}
                </Grid>
              </PropCard>
            </div>

            <div onMouseEnter={() => setHoveredVariant('four')}>
              <PropCard label="4 Columns" highlight={hoveredVariant === 'four'}>
                <Grid columns={4} gap="tight" style={{ border: `2px dashed ${colors[2].main}`, padding: '1rem' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Item key={i} color={colors[2].main}>
                      {i}
                    </Item>
                  ))}
                </Grid>
              </PropCard>
            </div>
          </div>

          <CodeBlock
            code={generateCode(hoveredVariant)}
            language="jsx"
            title="JSX"
            subtitle={hoveredVariant}
          />
        </div>
      </StoryContainer>
    );
  },
};
