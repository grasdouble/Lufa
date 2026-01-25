import type { Meta, StoryObj } from '@storybook/react-vite';

import { Kbd } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '4. Display/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Kbd (Keyboard) component for displaying keyboard shortcuts and keys. Perfect for documentation, tutorials, and keyboard navigation hints.',
      },
    },
  },
  tags: [],
  argTypes: {
    children: {
      control: 'text',
      description: 'Key or shortcut text',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Visual size of the key',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'solid'],
      description: 'Visual style variant',
    },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: 'K',
    size: 'medium',
    variant: 'default',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.base }}>
      <Kbd size="small">⌘</Kbd>
      <Kbd size="medium">⌘</Kbd>
      <Kbd size="large">⌘</Kbd>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.base }}>
      <Kbd variant="default">Ctrl</Kbd>
      <Kbd variant="outlined">Ctrl</Kbd>
      <Kbd variant="solid">Ctrl</Kbd>
    </div>
  ),
};

export const CommonKeys: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
      <div>
        <h3 style={{ marginBottom: tokens.spacing.sm, fontSize: tokens.fontSize.sm }}>Modifier Keys</h3>
        <div style={{ display: 'flex', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <Kbd>Ctrl</Kbd>
          <Kbd>Alt</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>⌘</Kbd>
          <Kbd>⌥</Kbd>
          <Kbd>⇧</Kbd>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: tokens.spacing.sm, fontSize: tokens.fontSize.sm }}>Navigation Keys</h3>
        <div style={{ display: 'flex', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          <Kbd>←</Kbd>
          <Kbd>→</Kbd>
          <Kbd>Home</Kbd>
          <Kbd>End</Kbd>
          <Kbd>PgUp</Kbd>
          <Kbd>PgDn</Kbd>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: tokens.spacing.sm, fontSize: tokens.fontSize.sm }}>Action Keys</h3>
        <div style={{ display: 'flex', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <Kbd>Enter</Kbd>
          <Kbd>Esc</Kbd>
          <Kbd>Tab</Kbd>
          <Kbd>Space</Kbd>
          <Kbd>Delete</Kbd>
          <Kbd>Backspace</Kbd>
        </div>
      </div>
    </div>
  ),
};

export const KeyboardShortcuts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm, maxWidth: '400px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.sm,
          backgroundColor: tokens.color.background.secondary,
        }}
      >
        <span style={{ fontSize: tokens.fontSize.sm }}>Copy</span>
        <div style={{ display: 'flex', gap: tokens.spacing.xs }}>
          <Kbd size="small">⌘</Kbd>
          <Kbd size="small">C</Kbd>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.sm,
          backgroundColor: tokens.color.background.secondary,
        }}
      >
        <span style={{ fontSize: tokens.fontSize.sm }}>Paste</span>
        <div style={{ display: 'flex', gap: tokens.spacing.xs }}>
          <Kbd size="small">⌘</Kbd>
          <Kbd size="small">V</Kbd>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.sm,
          backgroundColor: tokens.color.background.secondary,
        }}
      >
        <span style={{ fontSize: tokens.fontSize.sm }}>Search</span>
        <div style={{ display: 'flex', gap: tokens.spacing.xs }}>
          <Kbd size="small">⌘</Kbd>
          <Kbd size="small">K</Kbd>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.sm,
          backgroundColor: tokens.color.background.secondary,
        }}
      >
        <span style={{ fontSize: tokens.fontSize.sm }}>Save</span>
        <div style={{ display: 'flex', gap: tokens.spacing.xs }}>
          <Kbd size="small">⌘</Kbd>
          <Kbd size="small">S</Kbd>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.sm,
          backgroundColor: tokens.color.background.secondary,
        }}
      >
        <span style={{ fontSize: tokens.fontSize.sm }}>Undo</span>
        <div style={{ display: 'flex', gap: tokens.spacing.xs }}>
          <Kbd size="small">⌘</Kbd>
          <Kbd size="small">Z</Kbd>
        </div>
      </div>
    </div>
  ),
};

export const InText: Story = {
  render: () => (
    <div
      style={{
        maxWidth: '500px',
        fontSize: tokens.fontSize.sm,
        lineHeight: tokens.lineHeight.relaxed,
      }}
    >
      <p>
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette, or use <Kbd>Ctrl</Kbd> <Kbd>P</Kbd> to quickly
        navigate to any file.
      </p>
      <p style={{ marginTop: tokens.spacing.base }}>
        To save your work, press <Kbd variant="solid">⌘</Kbd> <Kbd variant="solid">S</Kbd> on macOS or{' '}
        <Kbd variant="solid">Ctrl</Kbd> <Kbd variant="solid">S</Kbd> on Windows.
      </p>
    </div>
  ),
};
