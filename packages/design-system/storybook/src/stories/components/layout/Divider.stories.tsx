import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider, Placeholder, Stack } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '2. Layout/Divider',
  component: Divider,
  tags: [],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A simple separator to group content. Supports labels, horizontal or vertical orientation, and solid or dashed styles.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the divider line',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    variant: {
      control: 'radio',
      options: ['solid', 'dashed'],
      description: 'Line style',
      table: { defaultValue: { summary: 'solid' } },
    },
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
      description: 'Label alignment (horizontal only)',
      table: { defaultValue: { summary: 'center' } },
    },
    spacing: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Outer spacing',
      table: { defaultValue: { summary: 'md' } },
    },
    label: {
      control: 'text',
      description: 'Optional label between lines',
    },
    length: {
      control: 'text',
      description: 'Limit width/height (e.g. "300px" or 200)',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: 'Section',
    orientation: 'horizontal',
    variant: 'solid',
    align: 'center',
    spacing: 'md',
  },
  render: (args) => {
    const isVertical = args.orientation === 'vertical';

    if (isVertical) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.base, height: tokens.spacing['5xl'] }}>
          <Placeholder color={tokens.color.interactive.default}>Left</Placeholder>
          <Divider {...args} length="100%" />
          <Placeholder color={tokens.color.interactive.default}>Right</Placeholder>
        </div>
      );
    }

    return (
      <div style={{ width: tokens.maxWidth.full }}>
        <Placeholder color={tokens.color.interactive.default}>Add content here to see spacing in context.</Placeholder>
        <Divider {...args} />
        <Placeholder color={tokens.color.interactive.default}>Add content here to see spacing in context.</Placeholder>
      </div>
    );
  },
};

export const Label: Story = {
  render: () => (
    <div style={{ width: tokens.maxWidth.full }}>
      <Divider label="Upcoming" />
      <Stack direction="vertical" gap="normal" padding="none">
        <Placeholder color={tokens.color.interactive.default}>Item A</Placeholder>
        <Placeholder color={tokens.color.interactive.default}>Item B</Placeholder>
      </Stack>
    </div>
  ),
};

export const Orientation: Story = {
  render: () => (
    <div
      style={{
        width: tokens.maxWidth.full,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: tokens.spacing.lg,
      }}
    >
      <div
        style={{
          backgroundColor: tokens.color.background.primary,
          border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.base,
        }}
      >
        <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: tokens.spacing.md }}>
          orientation: horizontal
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
          <Divider label="Solid / start" variant="solid" align="start" />
          <Divider label="Solid / center" variant="solid" align="center" />
          <Divider label="Solid / end" variant="solid" align="end" />
          <Divider label="Dashed / center" variant="dashed" align="center" />
        </div>
      </div>

      <div
        style={{
          backgroundColor: tokens.color.background.primary,
          border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.base,
        }}
      >
        <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: tokens.spacing.md }}>
          orientation: vertical
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.base, height: tokens.size['4xl'] }}>
          <Placeholder color={tokens.color.interactive.default}>Left</Placeholder>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: tokens.spacing.base,
              height: tokens.maxWidth.full,
            }}
          >
            <Divider orientation="vertical" variant="solid" length="70%" />
            <Divider orientation="vertical" variant="dashed" length="70%" />
          </div>
          <Placeholder color={tokens.color.interactive.default}>Right</Placeholder>
        </div>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ width: tokens.maxWidth.full, display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
      <Divider label="Solid" variant="solid" />
      <Divider label="Dashed" variant="dashed" />
    </div>
  ),
};

export const Spacing: Story = {
  render: () => {
    const spacings = ['none', 'sm', 'md', 'lg'] as const;
    const variants = ['solid', 'dashed'] as const;

    return (
      <div
        style={{
          width: tokens.maxWidth.full,
          overflowX: 'auto',
          backgroundColor: tokens.color.background.secondary,
          padding: tokens.spacing.lg,
          borderRadius: tokens.radius.xl,
        }}
      >
        <div
          style={{
            minWidth: tokens.maxWidth['4xl'],
            display: 'grid',
            gridTemplateColumns: `${tokens.spacing['5xl']} repeat(${spacings.length}, minmax(0, 1fr))`,
            gap: tokens.spacing.md,
            alignItems: 'stretch',
          }}
        >
          <div />
          {spacings.map((spacing) => (
            <div
              key={`header-${spacing}`}
              style={{
                fontFamily: 'monospace',
                fontSize: tokens.fontSize.xs,
                color: tokens.color.text.secondary,
                textAlign: 'center',
                padding: `${tokens.spacing['2xs']} ${tokens.spacing.sm}`,
                backgroundColor: tokens.color.background.primary,
                border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
                borderRadius: tokens.radius.lg,
              }}
            >
              spacing: {spacing}
            </div>
          ))}

          {variants.map((variant) => (
            <Fragment key={`row-${variant}`}>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: tokens.fontSize.xs,
                  color: tokens.color.text.secondary,
                  padding: `${tokens.spacing['2xs']} ${tokens.spacing.sm}`,
                  backgroundColor: tokens.color.background.primary,
                  border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
                  borderRadius: tokens.radius.lg,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                variant: {variant}
              </div>
              {spacings.map((spacing) => (
                <div
                  key={`${variant}-${spacing}`}
                  style={{
                    backgroundColor: tokens.color.background.primary,
                    border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
                    borderRadius: tokens.radius.lg,
                    padding: tokens.spacing.base,
                  }}
                >
                  <Placeholder color={tokens.color.interactive.default}>Context</Placeholder>
                  <Divider label="Section" variant={variant} spacing={spacing} />
                  <Placeholder color={tokens.color.interactive.default}>Context</Placeholder>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    );
  },
};

export const Length: Story = {
  render: () => (
    <div style={{ width: tokens.maxWidth.full }}>
      <div
        style={{
          backgroundColor: tokens.color.background.primary,
          border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.base,
          marginBottom: tokens.spacing.base,
        }}
      >
        <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: tokens.spacing.md }}>
          horizontal lengths
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
          <Divider label="length: 200" length={200} />
          <Divider label='length: "400px"' length="400px" />
          <Divider label='length: "100%"' length="100%" />
        </div>
      </div>

      <div
        style={{
          backgroundColor: tokens.color.background.primary,
          border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.base,
        }}
      >
        <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: tokens.spacing.md }}>
          vertical lengths
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.base, height: tokens.size['4xl'] }}>
          <Placeholder color={tokens.color.interactive.default}>Left</Placeholder>
          <Divider orientation="vertical" length={80} />
          <Divider orientation="vertical" length={140} />
          <Divider orientation="vertical" length="100%" />
          <Placeholder color={tokens.color.interactive.default}>Right</Placeholder>
        </div>
        <div style={{ marginTop: tokens.spacing.md, color: tokens.color.text.secondary, fontSize: tokens.fontSize.xs }}>
          For vertical dividers, <code style={{ fontFamily: 'monospace' }}>length</code> controls height.
        </div>
      </div>
    </div>
  ),
};
