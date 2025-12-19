import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ColorPicker, Stack } from '@grasdouble/lufa_design-system';

const meta = {
  title: '3. Forms/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A color picker component that allows users to select colors using a native color input with an optional preview and text input for hex values.',
      },
    },
  },
  tags: [],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      control: 'boolean',
    },
    showPreview: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: 'Pick a color',
    defaultValue: '#3b82f6',
  },
};

export const Size: Story = {
  render: () => (
    <Stack direction="vertical" gap="normal">
      <ColorPicker size="small" label="Small" defaultValue="#ef4444" />
      <ColorPicker size="medium" label="Medium (default)" defaultValue="#10b981" />
      <ColorPicker size="large" label="Large" defaultValue="#8b5cf6" />
    </Stack>
  ),
};

export const WithLabel: Story = {
  args: {
    label: 'Brand Color',
    defaultValue: '#6366f1',
  },
};

export const Required: Story = {
  args: {
    label: 'Primary Color',
    defaultValue: '#3b82f6',
    required: true,
    helperText: 'This field is required',
  },
};

export const Error: Story = {
  args: {
    label: 'Theme Color',
    defaultValue: '#ff0000',
    error: 'Invalid color selection',
  },
};

export const HelperText: Story = {
  args: {
    label: 'Accent Color',
    defaultValue: '#f59e0b',
    helperText: 'Choose a color that matches your brand',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Color Picker',
    defaultValue: '#9ca3af',
    disabled: true,
  },
};

export const WithoutPreview: Story = {
  args: {
    label: 'Color (no preview)',
    defaultValue: '#ec4899',
    showPreview: false,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Color Picker',
    defaultValue: '#06b6d4',
    fullWidth: true,
  },
};

export const WithCallback: Story = {
  render: () => {
    const [color, setColor] = useState('#3b82f6');

    return (
      <Stack direction="vertical" gap="normal">
        <ColorPicker
          label="Select Color"
          value={color}
          onColorChange={(newColor) => setColor(newColor)}
        />
        <div
          style={{
            padding: '24px',
            backgroundColor: color,
            borderRadius: '8px',
            color: '#fff',
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          Preview: {color}
        </div>
      </Stack>
    );
  },
};

export const MultipleColors: Story = {
  render: () => {
    const [colors, setColors] = useState({
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
    });

    return (
      <Stack direction="vertical" gap="normal">
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
          Theme Colors
        </div>
        <ColorPicker
          label="Primary"
          value={colors.primary}
          onColorChange={(newColor) => setColors({ ...colors, primary: newColor })}
        />
        <ColorPicker
          label="Secondary"
          value={colors.secondary}
          onColorChange={(newColor) => setColors({ ...colors, secondary: newColor })}
        />
        <ColorPicker
          label="Success"
          value={colors.success}
          onColorChange={(newColor) => setColors({ ...colors, success: newColor })}
        />
        <ColorPicker
          label="Warning"
          value={colors.warning}
          onColorChange={(newColor) => setColors({ ...colors, warning: newColor })}
        />
        <ColorPicker
          label="Danger"
          value={colors.danger}
          onColorChange={(newColor) => setColors({ ...colors, danger: newColor })}
        />
        <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Object.entries(colors).map(([name, color]) => (
              <div
                key={name}
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: color,
                  borderRadius: '8px',
                  border: '2px solid #ddd',
                }}
                title={`${name}: ${color}`}
              />
            ))}
          </div>
        </div>
      </Stack>
    );
  },
};
