import React from 'react';

import { Placeholder, Space, SPACE_DIRECTION, SPACE_SIZE, Stack } from '@grasdouble/lufa_design-system';
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

const VisibleSpace = (props: React.ComponentProps<typeof Space>) => (
  <Space
    {...props}
    style={{
      backgroundColor: tokens.color.background.tertiary,
      borderRadius: tokens.radius.base,
      outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
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
        marginTop: tokens.spacing.md,
        fontFamily: tokens.fontFamily.mono,
        color: tokens.color.text.tertiary,
        fontSize: tokens.fontSize.xs,
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
        gap: tokens.spacing.base,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
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
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
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
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
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
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          custom: {tokens.spacing['xl-2xl']}
        </div>
        <Placeholder color={tokens.color.interactive.default}>Before</Placeholder>
        <VisibleSpace size={Number.parseInt(tokens.spacing['xl-2xl'], 10)} />
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
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
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
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          as=&quot;span&quot; (inline)
        </div>
        <div style={{ lineHeight: tokens.lineHeight.loose, color: tokens.color.text.primary }}>
          Pay now
          <Space as="span" direction={SPACE_DIRECTION.horizontal} size={SPACE_SIZE.sm} />
          <span
            style={{
              padding: `${tokens.spacing.xxs} ${tokens.spacing['sm-md']}`,
              borderRadius: tokens.radius.full,
              background: tokens.color.background.secondary,
              outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
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
    <div style={{ lineHeight: tokens.lineHeight.loose, color: tokens.color.text.primary }}>
      Pay now
      <Space as="span" direction={SPACE_DIRECTION.horizontal} size={SPACE_SIZE.sm} />
      <span
        style={{
          padding: `${tokens.spacing.xxs} ${tokens.spacing['sm-md']}`,
          borderRadius: tokens.radius.full,
          background: tokens.color.background.secondary,
          outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
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
