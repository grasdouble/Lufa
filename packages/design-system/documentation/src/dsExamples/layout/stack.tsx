import React from 'react';

import {
  Placeholder,
  Stack,
  STACK_ALIGN,
  STACK_DIRECTION,
  STACK_GAP,
  STACK_JUSTIFY,
  STACK_PADDING,
  STACK_WRAP,
} from '@grasdouble/lufa_design-system';
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
    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
      <Placeholder color={tokens.color.interactive.default}>Item 1</Placeholder>
      <Placeholder color={tokens.color.interactive.default}>Item 2</Placeholder>
      <Placeholder color={tokens.color.interactive.default}>Item 3</Placeholder>
    </Stack>
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
      <div
        style={{
          borderRadius: tokens.radius.lg,
          border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
          background: tokens.color.background.primary,
          padding: tokens.spacing.md,
        }}
      >
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          horizontal
        </div>
        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
          <Placeholder color={tokens.color.interactive.default}>A</Placeholder>
          <Placeholder color={tokens.color.interactive.default}>B</Placeholder>
          <Placeholder color={tokens.color.interactive.default}>C</Placeholder>
        </Stack>
      </div>
      <div
        style={{
          borderRadius: tokens.radius.lg,
          border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
          background: tokens.color.background.primary,
          padding: tokens.spacing.md,
        }}
      >
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          vertical
        </div>
        <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
          <Placeholder color={tokens.color.success.default}>A</Placeholder>
          <Placeholder color={tokens.color.success.default}>B</Placeholder>
          <Placeholder color={tokens.color.success.default}>C</Placeholder>
        </Stack>
      </div>
    </div>
  </Frame>
);

export const Gap = () => (
  <Frame title="gap">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: tokens.spacing.base,
      }}
    >
      {(
        [
          { gap: STACK_GAP.condensed, label: 'condensed' },
          { gap: STACK_GAP.normal, label: 'normal' },
          { gap: STACK_GAP.spacious, label: 'spacious' },
        ] as const
      ).map(({ gap, label }) => (
        <div
          key={label}
          style={{
            borderRadius: tokens.radius.lg,
            border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
            background: tokens.color.background.primary,
            padding: tokens.spacing.md,
          }}
        >
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            gap: {label}
          </div>
          <Stack direction={STACK_DIRECTION.vertical} gap={gap}>
            <Placeholder color={tokens.color.background.secondary}>Item</Placeholder>
            <Placeholder color={tokens.color.background.secondary}>Item</Placeholder>
            <Placeholder color={tokens.color.background.secondary}>Item</Placeholder>
          </Stack>
        </div>
      ))}
    </div>
  </Frame>
);

export const Align = () => (
  <Frame title="align">
    <div
      style={{
        borderRadius: tokens.radius.lg,
        border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
        background: tokens.color.background.primary,
        padding: tokens.spacing.md,
      }}
    >
      <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.center}>
        <Placeholder color={tokens.color.background.secondary} height="small">
          A
        </Placeholder>
        <Placeholder color={tokens.color.interactive.default} height="large">
          B
        </Placeholder>
        <Placeholder color={tokens.color.background.secondary} height="medium">
          C
        </Placeholder>
      </Stack>
      <div
        style={{
          fontFamily: tokens.fontFamily.mono,
          color: tokens.color.text.tertiary,
          fontSize: tokens.fontSize.xs,
          marginTop: tokens.spacing['sm-md'],
        }}
      >
        align: center
      </div>
    </div>
  </Frame>
);

export const Justify = () => (
  <Frame title="justify">
    <Stack direction="vertical" gap="normal">
      {(
        [
          { justify: STACK_JUSTIFY.start, label: 'start' },
          { justify: STACK_JUSTIFY['space-between'], label: 'space-between' },
          { justify: STACK_JUSTIFY['space-evenly'], label: 'space-evenly' },
        ] as const
      ).map(({ justify, label }) => (
        <div
          key={label}
          style={{
            borderRadius: tokens.radius.lg,
            border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
            background: tokens.color.background.primary,
            padding: tokens.spacing.md,
          }}
        >
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            justify: {label}
          </div>
          <Stack
            direction={STACK_DIRECTION.horizontal}
            gap={STACK_GAP.condensed}
            align={STACK_ALIGN.center}
            justify={justify}
          >
            <Placeholder color={tokens.color.interactive.default}>Left</Placeholder>
            <Placeholder color={tokens.color.interactive.default}>Right</Placeholder>
          </Stack>
        </div>
      ))}
    </Stack>
  </Frame>
);

