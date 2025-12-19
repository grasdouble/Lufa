import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AutoComplete, Stack } from '@grasdouble/lufa_design-system';
import type { AutoCompleteOption } from '@grasdouble/lufa_design-system';

const meta = {
  title: '3. Forms/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An autocomplete input component that provides suggestions as users type. Supports keyboard navigation and custom filtering.',
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
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const countries: AutoCompleteOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
];

const fruits: AutoCompleteOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'orange', label: 'Orange' },
  { value: 'strawberry', label: 'Strawberry' },
];

export const Playground: Story = {
  args: {
    label: 'Select Country',
    placeholder: 'Type to search...',
    options: countries,
  },
};

export const Size: Story = {
  render: () => (
    <Stack direction="vertical" gap="normal">
      <AutoComplete size="small" label="Small" placeholder="Small size" options={fruits} />
      <AutoComplete size="medium" label="Medium" placeholder="Medium size (default)" options={fruits} />
      <AutoComplete size="large" label="Large" placeholder="Large size" options={fruits} />
    </Stack>
  ),
};

export const Variant: Story = {
  render: () => (
    <Stack direction="vertical" gap="normal">
      <AutoComplete variant="outlined" label="Outlined" placeholder="Outlined variant (default)" options={fruits} />
      <AutoComplete variant="filled" label="Filled" placeholder="Filled variant" options={fruits} />
    </Stack>
  ),
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    placeholder: 'Search countries...',
    options: countries,
  },
};

export const Required: Story = {
  args: {
    label: 'Favorite Fruit',
    placeholder: 'Select a fruit',
    options: fruits,
    required: true,
    helperText: 'This field is required',
  },
};

export const Error: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
    error: 'Please select a valid country',
  },
};

export const HelperText: Story = {
  args: {
    label: 'Search',
    placeholder: 'Start typing...',
    options: countries,
    helperText: 'Type at least 2 characters to see suggestions',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This field is disabled',
    options: countries,
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width AutoComplete',
    placeholder: 'This autocomplete takes the full width',
    options: countries,
    fullWidth: true,
  },
};

export const WithAdornment: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search countries...',
    options: countries,
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

export const WithCallback: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('');

    return (
      <Stack direction="vertical" gap="normal">
        <AutoComplete
          label="Select Fruit"
          placeholder="Choose a fruit..."
          options={fruits}
          onSelect={(option) => setSelected(option.label)}
        />
        {selected && (
          <div style={{ padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            Selected: <strong>{selected}</strong>
          </div>
        )}
      </Stack>
    );
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Select Option',
    placeholder: 'Some options are disabled',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2 (disabled)', disabled: true },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4 (disabled)', disabled: true },
      { value: '5', label: 'Option 5' },
    ],
  },
};
