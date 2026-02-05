import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { STORY_COLORS } from '../../constants/storyColors';

/**
 * Input Component - Text Input Field
 *
 * A versatile text input component for capturing user data.
 * Supports various states including error, disabled, and full width layouts.
 *
 * ## Features
 * - ✅ States: Default, Focus, Error, Disabled
 * - ✅ Semantic token usage for borders and backgrounds
 * - ✅ Layout options: Full width or default
 * - ✅ Accessible focus rings
 */
const meta = {
  title: '6. Interaction/Input',
  component: Input,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    error: {
      control: 'boolean',
      description: 'Error state styling',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch to container width',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// DEFAULT STORY
// ============================================

export const Default: Story = {
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PropCard label="Default Input">
            {/* 
              💡 TOKEN EDUCATION:
              Background: var(--lufa-token-color-background-primary)
              Text: var(--lufa-token-color-text-primary)
              Border: var(--lufa-token-color-border-default)
              Focus Border: var(--lufa-token-color-border-focus)
            */}
            <Input placeholder="Type something..." />
          </PropCard>

          <CodeBlock code='<Input placeholder="Type something..." />' language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: STATES
// ============================================

export const States: Story = {
  name: 'States (Error / Disabled)',
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Error State */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Error State
            </h3>
            <PropCard label="error={true}">
              <Input error placeholder="Invalid input..." defaultValue="Invalid value" />
            </PropCard>
          </div>

          {/* Disabled State */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: STORY_COLORS.neutral.text,
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Disabled State
            </h3>
            <PropCard label="disabled={true}">
              <Input disabled placeholder="Cannot type here..." />
            </PropCard>
          </div>

          <CodeBlock
            code={`{/* Error state */}
<Input error placeholder="Invalid input..." />

{/* Disabled state */}
<Input disabled placeholder="Cannot type here..." />`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: FULL WIDTH
// ============================================

export const FullWidth: Story = {
  name: 'Prop: fullWidth',
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <PropCard label="fullWidth={true}">
            <div style={{ width: '100%', maxWidth: '500px', border: '1px dashed #ccc', padding: '10px' }}>
              <Input fullWidth placeholder="I fill the container" />
            </div>
          </PropCard>

          <CodeBlock
            code={`<div style={{ width: '500px' }}>
  <Input fullWidth placeholder="I fill the container" />
</div>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};
