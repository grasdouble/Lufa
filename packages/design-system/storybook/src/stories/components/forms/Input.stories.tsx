import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Input, tokens } from '@grasdouble/lufa_design-system';

const { color } = tokens;

const meta = {
  title: '3. Forms/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible input component with support for labels, error states, helper text, and adornments.',
      },
    },
  },
  tags: [],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Enter text...',
  },
};

export const Label: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const Required: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    required: true,
    helperText: 'This field is required',
  },
};

export const Size: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Input size="small" label="Small" placeholder="Small input" />
      <Input size="medium" label="Medium" placeholder="Medium input (default)" />
      <Input size="large" label="Large" placeholder="Large input" />
    </div>
  ),
};

export const Variant: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Input variant="outlined" label="Outlined" placeholder="Outlined variant (default)" />
      <Input variant="filled" label="Filled" placeholder="Filled variant" />
    </div>
  ),
};

export const Error: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const HelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Password must be at least 8 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'This field is disabled',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'This input takes the full width of its container',
    fullWidth: true,
  },
};

export const StartAdornment: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    startAdornment: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
};

export const EndAdornment: Story = {
  args: {
    label: 'Website',
    placeholder: 'example',
    endAdornment: <span style={{ color: color.text.secondary, fontSize: '14px' }}>.com</span>,
  },
};

export const PasswordFieldExample: Story = {
  render: () => {
    const PasswordInput = () => {
      const [showPassword, setShowPassword] = useState(false);

      return (
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          endAdornment={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                color: color.text.secondary,
              }}
            >
              {showPassword ? (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clipRule="evenodd"
                  />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              )}
            </button>
          }
        />
      );
    };

    return <PasswordInput />;
  },
};

export const FormExample: Story = {
  render: () => (
    <form
      style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Input label="Full Name" placeholder="John Doe" required fullWidth />
      <Input label="Email" type="email" placeholder="john@example.com" required fullWidth />
      <Input label="Phone" type="tel" placeholder="+1 (555) 123-4567" fullWidth />
      <Input label="Website" type="url" placeholder="https://example.com" helperText="Optional" fullWidth />
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <Button type="reset" variant="outlined" color="secondary">
          Reset
        </Button>
        <Button type="submit" variant="solid" color="primary">
          Submit
        </Button>
      </div>
    </form>
  ),
};
