import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Button,
  Card,
  Center,
  Container,
  Placeholder,
  Spinner,
  Stack,
  Typography,
} from '@grasdouble/lufa_design-system';

const meta = {
  title: '2. Layout/Center',
  component: Center,
  tags: [],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Centers content horizontally/vertically using flex.',
      },
    },
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'span', 'section', 'main', 'article'],
      table: { defaultValue: { summary: 'div' } },
    },
    axis: {
      control: 'inline-radio',
      options: ['both', 'horizontal', 'vertical'],
      table: { defaultValue: { summary: 'both' } },
    },
    inline: { control: 'boolean', table: { defaultValue: { summary: false } } },
    minHeight: { control: 'number', description: 'CSS length or number (px)' },
    children: { control: false },
  },
} satisfies Meta<typeof Center>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    axis: 'both',
    inline: false,
    minHeight: 180,
  },
  render: (args) => (
    <Container size="md" paddingX="none">
      <Center
        {...args}
        style={{
          ...args.style,
          backgroundColor: 'var(--lufa-token-color-background-secondary)',
          borderRadius: 'var(--lufa-token-radius-lg)',
          border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
          padding: 'var(--lufa-token-spacing-base)',
        }}
      >
        <Placeholder height="medium" width="auto">
          ...
        </Placeholder>
      </Center>
    </Container>
  ),
};

export const Axis: Story = {
  render: () => (
    <Container size="xl" paddingX="none">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 'var(--lufa-token-spacing-base)',
        }}
      >
        {(['both', 'horizontal', 'vertical'] as const).map((axis) => (
          <div
            key={axis}
            style={{
              backgroundColor: 'var(--lufa-token-color-background-secondary)',
              borderRadius: 'var(--lufa-token-radius-lg)',
              padding: 'var(--lufa-token-spacing-base)',
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',

                marginBottom: 'var(--lufa-token-spacing-sm)',
              }}
            >
              axis: {axis}
            </div>
            <div
              style={{
                fontSize: 'var(--lufa-token-font-size-xs)',
                marginBottom: 'var(--lufa-token-spacing-md)',
              }}
            >
              {axis === 'horizontal' && 'Center on X only'}
              {axis === 'vertical' && 'Center on Y only'}
              {axis === 'both' && 'Center on X and Y'}
            </div>
            <Center
              axis={axis}
              minHeight="var(--lufa-token-size-4xl)"
              style={{
                backgroundColor: 'var(--lufa-token-color-background-primary)',
                borderRadius: 'var(--lufa-token-radius-lg)',
                border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                padding: 'var(--lufa-token-spacing-base)',
                position: 'relative',
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 'var(--lufa-token-spacing-base)',
                  border: `${'var(--lufa-token-border-width-thin)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-default)'}`,
                  borderRadius: 'var(--lufa-token-radius-lg)',
                  pointerEvents: 'none',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 'var(--lufa-token-spacing-base)',
                  right: 'var(--lufa-token-spacing-base)',
                  height: 'var(--lufa-token-border-width-hairline)',
                  backgroundColor: 'var(--lufa-token-color-border-light)',
                  pointerEvents: 'none',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 'var(--lufa-token-spacing-base)',
                  bottom: 'var(--lufa-token-spacing-base)',
                  width: 'var(--lufa-token-border-width-hairline)',
                  backgroundColor: 'var(--lufa-token-color-border-light)',
                  pointerEvents: 'none',
                }}
              />
              <Placeholder height="small" width="small">
                Target
              </Placeholder>
            </Center>
          </div>
        ))}
      </div>
    </Container>
  ),
};

