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
  render: (args) => (
    <Container size="xl" paddingX="none">
      <div style={{ backgroundColor: tokens.color.background.secondary, borderRadius: '12px', padding: '16px' }}>
        <Flex
          {...args}
          style={{
            ...args.style,
            backgroundColor: tokens.color.background.primary,
            borderRadius: '12px',
            border: `1px solid ${tokens.color.border.light}`,
            padding: '16px',
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <Placeholder key={index} color={tokens.color.interactive.default} height="small" width="auto">
              Item {index + 1}
            </Placeholder>
          ))}
        </Flex>
      </div>
    </Container>
  ),
};

export const Alignment: Story = {
  render: () => {
    const aligns = [FLEX_ALIGN.start, FLEX_ALIGN.center, FLEX_ALIGN.end] as const;
    const justifies = [FLEX_JUSTIFY.start, FLEX_JUSTIFY.center, FLEX_JUSTIFY.end, FLEX_JUSTIFY.between] as const;

    const Box = ({ label, width, height }: { label: string; width: number; height: number }) => (
      <div
        style={{
          width,
          height,
          borderRadius: '10px',
          backgroundColor: tokens.color.interactive.default,
          color: tokens.color.text.inverse,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          fontWeight: 700,
          fontSize: '12px',
        }}
      >
        {label}
      </div>
    );

    return (
      <Container size="full" paddingX="none">
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <div
            style={{
              minWidth: '1460px',
              display: 'grid',
              gridTemplateColumns: `140px repeat(${justifies.length}, 320px)`,
              gap: '12px',
              alignItems: 'stretch',
            }}
          >
            <div />
            {justifies.map((justify) => (
              <div
                key={`header-${justify}`}
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: tokens.color.text.secondary,
                  textAlign: 'center',
                  padding: '6px 8px',
                  backgroundColor: tokens.color.background.primary,
                  border: `1px solid ${tokens.color.border.light}`,
                  borderRadius: '10px',
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
                    fontSize: '12px',
                    color: tokens.color.text.secondary,
                    padding: '6px 8px',
                    backgroundColor: tokens.color.background.primary,
                    border: `1px solid ${tokens.color.border.light}`,
                    borderRadius: '10px',
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
                      border: `1px solid ${tokens.color.border.light}`,
                      borderRadius: '12px',
                      padding: '16px',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ position: 'relative', height: '160px' }}>
                      {/* Guides */}
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          left: '12px',
                          right: '12px',
                          top: '50%',
                          height: '1px',
                          backgroundColor: tokens.color.border.light,
                          pointerEvents: 'none',
                        }}
                      />
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          top: '12px',
                          bottom: '12px',
                          left: '50%',
                          width: '1px',
                          backgroundColor: tokens.color.border.light,
                          pointerEvents: 'none',
                        }}
                      />
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          top: '12px',
                          bottom: '12px',
                          left: '12px',
                          width: '1px',
                          backgroundColor: tokens.color.border.light,
                          pointerEvents: 'none',
                        }}
                      />
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          top: '12px',
                          bottom: '12px',
                          right: '12px',
                          width: '1px',
                          backgroundColor: tokens.color.border.light,
                          pointerEvents: 'none',
                        }}
                      />

                      <Flex
                        align={align}
                        justify={justify}
                        gap={SPACE_SIZE.none}
                        style={{
                          height: '100%',
                          padding: '12px',
                        }}
                      >
                        <Box label="A" width={56} height={32} />
                        <Box label="B" width={72} height={64} />
                        <Box label="C" width={56} height={40} />
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
              borderRadius: '12px',
              padding: '16px',
              overflow: 'auto',
            }}
          >
            <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '12px' }}>
              wrap: {wrap}
            </div>
            <Flex
              wrap={wrap}
              gap="md"
              style={{ backgroundColor: tokens.color.background.primary, borderRadius: '12px', padding: '16px' }}
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
            style={{ backgroundColor: tokens.color.background.secondary, borderRadius: '12px', padding: '16px' }}
          >
            <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '12px' }}>
              gap: {gap}
            </div>
            <Flex
              wrap={FLEX_WRAP.wrap}
              gap="md"
              style={{ backgroundColor: tokens.color.background.primary, borderRadius: '12px', padding: '16px' }}
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
