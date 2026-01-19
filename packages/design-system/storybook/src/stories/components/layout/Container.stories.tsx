import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Container, Placeholder, Stack } from '@grasdouble/lufa_design-system';

const meta = {
  title: '2. Layout/Container',
  component: Container,
  tags: [],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A page-level layout container with token-based max widths, alignment, and optional padding.',
      },
    },
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'main', 'section', 'article', 'header', 'footer', 'aside', 'nav'],
      table: { defaultValue: { summary: 'div' } },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full', 'fluid'],
      table: { defaultValue: { summary: 'xl' } },
    },
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
      table: { defaultValue: { summary: 'center' } },
    },
    paddingX: {
      control: 'select',
      options: ['none', 'xxs', 'xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl'],
      table: { defaultValue: { summary: 'base' } },
    },
    paddingY: {
      control: 'select',
      options: ['none', 'xxs', 'xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl'],
      table: { defaultValue: { summary: 'none' } },
    },
    children: { control: false },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    as: 'section',
    size: 'md',
    align: 'center',
    paddingX: 'base',
    paddingY: 'lg',
    children: (
      <Stack direction="vertical" gap="normal">
        <Placeholder color="var(--lufa-token-color-interactive-default)" height="small">
          Header
        </Placeholder>
        <Placeholder color="var(--lufa-token-color-background-secondary)" height="large">
          Content
        </Placeholder>
      </Stack>
    ),
  },
  render: (args) => (
    <div
      style={{
        width: 'var(--lufa-token-max-width-full)',
        backgroundColor: 'var(--lufa-token-color-background-secondary)',
        padding: 'var(--lufa-token-spacing-lg)',
      }}
    >
      <Container
        {...args}
        style={{
          ...args.style,
          backgroundColor: 'var(--lufa-token-color-background-primary)',
          border: `${'var(--lufa-token-border-width-thin)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-default)'}`,
          borderRadius: 'var(--lufa-token-radius-lg)',
        }}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        width: 'var(--lufa-token-max-width-full)',
        backgroundColor: 'var(--lufa-token-color-background-secondary)',
        padding: 'var(--lufa-token-spacing-lg)',
      }}
    >
      <Stack direction="vertical" gap="spacious">
        {(['xs', 'sm', 'md', 'lg', 'xl', 'full', 'fluid'] as const).map((size) => (
          <Container
            key={size}
            size={size}
            paddingX="base"
            paddingY="md"
            style={{
              backgroundColor: 'var(--lufa-token-color-background-primary)',
              border: `${'var(--lufa-token-border-width-thin)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-default)'}`,
              borderRadius: 'var(--lufa-token-radius-lg)',
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                color: 'var(--lufa-token-color-text-secondary)',
                marginBottom: 'var(--lufa-token-spacing-md)',
              }}
            >
              size: {size}
            </div>
            <Placeholder color="var(--lufa-token-color-interactive-default)" height="small">
              Content
            </Placeholder>
          </Container>
        ))}
      </Stack>
    </div>
  ),
};

export const Align: Story = {
  render: () => (
    <div
      style={{
        width: 'var(--lufa-token-max-width-full)',
        backgroundColor: 'var(--lufa-token-color-background-secondary)',
        padding: 'var(--lufa-token-spacing-lg)',
      }}
    >
      <Stack direction="vertical" gap="spacious">
        {(['start', 'center', 'end'] as const).map((align) => (
          <div key={align}>
            <div
              style={{
                fontFamily: 'monospace',
                color: 'var(--lufa-token-color-text-secondary)',
                marginBottom: 'var(--lufa-token-spacing-md)',
              }}
            >
              align: {align}
            </div>
            <Container
              size="md"
              align={align}
              paddingX="base"
              paddingY="md"
              style={{
                backgroundColor: 'var(--lufa-token-color-background-primary)',
                border: `${'var(--lufa-token-border-width-thin)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-default)'}`,
                borderRadius: 'var(--lufa-token-radius-lg)',
              }}
            >
              <Placeholder color="var(--lufa-token-color-interactive-default)" height="small">
                Content
              </Placeholder>
            </Container>
          </div>
        ))}
      </Stack>
    </div>
  ),
};

