import React, { useState } from 'react';

import { Checkbox, Stack } from '@grasdouble/lufa_design-system';
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

export const LiveDemo = () => (
  <Frame title="live demo">
    <Checkbox label="I agree to the terms and conditions" />
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <Stack direction="vertical" gap="normal">
      <Checkbox label="Small" size="small" />
      <Checkbox label="Medium (default)" size="medium" />
      <Checkbox label="Large" size="large" />
    </Stack>
  </Frame>
);

export const Color = () => (
  <Frame title="color">
    <Stack direction="vertical" gap="normal">
      <Checkbox label="Primary (default)" color="primary" defaultChecked />
      <Checkbox label="Secondary" color="secondary" defaultChecked />
      <Checkbox label="Success" color="success" defaultChecked />
      <Checkbox label="Warning" color="warning" defaultChecked />
      <Checkbox label="Danger" color="danger" defaultChecked />
    </Stack>
  </Frame>
);

export const WithHelperText = () => (
  <Frame title="with helper text">
    <Checkbox
      label="Subscribe to newsletter"
      helperText="You can unsubscribe at any time"
    />
  </Frame>
);

export const ErrorState = () => (
  <Frame title="error state">
    <Checkbox
      label="Accept terms"
      error="You must accept the terms to continue"
    />
  </Frame>
);

export const Disabled = () => (
  <Frame title="disabled">
    <Stack direction="vertical" gap="normal">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </Stack>
  </Frame>
);

export const Required = () => (
  <Frame title="required">
    <Checkbox label="I agree to the terms" required />
  </Frame>
);

export const Indeterminate = () => {
  const [checkedItems, setCheckedItems] = useState({ item1: false, item2: false, item3: false });
  
  const allChecked = Object.values(checkedItems).every(Boolean);
  const someChecked = Object.values(checkedItems).some(Boolean) && !allChecked;

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckedItems({ item1: checked, item2: checked, item3: checked });
  };

  return (
    <Frame title="indeterminate">
      <Stack direction="vertical" gap="normal">
        <Checkbox
          label="Select All"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={handleParentChange}
        />
        <div style={{ marginLeft: tokens.spacing.lg }}>
          <Stack direction="vertical" gap="normal">
            <Checkbox
              label="Item 1"
              checked={checkedItems.item1}
              onChange={(e) => setCheckedItems({ ...checkedItems, item1: e.target.checked })}
            />
            <Checkbox
              label="Item 2"
              checked={checkedItems.item2}
              onChange={(e) => setCheckedItems({ ...checkedItems, item2: e.target.checked })}
            />
            <Checkbox
              label="Item 3"
              checked={checkedItems.item3}
              onChange={(e) => setCheckedItems({ ...checkedItems, item3: e.target.checked })}
            />
          </Stack>
        </div>
      </Stack>
    </Frame>
  );
};

export const WithCallback = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Frame title="with callback">
      <Stack direction="vertical" gap="normal">
        <Checkbox
          label="Enable notifications"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }}>
          Status: {checked ? 'Enabled' : 'Disabled'}
        </div>
      </Stack>
    </Frame>
  );
};

export const CheckboxGroup = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((item) => item !== value));
    }
  };

  return (
    <Frame title="checkbox group">
      <Stack direction="vertical" gap="normal">
        <div style={{ fontWeight: tokens.fontWeight.semibold, marginBottom: tokens.spacing.xs }}>
          Select your interests:
        </div>
        <Checkbox
          label="Technology"
          checked={selected.includes('tech')}
          onChange={(e) => handleChange('tech', e.target.checked)}
        />
        <Checkbox
          label="Sports"
          checked={selected.includes('sports')}
          onChange={(e) => handleChange('sports', e.target.checked)}
        />
        <Checkbox
          label="Music"
          checked={selected.includes('music')}
          onChange={(e) => handleChange('music', e.target.checked)}
        />
        <Checkbox
          label="Art"
          checked={selected.includes('art')}
          onChange={(e) => handleChange('art', e.target.checked)}
        />
        {selected.length > 0 && (
          <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm, marginTop: tokens.spacing.sm }}>
            Selected: {selected.join(', ')}
          </div>
        )}
      </Stack>
    </Frame>
  );
};

export const WithoutLabel = () => (
  <Frame title="without label">
    <Checkbox aria-label="Checkbox without visible label" />
  </Frame>
);
