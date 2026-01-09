import React from 'react';

import { Center, Placeholder, Spinner, Stack } from '@grasdouble/lufa_design-system';
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

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      borderRadius: 12,
      border: `1px solid ${tokens.color.border.light}`,
      background: '#fff',
      minHeight: 160,
      padding: 12,
      position: 'relative',
    }}
  >
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 1,
          background: tokens.color.border.light,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 1,
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
      minHeight={200}
      style={{
        borderRadius: 12,
        border: `1px solid ${tokens.color.border.light}`,
        background: '#fff',
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
        gap: 16,
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
              fontFamily: 'monospace',
              color: tokens.color.text.tertiary,
              marginBottom: 8,
            }}
          >
            axis: {label}
          </div>
          <Panel>
            <Center axis={axis} minHeight={160}>
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
    <div style={{ lineHeight: 1.9, color: tokens.color.text.primary }}>
      Text before
      <Center
        as="span"
        inline
        axis="vertical"
        style={{
          marginInline: 8,
          padding: '2px 10px',
          borderRadius: 999,
          background: tokens.color.background.secondary,
        }}
      >
        <span style={{ fontFamily: 'monospace', fontSize: 12 }}>badge</span>
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
        gap: 16,
      }}
    >
      {[120, 220].map((minHeight) => (
        <div key={minHeight}>
          <div
            style={{
              fontFamily: 'monospace',
              color: tokens.color.text.tertiary,
              marginBottom: 8,
            }}
          >
            minHeight: {minHeight}px
          </div>
          <Panel>
            <Center axis="both" minHeight={minHeight}>
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
          minHeight={96}
          style={{
            borderRadius: 12,
            border: `1px solid ${tokens.color.border.light}`,
            background: '#fff',
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
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
      <Center axis="both" minHeight={200}>
        <Stack direction="vertical" gap="normal" align="center">
          <Spinner />
          <div style={{ color: tokens.color.text.secondary, fontSize: 12 }}>Loading…</div>
        </Stack>
      </Center>
    </Panel>
  </Frame>
);

export const EmptyStateExample = () => (
  <Frame title="empty state">
    <div
      style={{
        borderRadius: 12,
        border: `1px dashed ${tokens.color.border.light}`,
        background: '#fff',
      }}
    >
      <Center axis="both" minHeight={220} style={{ padding: 16 }}>
        <Stack direction="vertical" gap="condensed" align="center">
          <div style={{ fontWeight: 700, color: tokens.color.text.primary }}>No results</div>
          <div style={{ color: tokens.color.text.secondary, fontSize: 12 }}>Try changing your filters.</div>
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
