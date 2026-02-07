import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Card, Text } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';

/**
 * Card Component - Surface Container
 *
 * A versatile container component that groups related content.
 * Provides a consistent background, border, and shadow to create distinct UI islands.
 *
 * ## Features
 * - ✅ Surface tokens for background
 * - ✅ Shadow tokens for elevation
 * - ✅ Border tokens for definition
 * - ✅ Built-in padding
 */
const meta = {
  title: '7. Composition/Card',
  component: Card,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Card content',
    },
  },
} satisfies Meta<typeof Card>;

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
          <PropCard label="Default Card">
            {/*
              💡 TOKEN EDUCATION:
              Background: var(--lufa-component-card-background)
              Border: var(--lufa-component-card-border)
              Shadow: var(--lufa-component-card-shadow-sm)
              Padding: var(--lufa-component-card-padding-md)
              Border Radius: var(--lufa-component-card-border-radius-sm)
            */}
            <Card style={{ maxWidth: '400px' }}>
              <Text as="h3" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                Card Title
              </Text>
              <Text style={{ marginBottom: '16px', color: 'var(--lufa-semantic-ui-text-secondary)' }}>
                This is a simple card component used to group related content together.
              </Text>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button size="sm" variant="primary">
                  Action
                </Button>
              </div>
            </Card>
          </PropCard>

          <CodeBlock
            code={`<Card>
  <Text as="h3">Card Title</Text>
  <Text>Content goes here...</Text>
  <Button>Action</Button>
</Card>`}
            language="jsx"
            title="JSX"
          />
        </div>
      </StoryContainer>
    );
  },
};
