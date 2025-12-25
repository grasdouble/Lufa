import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox, Stack } from '@grasdouble/lufa_design-system';

const meta = {
  title: '3. Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A checkbox component for boolean inputs. Supports multiple colors, sizes, and states including indeterminate.',
      },
    },
  },
  tags: [],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
    },
    disabled: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Size: Story = {
  render: () => (
    <Stack direction="vertical" gap="normal">
      <Checkbox size="small" label="Small checkbox" />
      <Checkbox size="medium" label="Medium checkbox (default)" />
      <Checkbox size="large" label="Large checkbox" />
    </Stack>
  ),
};

export const Color: Story = {
  render: () => (
    <Stack direction="vertical" gap="normal">
      <Checkbox color="primary" label="Primary" defaultChecked />
      <Checkbox color="secondary" label="Secondary" defaultChecked />
      <Checkbox color="success" label="Success" defaultChecked />
      <Checkbox color="warning" label="Warning" defaultChecked />
      <Checkbox color="danger" label="Danger" defaultChecked />
    </Stack>
  ),
};

export const WithLabel: Story = {
  args: {
    label: 'I agree to the terms and conditions',
  },
};

export const Required: Story = {
  args: {
    label: 'I accept the privacy policy',
    required: true,
    helperText: 'This checkbox is required',
  },
};

export const Error: Story = {
  args: {
    label: 'Subscribe to newsletter',
    error: 'You must accept to continue',
  },
};

export const HelperText: Story = {
  args: {
    label: 'Remember me',
    helperText: 'Your session will stay active for 30 days',
  },
};

export const Disabled: Story = {
  render: () => (
    <Stack direction="vertical" gap="normal">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </Stack>
  ),
};

export const Indeterminate: Story = {
  render: () => {
    const [checked, setChecked] = useState([false, false, false]);

    const allChecked = checked.every(Boolean);
    const isIndeterminate = checked.some(Boolean) && !allChecked;

    return (
      <Stack direction="vertical" gap="normal">
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={(e) => {
            const newValue = e.target.checked;
            setChecked([newValue, newValue, newValue]);
          }}
        />
        <div style={{ marginLeft: '24px' }}>
          <Stack direction="vertical" gap="compact">
            <Checkbox
              label="Option 1"
              checked={checked[0]}
              onChange={(e) => {
                const newChecked = [...checked];
                newChecked[0] = e.target.checked;
                setChecked(newChecked);
              }}
            />
            <Checkbox
              label="Option 2"
              checked={checked[1]}
              onChange={(e) => {
                const newChecked = [...checked];
                newChecked[1] = e.target.checked;
                setChecked(newChecked);
              }}
            />
            <Checkbox
              label="Option 3"
              checked={checked[2]}
              onChange={(e) => {
                const newChecked = [...checked];
                newChecked[2] = e.target.checked;
                setChecked(newChecked);
              }}
            />
          </Stack>
        </div>
      </Stack>
    );
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const options = [
      { id: 'email', label: 'Email notifications' },
      { id: 'sms', label: 'SMS notifications' },
      { id: 'push', label: 'Push notifications' },
      { id: 'newsletter', label: 'Weekly newsletter' },
    ];

    return (
      <Stack direction="vertical" gap="normal">
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
          Notification Preferences
        </div>
        <Stack direction="vertical" gap="compact">
          {options.map((option) => (
            <Checkbox
              key={option.id}
              label={option.label}
              checked={selectedOptions.includes(option.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedOptions([...selectedOptions, option.id]);
                } else {
                  setSelectedOptions(selectedOptions.filter((id) => id !== option.id));
                }
              }}
            />
          ))}
        </Stack>
        {selectedOptions.length > 0 && (
          <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            Selected: <strong>{selectedOptions.join(', ')}</strong>
          </div>
        )}
      </Stack>
    );
  },
};