export const Padding: Story = {
  render: () => {
    const values = ['none', 'sm', 'base', 'lg', '3xl'] as const;

    return (
      <div
        style={{
          width: 'var(--lufa-token-max-width-full)',
          backgroundColor: 'var(--lufa-token-color-background-secondary)',
          padding: 'var(--lufa-token-spacing-lg)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `${'var(--lufa-token-spacing-5xl)'} repeat(${values.length}, minmax(0, 1fr))`,
            gap: 'var(--lufa-token-spacing-md)',
            alignItems: 'stretch',
          }}
        >
          <div />
          {values.map((paddingX) => (
            <div
              key={`header-x-${paddingX}`}
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
              paddingX: {paddingX}
            </div>
          ))}

          {values.map((paddingY) => (
            <Fragment key={`row-${paddingY}`}>
              <div
                key={`header-y-${paddingY}`}
                style={{
                  fontFamily: 'monospace',
                  fontSize: 'var(--lufa-token-font-size-xs)',
                  color: 'var(--lufa-token-color-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: `${'var(--lufa-token-spacing-2xs)'} ${'var(--lufa-token-spacing-sm)'}`,
                  backgroundColor: 'var(--lufa-token-color-background-primary)',
                  border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                  borderRadius: 'var(--lufa-token-radius-lg)',
                }}
              >
                paddingY: {paddingY}
              </div>

              {values.map((paddingX) => (
                <Container
                  key={`cell-${paddingY}-${paddingX}`}
                  size="full"
                  align="start"
                  paddingX={paddingX}
                  paddingY={paddingY}
                  style={{
                    minHeight: 'var(--lufa-token-spacing-5xl)',
                    backgroundColor: 'var(--lufa-token-color-background-primary)',
                    border: `${'var(--lufa-token-border-width-thin)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-default)'}`,
                    borderRadius: 'var(--lufa-token-radius-lg)',
                  }}
                >
                  <div
                    style={{
                      width: 'var(--lufa-token-max-width-full)',
                      height: 'var(--lufa-token-max-width-full)',
                      minHeight: 'var(--lufa-token-spacing-4xl)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        width: 'var(--lufa-token-max-width-full)',
                        height: 'var(--lufa-token-spacing-xl-2xl)',
                        backgroundColor: 'var(--lufa-token-color-interactive-default)',
                        borderRadius: 'var(--lufa-token-radius-lg)',
                        outline: `${'var(--lufa-token-border-width-thin)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--lufa-token-color-text-inverse)',
                        fontWeight: 'var(--lufa-token-font-weight-semibold)',
                        fontSize: 'var(--lufa-token-font-size-xs)',
                      }}
                    >
                      Top
                    </div>
                    <div
                      style={{
                        width: 'var(--lufa-token-max-width-full)',
                        height: 'var(--lufa-token-spacing-xl-2xl)',
                        backgroundColor: 'var(--lufa-token-color-interactive-default)',
                        borderRadius: 'var(--lufa-token-radius-lg)',
                        outline: `${'var(--lufa-token-border-width-thin)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--lufa-token-color-text-inverse)',
                        fontWeight: 'var(--lufa-token-font-weight-semibold)',
                        fontSize: 'var(--lufa-token-font-size-xs)',
                      }}
                    >
                      Bottom
                    </div>
                  </div>
                </Container>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    );
  },
};

export const As: Story = {
  render: () => (
    <div
      style={{
        width: 'var(--lufa-token-max-width-full)',
        backgroundColor: 'var(--lufa-token-color-background-secondary)',
        padding: 'var(--lufa-token-spacing-lg)',
      }}
    >
      <Container
        as="div"
        size="xl"
        align="center"
        paddingX="none"
        paddingY="none"
        style={{
          border: `${'var(--lufa-token-border-width-thin)'} ${'var(--lufa-token-border-style-dashed)'} ${'var(--lufa-token-color-border-default)'}`,
          borderRadius: 'var(--lufa-token-radius-xl)',
          overflow: 'hidden',
        }}
      >
        <Container
          as="header"
          size="fluid"
          align="start"
          paddingX="base"
          paddingY="lg"
          style={{ backgroundColor: 'var(--lufa-token-color-background-primary)' }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              color: 'var(--lufa-token-color-text-secondary)',
              marginBottom: 'var(--lufa-token-spacing-sm)',
            }}
          >
            {'<header>'}
          </div>
          <Placeholder color="var(--lufa-token-color-interactive-default)" height="small">
            Site header
          </Placeholder>
        </Container>

        <Container
          as="nav"
          size="fluid"
          align="start"
          paddingX="base"
          paddingY="md"
          style={{
            backgroundColor: 'var(--lufa-token-color-background-primary)',
            borderTop: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
            borderBottom: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              color: 'var(--lufa-token-color-text-secondary)',
              marginBottom: 'var(--lufa-token-spacing-sm)',
            }}
          >
            {'<nav>'}
          </div>
          <div style={{ display: 'flex', gap: 'var(--lufa-token-spacing-sm)', flexWrap: 'wrap' }}>
            <Placeholder color="var(--lufa-token-color-background-secondary)" height="small">
              Home
            </Placeholder>
            <Placeholder color="var(--lufa-token-color-background-secondary)" height="small">
              Blog
            </Placeholder>
            <Placeholder color="var(--lufa-token-color-background-secondary)" height="small">
              About
            </Placeholder>
          </div>
        </Container>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `minmax(0, 1fr) ${'var(--lufa-token-dimension-sidebar-width-wide)'}`,
          }}
        >
          <Container
            as="main"
            size="fluid"
            align="start"
            paddingX="base"
            paddingY="lg"
            style={{ backgroundColor: 'var(--lufa-token-color-background-primary)' }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                color: 'var(--lufa-token-color-text-secondary)',
                marginBottom: 'var(--lufa-token-spacing-md)',
              }}
            >
              {'<main>'}
            </div>
            <Stack direction="vertical" gap="spacious">
              <Container
                as="section"
                size="fluid"
                align="start"
                paddingX="base"
                paddingY="md"
                style={{
                  backgroundColor: 'var(--lufa-token-color-background-secondary)',
                  border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                  borderRadius: 'var(--lufa-token-radius-lg)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'monospace',
                    color: 'var(--lufa-token-color-text-secondary)',
                    marginBottom: 'var(--lufa-token-spacing-sm)',
                  }}
                >
                  {'<section>'}
                </div>
                <Placeholder color="var(--lufa-token-color-interactive-default)" height="small">
                  Section content
                </Placeholder>
              </Container>

              <Container
                as="article"
                size="fluid"
                align="start"
                paddingX="base"
                paddingY="md"
                style={{
                  backgroundColor: 'var(--lufa-token-color-background-secondary)',
                  border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                  borderRadius: 'var(--lufa-token-radius-lg)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'monospace',
                    color: 'var(--lufa-token-color-text-secondary)',
                    marginBottom: 'var(--lufa-token-spacing-sm)',
                  }}
                >
                  {'<article>'}
                </div>
                <Stack direction="vertical" gap="normal">
                  <Placeholder color="var(--lufa-token-color-interactive-default)" height="small">
                    Article title
                  </Placeholder>
                  <Placeholder color="var(--lufa-token-color-background-tertiary)" height="medium">
                    Article body
                  </Placeholder>
                </Stack>
              </Container>
            </Stack>
          </Container>

          <Container
            as="aside"
            size="fluid"
            align="start"
            paddingX="base"
            paddingY="lg"
            style={{
              backgroundColor: 'var(--lufa-token-color-background-secondary)',
              borderLeft: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                color: 'var(--lufa-token-color-text-secondary)',
                marginBottom: 'var(--lufa-token-spacing-md)',
              }}
            >
              {'<aside>'}
            </div>
            <Stack direction="vertical" gap="normal">
              <Placeholder color="var(--lufa-token-color-background-primary)" height="small">
                Related
              </Placeholder>
              <Placeholder color="var(--lufa-token-color-background-primary)" height="small">
                Newsletter
              </Placeholder>
            </Stack>
          </Container>
        </div>

        <Container
          as="footer"
          size="fluid"
          align="start"
          paddingX="base"
          paddingY="lg"
          style={{
            backgroundColor: 'var(--lufa-token-color-background-primary)',
            borderTop: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              color: 'var(--lufa-token-color-text-secondary)',
              marginBottom: 'var(--lufa-token-spacing-sm)',
            }}
          >
            {'<footer>'}
          </div>
          <Placeholder color="var(--lufa-token-color-background-secondary)" height="small">
            Footer content
          </Placeholder>
        </Container>
      </Container>
    </div>
  ),
};