export const Inline: Story = {
  render: () => (
    <Stack direction="vertical" gap="normal">
      <div>
        <div
          style={{
            fontFamily: 'monospace',
            color: 'var(--lufa-token-color-text-secondary)',
            marginBottom: 'var(--lufa-token-spacing-sm)',
          }}
        >
          inline: true
        </div>
        <div
          style={{
            backgroundColor: 'var(--lufa-token-color-background-secondary)',
            padding: 'var(--lufa-token-spacing-base)',
            borderRadius: 'var(--lufa-token-radius-lg)',
          }}
        >
          <span style={{ color: 'var(--lufa-token-color-text-secondary)' }}>Text before</span>
          <Center
            inline
            axis="both"
            style={{
              backgroundColor: 'var(--lufa-token-color-background-primary)',
              borderRadius: 'var(--lufa-token-radius-lg)',
              padding: `${'var(--lufa-token-spacing-sm)'} ${'var(--lufa-token-spacing-md)'}`,
              border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
              margin: `0 ${'var(--lufa-token-spacing-md)'}`,
            }}
          >
            <Placeholder height="small" width="auto">
              Badge
            </Placeholder>
          </Center>
          <span style={{ color: 'var(--lufa-token-color-text-secondary)' }}>Text after (same line)</span>
        </div>
      </div>

      <div>
        <div
          style={{
            fontFamily: 'monospace',
            color: 'var(--lufa-token-color-text-secondary)',
            marginBottom: 'var(--lufa-token-spacing-sm)',
          }}
        >
          inline: false
        </div>
        <div
          style={{
            backgroundColor: 'var(--lufa-token-color-background-secondary)',
            padding: 'var(--lufa-token-spacing-base)',
            borderRadius: 'var(--lufa-token-radius-lg)',
          }}
        >
          <span style={{ color: 'var(--lufa-token-color-text-secondary)' }}>Text before</span>
          <Center
            inline={false}
            axis="both"
            style={{
              backgroundColor: 'var(--lufa-token-color-background-primary)',
              borderRadius: 'var(--lufa-token-radius-lg)',
              padding: 'var(--lufa-token-spacing-base)',
              border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
              margin: `${'var(--lufa-token-spacing-md)'} 0`,
            }}
          >
            <Placeholder height="small" width="auto">
              Block
            </Placeholder>
          </Center>
          <span style={{ color: 'var(--lufa-token-color-text-secondary)' }}>Text after (next line)</span>
        </div>
      </div>
    </Stack>
  ),
};

export const Examples: Story = {
  render: () => (
    <Container size="xl" paddingX="none">
      <Stack direction="vertical" gap="spacious">
        <div>
          <div
            style={{
              fontFamily: 'monospace',
              color: 'var(--lufa-token-color-text-secondary)',
              marginBottom: 'var(--lufa-token-spacing-md)',
            }}
          >
            Empty state
          </div>
          <Card variant="outlined" padding="large" title="Search results" subtitle="Try adjusting your filters">
            <Center
              axis="both"
              minHeight="var(--lufa-token-size-4xl)"
              style={{
                backgroundColor: 'var(--lufa-token-color-background-secondary)',
                borderRadius: 'var(--lufa-token-radius-lg)',
              }}
            >
              <Stack direction="vertical" gap="normal" align="center">
                <Placeholder height="small" width="auto">
                  Icon
                </Placeholder>
                <Typography variant="body" color="secondary">
                  No result
                </Typography>
                <Button variant="solid">Retry</Button>
              </Stack>
            </Center>
          </Card>
        </div>

        <div>
          <div
            style={{
              fontFamily: 'monospace',
              color: 'var(--lufa-token-color-text-secondary)',
              marginBottom: 'var(--lufa-token-spacing-md)',
            }}
          >
            Loading
          </div>
          <div
            style={{
              backgroundColor: 'var(--lufa-token-color-background-secondary)',
              borderRadius: 'var(--lufa-token-radius-lg)',
              padding: 'var(--lufa-token-spacing-base)',
            }}
          >
            <Center
              axis="both"
              minHeight="var(--lufa-token-max-width-3xs)"
              style={{
                backgroundColor: 'var(--lufa-token-color-background-primary)',
                borderRadius: 'var(--lufa-token-radius-lg)',
                border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
              }}
            >
              <Stack direction="vertical" gap="normal" align="center">
                <Spinner size="md" />
                <Typography variant="bodySmall" color="secondary">
                  Chargement…
                </Typography>
              </Stack>
            </Center>
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: 'monospace',
              color: 'var(--lufa-token-color-text-secondary)',
              marginBottom: 'var(--lufa-token-spacing-md)',
            }}
          >
            Footer CTA
          </div>
          <Card
            variant="outlined"
            title="Newsletter"
            subtitle="Recevez les nouveautés"
            footer={
              <Center axis="horizontal">
                <Button variant="solid">S’inscrire</Button>
              </Center>
            }
          >
            <Typography variant="body" color="secondary">
              Un exemple concret: un CTA centré dans le footer.
            </Typography>
          </Card>
        </div>
      </Stack>
    </Container>
  ),
};
