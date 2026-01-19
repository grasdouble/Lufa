import type { Meta, StoryObj } from '@storybook/react-vite';

import { ASPECT_RATIO, AspectRatio, Container, Placeholder, Stack } from '@grasdouble/lufa_design-system';

const meta = {
  title: '2. Layout/AspectRatio',
  component: AspectRatio,
  tags: [],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Media container that preserves aspect ratio (token presets or custom ratios).',
      },
    },
  },
  argTypes: {
    as: { control: 'select', options: ['div', 'figure'], table: { defaultValue: { summary: 'div' } } },
    ratio: {
      control: 'select',
      options: Object.values(ASPECT_RATIO),
      table: { defaultValue: { summary: 'video' } },
    },
    children: { control: false },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ratio: ASPECT_RATIO.video,
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
        <div
          style={{
            fontFamily: 'monospace',
            color: 'var(--lufa-token-color-text-secondary)',
            marginBottom: 'var(--lufa-token-spacing-md)',
          }}
        >
          ratio: {String(args.ratio)}
        </div>
        <AspectRatio
          {...args}
          style={{
            ...args.style,
            borderRadius: 'var(--lufa-token-radius-lg)',
            outline:
              'var(--lufa-token-border-width-hairline) var(--lufa-token-border-style-solid) var(--lufa-token-color-border-light)',
            backgroundColor: 'var(--lufa-token-color-background-primary)',
          }}
        >
          <Placeholder color="var(--lufa-token-color-interactive-default)" height="full" width="full">
            Media
          </Placeholder>
        </AspectRatio>
      </div>
    </Container>
  ),
};

export const Ratio: Story = {
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
            landscape & square
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 'var(--lufa-token-spacing-base)',
            }}
          >
            {(
              [
                ASPECT_RATIO.square,
                ASPECT_RATIO.traditional,
                ASPECT_RATIO.photo,
                ASPECT_RATIO.video,
                ASPECT_RATIO.ultrawide,
              ] as const
            ).map((ratio) => (
              <div
                key={ratio}
                style={{
                  backgroundColor: 'var(--lufa-token-color-background-secondary)',
                  borderRadius: 'var(--lufa-token-radius-lg)',
                  padding: 'var(--lufa-token-spacing-base)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--lufa-token-spacing-md)',
                  }}
                >
                  <div style={{ fontFamily: 'monospace', color: 'var(--lufa-token-color-text-secondary)' }}>
                    ratio: {ratio}
                  </div>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      color: 'var(--lufa-token-color-text-tertiary)',
                      fontSize: 'var(--lufa-token-font-size-xs)',
                    }}
                  >
                    {ratio}
                  </div>
                </div>
                <AspectRatio
                  ratio={ratio}
                  style={{
                    borderRadius: 'var(--lufa-token-radius-lg)',
                    outline: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                    backgroundColor: 'var(--lufa-token-color-background-primary)',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `linear-gradient(135deg, ${'var(--lufa-token-color-interactive-default)'} 0%, ${'var(--lufa-token-color-brand-secondary)'} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--lufa-token-color-text-inverse)',
                      fontFamily: 'monospace',
                      fontSize: 'var(--lufa-token-font-size-xs)',
                      fontWeight: 'var(--lufa-token-font-weight-bold)',
                    }}
                  >
                    {ratio}
                  </div>
                </AspectRatio>
              </div>
            ))}
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
            portrait
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 'var(--lufa-token-spacing-base)',
            }}
          >
            {([ASPECT_RATIO.vertical, ASPECT_RATIO.portrait, ASPECT_RATIO.portraitDisplay] as const).map((ratio) => (
              <div
                key={ratio}
                style={{
                  backgroundColor: 'var(--lufa-token-color-background-secondary)',
                  borderRadius: 'var(--lufa-token-radius-lg)',
                  padding: 'var(--lufa-token-spacing-base)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--lufa-token-spacing-md)',
                  }}
                >
                  <div style={{ fontFamily: 'monospace', color: 'var(--lufa-token-color-text-secondary)' }}>
                    ratio: {ratio}
                  </div>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      color: 'var(--lufa-token-color-text-tertiary)',
                      fontSize: 'var(--lufa-token-font-size-xs)',
                    }}
                  >
                    {ratio}
                  </div>
                </div>
                <AspectRatio
                  ratio={ratio}
                  style={{
                    borderRadius: 'var(--lufa-token-radius-lg)',
                    outline: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                    backgroundColor: 'var(--lufa-token-color-background-primary)',
                    maxWidth: 'var(--lufa-token-max-width-3xs)',
                    margin: `${'var(--lufa-token-spacing-none)'} auto`,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `linear-gradient(135deg, ${'var(--lufa-token-color-interactive-default)'} 0%, ${'var(--lufa-token-color-brand-secondary)'} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--lufa-token-color-text-inverse)',
                      fontFamily: 'monospace',
                      fontSize: 'var(--lufa-token-font-size-xs)',
                      fontWeight: 'var(--lufa-token-font-weight-bold)',
                    }}
                  >
                    {ratio}
                  </div>
                </AspectRatio>
              </div>
            ))}
          </div>
        </div>
      </Stack>
    </Container>
  ),
};

export const CustomRatios: Story = {
  render: () => (
    <Container size="xl" paddingX="none">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 'var(--lufa-token-spacing-base)',
        }}
      >
        {[
          { label: 'ratio: 1', ratio: 1 },
          { label: 'ratio: 2', ratio: 2 },
          { label: 'ratio: "3 / 2"', ratio: '3 / 2' },
        ].map((item) => (
          <div
            key={item.label}
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
              {item.label}
            </div>
            <AspectRatio
              ratio={item.ratio}
              style={{
                borderRadius: 'var(--lufa-token-radius-lg)',
                outline: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                backgroundColor: 'var(--lufa-token-color-background-primary)',
              }}
            >
              <Placeholder color="var(--lufa-token-color-interactive-default)" height="full" width="full">
                Media
              </Placeholder>
            </AspectRatio>
          </div>
        ))}
      </div>
    </Container>
  ),
};
