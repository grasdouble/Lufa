import React from "react";
import {
  Layout,
  LAYOUT_GAP,
  LAYOUT_SIDEBAR_POSITION,
  LAYOUT_SIDEBAR_WIDTH,
  Placeholder,
  Stack,
  tokens,
} from "@grasdouble/lufa_design-system";

const { color } = tokens;

const Frame = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      padding: "20px",
      backgroundColor: color.background.secondary,
      color: color.text.primary,
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    {title ? (
      <div
        style={{
          fontFamily: "monospace",
          color: color.text.tertiary,
          marginBottom: 12,
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
      background: "#fff",
      borderRadius: 12,
      border: `1px solid ${color.border.light}`,
      padding: 16,
      minHeight: 280,
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
        <Placeholder color={color.interactive.default}>Header</Placeholder>
      </Layout.Header>
      <Layout.Sidebar>
        <Stack direction="vertical" gap="normal">
          <Placeholder color={color.background.secondary}>Nav</Placeholder>
          <Placeholder color={color.background.secondary}>Nav</Placeholder>
          <Placeholder color={color.background.secondary}>Nav</Placeholder>
        </Stack>
      </Layout.Sidebar>
      <Layout.Content>
        <Placeholder color={color.background.secondary} height="large">
          Content
        </Placeholder>
      </Layout.Content>
      <Layout.Footer>
        <Placeholder color={color.background.secondary}>Footer</Placeholder>
      </Layout.Footer>
    </Shell>
  </Frame>
);

export const Sidebar = () => (
  <Frame title="sidebar">
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 16,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          sidebar: false
        </div>
        <Shell gap={LAYOUT_GAP.sm}>
          <Layout.Header>
            <Placeholder color={color.interactive.default}>Header</Placeholder>
          </Layout.Header>
          <Layout.Content>
            <Placeholder color={color.background.secondary} height="large">
              Content
            </Placeholder>
          </Layout.Content>
        </Shell>
      </div>

      <div>
        <div
          style={{
            fontFamily: "monospace",
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          sidebar: true
        </div>
        <Shell sidebar gap={LAYOUT_GAP.sm}>
          <Layout.Header>
            <Placeholder color={color.interactive.default}>Header</Placeholder>
          </Layout.Header>
          <Layout.Sidebar>
            <Placeholder color={color.background.secondary} height="large">
              Sidebar
            </Placeholder>
          </Layout.Sidebar>
          <Layout.Content>
            <Placeholder color={color.background.secondary} height="large">
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
      {(
        [LAYOUT_SIDEBAR_POSITION.left, LAYOUT_SIDEBAR_POSITION.right] as const
      ).map((sidebarPosition) => (
        <div key={sidebarPosition}>
          <div
            style={{
              fontFamily: "monospace",
              color: color.text.tertiary,
              marginBottom: 8,
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
              <Placeholder color={color.interactive.default}>
                Header
              </Placeholder>
            </Layout.Header>
            <Layout.Sidebar>
              <Placeholder color={color.background.secondary} height="large">
                Sidebar
              </Placeholder>
            </Layout.Sidebar>
            <Layout.Content>
              <Placeholder color={color.background.secondary} height="large">
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
      {(
        [
          LAYOUT_SIDEBAR_WIDTH.collapsed,
          LAYOUT_SIDEBAR_WIDTH.default,
          LAYOUT_SIDEBAR_WIDTH.wide,
        ] as const
      ).map((sidebarWidth) => (
        <div key={sidebarWidth}>
          <div
            style={{
              fontFamily: "monospace",
              color: color.text.tertiary,
              marginBottom: 8,
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
              <Placeholder color={color.interactive.default}>
                Header
              </Placeholder>
            </Layout.Header>
            <Layout.Sidebar>
              <Placeholder color={color.background.secondary} height="large">
                Sidebar
              </Placeholder>
            </Layout.Sidebar>
            <Layout.Content>
              <Placeholder color={color.background.secondary} height="large">
                Content
              </Placeholder>
            </Layout.Content>
          </Shell>
        </div>
      ))}
    </Stack>
  </Frame>
);

export const Gap = () => (
  <Frame title="gap">
    <Stack direction="vertical" gap="normal">
      {(
        [LAYOUT_GAP.none, LAYOUT_GAP.sm, LAYOUT_GAP.md, LAYOUT_GAP.lg] as const
      ).map((gap) => (
        <div key={gap}>
          <div
            style={{
              fontFamily: "monospace",
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            gap: {gap}
          </div>
          <Shell sidebar gap={gap}>
            <Layout.Header>
              <Placeholder color={color.interactive.default}>
                Header
              </Placeholder>
            </Layout.Header>
            <Layout.Sidebar>
              <Placeholder color={color.background.secondary} height="large">
                Sidebar
              </Placeholder>
            </Layout.Sidebar>
            <Layout.Content>
              <Placeholder color={color.background.secondary} height="large">
                Content
              </Placeholder>
            </Layout.Content>
            <Layout.Footer>
              <Placeholder color={color.background.secondary}>
                Footer
              </Placeholder>
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
    <Shell sidebar gap={LAYOUT_GAP.md} style={{ minHeight: 340 }}>
      <Layout.Header>
        <Placeholder color={color.interactive.default}>Top bar</Placeholder>
      </Layout.Header>
      <Layout.Sidebar>
        <Stack direction="vertical" gap="normal">
          <Placeholder color={color.background.secondary}>
            Dashboard
          </Placeholder>
          <Placeholder color={color.background.secondary}>Projects</Placeholder>
          <Placeholder color={color.background.secondary}>Settings</Placeholder>
        </Stack>
      </Layout.Sidebar>
      <Layout.Content>
        <Stack direction="vertical" gap="normal">
          <Placeholder color={color.background.secondary} height="large">
            KPI row
          </Placeholder>
          <Placeholder color={color.background.secondary} height="large">
            Main panel
          </Placeholder>
        </Stack>
      </Layout.Content>
      <Layout.Footer>
        <Placeholder color={color.background.secondary}>Footer</Placeholder>
      </Layout.Footer>
    </Shell>
  </Frame>
);

export const ContentOnlyExample = () => (
  <Frame title="content only">
    <Shell gap={LAYOUT_GAP.sm} style={{ minHeight: 240 }}>
      <Layout.Header>
        <Placeholder color={color.interactive.default}>Header</Placeholder>
      </Layout.Header>
      <Layout.Content>
        <Stack direction="vertical" gap="normal">
          <Placeholder color={color.background.secondary} height="large">
            Content
          </Placeholder>
          <Placeholder color={color.background.secondary}>
            Secondary section
          </Placeholder>
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
