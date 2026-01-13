import React, { useState } from 'react';

import { AutoComplete, Stack } from '@grasdouble/lufa_design-system';
import type { AutoCompleteOption } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const Frame = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div
    style={{
      padding: tokens.spacing['md-lg'],
      backgroundColor: tokens.color.background.secondary,
      color: tokens.color.text.primary,
      borderRadius: tokens.radius.base,
      marginBottom: tokens.spacing.base,
    }}
  >
    {title ? (
      <div
        style={{
          fontFamily: tokens.fontFamily.mono,
          color: tokens.color.text.tertiary,
          marginBottom: tokens.spacing.md,
        }}
      >
        {title}
      </div>
    ) : null}
    {children}
  </div>
);

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

const SearchIcon = () => (
  <svg width={tokens.iconSize.xs} height={tokens.iconSize.xs} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);

export const LiveDemo = () => (
  <Frame title="live demo">
    <AutoComplete
      label="Select Country"
      placeholder="Type to search..."
      options={countries}
      onSelect={(option) => console.log('Selected:', option)}
    />
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <Stack direction="vertical" gap="normal">
      <AutoComplete label="Small" size="small" placeholder="Small size..." options={countries} />
      <AutoComplete label="Medium (default)" size="medium" placeholder="Medium size..." options={countries} />
      <AutoComplete label="Large" size="large" placeholder="Large size..." options={countries} />
    </Stack>
  </Frame>
);

export const Variant = () => (
  <Frame title="variant">
    <Stack direction="vertical" gap="normal">
      <AutoComplete label="Outlined (default)" variant="outlined" placeholder="Type to search..." options={countries} />
      <AutoComplete label="Filled" variant="filled" placeholder="Type to search..." options={countries} />
    </Stack>
  </Frame>
);

export const WithAdornment = () => (
  <Frame title="with adornment">
    <Stack direction="vertical" gap="normal">
      <AutoComplete
        label="With Start Icon"
        placeholder="Search countries..."
        options={countries}
        startAdornment={<SearchIcon />}
      />
      <AutoComplete
        label="With End Icon"
        placeholder="Search countries..."
        options={countries}
        endAdornment={<SearchIcon />}
      />
    </Stack>
  </Frame>
);

export const FullWidth = () => (
  <Frame title="full width">
    <AutoComplete
      label="Full Width AutoComplete"
      placeholder="Type to search..."
      options={countries}
      fullWidth
    />
  </Frame>
);

export const WithHelperText = () => (
  <Frame title="with helper text">
    <AutoComplete
      label="Select Country"
      placeholder="Type to search..."
      helperText="Start typing to see suggestions"
      options={countries}
    />
  </Frame>
);

export const ErrorState = () => (
  <Frame title="error state">
    <AutoComplete
      label="Select Country"
      placeholder="Type to search..."
      error="Please select a valid country"
      options={countries}
    />
  </Frame>
);

export const Disabled = () => (
  <Frame title="disabled">
    <AutoComplete
      label="Disabled"
      placeholder="Cannot interact..."
      options={countries}
      disabled
    />
  </Frame>
);

export const Required = () => (
  <Frame title="required">
    <AutoComplete
      label="Select Country"
      placeholder="Type to search..."
      options={countries}
      required
    />
  </Frame>
);

export const WithCallback = () => {
  const [selected, setSelected] = useState<AutoCompleteOption | null>(null);

  return (
    <Frame title="with callback">
      <Stack direction="vertical" gap="normal">
        <AutoComplete
          label="Select Country"
          placeholder="Type to search..."
          options={countries}
          onSelect={(option) => setSelected(option)}
        />
        {selected && (
          <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }}>
            Selected: {selected.label} ({selected.value})
          </div>
        )}
      </Stack>
    </Frame>
  );
};

export const CustomFilter = () => (
  <Frame title="custom filter">
    <AutoComplete
      label="Starts With Filter"
      placeholder="Type to search..."
      options={countries}
      filterOption={(option, input) => option.label.toLowerCase().startsWith(input.toLowerCase())}
      helperText="Only shows options that start with your input"
    />
  </Frame>
);

export const DisabledOptions = () => {
  const optionsWithDisabled: AutoCompleteOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom', disabled: true },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia', disabled: true },
    { value: 'de', label: 'Germany' },
  ];

  return (
    <Frame title="disabled options">
      <AutoComplete
        label="Select Country"
        placeholder="Some options are disabled..."
        options={optionsWithDisabled}
        helperText="UK and Australia are disabled"
      />
    </Frame>
  );
};
