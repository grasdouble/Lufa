import React from 'react';

import {
  Layout,
  LAYOUT_GAP,
  LAYOUT_SIDEBAR_POSITION,
  LAYOUT_SIDEBAR_WIDTH,
  Placeholder,
  Stack,
} from '@grasdouble/lufa_design-system';
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

const Shell = (props: React.ComponentProps<typeof Layout>) => (
  <Layout
    {...props}
    style={{
      background: tokens.color.background.primary,
      borderRadius: tokens.radius.lg,
      border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
      padding: tokens.spacing.base,
      minHeight: tokens.dimension.cardMinWidth,
      ...(props.style ?? {}),
    }}
  />
);

export const LiveDemo = () => (
  <Frame title="live demo">
    <Shell
      sidebar
      sidebarPosition={LAYOUT_SIDEBAR_POSITION.left}
      sidebarWidth={LAYOUT_SIDEBAR_WIDTH.default}
      gap={LAYOUT_GAP.md}
    >
      <Layout.Header>
        <Placeholder color={tokens.color.interactive.default}>Header</Placeholder>
      </Layout.Header>
      <Layout.Sidebar>
        <Stack direction="vertical" gap="normal">
          <Placeholder color={tokens.color.background.secondary}>Nav</Placeholder>
          <Placeholder color={tokens.color.background.secondary}>Nav</Placeholder>
          <Placeholder color={tokens.color.background.secondary}>Nav</Placeholder>
        </Stack>
      </Layout.Sidebar>
      <Layout.Content>
        <Placeholder color={tokens.color.background.secondary} height="large">
          Content
        </Placeholder>
      </Layout.Content>
      <Layout.Footer>
        <Placeholder color={tokens.color.background.secondary}>Footer</Placeholder>
      </Layout.Footer>
    </Shell>
  </Frame>
);

export const Sidebar = () => (
  <Frame title="sidebar">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
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
          sidebar: false
        </div>
        <Shell gap={LAYOUT_GAP.sm}>
          <Layout.Header>
            <Placeholder color={tokens.color.interactive.default}>Header</Placeholder>
          </Layout.Header>
          <Layout.Content>
            <Placeholder color={tokens.color.background.secondary} height="large">
              Content
            </Placeholder>
          </Layout.Content>
        </Shell>
      </div>

      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          sidebar: true
        </div>
        <Shell sidebar gap={LAYOUT_GAP.sm}>
          <Layout.Header>
            <Placeholder color={tokens.color.interactive.default}>Header</Placeholder>
          </Layout.Header>
          <Layout.Sidebar>
            <Placeholder color={tokens.color.background.secondary} height="large">
              Sidebar
            </Placeholder>
          </Layout.Sidebar>
          <Layout.Content>
            <Placeholder color={tokens.color.background.secondary} height="large">
              Content
            </Placeholder>
          </Layout.Content>
        </Shell>
      </div>
    </div>
  </Frame>
);

export const SidebarPosition = () => (
  <Frame title="sidebarPosition">
    <Stack direction="vertical" gap="normal">
      {([LAYOUT_SIDEBAR_POSITION.left, LAYOUT_SIDEBAR_POSITION.right] as const).map((sidebarPosition) => (
        <div key={sidebarPosition}>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            sidebarPosition: {sidebarPosition}
          </div>
          <Shell
            sidebar
            sidebarPosition={sidebarPosition}
            sidebarWidth={LAYOUT_SIDEBAR_WIDTH.default}
            gap={LAYOUT_GAP.md}
          >
            <Layout.Header>
              <Placeholder color={tokens.color.interactive.default}>Header</Placeholder>
            </Layout.Header>
            <Layout.Sidebar>
              <Placeholder color={tokens.color.background.secondary} height="large">
                Sidebar
              </Placeholder>
            </Layout.Sidebar>
            <Layout.Content>
              <Placeholder color={tokens.color.background.secondary} height="large">
                Content
              </Placeholder>
            </Layout.Content>
          </Shell>
        </div>
      ))}
    </Stack>
  </Frame>
);

