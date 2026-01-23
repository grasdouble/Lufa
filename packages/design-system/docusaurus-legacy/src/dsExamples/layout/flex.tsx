import React from 'react';

import {
  Flex,
  FLEX_ALIGN,
  FLEX_DIRECTION,
  FLEX_JUSTIFY,
  FLEX_WRAP,
  Placeholder,
  SPACE_SIZE,
  Stack,
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
    <Flex align={FLEX_ALIGN.center} justify={FLEX_JUSTIFY.between} wrap={FLEX_WRAP.wrap} gap={SPACE_SIZE.sm}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Placeholder key={i} color={tokens.color.interactive.default} width="auto">
          Item {i + 1}
        </Placeholder>
      ))}
    </Flex>
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
          row
        </div>
        <Flex direction={FLEX_DIRECTION.row} gap={SPACE_SIZE.sm}>
          <Placeholder color={tokens.color.interactive.default} width="auto">
            A
          </Placeholder>
          <Placeholder color={tokens.color.interactive.default} width="auto">
            B
          </Placeholder>
          <Placeholder color={tokens.color.interactive.default} width="auto">
            C
          </Placeholder>
        </Flex>
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
          column
        </div>
        <Flex direction={FLEX_DIRECTION.column} gap={SPACE_SIZE.sm}>
          <Placeholder color={tokens.color.interactive.default} width="auto">
            A
          </Placeholder>
          <Placeholder color={tokens.color.interactive.default} width="auto">
            B
          </Placeholder>
          <Placeholder color={tokens.color.interactive.default} width="auto">
            C
          </Placeholder>
        </Flex>
      </div>
    </div>
  </Frame>
);

