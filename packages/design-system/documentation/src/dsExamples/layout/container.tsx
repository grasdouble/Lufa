import React from 'react';

import { Container, Placeholder, Stack } from '@grasdouble/lufa_design-system';
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
    <Container
      size="md"
      paddingY="md"
      style={{
        border: `${tokens.borderWidth.thin} ${tokens.borderStyle.dashed} ${tokens.color.border.light}`,
        borderRadius: tokens.radius.lg,
        background: tokens.color.background.primary,
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
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            size: {size}
          </div>
          <Container
            size={size}
            paddingY="sm"
            style={{
              border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
              borderRadius: tokens.radius.lg,
              background: tokens.color.background.primary,
            }}
          >
            <Placeholder color={tokens.color.interactive.default}>Content</Placeholder>
          </Container>
        </div>
      ))}
    </Stack>
    <div
      style={{
        fontFamily: tokens.fontFamily.mono,
        color: tokens.color.text.tertiary,
        fontSize: tokens.fontSize.xs,
        marginTop: tokens.spacing.md,
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
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            align: {align}
          </div>
          <div
            style={{
              padding: tokens.spacing.md,
              borderRadius: tokens.radius.lg,
              background: tokens.color.background.secondary,
              outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.dashed} ${tokens.color.border.light}`,
            }}
          >
            <Container
              size="sm"
              align={align}
              paddingY="sm"
              style={{
                border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
                borderRadius: tokens.radius.lg,
                background: tokens.color.background.primary,
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
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            paddingX: {paddingX}
          </div>
          <Container
            size="md"
            paddingX={paddingX}
            paddingY="none"
            style={{
              border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
              borderRadius: tokens.radius.lg,
              background: tokens.color.background.primary,
            }}
          >
            <div
              style={{
                height: tokens.size.lg,
                borderRadius: tokens.radius.lg,
                outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.dashed} ${tokens.color.border.light}`,
                background: tokens.color.background.secondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: tokens.fontFamily.mono,
                fontSize: tokens.fontSize.xs,
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
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            paddingY: {paddingY}
          </div>
          <Container
            size="md"
            paddingX="base"
            paddingY={paddingY}
            style={{
              border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
              borderRadius: tokens.radius.lg,
              background: tokens.color.background.primary,
            }}
          >
            <div
              style={{
                height: tokens.size.lg,
                borderRadius: tokens.radius.lg,
                outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.dashed} ${tokens.color.border.light}`,
                background: tokens.color.background.secondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: tokens.fontFamily.mono,
                fontSize: tokens.fontSize.xs,
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
            border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
            borderRadius: tokens.radius.lg,
            background: tokens.color.background.primary,
          }}
        >
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              fontSize: tokens.fontSize.xs,
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
          background: tokens.color.background.primary,
          borderRadius: tokens.radius.lg,
          outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
        }}
      >
        <Placeholder color={tokens.color.background.secondary}>Full-bleed section</Placeholder>
      </Container>
      <Container
        size="md"
        paddingY="sm"
        style={{
          background: tokens.color.background.primary,
          borderRadius: tokens.radius.lg,
          outline: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
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