export const SidebarWidth = () => (
  <Frame title="sidebarWidth">
    <Stack direction="vertical" gap="normal">
      {([LAYOUT_SIDEBAR_WIDTH.collapsed, LAYOUT_SIDEBAR_WIDTH.default, LAYOUT_SIDEBAR_WIDTH.wide] as const).map(
        (sidebarWidth) => (
          <div key={sidebarWidth}>
            <div
              style={{
                fontFamily: tokens.fontFamily.mono,
                color: tokens.color.text.tertiary,
                marginBottom: tokens.spacing.sm,
              }}
            >
              sidebarWidth: {sidebarWidth}
            </div>
            <Shell
              sidebar
              sidebarPosition={LAYOUT_SIDEBAR_POSITION.left}
              sidebarWidth={sidebarWidth}
              gap={LAYOUT_GAP.md}
            >
              <Layout.Header>
                <Placeholder color={tokens.color.interactive.default}>Header</Placeholder>
              </Layout.Header>
              <Layout.Sidebar>
                <Placeholder color={tokens.color.background.secondary} height="large">
                  Sidebar
                </Placeholder>
              </Layout.Sidebar>
              <Layout.Content>
                <Placeholder color={tokens.color.background.secondary} height="large">
                  Content
                </Placeholder>
              </Layout.Content>
            </Shell>
          </div>
        )
      )}
    </Stack>
  </Frame>
);

export const Gap = () => (
  <Frame title="gap">
    <Stack direction="vertical" gap="normal">
      {([LAYOUT_GAP.none, LAYOUT_GAP.sm, LAYOUT_GAP.md, LAYOUT_GAP.lg] as const).map((gap) => (
        <div key={gap}>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            gap: {gap}
          </div>
          <Shell sidebar gap={gap}>
            <Layout.Header>
              <Placeholder color={tokens.color.interactive.default}>Header</Placeholder>
            </Layout.Header>
            <Layout.Sidebar>
              <Placeholder color={tokens.color.background.secondary} height="large">
                Sidebar
              </Placeholder>
            </Layout.Sidebar>
            <Layout.Content>
              <Placeholder color={tokens.color.background.secondary} height="large">
                Content
              </Placeholder>
            </Layout.Content>
            <Layout.Footer>
              <Placeholder color={tokens.color.background.secondary}>Footer</Placeholder>
            </Layout.Footer>
          </Shell>
        </div>
      ))}
    </Stack>
  </Frame>
);

export const Variants = () => (
  <>
    <Sidebar />
    <SidebarPosition />
    <SidebarWidth />
    <Gap />
  </>
);

export const AppShellExample = () => (
  <Frame title="app shell">
    <Shell sidebar gap={LAYOUT_GAP.md} style={{ minHeight: tokens.dimension.cardDefaultWidth }}>
      <Layout.Header>
        <Placeholder color={tokens.color.interactive.default}>Top bar</Placeholder>
      </Layout.Header>
      <Layout.Sidebar>
        <Stack direction="vertical" gap="normal">
          <Placeholder color={tokens.color.background.secondary}>Dashboard</Placeholder>
          <Placeholder color={tokens.color.background.secondary}>Projects</Placeholder>
          <Placeholder color={tokens.color.background.secondary}>Settings</Placeholder>
        </Stack>
      </Layout.Sidebar>
      <Layout.Content>
        <Stack direction="vertical" gap="normal">
          <Placeholder color={tokens.color.background.secondary} height="large">
            KPI row
          </Placeholder>
          <Placeholder color={tokens.color.background.secondary} height="large">
            Main panel
          </Placeholder>
        </Stack>
      </Layout.Content>
      <Layout.Footer>
        <Placeholder color={tokens.color.background.secondary}>Footer</Placeholder>
      </Layout.Footer>
    </Shell>
  </Frame>
);

export const ContentOnlyExample = () => (
  <Frame title="content only">
    <Shell gap={LAYOUT_GAP.sm} style={{ minHeight: tokens.minWidth.cardMin }}>
      <Layout.Header>
        <Placeholder color={tokens.color.interactive.default}>Header</Placeholder>
      </Layout.Header>
      <Layout.Content>
        <Stack direction="vertical" gap="normal">
          <Placeholder color={tokens.color.background.secondary} height="large">
            Content
          </Placeholder>
          <Placeholder color={tokens.color.background.secondary}>Secondary section</Placeholder>
        </Stack>
      </Layout.Content>
    </Shell>
  </Frame>
);

export const Examples = () => (
  <>
    <AppShellExample />
    <ContentOnlyExample />
  </>
);
