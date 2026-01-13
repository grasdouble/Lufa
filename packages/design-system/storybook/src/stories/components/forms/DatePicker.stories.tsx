import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { DatePicker, Stack } from '@grasdouble/lufa_design-system';

const meta = {
  title: '3. Forms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A date picker component that allows users to select dates using a native date input. Supports date and datetime selection.',
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
    fullWidth: {
      control: 'boolean',
    },
    showTime: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: 'Select Date',
    placeholder: 'Choose a date',
  },
};

export const Size: Story = {
  render: () => (
    <Stack direction="vertical" gap="normal">
      <DatePicker size="small" label="Small" />
      <DatePicker size="medium" label="Medium (default)" />
      <DatePicker size="large" label="Large" />
    </Stack>
  ),
};

export const Variant: Story = {
  render: () => (
    <Stack direction="vertical" gap="normal">
      <DatePicker variant="outlined" label="Outlined" placeholder="Outlined variant (default)" />
      <DatePicker variant="filled" label="Filled" placeholder="Filled variant" />
    </Stack>
  ),
};

export const WithLabel: Story = {
  args: {
    label: 'Date of Birth',
  },
};

export const Required: Story = {
  args: {
    label: 'Appointment Date',
    required: true,
    helperText: 'This field is required',
  },
};

export const Error: Story = {
  args: {
    label: 'Event Date',
    error: 'Please select a valid date',
  },
};

export const HelperText: Story = {
  args: {
    label: 'Start Date',
    helperText: 'Select the date when the project begins',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Date Picker',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Date Picker',
    fullWidth: true,
  },
};

export const WithTime: Story = {
  args: {
    label: 'Appointment DateTime',
    showTime: true,
    helperText: 'Select both date and time',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Meeting Date',
    defaultValue: '2024-12-25',
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Select Date',
    min: '2024-01-01',
    max: '2024-12-31',
    helperText: 'Only dates in 2024 are allowed',
  },
};

export const WithCallback: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState('');

    return (
      <Stack direction="vertical" gap="normal">
        <DatePicker
          label="Choose Date"
          onDateChange={(date) => setSelectedDate(date)}
        />
        {selectedDate && (
          <div style={{ padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            Selected: <strong>{new Date(selectedDate).toLocaleDateString()}</strong>
          </div>
        )}
      </Stack>
    );
  },
};

export const DateRange: Story = {
  render: () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    return (
      <Stack direction="vertical" gap="normal">
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
          Date Range
        </div>
        <DatePicker
          label="Start Date"
          onDateChange={(date) => setStartDate(date)}
          max={endDate}
        />
        <DatePicker
          label="End Date"
          onDateChange={(date) => setEndDate(date)}
          min={startDate}
        />
        {startDate && endDate && (
          <div style={{ padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            Range: <strong>{new Date(startDate).toLocaleDateString()}</strong> to{' '}
            <strong>{new Date(endDate).toLocaleDateString()}</strong>
          </div>
        )}
      </Stack>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      eventName: '',
      startDate: '',
      endDate: '',
      startTime: '',
    });

    return (
      <form
        style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        onSubmit={(e) => {
          e.preventDefault();
          alert(JSON.stringify(formData, null, 2));
        }}
      >
        <div style={{ fontSize: '16px', fontWeight: 600 }}>Event Registration</div>
        <DatePicker
          label="Event Start Date"
          required
          fullWidth
          onDateChange={(date) => setFormData({ ...formData, startDate: date })}
        />
        <DatePicker
          label="Event End Date"
          required
          fullWidth
          min={formData.startDate}
          onDateChange={(date) => setFormData({ ...formData, endDate: date })}
        />
        <DatePicker
          label="Registration Deadline"
          showTime
          required
          fullWidth
          onDateChange={(date) => setFormData({ ...formData, startTime: date })}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
    );
  },
};