export const Wrap = () => (
  <Frame title="wrap">
    <div
      style={{
        borderRadius: tokens.radius.lg,
        border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
        background: tokens.color.background.primary,
        padding: tokens.spacing.md,
      }}
    >
      <Stack
        direction={STACK_DIRECTION.horizontal}
        gap={STACK_GAP.condensed}
        wrap={STACK_WRAP.wrap}
        align={STACK_ALIGN.start}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Placeholder key={index} color={tokens.color.brand.secondary}>
            {index + 1}
          </Placeholder>
        ))}
      </Stack>
      <div
        style={{
          fontFamily: tokens.fontFamily.mono,
          color: tokens.color.text.tertiary,
          fontSize: tokens.fontSize.xs,
          marginTop: tokens.spacing['sm-md'],
        }}
      >
        wrap: wrap
      </div>
    </div>
  </Frame>
);

export const Padding = () => (
  <Frame title="padding">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: tokens.spacing.base,
      }}
    >
      {(
        [
          { padding: STACK_PADDING.none, label: 'none' },
          { padding: STACK_PADDING.normal, label: 'normal' },
          { padding: STACK_PADDING.spacious, label: 'spacious' },
        ] as const
      ).map(({ padding, label }) => (
        <div
          key={label}
          style={{
            borderRadius: tokens.radius.lg,
            border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
            background: tokens.color.background.primary,
          }}
        >
          <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.condensed} padding={padding}>
            <Placeholder color={tokens.color.background.secondary}>Item</Placeholder>
            <Placeholder color={tokens.color.background.secondary}>Item</Placeholder>
          </Stack>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              fontSize: tokens.fontSize.xs,
              padding: tokens.spacing.md,
              paddingTop: tokens.spacing.none,
            }}
          >
            padding: {label}
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const ItemGrow = () => (
  <Frame title="Stack.Item grow">
    <div
      style={{
        borderRadius: tokens.radius.lg,
        border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
        background: tokens.color.background.primary,
        padding: tokens.spacing.md,
      }}
    >
      <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.condensed} align={STACK_ALIGN.center}>
        <Placeholder color={tokens.color.background.secondary} width="auto">
          Left
        </Placeholder>
        <Stack.Item grow>
          <Placeholder color={tokens.color.interactive.default} width="full">
            Grows
          </Placeholder>
        </Stack.Item>
        <Placeholder color={tokens.color.background.secondary} width="auto">
          Right
        </Placeholder>
      </Stack>
    </div>
  </Frame>
);

export const Variants = () => (
  <>
    <Direction />
    <Gap />
    <Align />
    <Justify />
    <Wrap />
    <Padding />
    <ItemGrow />
  </>
);

export const ToolbarExample = () => (
  <Frame title="toolbar">
    <div
      style={{
        borderRadius: tokens.radius.lg,
        border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
        background: tokens.color.background.primary,
        padding: tokens.spacing.md,
      }}
    >
      <Stack
        direction={STACK_DIRECTION.horizontal}
        align={STACK_ALIGN.center}
        justify={STACK_JUSTIFY['space-between']}
        gap={STACK_GAP.normal}
      >
        <Stack direction={STACK_DIRECTION.horizontal} align={STACK_ALIGN.center} gap={STACK_GAP.condensed}>
          <Placeholder color={tokens.color.interactive.default} width="auto">
            Logo
          </Placeholder>
          <Placeholder color={tokens.color.background.secondary} width="auto">
            Search
          </Placeholder>
        </Stack>
        <Stack direction={STACK_DIRECTION.horizontal} align={STACK_ALIGN.center} gap={STACK_GAP.condensed}>
          <Placeholder color={tokens.color.background.secondary} width="auto">
            Help
          </Placeholder>
          <Placeholder color={tokens.color.background.secondary} width="auto">
            Profile
          </Placeholder>
        </Stack>
      </Stack>
    </div>
  </Frame>
);

export const WrappingChipsExample = () => (
  <Frame title="wrapping chips">
    <Stack
      direction={STACK_DIRECTION.horizontal}
      gap={STACK_GAP.condensed}
      wrap={STACK_WRAP.wrap}
      align={STACK_ALIGN.start}
    >
      {['Design', 'Dev', 'Marketing', 'Ops', 'Finance', 'QA', 'Support', 'Security', 'Legal', 'Product'].map(
        (label) => (
          <Placeholder key={label} color={tokens.color.background.secondary} width="auto">
            {label}
          </Placeholder>
        )
      )}
    </Stack>
  </Frame>
);

export const Examples = () => (
  <>
    <ToolbarExample />
    <WrappingChipsExample />
  </>
);