export const Align = () => (
  <Frame title="align">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: tokens.spacing.base,
      }}
    >
      {(
        [
          { align: FLEX_ALIGN.start, label: 'start' },
          { align: FLEX_ALIGN.center, label: 'center' },
          { align: FLEX_ALIGN.end, label: 'end' },
        ] as const
      ).map(({ align, label }) => (
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
            align: {label}
          </div>
          <div
            style={{
              height: tokens.size['3xl'],
              borderRadius: tokens.radius.lg,
              outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.dashed} ${tokens.color.border.light}`,
              padding: tokens.spacing.md,
            }}
          >
            <Flex align={align} gap={SPACE_SIZE.sm} style={{ height: tokens.maxWidth.full }}>
              <Placeholder color={tokens.color.background.secondary} width="auto" height="large">
                A
              </Placeholder>
              <Placeholder color={tokens.color.interactive.default} width="auto" height="medium">
                B
              </Placeholder>
              <Placeholder color={tokens.color.background.secondary} width="auto" height="small">
                C
              </Placeholder>
            </Flex>
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const Justify = () => (
  <Frame title="justify">
    <Stack direction="vertical" gap="normal">
      {(
        [
          { justify: FLEX_JUSTIFY.start, label: 'start' },
          { justify: FLEX_JUSTIFY.between, label: 'between' },
          { justify: FLEX_JUSTIFY.evenly, label: 'evenly' },
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
          <Flex justify={justify} gap={SPACE_SIZE.sm}>
            <Placeholder color={tokens.color.interactive.default} width="auto">
              A
            </Placeholder>
            <Placeholder color={tokens.color.interactive.default} width="auto">
              B
            </Placeholder>
            <Placeholder color={tokens.color.interactive.default} width="auto">
              C
            </Placeholder>
          </Flex>
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
      <div
        style={{
          fontFamily: tokens.fontFamily.mono,
          color: tokens.color.text.tertiary,
          marginBottom: tokens.spacing.sm,
        }}
      >
        wrap
      </div>
      <Flex wrap={FLEX_WRAP.wrap} gap={SPACE_SIZE.sm}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Placeholder key={i} color={tokens.color.background.secondary} width="auto">
            {i + 1}
          </Placeholder>
        ))}
      </Flex>
    </div>
  </Frame>
);

export const Gap = () => (
  <Frame title="gap">
    <Stack direction="vertical" gap="normal">
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
          gap: md (token)
        </div>
        <Flex gap={SPACE_SIZE.md}>
          <Placeholder color={tokens.color.interactive.default} width="auto">
            A
          </Placeholder>
          <Placeholder color={tokens.color.interactive.default} width="auto">
            B
          </Placeholder>
          <Placeholder color={tokens.color.interactive.default} width="auto">
            C
          </Placeholder>
        </Flex>
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
          gap: lg (token)
        </div>
        <Flex gap={SPACE_SIZE.lg}>
          <Placeholder color={tokens.color.background.secondary} width="auto">
            A
          </Placeholder>
          <Placeholder color={tokens.color.background.secondary} width="auto">
            B
          </Placeholder>
          <Placeholder color={tokens.color.background.secondary} width="auto">
            C
          </Placeholder>
        </Flex>
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
          gap: spacing.lg (token value)
        </div>
        <Flex gap={tokens.spacing.lg}>
          <Placeholder color={tokens.color.background.secondary} width="auto">
            A
          </Placeholder>
          <Placeholder color={tokens.color.background.secondary} width="auto">
            B
          </Placeholder>
          <Placeholder color={tokens.color.background.secondary} width="auto">
            C
          </Placeholder>
        </Flex>
      </div>
    </Stack>
  </Frame>
);

export const Inline = () => (
  <Frame title="inline">
    <div style={{ lineHeight: tokens.lineHeight.loose, color: tokens.color.text.primary }}>
      Text before
      <Flex inline gap={SPACE_SIZE.xs} align={FLEX_ALIGN.center} style={{ marginInline: tokens.spacing.sm }}>
        <span
          style={{
            padding: `${tokens.spacing.xxs} ${tokens.spacing['sm-md']}`,
            borderRadius: tokens.radius.full,
            background: tokens.color.background.secondary,
          }}
        >
          A
        </span>
        <span
          style={{
            padding: `${tokens.spacing.xxs} ${tokens.spacing['sm-md']}`,
            borderRadius: tokens.radius.full,
            background: tokens.color.background.secondary,
          }}
        >
          B
        </span>
      </Flex>
      text after
    </div>
  </Frame>
);

export const As = () => (
  <Frame title="as">
    <Stack direction="vertical" gap="normal">
      {(
        [
          { as: 'div', label: 'as="div"' },
          { as: 'nav', label: 'as="nav"' },
          { as: 'header', label: 'as="header"' },
          { as: 'footer', label: 'as="footer"' },
        ] as const
      ).map(({ as, label }) => (
        <Flex
          key={as}
          as={as}
          align={FLEX_ALIGN.center}
          justify={FLEX_JUSTIFY.between}
          gap={SPACE_SIZE.sm}
          style={{
            borderRadius: tokens.radius.lg,
            border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
            background: tokens.color.background.primary,
            padding: tokens.spacing.md,
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
          <Placeholder color={tokens.color.background.secondary} width="auto">
            content
          </Placeholder>
        </Flex>
      ))}
    </Stack>
  </Frame>
);

export const Variants = () => (
  <>
    <Direction />
    <Align />
    <Justify />
    <Wrap />
    <Gap />
    <Inline />
    <As />
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
      <Flex align={FLEX_ALIGN.center} justify={FLEX_JUSTIFY.between} gap={SPACE_SIZE.md}>
        <Flex align={FLEX_ALIGN.center} gap={SPACE_SIZE.sm}>
          <Placeholder color={tokens.color.interactive.default} width="auto">
            Logo
          </Placeholder>
          <Placeholder color={tokens.color.background.secondary} width="auto">
            Search
          </Placeholder>
        </Flex>
        <Flex align={FLEX_ALIGN.center} gap={SPACE_SIZE.sm}>
          <Placeholder color={tokens.color.background.secondary} width="auto">
            Help
          </Placeholder>
          <Placeholder color={tokens.color.background.secondary} width="auto">
            Profile
          </Placeholder>
        </Flex>
      </Flex>
    </div>
  </Frame>
);

export const ResponsiveCardRowExample = () => (
  <Frame title="responsive card row (wrap)">
    <Flex wrap={FLEX_WRAP.wrap} gap={SPACE_SIZE.md}>
      {['Card A', 'Card B', 'Card C', 'Card D', 'Card E'].map((label) => (
        <div key={label} style={{ width: tokens.maxWidth['3xs'] }}>
          <Placeholder color={tokens.color.background.secondary} height="large">
            {label}
          </Placeholder>
        </div>
      ))}
    </Flex>
  </Frame>
);

export const Examples = () => (
  <>
    <ToolbarExample />
    <ResponsiveCardRowExample />
  </>
);
