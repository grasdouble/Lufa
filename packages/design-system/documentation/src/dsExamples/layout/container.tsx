import React from 'react';

import { Container, Placeholder, Stack } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const Frame = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div
    style={{
      padding: '20px',
      backgroundColor: tokens.color.background.secondary,
      color: tokens.color.text.primary,
      borderRadius: '8px',
      marginBottom: '16px',
    }}
  >
    {title ? (
      <div
        style={{
          fontFamily: 'monospace',
          color: tokens.color.text.tertiary,
          marginBottom: 12,
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
    <Container
      size="md"
      paddingY="md"
      style={{
        border: `2px dashed ${tokens.color.border.light}`,
        borderRadius: 12,
        background: '#fff',
      }}
    >
      <Stack direction="vertical" gap="normal">
        <Placeholder color={tokens.color.interactive.default}>Header</Placeholder>
        <Placeholder color={tokens.color.background.secondary}>Content</Placeholder>
      </Stack>
    </Container>
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <Stack direction="vertical" gap="normal">
      {(['xs', 'sm', 'md', 'lg', 'xl', 'full', 'fluid'] as const).map((size) => (
        <div key={size}>
          <div
            style={{
              fontFamily: 'monospace',
              color: tokens.color.text.tertiary,
              marginBottom: 8,
            }}
          >
            size: {size}
          </div>
          <Container
            size={size}
            paddingY="sm"
            style={{
              border: `1px solid ${tokens.color.border.light}`,
              borderRadius: 12,
              background: '#fff',
            }}
          >
            <Placeholder color={tokens.color.interactive.default}>Content</Placeholder>
          </Container>
        </div>
      ))}
    </Stack>
    <div
      style={{
        fontFamily: 'monospace',
        color: tokens.color.text.tertiary,
        fontSize: 12,
        marginTop: 12,
      }}
    >
      Tokens: spacing.base → {tokens.spacing.base}
    </div>
  </Frame>
);

export const Align = () => (
  <Frame title="align (with a constrained container)">
    <Stack direction="vertical" gap="normal">
      {(['start', 'center', 'end'] as const).map((align) => (
        <div key={align}>
          <div
            style={{
              fontFamily: 'monospace',
              color: tokens.color.text.tertiary,
              marginBottom: 8,
            }}
          >
            align: {align}
          </div>
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              background: tokens.color.background.secondary,
              outline: `1px dashed ${tokens.color.border.light}`,
            }}
          >
            <Container
              size="sm"
              align={align}
              paddingY="sm"
              style={{
                border: `1px solid ${tokens.color.border.light}`,
                borderRadius: 12,
                background: '#fff',
              }}
            >
              <Placeholder color={tokens.color.interactive.default}>Aligned</Placeholder>
            </Container>
          </div>
        </div>
      ))}
    </Stack>
  </Frame>
);

export const PaddingX = () => (
  <Frame title="paddingX">
    <Stack direction="vertical" gap="normal">
      {(['none', 'base', 'lg'] as const).map((paddingX) => (
        <div key={paddingX}>
          <div
            style={{
              fontFamily: 'monospace',
              color: tokens.color.text.tertiary,
              marginBottom: 8,
            }}
          >
            paddingX: {paddingX}
          </div>
          <Container
            size="md"
            paddingX={paddingX}
            paddingY="none"
            style={{
              border: `1px solid ${tokens.color.border.light}`,
              borderRadius: 12,
              background: '#fff',
            }}
          >
            <div
              style={{
                height: 48,
                borderRadius: 10,
                outline: `1px dashed ${tokens.color.border.light}`,
                background: tokens.color.background.secondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'monospace',
                fontSize: 12,
                color: tokens.color.text.secondary,
              }}
            >
              inner content area
            </div>
          </Container>
        </div>
      ))}
    </Stack>
  </Frame>
);

export const PaddingY = () => (
  <Frame title="paddingY">
    <Stack direction="vertical" gap="normal">
      {(['none', 'sm', 'lg'] as const).map((paddingY) => (
        <div key={paddingY}>
          <div
            style={{
              fontFamily: 'monospace',
              color: tokens.color.text.tertiary,
              marginBottom: 8,
            }}
          >
            paddingY: {paddingY}
          </div>
          <Container
            size="md"
            paddingX="base"
            paddingY={paddingY}
            style={{
              border: `1px solid ${tokens.color.border.light}`,
              borderRadius: 12,
              background: '#fff',
            }}
          >
            <div
              style={{
                height: 48,
                borderRadius: 10,
                outline: `1px dashed ${tokens.color.border.light}`,
                background: tokens.color.background.secondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'monospace',
                fontSize: 12,
                color: tokens.color.text.secondary,
              }}
            >
              inner content area
            </div>
          </Container>
        </div>
      ))}
    </Stack>
  </Frame>
);

export const As = () => (
  <Frame title="as">
    <Stack direction="vertical" gap="normal">
      {(
        [
          { as: 'div', label: 'as="div"' },
          { as: 'main', label: 'as="main"' },
          { as: 'section', label: 'as="section"' },
          { as: 'article', label: 'as="article"' },
        ] as const
      ).map(({ as, label }) => (
        <Container
          key={as}
          as={as}
          size="md"
          paddingY="sm"
          style={{
            border: `1px solid ${tokens.color.border.light}`,
            borderRadius: 12,
            background: '#fff',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              color: tokens.color.text.secondary,
            }}
          >
            {label}
          </div>
        </Container>
      ))}
    </Stack>
  </Frame>
);

export const Variants = () => (
  <>
    <Size />
    <Align />
    <PaddingX />
    <PaddingY />
    <As />
  </>
);

export const PageLayoutExample = () => (
  <Frame title="page layout">
    <Stack direction="vertical" gap="normal">
      <Container as="main" size="lg" paddingY="lg">
        <Stack direction="vertical" gap="normal">
          <Placeholder color={tokens.color.interactive.default}>Main content</Placeholder>
          <Placeholder color={tokens.color.background.secondary}>Section</Placeholder>
          <Placeholder color={tokens.color.background.secondary}>Section</Placeholder>
        </Stack>
      </Container>
      <Container as="footer" size="lg" paddingY="sm">
        <Placeholder color={tokens.color.background.secondary}>Footer</Placeholder>
      </Container>
    </Stack>
  </Frame>
);

export const MixedBleedExample = () => (
  <Frame title="mixed full-bleed + constrained">
    <Stack direction="vertical" gap="normal">
      <Container
        size="full"
        paddingY="sm"
        style={{
          background: '#fff',
          borderRadius: 12,
          outline: `1px solid ${tokens.color.border.light}`,
        }}
      >
        <Placeholder color={tokens.color.background.secondary}>Full-bleed section</Placeholder>
      </Container>
      <Container
        size="md"
        paddingY="sm"
        style={{
          background: '#fff',
          borderRadius: 12,
          outline: `1px solid ${tokens.color.border.light}`,
        }}
      >
        <Placeholder color={tokens.color.interactive.default}>Constrained content</Placeholder>
      </Container>
    </Stack>
  </Frame>
);

export const Examples = () => (
  <>
    <PageLayoutExample />
    <MixedBleedExample />
  </>
);
