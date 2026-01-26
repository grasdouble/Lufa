import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box } from '@grasdouble/lufa_design-system';

import {
  CodeBlock,
  MarginVisualizer,
  PaddingVisualizer,
  PlaygroundContainer,
  PropCard,
  StoryContainer,
} from '../../components/helpers';
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';

/**
 * Box - Universal Layout Primitive
 *
 * A flexible, polymorphic container component that serves as the foundation
 * for all layout compositions in the Lufa Design System v2.
 *
 * ## Features
 * - ✅ Utility-based props (spacing, backgrounds, borders, display)
 * - ✅ Polymorphic `as` prop for semantic HTML elements
 * - ✅ Performance-optimized (CSS classes, not inline styles)
 * - ✅ Token-based design (semantic layer tokens)
 */
const meta = {
  title: 'Primitives/Box',
  component: Box,
  parameters: {
    layout: 'fullscreen', // Use fullscreen for grid layouts
  },
  argTypes: {
    // Polymorphic
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside'],
      description: 'HTML element to render',
      table: {
        category: 'Polymorphic',
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'div' },
      },
    },

    // Spacing - Padding
    padding: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      description: 'Padding on all sides',
      table: { category: 'Spacing - Padding', type: { summary: 'SpacingValue' } },
    },
    paddingX: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      description: 'Horizontal padding',
      table: { category: 'Spacing - Padding', type: { summary: 'SpacingValue' } },
    },
    paddingY: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      description: 'Vertical padding',
      table: { category: 'Spacing - Padding', type: { summary: 'SpacingValue' } },
    },
    paddingTop: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      table: { category: 'Spacing - Padding', type: { summary: 'SpacingValue' } },
    },
    paddingRight: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      table: { category: 'Spacing - Padding', type: { summary: 'SpacingValue' } },
    },
    paddingBottom: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      table: { category: 'Spacing - Padding', type: { summary: 'SpacingValue' } },
    },
    paddingLeft: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      table: { category: 'Spacing - Padding', type: { summary: 'SpacingValue' } },
    },

    // Spacing - Margin
    margin: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      description: 'Margin on all sides',
      table: { category: 'Spacing - Margin', type: { summary: 'SpacingValue' } },
    },
    marginX: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      description: 'Horizontal margin',
      table: { category: 'Spacing - Margin', type: { summary: 'SpacingValue' } },
    },
    marginY: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      description: 'Vertical margin',
      table: { category: 'Spacing - Margin', type: { summary: 'SpacingValue' } },
    },
    marginTop: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      table: { category: 'Spacing - Margin', type: { summary: 'SpacingValue' } },
    },
    marginRight: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      table: { category: 'Spacing - Margin', type: { summary: 'SpacingValue' } },
    },
    marginBottom: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      table: { category: 'Spacing - Margin', type: { summary: 'SpacingValue' } },
    },
    marginLeft: {
      control: 'select',
      options: [undefined, 'none', 'tight', 'compact', 'default', 'comfortable', 'spacious'],
      table: { category: 'Spacing - Margin', type: { summary: 'SpacingValue' } },
    },

    // Background
    background: {
      control: 'select',
      options: [
        undefined,
        'page',
        'surface',
        'success',
        'error',
        'warning',
        'info',
        'overlay',
        'on-primary',
        'on-secondary',
        'on-success',
        'on-error',
        'on-warning',
        'on-info',
      ],
      description: 'Background color',
      table: { category: 'Background', type: { summary: 'BackgroundValue' } },
    },

    // Border
    borderRadius: {
      control: 'select',
      options: [undefined, 'none', 'small', 'default', 'medium', 'large', 'full'],
      table: { category: 'Border', type: { summary: 'BorderRadiusValue' } },
    },
    borderWidth: {
      control: 'select',
      options: [undefined, 'none', 'thin', 'medium', 'thick'],
      table: { category: 'Border', type: { summary: 'BorderWidthValue' } },
    },
    borderColor: {
      control: 'select',
      options: [undefined, 'default', 'strong', 'success', 'error', 'warning', 'info'],
      table: { category: 'Border', type: { summary: 'BorderColorValue' } },
    },

    // Display
    display: {
      control: 'select',
      options: [undefined, 'block', 'inline-block', 'flex', 'inline-flex', 'grid', 'none'],
      table: { category: 'Display', type: { summary: 'DisplayValue' } },
    },

    // Standard
    children: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'ReactNode' } },
    },
    className: {
      control: 'text',
      table: { category: 'Advanced', type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// PLAYGROUND
// ============================================

/**
 * ## Playground
 *
 * Interactive playground to experiment with all Box props.
 *
 * **Features:**
 * - Visual container with dashed border to see margins
 * - Grid overlay with toggle button (top of the container)
 * - Adjacent elements in 4 directions (Above, Before, After, Below) to test display modes
 * - Content Type control to test `display: flex` and `display: grid`
 *
 * **Usage:**
 * - Use the checkboxes above the container to toggle grid/adjacent elements
 * - Edit the controls below to see real-time changes
 * - **To test `display: flex/grid`:** Change "Content Type" control to "Multiple Items"
 * - Test margin props - they're now visible thanks to the dashed border
 * - Test display props - adjacent elements show how `display` affects layout:
 *   - `block`: Box takes full width, elements stack vertically
 *   - `inline-block`: Box inline with Before/After on same line
 *   - `inline`: Box inline with text-like behavior
 *   - `flex`: Box as flex container (use "Multiple Items" content)
 *   - `grid`: Box as grid container (use "Multiple Items" content)
 */
export const Playground: Story = {
  argTypes: {
    contentType: {
      control: 'select',
      options: ['text', 'multipleItems'],
      description: 'Type of content inside the Box (use "Multiple Items" to test flex/grid)',
      table: { category: 'Playground' },
    },
  },
  args: {
    padding: 'comfortable',
    background: 'info',
    borderRadius: 'medium',
    borderWidth: 'thin',
    borderColor: 'default',
    children: '🎨 Edit the controls to see changes in real-time!',
    contentType: 'text',
  },
  render: (args) => {
    // Determine content based on contentType control
    const content =
      args.contentType === 'multipleItems' ? (
        <>
          <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px' }}>Item 3</div>
          <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px' }}>Item 4</div>
        </>
      ) : (
        args.children
      );

    return (
      <PlaygroundContainer defaultShowGrid defaultShowAdjacentElements={false}>
        <Box {...args}>{content}</Box>
      </PlaygroundContainer>
    );
  },
};

// ============================================
// PROP: AS (Polymorphic)
// ============================================

/**
 * ## Prop: `as`
 *
 * Renders Box as different HTML elements for semantic markup.
 */
export const PropAs: Story = {
  render: () => {
    const [selectedElement, setSelectedElement] = React.useState<string>('div');

    // Generate JSX code for the selected element
    const generateJsxCode = (element: string): string => {
      return `<Box
  as="${element}"
  padding="comfortable"
  background="surface"
  borderWidth="thin"
  borderRadius="default"
>
  Content
</Box>`;
    };

    // Generate expected HTML output for the selected element
    const generateHtmlOutput = (element: string): string => {
      return `<${element}
  class="Box_box__... Box_padding-comfortable__... Box_background-surface__... ... +7 more"
  data-background="surface"
  data-padding="comfortable"
  data-border-width="thin"
  data-border-radius="default"
>
  ${element}
</${element}>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {(['div', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside'] as const).map((element) => (
              <PropCard
                key={element}
                label={`<${element}>`}
                highlight={selectedElement === element}
                onInteraction={() => setSelectedElement(element)}
                interactionType="click"
              >
                <Box as={element} padding="comfortable" background="surface" borderWidth="thin" borderRadius="default">
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '80px',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    {element}
                  </span>
                </Box>
              </PropCard>
            ))}
          </div>

          {/* Code block with tabs (HTML + JSX) */}
          <CodeBlock
            tabs={[
              {
                label: 'HTML',
                content: generateHtmlOutput(selectedElement),
              },
              {
                label: 'JSX',
                content: generateJsxCode(selectedElement),
              },
            ]}
            title="Code"
            subtitle={`<Box as="${selectedElement}">`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: PADDING
// ============================================

/**
 * ## Prop: `padding`
 *
 * Apply uniform padding on all sides.
 * Blue background visualizes the padding area, white border shows content.
 */
export const PropPadding: Story = {
  render: () => {
    const [hoveredPadding, setHoveredPadding] = React.useState<string>('default');

    {
      /* 
      💡 TOKEN EDUCATION: Spacing System
      
      Box padding uses semantic spacing tokens:
      - padding="none" → var(--lufa-semantic-spacing-none) = 0px
      - padding="tight" → var(--lufa-semantic-spacing-tight) = 4px
      - padding="compact" → var(--lufa-semantic-spacing-compact) = 8px
      - padding="default" → var(--lufa-semantic-spacing-default) = 16px
      - padding="comfortable" → var(--lufa-semantic-spacing-comfortable) = 24px
      - padding="spacious" → var(--lufa-semantic-spacing-spacious) = 32px
      
      ✅ Benefits:
      - Consistent spacing across entire application
      - Easy to adjust globally (change token value once)
      - Semantic naming makes intent clear
      - Prevents arbitrary spacing values
      
      The blue visualization shows the padding area around content.
    */
    }

    // Mapping of padding values to pixel sizes and colors
    // Note: 'none' and 'tight' both map to 4px (tight spacing)
    const paddingValues = [
      { value: 'none' as const, size: '4px', color: STORY_COLORS.neutral.borderMedium },
      { value: 'tight' as const, size: '4px', color: STORY_COLORS.primary.cyan },
      { value: 'compact' as const, size: '8px', color: STORY_COLORS.primary.green },
      { value: 'default' as const, size: '16px', color: STORY_COLORS.primary.blue },
      { value: 'comfortable' as const, size: '24px', color: STORY_COLORS.primary.violet },
      { value: 'spacious' as const, size: '32px', color: STORY_COLORS.primary.pink },
    ];

    const generateCode = (padding: string): string => {
      return `<Box padding="${padding}" borderRadius="default">
  Content
</Box>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {paddingValues.map(({ value, size, color }) => (
              <div key={value} onMouseEnter={() => setHoveredPadding(value)}>
                <PropCard label={`padding="${value}"`} highlight={hoveredPadding === value}>
                  <PaddingVisualizer color={color} showLabel={value !== 'none'} label={size}>
                    <Box padding={value} borderRadius="default">
                      <span
                        style={{
                          display: 'block',
                          backgroundColor: STORY_COLORS.neutral.white,
                          border: `2px solid ${STORY_COLORS.neutral.borderSlate}`,
                          borderRadius: '4px',
                          padding: '12px',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: STORY_COLORS.neutral.textSlate,
                          textAlign: 'center',
                        }}
                      >
                        Content
                      </span>
                    </Box>
                  </PaddingVisualizer>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredPadding)}
            language="jsx"
            title="JSX"
            subtitle={`padding="${hoveredPadding}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

/**
 * ## Props: `paddingX` & `paddingY`
 *
 * Directional padding shortcuts.
 * Different colors for visual distinction.
 */
export const PropPaddingXY: Story = {
  render: () => {
    const [hoveredVariant, setHoveredVariant] = React.useState<string>('paddingX');

    const generateCode = (variant: string): string => {
      if (variant === 'paddingX') {
        return `<Box paddingX="spacious" borderRadius="default">
  Horizontal padding
</Box>`;
      } else if (variant === 'paddingY') {
        return `<Box paddingY="spacious" borderRadius="default">
  Vertical padding
</Box>`;
      } else {
        return `<Box paddingX="spacious" paddingY="compact" borderRadius="default">
  Different X/Y spacing
</Box>`;
      }
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div onMouseEnter={() => setHoveredVariant('paddingX')}>
              <PropCard label='paddingX="spacious" (← →)' highlight={hoveredVariant === 'paddingX'}>
                <PaddingVisualizer color={STORY_COLORS.axis.x.main} showLabel label="32px">
                  <Box paddingX="spacious" borderRadius="default">
                    <div
                      style={{
                        backgroundColor: STORY_COLORS.axis.x.main,
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 600,
                        textAlign: 'center',
                        padding: '16px',
                        borderRadius: '4px',
                      }}
                    >
                      ← Horizontal padding →
                    </div>
                  </Box>
                </PaddingVisualizer>
              </PropCard>
            </div>

            <div onMouseEnter={() => setHoveredVariant('paddingY')}>
              <PropCard label='paddingY="spacious" (↑ ↓)' highlight={hoveredVariant === 'paddingY'}>
                <PaddingVisualizer color={STORY_COLORS.axis.y.main} showLabel label="32px">
                  <Box paddingY="spacious" borderRadius="default">
                    <div
                      style={{
                        backgroundColor: STORY_COLORS.axis.y.main,
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 600,
                        textAlign: 'center',
                        padding: '16px',
                        borderRadius: '4px',
                      }}
                    >
                      ↑<br />
                      Vertical padding
                      <br />↓
                    </div>
                  </Box>
                </PaddingVisualizer>
              </PropCard>
            </div>

            <div onMouseEnter={() => setHoveredVariant('combined')}>
              <PropCard label="paddingX + paddingY" highlight={hoveredVariant === 'combined'}>
                <PaddingVisualizer color={STORY_COLORS.axis.combined.main} showLabel label="X:32px Y:8px">
                  <Box paddingX="spacious" paddingY="compact" borderRadius="default">
                    <div
                      style={{
                        backgroundColor: STORY_COLORS.axis.combined.main,
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 600,
                        textAlign: 'center',
                        padding: '16px',
                        borderRadius: '4px',
                      }}
                    >
                      Different X/Y spacing
                    </div>
                  </Box>
                </PaddingVisualizer>
              </PropCard>
            </div>
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredVariant)}
            language="jsx"
            title="JSX"
            subtitle={hoveredVariant === 'combined' ? 'Combined' : hoveredVariant}
          />
        </div>
      </StoryContainer>
    );
  },
};

/**
 * ## Props: Individual Padding Sides
 *
 * Precise control over each side's padding.
 * Different border colors show which side has padding.
 */
export const PropPaddingIndividual: Story = {
  render: () => {
    const [hoveredProp, setHoveredProp] = React.useState<string>('paddingTop');

    const generateCode = (prop: string): string => {
      return `<Box ${prop}="spacious" borderRadius="default">
  Content
</Box>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { prop: 'paddingTop', label: 'Top ↓', ...STORY_COLORS.directional.top },
              { prop: 'paddingRight', label: 'Right ←', ...STORY_COLORS.directional.right },
              { prop: 'paddingBottom', label: 'Bottom ↑', ...STORY_COLORS.directional.bottom },
              { prop: 'paddingLeft', label: 'Left →', ...STORY_COLORS.directional.left },
            ].map(({ prop, label, main }) => (
              <div key={prop} onMouseEnter={() => setHoveredProp(prop)}>
                <PropCard label={`${prop}="spacious"`} highlight={hoveredProp === prop}>
                  <PaddingVisualizer color={main} showLabel label="32px">
                    <Box {...{ [prop]: 'spacious' }} borderRadius="default">
                      <div
                        style={{
                          backgroundColor: main,
                          color: 'white',
                          fontSize: '13px',
                          fontWeight: 600,
                          textAlign: 'center',
                          padding: '20px',
                          borderRadius: '4px',
                        }}
                      >
                        {label}
                      </div>
                    </Box>
                  </PaddingVisualizer>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredProp)}
            language="jsx"
            title="JSX"
            subtitle={`${hoveredProp}="spacious"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: MARGIN
// ============================================

/**
 * ## Prop: `margin`
 *
 * Applies margin to all sides of the Box.
 * Gray background container shows the margin spacing.
 */
export const PropMargin: Story = {
  render: () => {
    const [hoveredMargin, setHoveredMargin] = React.useState<string>('default');

    const generateCode = (margin: string): string => {
      return `<Box margin="${margin}" padding="default">
  Box
</Box>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {(['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const).map((value, idx) => {
              const storyColor = getColorByIndex(idx);
              const marginValues = {
                none: '0px',
                tight: '4px',
                compact: '8px',
                default: '16px',
                comfortable: '24px',
                spacious: '32px',
              };
              const marginSize = marginValues[value];

              return (
                <div key={value} onMouseEnter={() => setHoveredMargin(value)}>
                  <PropCard label={`margin="${value}"`} highlight={hoveredMargin === value}>
                    <div
                      style={{
                        backgroundColor: STORY_COLORS.neutral.backgroundLight,
                        borderRadius: '8px',
                        padding: '4px',
                        minHeight: '140px',
                        position: 'relative',
                        border: `2px dashed ${STORY_COLORS.neutral.borderMedium}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MarginVisualizer color={storyColor.main} showLabel={value !== 'none'} label={marginSize}>
                        <Box
                          margin={value}
                          padding="default"
                          style={{
                            backgroundColor: storyColor.main,
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: 600,
                            textAlign: 'center',
                            minWidth: '60px',
                            borderRadius: '6px',
                          }}
                        >
                          Box
                        </Box>
                      </MarginVisualizer>
                    </div>
                  </PropCard>
                </div>
              );
            })}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredMargin)}
            language="jsx"
            title="JSX"
            subtitle={`margin="${hoveredMargin}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

/**
 * ## Props: `marginX` & `marginY`
 *
 * Directional margin shortcuts.
 * Colored containers show the spacing area.
 */
export const PropMarginXY: Story = {
  render: () => {
    const [hoveredVariant, setHoveredVariant] = React.useState<string>('marginX');

    const generateCode = (variant: string): string => {
      if (variant === 'marginX') {
        return `<Box marginX="spacious" padding="comfortable" background="info">
  Horizontal margin
</Box>`;
      } else if (variant === 'marginY') {
        return `<Box marginY="spacious" padding="comfortable" background="warning">
  Vertical margin
</Box>`;
      } else {
        return `<Box marginX="spacious" marginY="comfortable" padding="comfortable" background="success">
  Combined margins
</Box>`;
      }
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div onMouseEnter={() => setHoveredVariant('marginX')}>
              <PropCard label='marginX="spacious" (← →)' highlight={hoveredVariant === 'marginX'}>
                <div
                  style={{
                    backgroundColor: STORY_COLORS.axis.x.light,
                    padding: '16px',
                    borderRadius: '8px',
                    border: `2px dashed ${STORY_COLORS.axis.x.main}`,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MarginVisualizer color={STORY_COLORS.axis.x.main} showLabel label="32px">
                    <Box
                      marginX="spacious"
                      padding="comfortable"
                      background="info"
                      borderRadius="default"
                      style={{
                        backgroundColor: STORY_COLORS.axis.x.main,
                        color: 'white',
                        fontWeight: 600,
                        textAlign: 'center',
                        fontSize: '14px',
                      }}
                    >
                      ← Horizontal margin →
                    </Box>
                  </MarginVisualizer>
                </div>
              </PropCard>
            </div>

            <div onMouseEnter={() => setHoveredVariant('marginY')}>
              <PropCard label='marginY="spacious" (↑ ↓)' highlight={hoveredVariant === 'marginY'}>
                <div
                  style={{
                    backgroundColor: STORY_COLORS.axis.y.light,
                    padding: '16px',
                    borderRadius: '8px',
                    border: `2px dashed ${STORY_COLORS.axis.y.main}`,
                    minHeight: '160px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MarginVisualizer color={STORY_COLORS.axis.y.main} showLabel label="32px">
                    <Box
                      marginY="spacious"
                      padding="comfortable"
                      background="warning"
                      borderRadius="default"
                      style={{
                        backgroundColor: STORY_COLORS.axis.y.main,
                        color: 'white',
                        fontWeight: 600,
                        textAlign: 'center',
                        fontSize: '14px',
                      }}
                    >
                      ↑ Vertical margin ↓
                    </Box>
                  </MarginVisualizer>
                </div>
              </PropCard>
            </div>

            <div onMouseEnter={() => setHoveredVariant('combined')}>
              <PropCard label="marginX + marginY" highlight={hoveredVariant === 'combined'}>
                <div
                  style={{
                    backgroundColor: STORY_COLORS.axis.combined.light,
                    padding: '16px',
                    borderRadius: '8px',
                    border: `2px dashed ${STORY_COLORS.axis.combined.main}`,
                    minHeight: '160px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MarginVisualizer color={STORY_COLORS.axis.combined.main} showLabel label="X:32px Y:24px">
                    <Box
                      marginX="spacious"
                      marginY="comfortable"
                      padding="comfortable"
                      background="success"
                      borderRadius="default"
                      style={{
                        backgroundColor: STORY_COLORS.axis.combined.main,
                        color: 'white',
                        fontWeight: 600,
                        textAlign: 'center',
                        fontSize: '14px',
                      }}
                    >
                      Combined margins
                    </Box>
                  </MarginVisualizer>
                </div>
              </PropCard>
            </div>
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredVariant)}
            language="jsx"
            title="JSX"
            subtitle={hoveredVariant === 'combined' ? 'Combined' : hoveredVariant}
          />
        </div>
      </StoryContainer>
    );
  },
};

/**
 * ## Props: Individual Margin Sides
 *
 * Precise control over each side's margin.
 * Colored containers show the spacing area.
 */
export const PropMarginIndividual: Story = {
  render: () => {
    const [hoveredProp, setHoveredProp] = React.useState<string>('marginTop');

    const generateCode = (prop: string): string => {
      return `<Box ${prop}="spacious" padding="comfortable" background="surface">
  Content
</Box>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { prop: 'marginTop', label: 'Top ↓', ...STORY_COLORS.directional.top },
              { prop: 'marginRight', label: 'Right ←', ...STORY_COLORS.directional.right },
              { prop: 'marginBottom', label: 'Bottom ↑', ...STORY_COLORS.directional.bottom },
              { prop: 'marginLeft', label: 'Left →', ...STORY_COLORS.directional.left },
            ].map(({ prop, label, main, light }) => (
              <div key={prop} onMouseEnter={() => setHoveredProp(prop)}>
                <PropCard label={`${prop}="spacious"`} highlight={hoveredProp === prop}>
                  <div
                    style={{
                      backgroundColor: light,
                      borderRadius: '8px',
                      padding: '4px',
                      border: `2px dashed ${main}`,
                      minHeight: '140px',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MarginVisualizer color={main} showLabel label="32px">
                      <Box
                        {...{ [prop]: 'spacious' }}
                        padding="comfortable"
                        background="surface"
                        borderRadius="default"
                        style={{
                          backgroundColor: main,
                          color: 'white',
                          fontSize: '13px',
                          fontWeight: 600,
                          textAlign: 'center',
                          minWidth: '80px',
                        }}
                      >
                        {label}
                      </Box>
                    </MarginVisualizer>
                  </div>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredProp)}
            language="jsx"
            title="JSX"
            subtitle={`${hoveredProp}="spacious"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: BACKGROUND
// ============================================

/**
 * ## Prop: `background`
 *
 * Applies semantic background colors to the Box.
 */
export const PropBackground: Story = {
  render: () => {
    const [hoveredBg, setHoveredBg] = React.useState<string>('surface');

    {
      /* 
      💡 TOKEN EDUCATION: Semantic Background Colors
      
      Box background uses semantic UI tokens that adapt to themes:
      
      - background="page" → var(--lufa-semantic-ui-background-page)
        Main page background color
        
      - background="surface" → var(--lufa-semantic-ui-background-surface)
        Elevated surfaces like cards and panels
        
      - background="success/error/warning/info" → Semantic state backgrounds
        Used for alerts, notifications, and status indicators
        
      - background="overlay" → var(--lufa-semantic-ui-overlay-backdrop)
        Semi-transparent modal/dialog backdrops
      
      ✅ Theme Adaptation:
      - Light mode: Light backgrounds, dark text
      - Dark mode: Dark backgrounds, light text  
      - High-contrast: Maximum contrast for accessibility
      
      Try switching themes to see automatic color adaptation!
    */
    }

    const generateCode = (bg: string): string => {
      return `<Box padding="comfortable" background="${bg}" borderRadius="default">
  ${bg}
</Box>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
            {(
              [
                'page',
                'surface',
                'success',
                'error',
                'warning',
                'info',
                'overlay',
                'on-primary',
                'on-secondary',
                'on-success',
                'on-error',
                'on-warning',
                'on-info',
              ] as const
            ).map((value) => (
              <div key={value} onMouseEnter={() => setHoveredBg(value)}>
                <PropCard label={`background="${value}"`} highlight={hoveredBg === value}>
                  <Box
                    padding="comfortable"
                    background={value}
                    borderRadius="default"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '80px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    {value}
                  </Box>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock code={generateCode(hoveredBg)} language="jsx" title="JSX" subtitle={`background="${hoveredBg}"`} />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: BORDER RADIUS
// ============================================

/**
 * ## Prop: `borderRadius`
 *
 * Controls the roundness of the Box's corners.
 */
export const PropBorderRadius: Story = {
  render: () => {
    const [hoveredRadius, setHoveredRadius] = React.useState<string>('default');

    const generateCode = (radius: string): string => {
      return `<Box 
  padding="comfortable" 
  background="surface" 
  borderWidth="medium" 
  borderRadius="${radius}"
>
  Content
</Box>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px' }}>
            {(['none', 'small', 'default', 'medium', 'large', 'full'] as const).map((value) => (
              <div key={value} onMouseEnter={() => setHoveredRadius(value)}>
                <PropCard label={`borderRadius="${value}"`} highlight={hoveredRadius === value}>
                  <Box
                    padding="comfortable"
                    background="surface"
                    borderWidth="medium"
                    borderColor="default"
                    borderRadius={value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '100px',
                      fontSize: '32px',
                      ...(value === 'full' ? { width: '100px', height: '100px', margin: '0 auto' } : {}),
                    }}
                  >
                    ◻️
                  </Box>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredRadius)}
            language="jsx"
            title="JSX"
            subtitle={`borderRadius="${hoveredRadius}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: BORDER WIDTH
// ============================================

/**
 * ## Prop: `borderWidth`
 *
 * Controls the thickness of the Box's border.
 */
export const PropBorderWidth: Story = {
  render: () => {
    const [hoveredWidth, setHoveredWidth] = React.useState<string>('medium');

    const generateCode = (width: string): string => {
      return `<Box 
  padding="comfortable" 
  background="surface" 
  borderWidth="${width}" 
  borderColor="default"
>
  ${width}
</Box>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {(['none', 'thin', 'medium', 'thick'] as const).map((value) => (
              <div key={value} onMouseEnter={() => setHoveredWidth(value)}>
                <PropCard label={`borderWidth="${value}"`} highlight={hoveredWidth === value}>
                  <Box
                    padding="comfortable"
                    background="surface"
                    borderWidth={value}
                    borderColor="default"
                    borderRadius="default"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '80px',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    {value}
                  </Box>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredWidth)}
            language="jsx"
            title="JSX"
            subtitle={`borderWidth="${hoveredWidth}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: BORDER COLOR
// ============================================

/**
 * ## Prop: `borderColor`
 *
 * Controls the color of the Box's border.
 */
export const PropBorderColor: Story = {
  render: () => {
    const [hoveredColor, setHoveredColor] = React.useState<string>('default');

    const generateCode = (color: string): string => {
      return `<Box 
  padding="comfortable" 
  background="surface" 
  borderWidth="thick" 
  borderColor="${color}"
>
  ${color}
</Box>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
            {(['default', 'strong', 'success', 'error', 'warning', 'info'] as const).map((value) => (
              <div key={value} onMouseEnter={() => setHoveredColor(value)}>
                <PropCard label={`borderColor="${value}"`} highlight={hoveredColor === value}>
                  <Box
                    padding="comfortable"
                    background="surface"
                    borderWidth="thick"
                    borderColor={value}
                    borderRadius="default"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '90px',
                      fontSize: '28px',
                    }}
                  >
                    {value === 'success'
                      ? '✓'
                      : value === 'error'
                        ? '✕'
                        : value === 'warning'
                          ? '⚠'
                          : value === 'info'
                            ? 'ℹ'
                            : '▪'}
                  </Box>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredColor)}
            language="jsx"
            title="JSX"
            subtitle={`borderColor="${hoveredColor}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: DISPLAY
// ============================================

/**
 * ## Prop: `display`
 *
 * Controls the CSS display property of the Box.
 */
export const PropDisplay: Story = {
  render: () => {
    const [hoveredDisplay, setHoveredDisplay] = React.useState<string>('block');

    const generateCode = (display: string): string => {
      if (display === 'block') {
        return `<Box display="block" padding="default" background="info">
  Block content (takes full width)
</Box>`;
      } else if (display === 'inline-block') {
        return `Text before <Box display="inline-block" padding="compact" background="success">
  inline-block
</Box> text after`;
      } else if (display === 'flex') {
        return `<Box display="flex" padding="default" background="surface" style={{ gap: '12px' }}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Box>`;
      } else {
        return `<Box display="grid" padding="default" background="surface" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Box>`;
      }
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Examples */}
          <div onMouseEnter={() => setHoveredDisplay('block')}>
            <PropCard label='display="block"' highlight={hoveredDisplay === 'block'}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Box
                  display="block"
                  padding="default"
                  borderRadius="default"
                  style={{
                    backgroundColor: STORY_COLORS.primary.blue.main,
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 600,
                  }}
                >
                  Block 1 (takes full width)
                </Box>
                <Box
                  display="block"
                  padding="default"
                  borderRadius="default"
                  style={{
                    backgroundColor: STORY_COLORS.primary.violet.main,
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 600,
                  }}
                >
                  Block 2 (takes full width)
                </Box>
              </div>
            </PropCard>
          </div>

          <div onMouseEnter={() => setHoveredDisplay('inline-block')}>
            <PropCard label='display="inline-block"' highlight={hoveredDisplay === 'inline-block'}>
              <div style={{ fontSize: '14px' }}>
                Text before{' '}
                <Box
                  display="inline-block"
                  padding="compact"
                  borderRadius="default"
                  style={{
                    backgroundColor: STORY_COLORS.primary.green.main,
                    verticalAlign: 'middle',
                    fontWeight: 600,
                    color: 'white',
                  }}
                >
                  inline-block
                </Box>{' '}
                text after
              </div>
            </PropCard>
          </div>

          <div onMouseEnter={() => setHoveredDisplay('flex')}>
            <PropCard label='display="flex"' highlight={hoveredDisplay === 'flex'}>
              <Box
                display="flex"
                padding="default"
                background="surface"
                borderWidth="thin"
                borderRadius="default"
                style={{ gap: '12px' }}
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      padding: '20px',
                      backgroundColor: STORY_COLORS.primary.pink.main,
                      borderRadius: '6px',
                      flex: 1,
                      color: 'white',
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    Item {i}
                  </div>
                ))}
              </Box>
            </PropCard>
          </div>

          <div onMouseEnter={() => setHoveredDisplay('grid')}>
            <PropCard label='display="grid"' highlight={hoveredDisplay === 'grid'}>
              <Box
                display="grid"
                padding="default"
                background="surface"
                borderWidth="thin"
                borderRadius="default"
                style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    style={{
                      padding: '20px',
                      backgroundColor: STORY_COLORS.primary.orange.main,
                      borderRadius: '6px',
                      color: 'white',
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    {i}
                  </div>
                ))}
              </Box>
            </PropCard>
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredDisplay)}
            language="jsx"
            title="JSX"
            subtitle={`display="${hoveredDisplay}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};
