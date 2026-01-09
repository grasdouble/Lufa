import React from 'react';

import { Placeholder, Space, SPACE_DIRECTION, SPACE_SIZE, Stack } from '@grasdouble/lufa_design-system';
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

const VisibleSpace = (props: React.ComponentProps<typeof Space>) => (
  <Space
    {...props}
    style={{
      backgroundColor: tokens.color.background.tertiary,
      borderRadius: 10,
      outline: `1px solid ${tokens.color.border.light}`,
      ...(props.style ?? {}),
    }}
  />
);

export const LiveDemo = () => (
  <Frame title="live demo">
    <Placeholder color={tokens.color.interactive.default}>Before</Placeholder>
    <VisibleSpace size={SPACE_SIZE.lg} />
    <Placeholder color={tokens.color.interactive.default}>After</Placeholder>
    <div
      style={{
        marginTop: 12,
        fontFamily: 'monospace',
        color: tokens.color.text.tertiary,
        fontSize: 12,
      }}
    >
      size: {SPACE_SIZE.lg} → {tokens.spacing[SPACE_SIZE.lg]}
    </div>
  </Frame>
);

export const Direction = () => (
  <Frame title="direction">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 16,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'monospace',
            color: tokens.color.text.tertiary,
            marginBottom: 8,
          }}
        >
          vertical
        </div>
        <Placeholder color={tokens.color.interactive.default}>Before</Placeholder>
        <VisibleSpace direction={SPACE_DIRECTION.vertical} size={SPACE_SIZE.md} />
        <Placeholder color={tokens.color.interactive.default}>After</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: 'monospace',
            color: tokens.color.text.tertiary,
            marginBottom: 8,
          }}
        >
          horizontal
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Placeholder color={tokens.color.interactive.default}>Left</Placeholder>
          <VisibleSpace direction={SPACE_DIRECTION.horizontal} size={SPACE_SIZE.md} />
          <Placeholder color={tokens.color.interactive.default}>Right</Placeholder>
        </div>
      </div>
    </div>
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <Stack direction="vertical" gap="normal">
      {([SPACE_SIZE.xs, SPACE_SIZE.md, SPACE_SIZE.xl] as const).map((size) => (
        <div key={size}>
          <div
            style={{
              fontFamily: 'monospace',
              color: tokens.color.text.tertiary,
              marginBottom: 8,
            }}
          >
            size: {size} → {tokens.spacing[size]}
          </div>
          <Placeholder color={tokens.color.interactive.default}>Before</Placeholder>
          <VisibleSpace size={size} />
          <Placeholder color={tokens.color.interactive.default}>After</Placeholder>
        </div>
      ))}

      <div>
        <div
          style={{
            fontFamily: 'monospace',
            color: tokens.color.text.tertiary,
            marginBottom: 8,
          }}
        >
          custom: 40px
        </div>
        <Placeholder color={tokens.color.interactive.default}>Before</Placeholder>
        <VisibleSpace size={40} />
        <Placeholder color={tokens.color.interactive.default}>After</Placeholder>
      </div>
    </Stack>
  </Frame>
);

export const As = () => (
  <Frame title="as">
    <Stack direction="vertical" gap="normal">
      <div>
        <div
          style={{
            fontFamily: 'monospace',
            color: tokens.color.text.tertiary,
            marginBottom: 8,
          }}
        >
          as=&quot;div&quot; (block)
        </div>
        <Placeholder color={tokens.color.interactive.default}>Before</Placeholder>
        <VisibleSpace as="div" size={SPACE_SIZE.md} />
        <Placeholder color={tokens.color.interactive.default}>After</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: 'monospace',
            color: tokens.color.text.tertiary,
            marginBottom: 8,
          }}
        >
          as=&quot;span&quot; (inline)
        </div>
        <div style={{ lineHeight: 1.9, color: tokens.color.text.primary }}>
          Pay now
          <Space as="span" direction={SPACE_DIRECTION.horizontal} size={SPACE_SIZE.sm} />
          <span
            style={{
              padding: '2px 10px',
              borderRadius: 999,
              background: tokens.color.background.secondary,
              outline: `1px solid ${tokens.color.border.light}`,
            }}
          >
            badge
          </span>
          <Space as="span" direction={SPACE_DIRECTION.horizontal} size={SPACE_SIZE.sm} />
          or later
        </div>
      </div>
    </Stack>
  </Frame>
);

export const Variants = () => (
  <>
    <Direction />
    <Size />
    <As />
  </>
);

export const InlineTextExample = () => (
  <Frame title='inline spacing (as="span")'>
    <div style={{ lineHeight: 1.9, color: tokens.color.text.primary }}>
      Pay now
      <Space as="span" direction={SPACE_DIRECTION.horizontal} size={SPACE_SIZE.sm} />
      <span
        style={{
          padding: '2px 10px',
          borderRadius: 999,
          background: tokens.color.background.secondary,
          outline: `1px solid ${tokens.color.border.light}`,
        }}
      >
        badge
      </span>
      <Space as="span" direction={SPACE_DIRECTION.horizontal} size={SPACE_SIZE.sm} />
      or later
    </div>
  </Frame>
);

export const SectionSeparatorExample = () => (
  <Frame title="separating sections">
    <Placeholder color={tokens.color.background.secondary}>Section A</Placeholder>
    <VisibleSpace size={SPACE_SIZE.xl} />
    <Placeholder color={tokens.color.background.secondary}>Section B</Placeholder>
  </Frame>
);

export const Examples = () => (
  <>
    <InlineTextExample />
    <SectionSeparatorExample />
  </>
);
