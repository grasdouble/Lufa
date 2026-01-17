import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Container,
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

const meta = {
  title: '2. Layout/Flex',
  component: Flex,
  tags: [],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Generic flex container with alignment, wrapping, and token-friendly gaps.',
      },
    },
  },
  argTypes: {
    inline: { control: 'boolean', table: { defaultValue: { summary: false } } },
    direction: {
      control: 'select',
      options: Object.values(FLEX_DIRECTION),
      table: { defaultValue: { summary: 'row' } },
    },
    align: {
      control: 'select',
      options: Object.values(FLEX_ALIGN),
      table: { defaultValue: { summary: 'stretch' } },
    },
    justify: {
      control: 'select',
      options: Object.values(FLEX_JUSTIFY),
      table: { defaultValue: { summary: 'start' } },
    },
    wrap: { control: 'select', options: Object.values(FLEX_WRAP), table: { defaultValue: { summary: 'nowrap' } } },
    gap: { control: 'select', options: Object.values(SPACE_SIZE), table: { defaultValue: { summary: 'md' } } },
    children: { control: false },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    direction: FLEX_DIRECTION.row,
    align: FLEX_ALIGN.center,
    justify: FLEX_JUSTIFY.start,
    wrap: FLEX_WRAP.wrap,
    gap: SPACE_SIZE.md,
    inline: false,
  },
  render: (args) => {
    // Create items with varying heights to demonstrate align-items effect
    const heights = ['small', 'medium', 'small', 'large', 'small', 'medium'] as const;

    return (
      <Container size="full" paddingX="none">
        <Stack direction="vertical" gap="spacious">
          {/* Row Direction Demo */}
          <div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: tokens.fontSize.sm,
                color: tokens.color.text.secondary,
                marginBottom: tokens.spacing.sm,
                fontWeight: tokens.fontWeight.semibold,
              }}
            >
              direction: row
            </div>
            <div
              style={{
                backgroundColor: tokens.color.background.secondary,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.base,
              }}
            >
              <Flex
                {...args}
                direction={FLEX_DIRECTION.row}
                style={{
                  ...args.style,
                  backgroundColor: tokens.color.background.primary,
                  borderRadius: tokens.radius.lg,
                  border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
                  padding: tokens.spacing.base,
                  minHeight: tokens.size['4xl'], // Add minimum height to show vertical alignment
                }}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <Placeholder
                    key={index}
                    color={tokens.color.interactive.default}
                    height={heights[index]}
                    width="auto"
                  >
                    {index + 1}
                  </Placeholder>
                ))}
              </Flex>
            </div>
          </div>

          {/* Column Direction Demo */}
          <div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: tokens.fontSize.sm,
                color: tokens.color.text.secondary,
                marginBottom: tokens.spacing.sm,
                fontWeight: tokens.fontWeight.semibold,
              }}
            >
              direction: column
            </div>
            <div
              style={{
                backgroundColor: tokens.color.background.secondary,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.base,
              }}
            >
              <Flex
                {...args}
                direction={FLEX_DIRECTION.column}
                style={{
                  ...args.style,
                  backgroundColor: tokens.color.background.primary,
                  borderRadius: tokens.radius.lg,
                  border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
                  padding: tokens.spacing.base,
                  minHeight: tokens.size['4xl'], // Add minimum height to show vertical spacing
                }}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <Placeholder key={index} color={tokens.color.success.default} height="small" width="auto">
                    {index + 1}
                  </Placeholder>
                ))}
              </Flex>
            </div>
          </div>
        </Stack>
      </Container>
    );
  },
};

