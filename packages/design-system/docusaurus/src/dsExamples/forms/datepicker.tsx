import React, { useState } from 'react';

import { DatePicker, Stack } from '@grasdouble/lufa_design-system';
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

const CalendarIcon = () => (
  <svg width={tokens.iconSize.xs} height={tokens.iconSize.xs} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);

export const LiveDemo = () => (
  <Frame title="live demo">
    <DatePicker label="Select Date" placeholder="Choose a date" />
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <Stack direction="vertical" gap="normal">
      <DatePicker label="Small" size="small" placeholder="Choose a date" />
      <DatePicker label="Medium (default)" size="medium" placeholder="Choose a date" />
      <DatePicker label="Large" size="large" placeholder="Choose a date" />
    </Stack>
  </Frame>
);

export const Variant = () => (
  <Frame title="variant">
    <Stack direction="vertical" gap="normal">
      <DatePicker label="Outlined (default)" variant="outlined" placeholder="Choose a date" />
      <DatePicker label="Filled" variant="filled" placeholder="Choose a date" />
    </Stack>
  </Frame>
);

export const WithTime = () => (
  <Frame title="with time">
    <DatePicker label="Date and Time" placeholder="Choose date and time" showTime />
  </Frame>
);

export const WithDefaultValue = () => (
  <Frame title="with default value">
    <DatePicker label="Birthday" defaultValue="1990-01-15" />
  </Frame>
);

export const WithMinMax = () => {
  const today = new Date().toISOString().split('T')[0];
  const oneWeekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <Frame title="with min/max">
      <DatePicker
        label="Available Dates (next 7 days)"
        placeholder="Choose a date"
        min={today}
        max={oneWeekFromNow}
        helperText={`Select between ${today} and ${oneWeekFromNow}`}
      />
    </Frame>
  );
};

export const FullWidth = () => (
  <Frame title="full width">
    <DatePicker label="Full Width DatePicker" placeholder="Choose a date" fullWidth />
  </Frame>
);

export const WithHelperText = () => (
  <Frame title="with helper text">
    <DatePicker
      label="Event Date"
      placeholder="Choose a date"
      helperText="Select the date for your event"
    />
  </Frame>
);

export const ErrorState = () => (
  <Frame title="error state">
    <DatePicker
      label="Date of Birth"
      placeholder="Choose a date"
      error="Date cannot be in the future"
    />
  </Frame>
);

export const Disabled = () => (
  <Frame title="disabled">
    <DatePicker label="Disabled" placeholder="Cannot interact..." disabled />
  </Frame>
);

export const Required = () => (
  <Frame title="required">
    <DatePicker label="Event Date" placeholder="Choose a date" required />
  </Frame>
);

export const WithCallback = () => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <Frame title="with callback">
      <Stack direction="vertical" gap="normal">
        <DatePicker
          label="Select Date"
          placeholder="Choose a date"
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {selectedDate && (
          <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }}>
            Selected date: {selectedDate}
          </div>
        )}
      </Stack>
    </Frame>
  );
};

export const DateRange = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <Frame title="date range">
      <Stack direction="vertical" gap="normal">
        <DatePicker
          label="Start Date"
          placeholder="From"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={endDate}
        />
        <DatePicker
          label="End Date"
          placeholder="To"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate}
        />
        {startDate && endDate && (
          <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }}>
            Range: {startDate} to {endDate}
          </div>
        )}
      </Stack>
    </Frame>
  );
};

export const FormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Frame title="form example">
      <form onSubmit={handleSubmit}>
        <Stack direction="vertical" gap="normal">
          <div>
            <label htmlFor="event-name" style={{ display: 'block', marginBottom: tokens.spacing.xs, fontSize: tokens.fontSize.sm }}>
              Event Name
            </label>
            <input
              id="event-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: tokens.spacing.sm,
                borderRadius: tokens.radius.base,
                border: `${tokens.borderWidth.thin} solid ${tokens.color.border.default}`,
                fontSize: tokens.fontSize.base,
              }}
              required
            />
          </div>
          <DatePicker
            label="Start Date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
          <DatePicker
            label="End Date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            min={formData.startDate}
            required
          />
          <button
            type="submit"
            style={{
              padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
              backgroundColor: tokens.color.interactive.default,
              color: tokens.color.text.inverse,
              border: 'none',
              borderRadius: tokens.radius.base,
              fontSize: tokens.fontSize.base,
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </Stack>
      </form>
    </Frame>
  );
};
