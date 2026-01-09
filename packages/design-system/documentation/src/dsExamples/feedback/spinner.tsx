import React from 'react';

import { Center, Placeholder, Spinner, Stack } from '@grasdouble/lufa_design-system';
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
    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
      <Spinner />
      <div style={{ color: tokens.color.text.secondary }}>Loading…</div>
    </div>
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacing.base,
        flexWrap: 'wrap',
      }}
    >
      {(['small', 'medium', 'large'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['sm-md'] }}>
          <Spinner size={size} />
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              fontSize: tokens.fontSize.xs,
            }}
          >
            {size}
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const Mode = () => (
  <Frame title="mode">
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacing.base,
        flexWrap: 'wrap',
      }}
    >
      {(['A', 'B'] as const).map((mode) => (
        <div key={mode} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['sm-md'] }}>
          <Spinner mode={mode} />
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              fontSize: tokens.fontSize.xs,
            }}
          >
            mode: {mode}
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const CenteredLoadingPanelExample = () => (
  <Frame title="centered loading panel">
    <div
      style={{
        borderRadius: tokens.radius.lg,
        border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
        background: tokens.color.background.primary,
        minHeight: tokens.size['4xl'],
        padding: tokens.spacing.md,
      }}
    >
      <Center axis="both" minHeight={tokens.size['3xl']}>
        <Stack direction="vertical" gap="normal" align="center">
          <Spinner size="large" />
          <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.xs }}>Fetching data…</div>
        </Stack>
      </Center>
    </div>
  </Frame>
);

export const InlineLoadingExample = () => (
  <Frame title="inline next to text">
    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['sm-md'] }}>
      <Spinner size="small" />
      <div style={{ color: tokens.color.text.secondary }}>Syncing</div>
      <Placeholder color={tokens.color.background.secondary} width="auto">
        background task
      </Placeholder>
    </div>
  </Frame>
);

export const Variants = () => (
  <>
    <Size />
    <Mode />
  </>
);

export const Examples = () => (
  <>
    <CenteredLoadingPanelExample />
    <InlineLoadingExample />
  </>
);
