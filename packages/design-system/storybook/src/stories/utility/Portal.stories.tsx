import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Portal } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { STORY_COLORS } from '../../constants/storyColors';

const meta = {
  title: '8. Utility/Portal',
  component: Portal,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    container: {
      control: 'object',
      description: 'Optional container element to render into (defaults to document.body)',
    },
  },
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof Portal>;

const generateCode = (variant: 'default' | 'custom') => {
  if (variant === 'custom') {
    return `<Portal container={customElement}>\n  <div>Custom container</div>\n</Portal>`;
  }

  return `<Portal>\n  <div>Floating content</div>\n</Portal>`;
};

export const PropContainer: Story = {
  name: 'Prop: container',
  render: () => {
    const [hoveredVariant, setHoveredVariant] = React.useState<'default' | 'custom'>('default');
    const customContainerRef = React.useRef<HTMLDivElement | null>(null);
    const [customContainer, setCustomContainer] = React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => {
      setCustomContainer(customContainerRef.current);
    }, []);

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div onMouseEnter={() => setHoveredVariant('default')}>
              <PropCard label="Default (document.body)" highlight={hoveredVariant === 'default'}>
                <div
                  style={{
                    padding: '12px',
                    border: `2px dashed ${STORY_COLORS.primary.green.main}`,
                    backgroundColor: STORY_COLORS.neutral.backgroundLight,
                  }}
                >
                  This content is inside the normal flow.
                  <Portal>
                    <div
                      style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        padding: '1rem',
                        backgroundColor: STORY_COLORS.primary.green.main,
                        color: STORY_COLORS.neutral.white,
                        borderRadius: '8px',
                        boxShadow: STORY_COLORS.themed.shadow.md,
                        zIndex: 9999,
                        border: `1px solid ${STORY_COLORS.neutral.borderMedium}`,
                      }}
                    >
                      ✨ I am rendered in a Portal
                    </div>
                  </Portal>
                </div>
              </PropCard>
            </div>

            <div onMouseEnter={() => setHoveredVariant('custom')}>
              <PropCard label="Custom Container" highlight={hoveredVariant === 'custom'}>
                <div
                  style={{
                    position: 'relative',
                    padding: '12px',
                    border: `2px dashed ${STORY_COLORS.primary.violet.main}`,
                    backgroundColor: STORY_COLORS.neutral.backgroundLight,
                    minHeight: '120px',
                  }}
                >
                  This box acts as a custom portal container.
                  <div
                    ref={customContainerRef}
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      minHeight: '36px',
                      minWidth: '140px',
                      border: `1px dashed ${STORY_COLORS.primary.violet.main}`,
                      borderRadius: '6px',
                    }}
                  />
                  <Portal container={customContainer ?? undefined}>
                    <div
                      style={{
                        padding: '8px 12px',
                        backgroundColor: STORY_COLORS.primary.violet.main,
                        color: STORY_COLORS.neutral.white,
                        borderRadius: '6px',
                        border: `1px solid ${STORY_COLORS.neutral.borderMedium}`,
                      }}
                    >
                      Custom container
                    </div>
                  </Portal>
                </div>
              </PropCard>
            </div>
          </div>

          <CodeBlock code={generateCode(hoveredVariant)} language="jsx" title="JSX" subtitle={hoveredVariant} />
        </div>
      </StoryContainer>
    );
  },
};