export const Alignment: Story = {
  render: () => {
    const aligns = [FLEX_ALIGN.start, FLEX_ALIGN.center, FLEX_ALIGN.end] as const;
    const justifies = [FLEX_JUSTIFY.start, FLEX_JUSTIFY.center, FLEX_JUSTIFY.end, FLEX_JUSTIFY.between] as const;

    const Box = ({ label, width, height }: { label: string; width: string; height: string }) => (
      <div
        style={{
          width,
          height,
          borderRadius: tokens.radius.lg,
          backgroundColor: tokens.color.interactive.default,
          color: tokens.color.text.inverse,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          fontWeight: tokens.fontWeight.bold,
          fontSize: tokens.fontSize.xs,
        }}
      >
        {label}
      </div>
    );

    return (
      <Container size="full" paddingX="none">
        <div style={{ width: tokens.maxWidth.full, overflowX: 'auto' }}>
          <div
            style={{
              minWidth: tokens.maxWidth['8xl'],
              display: 'grid',
              gridTemplateColumns: `${tokens.spacing['5xl']} repeat(${justifies.length}, ${tokens.dimension.sidebarWidthWide})`,
              gap: tokens.spacing.md,
              alignItems: 'stretch',
            }}
          >
            <div />
            {justifies.map((justify) => (
              <div
                key={`header-${justify}`}
                style={{
                  fontFamily: 'monospace',
                  fontSize: tokens.fontSize.xs,
                  color: tokens.color.text.secondary,
                  textAlign: 'center',
                  padding: `${tokens.spacing['2xs']} ${tokens.spacing.sm}`,
                  backgroundColor: tokens.color.background.primary,
                  border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
                  borderRadius: tokens.radius.lg,
                }}
              >
                justify: {justify}
              </div>
            ))}

            {aligns.map((align) => (
              <Fragment key={`row-${align}`}>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: tokens.fontSize.xs,
                    color: tokens.color.text.secondary,
                    padding: `${tokens.spacing['2xs']} ${tokens.spacing.sm}`,
                    backgroundColor: tokens.color.background.primary,
                    border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
                    borderRadius: tokens.radius.lg,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  align: {align}
                </div>
                {justifies.map((justify) => (
                  <div
                    key={`${align}-${justify}`}
                    style={{
                      backgroundColor: tokens.color.background.primary,
                      border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
                      borderRadius: tokens.radius.lg,
                      padding: tokens.spacing.base,
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ position: 'relative', height: tokens.size['4xl'] }}>
                      {/* Guides */}
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          left: tokens.spacing.md,
                          right: tokens.spacing.md,
                          top: '50%',
                          height: tokens.borderWidth.hairline,
                          backgroundColor: tokens.color.border.light,
                          pointerEvents: 'none',
                        }}
                      />
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          top: tokens.spacing.md,
                          bottom: tokens.spacing.md,
                          left: '50%',
                          width: tokens.borderWidth.hairline,
                          backgroundColor: tokens.color.border.light,
                          pointerEvents: 'none',
                        }}
                      />
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          top: tokens.spacing.md,
                          bottom: tokens.spacing.md,
                          left: tokens.spacing.md,
                          width: tokens.borderWidth.hairline,
                          backgroundColor: tokens.color.border.light,
                          pointerEvents: 'none',
                        }}
                      />
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          top: tokens.spacing.md,
                          bottom: tokens.spacing.md,
                          right: tokens.spacing.md,
                          width: tokens.borderWidth.hairline,
                          backgroundColor: tokens.color.border.light,
                          pointerEvents: 'none',
                        }}
                      />

                      <Flex
                        align={align}
                        justify={justify}
                        gap={SPACE_SIZE.none}
                        style={{
                          height: tokens.maxWidth.full,
                          padding: tokens.spacing.md,
                        }}
                      >
                        <Box label="A" width={tokens.size.lg} height={tokens.size.md} />
                        <Box label="B" width={tokens.size.xl} height={tokens.size.xl} />
                        <Box label="C" width={tokens.size.lg} height={tokens.spacing['xl-2xl']} />
                      </Flex>
                    </div>
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </Container>
    );
  },
};

export const Gap: Story = {
  render: () => (
    <Container size="lg" paddingX="none">
      <Stack direction="vertical" gap="spacious">
        {([FLEX_WRAP.nowrap, FLEX_WRAP.wrap] as const).map((wrap) => (
          <div
            key={wrap}
            style={{
              backgroundColor: tokens.color.background.secondary,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.base,
              overflow: 'auto',
            }}
          >
            <div
              style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: tokens.spacing.md }}
            >
              wrap: {wrap}
            </div>
            <Flex
              wrap={wrap}
              gap="md"
              style={{
                backgroundColor: tokens.color.background.primary,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.base,
              }}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <Placeholder key={index} height="small" width="auto">
                  {index + 1}
                </Placeholder>
              ))}
            </Flex>
          </div>
        ))}
      </Stack>
    </Container>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Container size="lg" paddingX="none">
      <Stack direction="vertical" gap="spacious">
        {([SPACE_SIZE.none, SPACE_SIZE.sm, SPACE_SIZE.md, SPACE_SIZE.lg, SPACE_SIZE.xl] as const).map((gap) => (
          <div
            key={gap}
            style={{
              backgroundColor: tokens.color.background.secondary,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.base,
            }}
          >
            <div
              style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: tokens.spacing.md }}
            >
              gap: {gap}
            </div>
            <Flex
              wrap={FLEX_WRAP.wrap}
              gap="md"
              style={{
                backgroundColor: tokens.color.background.primary,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.base,
              }}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Placeholder key={index} height="small" width="auto">
                  {index + 1}
                </Placeholder>
              ))}
            </Flex>
          </div>
        ))}
      </Stack>
    </Container>
  ),
};
