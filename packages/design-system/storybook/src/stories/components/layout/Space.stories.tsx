import type { Meta, StoryObj } from '@storybook/react-vite';

import { Container, Placeholder, Space, SPACE_DIRECTION, SPACE_SIZE, Stack } from '@grasdouble/lufa_design-system';

const meta = {
  title: '2. Layout/Space',
  component: Space,
  tags: [],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A simple spacer element for adding fixed vertical or horizontal space using spacing tokens.',
      },
    },
  },
  argTypes: {
    as: { control: 'select', options: ['div', 'span'], table: { defaultValue: { summary: 'div' } } },
    direction: {
      control: 'inline-radio',
      options: Object.values(SPACE_DIRECTION),
      table: { defaultValue: { summary: 'vertical' } },
    },
    size: { control: 'select', options: Object.values(SPACE_SIZE), table: { defaultValue: { summary: 'md' } } },
  },
} satisfies Meta<typeof Space>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoLabel = ({ label, value }: { label: string; value?: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--lufa-token-spacing-md)',
      marginBottom: 'var(--lufa-token-spacing-md)',
    }}
  >
    <div style={{ fontFamily: 'monospace', color: 'var(--lufa-token-color-text-secondary)' }}>{label}</div>
    {value && (
      <div
        style={{
          fontFamily: 'monospace',
          color: 'var(--lufa-token-color-text-tertiary)',
          fontSize: 'var(--lufa-token-font-size-xs)',
        }}
      >
        {value}
      </div>
    )}
  </div>
);

export const Playground: Story = {
  args: {
    direction: SPACE_DIRECTION.vertical,
    size: SPACE_SIZE.lg,
    as: 'div',
  },
  render: (args) => (
    <Container size="md" paddingX="none">
      <div
        style={{
          backgroundColor: 'var(--lufa-token-color-background-secondary)',
          borderRadius: 'var(--lufa-token-radius-lg)',
          padding: 'var(--lufa-token-spacing-base)',
        }}
      >
        <DemoLabel label={`direction: ${args.direction}, size: ${String(args.size)}`} />
        {args.direction === SPACE_DIRECTION.horizontal ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Placeholder color={'var(--lufa-token-color-interactive-default)'} height="small" width="auto">
              Before
            </Placeholder>
            <Space
              {...args}
              as="span"
              style={{
                ...args.style,
                height: 'var(--lufa-token-size-md)',
                backgroundColor: 'var(--lufa-token-color-brand-secondary)',
                outline: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-medium)'}`,
              }}
            />
            <Placeholder color={'var(--lufa-token-color-interactive-default)'} height="small" width="auto">
              After
            </Placeholder>
          </div>
        ) : (
          <>
            <Placeholder color={'var(--lufa-token-color-interactive-default)'} height="small" width="full">
              Before
            </Placeholder>
            <Space
              {...args}
              as="div"
              style={{
                ...args.style,
                height: 'var(--lufa-token-size-md)',
                backgroundColor: 'var(--lufa-token-color-brand-secondary)',
                outline: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-medium)'}`,
              }}
            />
            <Placeholder color={'var(--lufa-token-color-interactive-default)'} height="small" width="full">
              After
            </Placeholder>
          </>
        )}
      </div>
    </Container>
  ),
};

export const VerticalSizes: Story = {
  render: () => {
    const sizes = [
      SPACE_SIZE.none,
      SPACE_SIZE.xxs,
      SPACE_SIZE.xs,
      SPACE_SIZE.sm,
      SPACE_SIZE.md,
      SPACE_SIZE.base,
      SPACE_SIZE.lg,
      SPACE_SIZE.xl,
      SPACE_SIZE['2xl'],
    ] as const;

    return (
      <Container size="md" paddingX="none">
        <Stack direction="vertical" gap="normal">
          {sizes.map((size) => (
            <div
              key={size}
              style={{
                backgroundColor: 'var(--lufa-token-color-background-tertiary)',
                outline: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-medium)'}`,
                padding: 'var(--lufa-token-spacing-base)',
              }}
            >
              <DemoLabel label={`size: ${size}`} />
              <Placeholder color={'var(--lufa-token-color-interactive-default)'} height="small" width="full">
                A
              </Placeholder>
              <Space
                direction={SPACE_DIRECTION.vertical}
                size={size}
                style={{
                  backgroundColor: 'var(--lufa-token-color-brand-secondary)',
                  outline: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-medium)'}`,
                }}
              />
              <Placeholder color={'var(--lufa-token-color-interactive-default)'} height="small" width="full">
                B
              </Placeholder>
            </div>
          ))}
        </Stack>
      </Container>
    );
  },
};

export const HorizontalSizes: Story = {
  render: () => (
    <Container size="md" paddingX="none">
      <Stack direction="vertical" gap="normal">
        {(
          [
            SPACE_SIZE.none,
            SPACE_SIZE.xxs,
            SPACE_SIZE.xs,
            SPACE_SIZE.sm,
            SPACE_SIZE.md,
            SPACE_SIZE.base,
            SPACE_SIZE.lg,
            SPACE_SIZE.xl,
            SPACE_SIZE['2xl'],
          ] as const
        ).map((size) => (
          <div
            key={size}
            style={{
              backgroundColor: 'var(--lufa-token-color-background-tertiary)',
              outline: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-medium)'}`,
              padding: 'var(--lufa-token-spacing-base)',
            }}
          >
            <DemoLabel label={`size: ${size}`} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Placeholder color={'var(--lufa-token-color-interactive-default)'} height="small" width="auto">
                A
              </Placeholder>
              <Space
                as="span"
                direction={SPACE_DIRECTION.horizontal}
                size={size}
                style={{
                  height: 'var(--lufa-token-size-md)',
                  backgroundColor: 'var(--lufa-token-color-brand-secondary)',
                  outline: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-medium)'}`,
                }}
              />
              <Placeholder color={'var(--lufa-token-color-interactive-default)'} height="small" width="auto">
                B
              </Placeholder>
            </div>
          </div>
        ))}
      </Stack>
    </Container>
  ),
};

export const CustomSizes: Story = {
  render: () => (
    <Container size="md" paddingX="none">
      <Stack direction="vertical" gap="normal">
        {(
          [
            { label: 'size: 12 (px)', size: 12 },
            { label: 'size: "2rem"', size: '2rem' },
            { label: 'size: "clamp(8px, 2vw, 24px)"', size: 'clamp(8px, 2vw, 24px)' },
          ] as const
        ).map((item) => (
          <div
            key={item.label}
            style={{
              backgroundColor: 'var(--lufa-token-color-background-tertiary)',
              outline: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-medium)'}`,
              padding: 'var(--lufa-token-spacing-base)',
            }}
          >
            <DemoLabel label={item.label} />
            <Placeholder color={'var(--lufa-token-color-interactive-default)'} height="small" width="full">
              A
            </Placeholder>
            <Space
              direction={SPACE_DIRECTION.vertical}
              size={item.size}
              style={{
                backgroundColor: 'var(--lufa-token-color-brand-secondary)',
                outline: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-medium)'}`,
              }}
            />
            <Placeholder color={'var(--lufa-token-color-interactive-default)'} height="small" width="full">
              B
            </Placeholder>
          </div>
        ))}
      </Stack>
    </Container>
  ),
};
