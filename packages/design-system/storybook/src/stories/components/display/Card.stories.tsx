import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Card, Placeholder } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '4. Display/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A versatile card component for displaying content in a container with optional header, footer, and various visual styles.',
      },
    },
  },
  tags: [],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'filled'],
      description: 'Visual style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Internal padding size',
    },
    hoverable: {
      control: 'boolean',
      description: 'Adds hover effect',
    },
    title: {
      control: 'text',
      description: 'Card title',
    },
    subtitle: {
      control: 'text',
      description: 'Card subtitle',
    },
    children: {
      control: 'text',
      description: 'Card content',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    title: 'Card Title',
    children: 'This is a basic card with default styling.',
  },
};

export const Ttile: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Optional subtitle or description',
    children: 'Card content goes here. Any React elements can be added as children.',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: tokens.spacing.base }}>
      <Card variant="default" title="Default">
        Standard card with border
      </Card>
      <Card variant="elevated" title="Elevated">
        Card with shadow elevation
      </Card>
      <Card variant="outlined" title="Outlined">
        Card with thicker border
      </Card>
      <Card variant="filled" title="Filled">
        Card with background fill
      </Card>
    </div>
  ),
};

export const Padding: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
      <Card padding="none" title="No Padding">
        Content with no padding
      </Card>
      <Card padding="small" title="Small Padding">
        Content with small padding
      </Card>
      <Card padding="medium" title="Medium Padding">
        Content with medium padding (default)
      </Card>
      <Card padding="large" title="Large Padding">
        Content with large padding
      </Card>
    </div>
  ),
};

export const Footer: Story = {
  args: {
    title: 'Card with Actions',
    subtitle: 'This card has footer actions',
    children: 'Card content that describes something interesting.',
    footer: (
      <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
        <Button variant="solid">Primary</Button>
        <Button variant="text">Cancel</Button>
      </div>
    ),
  },
};

export const Hoverable: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: tokens.spacing.base }}>
      <Card variant="elevated" hoverable title="Hover Me">
        This card has hover effects
      </Card>
      <Card variant="elevated" hoverable title="Interactive">
        Hover to see elevation increase
      </Card>
      <Card variant="elevated" hoverable title="Click Ready">
        Can be combined with onClick
      </Card>
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Card
      variant="elevated"
      hoverable
      onClick={() => console.log('Card clicked')}
      title="Clickable Card"
      subtitle="Click anywhere on this card"
    >
      This card has an onClick handler. Notice the cursor changes to pointer when you hover.
    </Card>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: tokens.spacing.base }}>
      <Card
        variant="elevated"
        hoverable
        padding="none"
        footer={
          <div style={{ padding: tokens.spacing.base }}>
            <Button variant="solid" fullWidth>
              Add to Cart
            </Button>
          </div>
        }
      >
        <Placeholder height="large" width="full" color={tokens.color.interactive.default}>
          Product image
        </Placeholder>
        <div style={{ padding: tokens.spacing.base }}>
          <h3 style={{ margin: 0, marginBottom: tokens.spacing.sm }}>Product Name</h3>
          <p style={{ margin: 0, color: tokens.color.text.secondary }}>$99.99</p>
        </div>
      </Card>
      <Card
        variant="elevated"
        hoverable
        padding="none"
        footer={
          <div style={{ padding: tokens.spacing.base }}>
            <Button variant="solid">Add to Cart</Button>
          </div>
        }
      >
        <Placeholder height="large" width="full" color={tokens.color.success.default}>
          Product image
        </Placeholder>
        <div style={{ padding: tokens.spacing.base }}>
          <h3 style={{ margin: 0, marginBottom: tokens.spacing.sm }}>Another Product</h3>
          <p style={{ margin: 0, color: tokens.color.text.secondary }}>$149.99</p>
        </div>
      </Card>
      <Card
        variant="elevated"
        hoverable
        padding="none"
        footer={
          <div style={{ padding: tokens.spacing.base }}>
            <Button variant="solid">Add to Cart</Button>
          </div>
        }
      >
        <Placeholder height="large" width="full" color={tokens.color.error.default}>
          Product image
        </Placeholder>
        <div style={{ padding: tokens.spacing.base }}>
          <h3 style={{ margin: 0, marginBottom: tokens.spacing.sm }}>Premium Item</h3>
          <p style={{ margin: 0, color: tokens.color.text.secondary }}>$249.99</p>
        </div>
      </Card>
    </div>
  ),
};
