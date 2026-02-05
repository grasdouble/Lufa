import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Flex } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';

const meta = {
  title: '4. Foundation/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: 'The flex direction',
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
      description: 'The align-items property',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: 'The justify-content property',
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'The flex-wrap property',
    },
    gap: {
      control: 'select',
      options: ['tight', 'compact', 'default', 'comfortable', 'spacious'],
      description: 'The gap property (using semantic tokens)',
    },
    inline: {
      control: 'boolean',
      description: 'If true, sets display to inline-flex',
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof Flex>;

const generateCode = (variant: 'row' | 'column' | 'center') => {
  if (variant === 'column') {
    return `<Flex direction="column" gap="compact">\n  <div>Item</div>\n  <div>Item</div>\n</Flex>`;
  }

  if (variant === 'center') {
    return `<Flex justify="center" align="center" gap="default">\n  <div>Item</div>\n  <div>Item</div>\n</Flex>`;
  }

  return `<Flex gap="default">\n  <div>Item</div>\n  <div>Item</div>\n  <div>Item</div>\n</Flex>`;
};

const Item = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <div
    style={{
      backgroundColor: color,
      color: STORY_COLORS.neutral.white,
      padding: '1rem',
      borderRadius: '4px',
      textAlign: 'center',
      border: `1px solid ${STORY_COLORS.neutral.borderMedium}`,
    }}
  >
    {children}
  </div>
);

export const PropLayout: Story = {
  name: 'Prop: layout',
  render: () => {
    const [hoveredVariant, setHoveredVariant] = React.useState<'row' | 'column' | 'center'>('row');
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
            <div onMouseEnter={() => setHoveredVariant('row')}>
              <PropCard label="Row (default)" highlight={hoveredVariant === 'row'}>
                <Flex gap="default" style={{ border: `2px dashed ${colors[0].main}`, padding: '1rem' }}>
                  <Item color={colors[0].main}>Item 1</Item>
                  <Item color={colors[0].main}>Item 2</Item>
                  <Item color={colors[0].main}>Item 3</Item>
                </Flex>
              </PropCard>
            </div>

            <div onMouseEnter={() => setHoveredVariant('column')}>
              <PropCard label="Column" highlight={hoveredVariant === 'column'}>
                <Flex
                  direction="column"
                  gap="compact"
                  style={{ border: `2px dashed ${colors[1].main}`, padding: '1rem' }}
                >
                  <Item color={colors[1].main}>Item 1</Item>
                  <Item color={colors[1].main}>Item 2</Item>
                  <Item color={colors[1].main}>Item 3</Item>
                </Flex>
              </PropCard>
            </div>

            <div onMouseEnter={() => setHoveredVariant('center')}>
              <PropCard label="Center Align" highlight={hoveredVariant === 'center'}>
                <Flex
                  justify="center"
                  align="center"
                  gap="default"
                  style={{ border: `2px dashed ${colors[2].main}`, padding: '1rem' }}
                >
                  <Item color={colors[2].main}>1</Item>
                  <Item color={colors[2].main}>2</Item>
                </Flex>
              </PropCard>
            </div>
          </div>

          <CodeBlock code={generateCode(hoveredVariant)} language="jsx" title="JSX" subtitle={hoveredVariant} />
        </div>
      </StoryContainer>
    );
  },
};
