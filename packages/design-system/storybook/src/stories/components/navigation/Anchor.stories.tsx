import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Anchor, Container, Stack } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '4. Navigation/Anchor',
  component: Anchor,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Anchor component for in-page navigation using anchor links.',
      },
    },
  },
  tags: [],
  argTypes: {
    children: { control: 'text', description: 'Anchor content' },
    variant: {
      control: 'select',
      options: ['default', 'underline', 'subtle'],
      description: 'Visual style variant',
    },
    color: { control: 'select', options: ['primary', 'secondary', 'inherit'], description: 'Color scheme' },
    href: { control: 'text', description: 'Target anchor link' },
    startIcon: { control: false },
    endIcon: { control: false },
  },
} satisfies Meta<typeof Anchor>;

export default meta;
type Story = StoryObj<typeof meta>;

const HashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path
      fillRule="evenodd"
      d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
      clipRule="evenodd"
    />
  </svg>
);

export const Playground: Story = {
  args: {
    children: 'Jump to section',
    variant: 'default',
    color: 'primary',
    href: '#section',
  },
};

export const Variants: Story = {
  render: () => (
    <Stack gap="spacious">
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Default</h4>
        <Anchor variant="default" href="#default">
          Jump to section
        </Anchor>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Underline</h4>
        <Anchor variant="underline" href="#underline">
          Jump to section
        </Anchor>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Subtle</h4>
        <Anchor variant="subtle" href="#subtle">
          Jump to section
        </Anchor>
      </div>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Container size="xl" paddingX="none">
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div
          style={{
            minWidth: '600px',
            display: 'grid',
            gridTemplateColumns: '140px repeat(3, minmax(0, 1fr))',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <div />
          {(['primary', 'secondary', 'inherit'] as const).map((colorKey) => (
            <div
              key={`header-${colorKey}`}
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: tokens.color.text.secondary,
                textAlign: 'center',
                padding: '6px 8px',
                backgroundColor: tokens.color.background.primary,
                border: `1px solid ${tokens.color.border.light}`,
                borderRadius: '10px',
              }}
            >
              {colorKey}
            </div>
          ))}

          {(['default', 'underline', 'subtle'] as const).map((variantKey) => (
            <Fragment key={`row-${variantKey}`}>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: tokens.color.text.secondary,
                  padding: '6px 8px',
                  backgroundColor: tokens.color.background.primary,
                  border: `1px solid ${tokens.color.border.light}`,
                  borderRadius: '10px',
                }}
              >
                {variantKey}
              </div>
              {(['primary', 'secondary', 'inherit'] as const).map((colorKey) => (
                <div key={`cell-${variantKey}-${colorKey}`}>
                  <Anchor variant={variantKey} color={colorKey} href={`#${variantKey}-${colorKey}`}>
                    Jump to section
                  </Anchor>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </Container>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stack gap="spacious">
      <Anchor href="#section" startIcon={<HashIcon />}>
        Jump to section
      </Anchor>
      <Anchor href="#section" endIcon={<HashIcon />}>
        Jump to section
      </Anchor>
      <Anchor href="#section" variant="underline" startIcon={<HashIcon />}>
        Jump to section
      </Anchor>
    </Stack>
  ),
};

export const InContext: Story = {
  render: () => (
    <div>
      <h2 id="intro" style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 700 }}>
        Introduction
      </h2>
      <p style={{ marginBottom: '24px', lineHeight: '1.6' }}>
        This is a long document with multiple sections. Use the table of contents below to navigate.
      </p>

      <nav
        style={{
          marginBottom: '32px',
          padding: '16px',
          backgroundColor: tokens.color.background.secondary,
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Table of Contents</h3>
        <Stack gap="condensed">
          <Anchor href="#intro" variant="subtle">
            Introduction
          </Anchor>
          <Anchor href="#features" variant="subtle">
            Features
          </Anchor>
          <Anchor href="#usage" variant="subtle">
            Usage Guide
          </Anchor>
          <Anchor href="#examples" variant="subtle">
            Examples
          </Anchor>
        </Stack>
      </nav>

      <h2 id="features" style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 700 }}>
        Features
      </h2>
      <p style={{ marginBottom: '24px', lineHeight: '1.6' }}>Content about features...</p>

      <h2 id="usage" style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 700 }}>
        Usage Guide
      </h2>
      <p style={{ marginBottom: '24px', lineHeight: '1.6' }}>Content about usage...</p>

      <h2 id="examples" style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 700 }}>
        Examples
      </h2>
      <p style={{ lineHeight: '1.6' }}>Content about examples...</p>
    </div>
  ),
};
