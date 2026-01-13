import React, { useState } from 'react';

import { ColorPicker, Stack } from '@grasdouble/lufa_design-system';
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
    <ColorPicker label="Pick a color" defaultValue="#3b82f6" />
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <Stack direction="vertical" gap="normal">
      <ColorPicker label="Small" size="small" defaultValue="#3b82f6" />
      <ColorPicker label="Medium (default)" size="medium" defaultValue="#3b82f6" />
      <ColorPicker label="Large" size="large" defaultValue="#3b82f6" />
    </Stack>
  </Frame>
);

export const WithoutPreview = () => (
  <Frame title="without preview">
    <ColorPicker label="Color" defaultValue="#3b82f6" showPreview={false} />
  </Frame>
);

export const FullWidth = () => (
  <Frame title="full width">
    <ColorPicker label="Full Width ColorPicker" defaultValue="#3b82f6" fullWidth />
  </Frame>
);

export const WithHelperText = () => (
  <Frame title="with helper text">
    <ColorPicker
      label="Brand Color"
      defaultValue="#3b82f6"
      helperText="Choose your brand's primary color"
    />
  </Frame>
);

export const ErrorState = () => (
  <Frame title="error state">
    <ColorPicker
      label="Color"
      defaultValue="#3b82f6"
      error="Invalid color format"
    />
  </Frame>
);

export const Disabled = () => (
  <Frame title="disabled">
    <ColorPicker label="Disabled" defaultValue="#3b82f6" disabled />
  </Frame>
);

export const Required = () => (
  <Frame title="required">
    <ColorPicker label="Brand Color" defaultValue="#3b82f6" required />
  </Frame>
);

export const WithCallback = () => {
  const [color, setColor] = useState('#3b82f6');

  return (
    <Frame title="with callback">
      <Stack direction="vertical" gap="normal">
        <ColorPicker
          label="Select Color"
          value={color}
          onColorChange={(newColor) => setColor(newColor)}
        />
        <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm }}>
          Selected color: {color}
        </div>
        <div
          style={{
            width: '100%',
            height: tokens.spacing['3xl'],
            backgroundColor: color,
            borderRadius: tokens.radius.base,
            border: `${tokens.borderWidth.thin} solid ${tokens.color.border.default}`,
          }}
        />
      </Stack>
    </Frame>
  );
};

export const MultipleColors = () => {
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#8b5cf6');
  const [accentColor, setAccentColor] = useState('#ec4899');

  return (
    <Frame title="multiple colors">
      <Stack direction="vertical" gap="normal">
        <ColorPicker
          label="Primary Color"
          value={primaryColor}
          onColorChange={setPrimaryColor}
        />
        <ColorPicker
          label="Secondary Color"
          value={secondaryColor}
          onColorChange={setSecondaryColor}
        />
        <ColorPicker
          label="Accent Color"
          value={accentColor}
          onColorChange={setAccentColor}
        />
        <div style={{ marginTop: tokens.spacing.md }}>
          <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm, marginBottom: tokens.spacing.sm }}>
            Color Palette Preview:
          </div>
          <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
            <div
              style={{
                flex: 1,
                height: tokens.spacing['3xl'],
                backgroundColor: primaryColor,
                borderRadius: tokens.radius.base,
                border: `${tokens.borderWidth.thin} solid ${tokens.color.border.default}`,
              }}
            />
            <div
              style={{
                flex: 1,
                height: tokens.spacing['3xl'],
                backgroundColor: secondaryColor,
                borderRadius: tokens.radius.base,
                border: `${tokens.borderWidth.thin} solid ${tokens.color.border.default}`,
              }}
            />
            <div
              style={{
                flex: 1,
                height: tokens.spacing['3xl'],
                backgroundColor: accentColor,
                borderRadius: tokens.radius.base,
                border: `${tokens.borderWidth.thin} solid ${tokens.color.border.default}`,
              }}
            />
          </div>
        </div>
      </Stack>
    </Frame>
  );
};

export const PresetColors = () => {
  const [color, setColor] = useState('#3b82f6');
  const presets = [
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#f59e0b', // amber
    '#10b981', // green
    '#ef4444', // red
  ];

  return (
    <Frame title="preset colors">
      <Stack direction="vertical" gap="normal">
        <ColorPicker
          label="Select Color"
          value={color}
          onColorChange={setColor}
        />
        <div>
          <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.sm, marginBottom: tokens.spacing.sm }}>
            Quick presets:
          </div>
          <div style={{ display: 'flex', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => setColor(preset)}
                style={{
                  width: tokens.spacing['2xl'],
                  height: tokens.spacing['2xl'],
                  backgroundColor: preset,
                  border: color === preset 
                    ? `${tokens.borderWidth.focus} solid ${tokens.color.border.focus}` 
                    : `${tokens.borderWidth.thin} solid ${tokens.color.border.default}`,
                  borderRadius: tokens.radius.base,
                  cursor: 'pointer',
                }}
                aria-label={`Set color to ${preset}`}
              />
            ))}
          </div>
        </div>
      </Stack>
    </Frame>
  );
};
