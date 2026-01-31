import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input, Label } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';

/**
 * Label Component - Text Wrapper for Form Inputs
 *
 * Provides a semantic and accessible label for form controls.
 * Ensures consistent typography and spacing for form layouts.
 *
 * ## Features
 * - ✅ Standardized typography tokens
 * - ✅ Consistent bottom margin for spacing
 * - ✅ Accessibility best practices (associates with input via htmlFor)
 */
const meta = {
  title: 'Primitives/Label',
  component: Label,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Label text content',
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the associated form element',
    },
  },
} satisfies Meta<typeof Label>;

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
          <PropCard label="Default Label">
            {/* 
              💡 TOKEN EDUCATION:
              Text Color: var(--lufa-token-color-text-primary)
              Font Weight: var(--lufa-primitive-typography-font-weight-medium)
              Spacing: var(--lufa-semantic-ui-spacing-compact)
            */}
            <div style={{ width: '300px' }}>
              <Label htmlFor="demo-input">Email Address</Label>
              <Input id="demo-input" placeholder="name@example.com" fullWidth />
            </div>
          </PropCard>

          <CodeBlock
            code={`<Label htmlFor="email">Email Address</Label>
<Input id="email" placeholder="name@example.com" />`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};
