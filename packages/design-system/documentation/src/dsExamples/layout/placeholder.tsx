import React from 'react';

import { Placeholder, Stack } from '@grasdouble/lufa_design-system';
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
    <Placeholder>Default Placeholder</Placeholder>
  </Frame>
);

export const Height = () => (
  <Frame title="height">
    <Stack direction="vertical" gap="normal">
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          small ({tokens.spacing['xl-2xl']})
        </div>
        <Placeholder height="small">Small Height</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          medium ({tokens.spacing['3xl-4xl']}) — default
        </div>
        <Placeholder height="medium">Medium Height</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          large ({tokens.size['3xl']})
        </div>
        <Placeholder height="large">Large Height</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          auto
        </div>
        <Placeholder height="auto">
          Auto height adjusts to content
          <br />
          Multiple lines supported
          <br />
          Grows as needed
        </Placeholder>
      </div>
    </Stack>
  </Frame>
);

export const Width = () => (
  <Frame title="width">
    <Stack direction="vertical" gap="normal">
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          auto (min-width: {tokens.size['2xl']})
        </div>
        <Placeholder width="auto">Auto</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          small ({tokens.size['3xl']})
        </div>
        <Placeholder width="small">Small Width</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          medium ({tokens.minWidth.cardMin})
        </div>
        <Placeholder width="medium">Medium Width</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          large ({tokens.maxWidth.xs})
        </div>
        <Placeholder width="large">Large Width</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          full ({tokens.maxWidth.full})
        </div>
        <Placeholder width="full">Full Width</Placeholder>
      </div>
    </Stack>
  </Frame>
);

export const Color = () => (
  <Frame title="color">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: tokens.spacing.base,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          default gradient
        </div>
        <Placeholder>Violet Gradient</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          solid — interactive
        </div>
        <Placeholder color={tokens.color.interactive.default}>Solid Blue</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          solid — success
        </div>
        <Placeholder color={tokens.color.success.default}>Solid Green</Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          solid — error
        </div>
        <Placeholder color={tokens.color.error.default}>Solid Red</Placeholder>
      </div>
    </div>
  </Frame>
);

export const Gradient = () => (
  <Frame title="colorFrom / colorTo">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: tokens.spacing.base,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          blue → purple
        </div>
        <Placeholder colorFrom={tokens.color.interactive.default} colorTo={tokens.color.brand.secondary}>
          Custom Gradient
        </Placeholder>
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          green → teal
        </div>
        <Placeholder colorFrom={tokens.color.success.default} colorTo={tokens.color.brand.accent}>
          Green → Teal
        </Placeholder>
      </div>
    </div>
  </Frame>
);

export const CustomColors = () => (
  <>
    <Color />
    <Gradient />
  </>
);

export const HeightWidthMatrixExample = () => (
  <Frame title="height × width">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: tokens.spacing.base,
      }}
    >
      <Placeholder height="small" width="large" color={tokens.color.brand.secondary}>
        Small × Large
      </Placeholder>
      <Placeholder height="large" width="small" color={tokens.color.warning.default}>
        Large × Small
      </Placeholder>
      <div style={{ gridColumn: '1 / -1' }}>
        <Placeholder height="medium" width="full" color={tokens.color.interactive.default}>
          Medium × Full Width
        </Placeholder>
      </div>
    </div>
  </Frame>
);

export const CombinedVariants = HeightWidthMatrixExample;

export const DashboardLayoutExample = () => (
  <Frame title="dashboard layout">
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
      {/* Header */}
      <Placeholder height="small" width="full" color={tokens.color.interactive.default}>
        Header
      </Placeholder>

      {/* Main content with sidebar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `${tokens.minWidth.sidebarMin} 1fr`,
          gap: tokens.spacing.base,
        }}
      >
        <Placeholder height="full" color={tokens.color.brand.secondary}>
          Sidebar
        </Placeholder>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
          <Placeholder height="medium" width="full" color={tokens.color.success.default}>
            Content Area
          </Placeholder>

          {/* Card grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: tokens.spacing.base,
            }}
          >
            <Placeholder height="small" color={tokens.color.warning.default}>
              Card 1
            </Placeholder>
            <Placeholder height="small" color={tokens.color.warning.default}>
              Card 2
            </Placeholder>
            <Placeholder height="small" color={tokens.color.warning.default}>
              Card 3
            </Placeholder>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Placeholder height="small" width="full" color={tokens.color.text.secondary}>
        Footer
      </Placeholder>
    </div>
  </Frame>
);

export const DashboardLayout = DashboardLayoutExample;

export const FormLayoutExample = () => (
  <Frame title="form layout">
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
      <div style={{ display: 'flex', gap: tokens.spacing.base }}>
        <div style={{ flex: 1 }}>
          <Placeholder color={tokens.color.brand.secondary}>First Name</Placeholder>
        </div>
        <div style={{ flex: 1 }}>
          <Placeholder color={tokens.color.brand.secondary}>Last Name</Placeholder>
        </div>
      </div>

      <Placeholder color={tokens.color.brand.secondary}>Email</Placeholder>
      <Placeholder color={tokens.color.brand.secondary}>Message</Placeholder>

      <div style={{ display: 'flex', gap: tokens.spacing.base, justifyContent: 'flex-end' }}>
        <Placeholder color={tokens.color.text.disabled}>Cancel</Placeholder>
        <Placeholder color={tokens.color.interactive.default}>Submit</Placeholder>
      </div>
    </div>
  </Frame>
);

export const FormLayout = FormLayoutExample;

export const PrototypeLayoutExample = () => (
  <Frame title="prototype layout">
    <Stack direction="vertical" gap="normal">
      <Placeholder height="small" width="full" color={tokens.color.interactive.default}>
        Navigation Bar
      </Placeholder>

      <div style={{ display: 'grid', gridTemplateColumns: `${tokens.minWidth.sm} 1fr`, gap: tokens.spacing.base }}>
        <Placeholder height="large" color={tokens.color.brand.secondary}>
          Sidebar Menu
        </Placeholder>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.base }}>
          <Placeholder height="large" color={tokens.color.success.default}>
            Hero Section
          </Placeholder>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: tokens.spacing.base,
            }}
          >
            <Placeholder height="medium" color={tokens.color.warning.default}>
              Card 1
            </Placeholder>
            <Placeholder height="medium" color={tokens.color.warning.default}>
              Card 2
            </Placeholder>
            <Placeholder height="medium" color={tokens.color.warning.default}>
              Card 3
            </Placeholder>
          </div>

          <Placeholder height="medium" width="full" color={tokens.color.text.tertiary}>
            Content Area
          </Placeholder>
        </div>
      </div>

      <Placeholder height="small" width="full" color={tokens.color.background.inverse}>
        Footer
      </Placeholder>
    </Stack>
  </Frame>
);

export const PrototypeLayout = PrototypeLayoutExample;

export const Variants = () => (
  <>
    <Height />
    <Width />
    <Color />
    <Gradient />
  </>
);

export const Examples = () => (
  <>
    <DashboardLayoutExample />
    <FormLayoutExample />
    <PrototypeLayoutExample />
    <HeightWidthMatrixExample />
  </>
);
