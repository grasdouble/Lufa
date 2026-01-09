import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Container, Stack } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '3. Forms/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A versatile button component with multiple variants, colors, and sizes. Supports loading states, icons, and full-width layouts.',
      },
    },
  },
  tags: [],
  argTypes: {
    children: { control: 'text', description: 'Button content' },
    variant: {
      control: 'select',
      options: ['solid', 'outlined', 'text', 'ghost', 'link'],
      description: 'Visual style variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme',
    },
    size: { control: 'select', options: ['small', 'medium', 'large'], description: 'Button size' },
    fullWidth: { control: 'boolean', description: 'Full width button' },
    loading: { control: 'boolean', description: 'Loading state' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    label: { table: { disable: true } },
    startIcon: { control: false },
    endIcon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a.997.997 0 01.083.094 1 1 0 010 1.226.997.997 0 01-.083.094l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);

export const Playground: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'primary',
    size: 'medium',
  },
};

export const Color: Story = {
  render: () => (
    <Container size="xl" paddingX="none">
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div
          style={{
            minWidth: '820px',
            display: 'grid',
            gridTemplateColumns: '140px repeat(5, minmax(0, 1fr))',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <div />
          {(['primary', 'secondary', 'success', 'warning', 'danger'] as const).map((colorKey) => (
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

          {(['solid', 'outlined', 'text', 'ghost', 'link'] as const).map((variantKey) => (
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
              {(['primary', 'secondary', 'success', 'warning', 'danger'] as const).map((colorKey) => (
                <div key={`${variantKey}-${colorKey}`} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant={variantKey} color={colorKey} size="medium">
                    Button
                  </Button>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </Container>
  ),
};

export const Size: Story = {
  render: () => (
    <Stack direction="horizontal" gap="normal" align="center" wrap="wrap">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </Stack>
  ),
};

export const Icon: Story = {
  render: () => (
    <Stack direction="horizontal" gap="normal" align="center" wrap="wrap">
      <Button startIcon={<SearchIcon />}>Search</Button>
      <Button endIcon={<ArrowRightIcon />}>Continue</Button>
      <Button variant="outlined" startIcon={<SearchIcon />}>
        Find
      </Button>
      <Button variant="text" endIcon={<ArrowRightIcon />}>
        Next
      </Button>
    </Stack>
  ),
};

export const Loading: Story = {
  render: () => (
    <Stack direction="horizontal" gap="normal" align="center" wrap="wrap">
      <Button loading>Loading</Button>
      <Button variant="outlined" loading>
        Loading
      </Button>
      <Button variant="text" loading>
        Loading
      </Button>
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack direction="horizontal" gap="normal" align="center" wrap="wrap">
      <Button disabled>Solid</Button>
      <Button variant="outlined" disabled>
        Outlined
      </Button>
      <Button variant="text" disabled>
        Text
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="link" disabled>
        Link
      </Button>
    </Stack>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ maxWidth: '420px' }}>
      <Stack direction="vertical" gap="normal">
        <Button fullWidth>Full width</Button>
        <Button fullWidth variant="outlined">
          Full width outlined
        </Button>
      </Stack>
    </div>
  ),
};
