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

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      borderRadius: tokens.radius.lg,
      border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
      background: tokens.color.background.primary,
      minHeight: tokens.size['4xl'],
      padding: tokens.spacing.md,
      position: 'relative',
    }}
  >
    <div style={{ position: 'absolute', inset: tokens.spacing.none, pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: tokens.spacing.none,
          bottom: tokens.spacing.none,
          width: tokens.borderWidth.hairline,
          background: tokens.color.border.light,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: tokens.spacing.none,
          right: tokens.spacing.none,
          height: tokens.borderWidth.hairline,
          background: tokens.color.border.light,
        }}
      />
    </div>
    {children}
  </div>
);

export const LiveDemo = () => (
  <Frame title="live demo">
    <Center
      axis="both"
      minHeight={tokens.size['4xl']}
      style={{
        borderRadius: tokens.radius.lg,
        border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
        background: tokens.color.background.primary,
      }}
    >
      <Spinner />
    </Center>
  </Frame>
);

export const Axis = () => (
  <Frame title="axis">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: tokens.spacing.base,
      }}
    >
      {(
        [
          { axis: 'horizontal', label: 'horizontal' },
          { axis: 'vertical', label: 'vertical' },
          { axis: 'both', label: 'both' },
        ] as const
      ).map(({ axis, label }) => (
        <div key={axis}>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            axis: {label}
          </div>
          <Panel>
            <Center axis={axis} minHeight={tokens.size['4xl']}>
              <Placeholder color={tokens.color.interactive.default} width="auto">
                Content
              </Placeholder>
            </Center>
          </Panel>
        </div>
      ))}
    </div>
  </Frame>
);

export const Inline = () => (
  <Frame title="inline">
    <div style={{ lineHeight: tokens.lineHeight.loose, color: tokens.color.text.primary }}>
      Text before
      <Center
        as="span"
        inline
        axis="vertical"
        style={{
          marginInline: tokens.spacing.sm,
          padding: `${tokens.spacing.xxs} ${tokens.spacing['sm-md']}`,
          borderRadius: tokens.radius.full,
          background: tokens.color.background.secondary,
        }}
      >
        <span style={{ fontFamily: tokens.fontFamily.mono, fontSize: tokens.fontSize.xs }}>badge</span>
      </Center>
      text after (same line)
    </div>
  </Frame>
);

export const MinHeight = () => (
  <Frame title="minHeight">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: tokens.spacing.base,
      }}
    >
      {[
        { label: `minHeight: ${tokens.size['3xl']}`, value: tokens.size['3xl'] },
        { label: `minHeight: ${tokens.size['4xl']}`, value: tokens.size['4xl'] },
      ].map(({ label, value }) => (
        <div key={label}>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            {label}
          </div>
          <Panel>
            <Center axis="both" minHeight={value}>
              <Placeholder color={tokens.color.interactive.default} width="auto">
                Content
              </Placeholder>
            </Center>
          </Panel>
        </div>
      ))}
    </div>
  </Frame>
);

export const As = () => (
  <Frame title="as">
    <Stack direction="vertical" gap="normal">
      {(
        [
          { as: 'div', label: 'as="div"' },
          { as: 'section', label: 'as="section"' },
          { as: 'main', label: 'as="main"' },
          { as: 'article', label: 'as="article"' },
        ] as const
      ).map(({ as, label }) => (
        <Center
          key={as}
          as={as}
          axis="both"
          minHeight={tokens.size['2xl']}
          style={{
            borderRadius: tokens.radius.lg,
            border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
            background: tokens.color.background.primary,
          }}
        >
          <span
            style={{
              fontFamily: tokens.fontFamily.mono,
              fontSize: tokens.fontSize.xs,
              color: tokens.color.text.secondary,
            }}
          >
            {label}
          </span>
        </Center>
      ))}
    </Stack>
  </Frame>
);

export const Variants = () => (
  <>
    <Axis />
    <Inline />
    <MinHeight />
    <As />
  </>
);

export const LoadingPanelExample = () => (
  <Frame title="loading panel">
    <Panel>
      <Center axis="both" minHeight={tokens.size['4xl']}>
        <Stack direction="vertical" gap="normal" align="center">
          <Spinner />
          <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.xs }}>Loading…</div>
        </Stack>
      </Center>
    </Panel>
  </Frame>
);

export const EmptyStateExample = () => (
  <Frame title="empty state">
    <div
      style={{
        borderRadius: tokens.radius.lg,
        border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.dashed} ${tokens.color.border.light}`,
        background: tokens.color.background.primary,
      }}
    >
      <Center axis="both" minHeight={tokens.size['4xl']} style={{ padding: tokens.spacing.base }}>
        <Stack direction="vertical" gap="condensed" align="center">
          <div style={{ fontWeight: tokens.fontWeight.bold, color: tokens.color.text.primary }}>No results</div>
          <div style={{ color: tokens.color.text.secondary, fontSize: tokens.fontSize.xs }}>
            Try changing your filters.
          </div>
        </Stack>
      </Center>
    </div>
  </Frame>
);

export const Examples = () => (
  <>
    <LoadingPanelExample />
    <EmptyStateExample />
  </>
);
