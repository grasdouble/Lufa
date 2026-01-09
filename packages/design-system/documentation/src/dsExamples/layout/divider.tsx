import React from 'react';

import { Divider, Placeholder, Stack } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const Frame = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div
    style={{
      padding: '20px',
      backgroundColor: tokens.color.background.secondary,
      color: tokens.color.text.primary,
      borderRadius: '8px',
      marginBottom: '16px',
    }}
  >
    {title ? (
      <div
        style={{
          fontFamily: 'monospace',
          color: tokens.color.text.tertiary,
          marginBottom: 12,
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
    <Divider label="Section title" />
  </Frame>
);

export const Orientation = () => (
  <Frame title="orientation">
    <Stack direction="vertical" gap="normal">
      <Divider label="horizontal" orientation="horizontal" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 120 }}>
        <Placeholder color={tokens.color.background.secondary}>Left</Placeholder>
        <Divider orientation="vertical" variant="solid" length="70%" />
        <Placeholder color={tokens.color.background.secondary}>Right</Placeholder>
      </div>
    </Stack>
  </Frame>
);

export const Variant = () => (
  <Frame title="variant">
    <Stack direction="vertical" gap="condensed">
      <Divider label="solid" variant="solid" />
      <Divider label="dashed" variant="dashed" />
    </Stack>
  </Frame>
);

export const Align = () => (
  <Frame title="align">
    <Stack direction="vertical" gap="condensed">
      <Divider label="start" align="start" />
      <Divider label="center" align="center" />
      <Divider label="end" align="end" />
    </Stack>
  </Frame>
);

export const Spacing = () => (
  <Frame title="spacing">
    <Stack direction="vertical" gap="condensed">
      <div>
        <Placeholder color={tokens.color.background.secondary}>Above</Placeholder>
        <Divider label="none" spacing="none" />
        <Placeholder color={tokens.color.background.secondary}>Below</Placeholder>
      </div>
      <div>
        <Placeholder color={tokens.color.background.secondary}>Above</Placeholder>
        <Divider label="sm" spacing="sm" />
        <Placeholder color={tokens.color.background.secondary}>Below</Placeholder>
      </div>
      <div>
        <Placeholder color={tokens.color.background.secondary}>Above</Placeholder>
        <Divider label="lg" spacing="lg" />
        <Placeholder color={tokens.color.background.secondary}>Below</Placeholder>
      </div>
    </Stack>
  </Frame>
);

export const Length = () => (
  <Frame title="length">
    <Stack direction="vertical" gap="normal">
      <Divider label='length="60%"' length="60%" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 160 }}>
        <Placeholder color={tokens.color.background.secondary}>Left</Placeholder>
        <Divider orientation="vertical" variant="dashed" length="70%" />
        <Placeholder color={tokens.color.background.secondary}>Right</Placeholder>
      </div>
    </Stack>
  </Frame>
);

export const Label = () => (
  <Frame title="label">
    <Stack direction="vertical" gap="condensed">
      <Divider />
      <Divider label="Details" />
      <Divider label={<span style={{ color: tokens.color.text.primary }}>Custom node</span>} />
    </Stack>
  </Frame>
);

export const Variants = () => (
  <>
    <Orientation />
    <Variant />
    <Align />
    <Spacing />
    <Length />
    <Label />
  </>
);

export const BetweenContentExample = () => (
  <Frame title="between content">
    <div style={{ width: '100%' }}>
      <Placeholder color={tokens.color.interactive.default}>Context</Placeholder>
      <Divider label="Between" spacing="sm" />
      <Placeholder color={tokens.color.interactive.default}>Context</Placeholder>
    </div>
  </Frame>
);

export const VerticalSplitExample = () => (
  <Frame title="vertical split">
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        height: '160px',
      }}
    >
      <Placeholder color={tokens.color.interactive.default}>Left</Placeholder>
      <Divider orientation="vertical" variant="dashed" length="90%" />
      <Placeholder color={tokens.color.interactive.default}>Right</Placeholder>
    </div>
  </Frame>
);

export const ListSectionExample = () => (
  <Frame title="list section">
    <Stack direction="vertical" gap="normal" padding="none">
      <Divider label="Upcoming" />
      <Placeholder color={tokens.color.background.secondary}>Item A</Placeholder>
      <Placeholder color={tokens.color.background.secondary}>Item B</Placeholder>
    </Stack>
  </Frame>
);

export const Examples = () => (
  <>
    <BetweenContentExample />
    <VerticalSplitExample />
    <ListSectionExample />
  </>
);
