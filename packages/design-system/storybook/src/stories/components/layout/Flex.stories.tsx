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
                fontSize: 'var(--lufa-token-font-size-sm)',
                color: 'var(--lufa-token-color-text-secondary)',
                marginBottom: 'var(--lufa-token-spacing-sm)',
                fontWeight: 'var(--lufa-token-font-weight-semibold)',
              }}
            >
              direction: row
            </div>
            <div
              style={{
                backgroundColor: 'var(--lufa-token-color-background-secondary)',
                borderRadius: 'var(--lufa-token-radius-lg)',
                padding: 'var(--lufa-token-spacing-base)',
              }}
            >
              <Flex
                {...args}
                direction={FLEX_DIRECTION.row}
                style={{
                  ...args.style,
                  backgroundColor: 'var(--lufa-token-color-background-primary)',
                  borderRadius: 'var(--lufa-token-radius-lg)',
                  border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                  padding: 'var(--lufa-token-spacing-base)',
                  minHeight: 'var(--lufa-token-size-4xl)', // Add minimum height to show vertical alignment
                }}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <Placeholder
                    key={index}
                    color={'var(--lufa-token-color-interactive-default)'}
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
                fontSize: 'var(--lufa-token-font-size-sm)',
                color: 'var(--lufa-token-color-text-secondary)',
                marginBottom: 'var(--lufa-token-spacing-sm)',
                fontWeight: 'var(--lufa-token-font-weight-semibold)',
              }}
            >
              direction: column
            </div>
            <div
              style={{
                backgroundColor: 'var(--lufa-token-color-background-secondary)',
                borderRadius: 'var(--lufa-token-radius-lg)',
                padding: 'var(--lufa-token-spacing-base)',
              }}
            >
              <Flex
                {...args}
                direction={FLEX_DIRECTION.column}
                style={{
                  ...args.style,
                  backgroundColor: 'var(--lufa-token-color-background-primary)',
                  borderRadius: 'var(--lufa-token-radius-lg)',
                  border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                  padding: 'var(--lufa-token-spacing-base)',
                  minHeight: 'var(--lufa-token-size-4xl)', // Add minimum height to show vertical spacing
                }}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <Placeholder
                    key={index}
                    color={'var(--lufa-token-color-success-default)'}
                    height="small"
                    width="auto"
                  >
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
          borderRadius: 'var(--lufa-token-radius-lg)',
          backgroundColor: 'var(--lufa-token-color-interactive-default)',
          color: 'var(--lufa-token-color-text-inverse)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          fontWeight: 'var(--lufa-token-font-weight-bold)',
          fontSize: 'var(--lufa-token-font-size-xs)',
        }}
      >
        {label}
      </div>
    );

    return (
      <Container size="full" paddingX="none">
        <div style={{ width: 'var(--lufa-token-max-width-full)', overflowX: 'auto' }}>
          <div
            style={{
              minWidth: 'var(--lufa-token-max-width-8xl)',
              display: 'grid',
              gridTemplateColumns: `${'var(--lufa-token-spacing-5xl)'} repeat(${justifies.length}, ${'var(--lufa-token-dimension-sidebar-width-wide)'})`,
              gap: 'var(--lufa-token-spacing-md)',
              alignItems: 'stretch',
            }}
          >
            <div />
            {justifies.map((justify) => (
              <div
                key={`header-${justify}`}
                style={{
                  fontFamily: 'monospace',
                  fontSize: 'var(--lufa-token-font-size-xs)',
                  color: 'var(--lufa-token-color-text-secondary)',
                  textAlign: 'center',
                  padding: `${'var(--lufa-token-spacing-2xs)'} ${'var(--lufa-token-spacing-sm)'}`,
                  backgroundColor: 'var(--lufa-token-color-background-primary)',
                  border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                  borderRadius: 'var(--lufa-token-radius-lg)',
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
                    fontSize: 'var(--lufa-token-font-size-xs)',
                    color: 'var(--lufa-token-color-text-secondary)',
                    padding: `${'var(--lufa-token-spacing-2xs)'} ${'var(--lufa-token-spacing-sm)'}`,
                    backgroundColor: 'var(--lufa-token-color-background-primary)',
                    border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                    borderRadius: 'var(--lufa-token-radius-lg)',
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
                      backgroundColor: 'var(--lufa-token-color-background-primary)',
                      border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                      borderRadius: 'var(--lufa-token-radius-lg)',
                      padding: 'var(--lufa-token-spacing-base)',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ position: 'relative', height: 'var(--lufa-token-size-4xl)' }}>
                      {/* Guides */}
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          left: 'var(--lufa-token-spacing-md)',
                          right: 'var(--lufa-token-spacing-md)',
                          top: '50%',
                          height: 'var(--lufa-token-border-width-hairline)',
                          backgroundColor: 'var(--lufa-token-color-border-light)',
                          pointerEvents: 'none',
                        }}
                      />
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          top: 'var(--lufa-token-spacing-md)',
                          bottom: 'var(--lufa-token-spacing-md)',
                          left: '50%',
                          width: 'var(--lufa-token-border-width-hairline)',
                          backgroundColor: 'var(--lufa-token-color-border-light)',
                          pointerEvents: 'none',
                        }}
                      />
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          top: 'var(--lufa-token-spacing-md)',
                          bottom: 'var(--lufa-token-spacing-md)',
                          left: 'var(--lufa-token-spacing-md)',
                          width: 'var(--lufa-token-border-width-hairline)',
                          backgroundColor: 'var(--lufa-token-color-border-light)',
                          pointerEvents: 'none',
                        }}
                      />
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          top: 'var(--lufa-token-spacing-md)',
                          bottom: 'var(--lufa-token-spacing-md)',
                          right: 'var(--lufa-token-spacing-md)',
                          width: 'var(--lufa-token-border-width-hairline)',
                          backgroundColor: 'var(--lufa-token-color-border-light)',
                          pointerEvents: 'none',
                        }}
                      />

                      <Flex
                        align={align}
                        justify={justify}
                        gap={SPACE_SIZE.none}
                        style={{
                          height: 'var(--lufa-token-max-width-full)',
                          padding: 'var(--lufa-token-spacing-md)',
                        }}
                      >
                        <Box label="A" width={'var(--lufa-token-size-lg)'} height={'var(--lufa-token-size-md)'} />
                        <Box label="B" width={'var(--lufa-token-size-xl)'} height={'var(--lufa-token-size-xl)'} />
                        <Box
                          label="C"
                          width={'var(--lufa-token-size-lg)'}
                          height={'var(--lufa-token-spacing-xl-2xl)'}
                        />
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
        {([SPACE_SIZE.none, SPACE_SIZE.sm, SPACE_SIZE.md, SPACE_SIZE.lg, SPACE_SIZE.xl] as const).map((gap) => (
          <div
            key={gap}
            style={{
              backgroundColor: 'var(--lufa-token-color-background-secondary)',
              borderRadius: 'var(--lufa-token-radius-lg)',
              padding: 'var(--lufa-token-spacing-base)',
              overflow: 'auto',
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                color: 'var(--lufa-token-color-text-secondary)',
                marginBottom: 'var(--lufa-token-spacing-md)',
              }}
            >
              gap: {gap}
            </div>
            <Flex
              wrap={FLEX_WRAP.wrap}
              gap={gap}
              style={{
                backgroundColor: 'var(--lufa-token-color-background-primary)',
                borderRadius: 'var(--lufa-token-radius-lg)',
                padding: 'var(--lufa-token-spacing-base)',
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
        {([FLEX_WRAP.nowrap, FLEX_WRAP.wrap] as const).map((wrap) => (
          <div
            key={wrap}
            style={{
              backgroundColor: 'var(--lufa-token-color-background-secondary)',
              borderRadius: 'var(--lufa-token-radius-lg)',
              padding: 'var(--lufa-token-spacing-base)',
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                color: 'var(--lufa-token-color-text-secondary)',
                marginBottom: 'var(--lufa-token-spacing-md)',
              }}
            >
              wrap: {wrap}
            </div>
            <Flex
              wrap={wrap}
              gap="md"
              style={{
                backgroundColor: 'var(--lufa-token-color-background-primary)',
                borderRadius: 'var(--lufa-token-radius-lg)',
                padding: 'var(--lufa-token-spacing-base)',
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
