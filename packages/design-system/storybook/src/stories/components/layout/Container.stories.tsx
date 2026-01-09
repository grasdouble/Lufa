import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Container, Placeholder, Stack } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

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
        <Placeholder color={tokens.color.interactive.default} height="small">
          Header
        </Placeholder>
        <Placeholder color={tokens.color.background.secondary} height="large">
          Content
        </Placeholder>
      </Stack>
    ),
  },
  render: (args) => (
    <div style={{ width: '100%', backgroundColor: tokens.color.background.secondary, padding: '24px' }}>
      <Container
        {...args}
        style={{
          ...args.style,
          backgroundColor: tokens.color.background.primary,
          border: `2px dashed ${tokens.color.border.default}`,
          borderRadius: '12px',
        }}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ width: '100%', backgroundColor: tokens.color.background.secondary, padding: '24px' }}>
      <Stack direction="vertical" gap="spacious">
        {(['xs', 'sm', 'md', 'lg', 'xl', 'full', 'fluid'] as const).map((size) => (
          <Container
            key={size}
            size={size}
            paddingX="base"
            paddingY="md"
            style={{
              backgroundColor: tokens.color.background.primary,
              border: `2px dashed ${tokens.color.border.default}`,
              borderRadius: '12px',
            }}
          >
            <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '12px' }}>
              size: {size}
            </div>
            <Placeholder color={tokens.color.interactive.default} height="small">
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
    <div style={{ width: '100%', backgroundColor: tokens.color.background.secondary, padding: '24px' }}>
      <Stack direction="vertical" gap="spacious">
        {(['start', 'center', 'end'] as const).map((align) => (
          <div key={align}>
            <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '12px' }}>
              align: {align}
            </div>
            <Container
              size="md"
              align={align}
              paddingX="base"
              paddingY="md"
              style={{
                backgroundColor: tokens.color.background.primary,
                border: `2px dashed ${tokens.color.border.default}`,
                borderRadius: '12px',
              }}
            >
              <Placeholder color={tokens.color.interactive.default} height="small">
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
      <div style={{ width: '100%', backgroundColor: tokens.color.background.secondary, padding: '24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `120px repeat(${values.length}, minmax(0, 1fr))`,
            gap: '12px',
            alignItems: 'stretch',
          }}
        >
          <div />
          {values.map((paddingX) => (
            <div
              key={`header-x-${paddingX}`}
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
              paddingX: {paddingX}
            </div>
          ))}

          {values.map((paddingY) => (
            <Fragment key={`row-${paddingY}`}>
              <div
                key={`header-y-${paddingY}`}
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: tokens.color.text.secondary,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px 8px',
                  backgroundColor: tokens.color.background.primary,
                  border: `1px solid ${tokens.color.border.light}`,
                  borderRadius: '10px',
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
                    minHeight: '140px',
                    backgroundColor: tokens.color.background.primary,
                    border: `2px dashed ${tokens.color.border.default}`,
                    borderRadius: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      minHeight: '96px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '36px',
                        backgroundColor: tokens.color.interactive.default,
                        borderRadius: '10px',
                        outline: `2px solid ${tokens.color.border.light}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: color.text.inverse,
                        fontWeight: 600,
                        fontSize: '12px',
                      }}
                    >
                      Top
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: '36px',
                        backgroundColor: tokens.color.interactive.default,
                        borderRadius: '10px',
                        outline: `2px solid ${tokens.color.border.light}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: tokens.color.text.inverse,
                        fontWeight: 600,
                        fontSize: '12px',
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
    <div style={{ width: '100%', backgroundColor: tokens.color.background.secondary, padding: '24px' }}>
      <Container
        as="div"
        size="xl"
        align="center"
        paddingX="none"
        paddingY="none"
        style={{
          border: `2px dashed ${tokens.color.border.default}`,
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <Container
          as="header"
          size="fluid"
          align="start"
          paddingX="base"
          paddingY="lg"
          style={{ backgroundColor: tokens.color.background.primary }}
        >
          <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '8px' }}>
            {'<header>'}
          </div>
          <Placeholder color={tokens.color.interactive.default} height="small">
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
            backgroundColor: tokens.color.background.primary,
            borderTop: `1px solid ${tokens.color.border.light}`,
            borderBottom: `1px solid ${tokens.color.border.light}`,
          }}
        >
          <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '8px' }}>
            {'<nav>'}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Placeholder color={tokens.color.background.secondary} height="small">
              Home
            </Placeholder>
            <Placeholder color={tokens.color.background.secondary} height="small">
              Blog
            </Placeholder>
            <Placeholder color={tokens.color.background.secondary} height="small">
              About
            </Placeholder>
          </div>
        </Container>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px' }}>
          <Container
            as="main"
            size="fluid"
            align="start"
            paddingX="base"
            paddingY="lg"
            style={{ backgroundColor: tokens.color.background.primary }}
          >
            <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '12px' }}>
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
                  backgroundColor: tokens.color.background.secondary,
                  border: `1px solid ${tokens.color.border.light}`,
                  borderRadius: '12px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'monospace',
                    color: tokens.color.text.secondary,
                    marginBottom: '8px',
                  }}
                >
                  {'<section>'}
                </div>
                <Placeholder color={tokens.color.interactive.default} height="small">
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
                  backgroundColor: tokens.color.background.secondary,
                  border: `1px solid ${tokens.color.border.light}`,
                  borderRadius: '12px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'monospace',
                    color: tokens.color.text.secondary,
                    marginBottom: '8px',
                  }}
                >
                  {'<article>'}
                </div>
                <Stack direction="vertical" gap="normal">
                  <Placeholder color={tokens.color.interactive.default} height="small">
                    Article title
                  </Placeholder>
                  <Placeholder color={tokens.color.background.tertiary} height="medium">
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
              backgroundColor: tokens.color.background.secondary,
              borderLeft: `1px solid ${tokens.color.border.light}`,
            }}
          >
            <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '12px' }}>
              {'<aside>'}
            </div>
            <Stack direction="vertical" gap="normal">
              <Placeholder color={tokens.color.background.primary} height="small">
                Related
              </Placeholder>
              <Placeholder color={tokens.color.background.primary} height="small">
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
            backgroundColor: tokens.color.background.primary,
            borderTop: `1px solid ${tokens.color.border.light}`,
          }}
        >
          <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '8px' }}>
            {'<footer>'}
          </div>
          <Placeholder color={tokens.color.background.secondary} height="small">
            Footer content
          </Placeholder>
        </Container>
      </Container>
    </div>
  ),
};
