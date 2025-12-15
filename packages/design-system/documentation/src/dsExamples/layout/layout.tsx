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

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
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
  <Frame>
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

export const Variants = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        sidebar on/off
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
        <div>
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
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
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
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

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        sidebar position / width
      </div>
      <Stack direction="vertical" gap="normal">
        {([
          { sidebarPosition: LAYOUT_SIDEBAR_POSITION.left, sidebarWidth: LAYOUT_SIDEBAR_WIDTH.collapsed },
          { sidebarPosition: LAYOUT_SIDEBAR_POSITION.left, sidebarWidth: LAYOUT_SIDEBAR_WIDTH.wide },
          { sidebarPosition: LAYOUT_SIDEBAR_POSITION.right, sidebarWidth: LAYOUT_SIDEBAR_WIDTH.default },
        ] as const).map(({ sidebarPosition, sidebarWidth }) => (
          <div key={`${sidebarPosition}-${sidebarWidth}`}>
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
              position: {sidebarPosition} • width: {sidebarWidth}
            </div>
            <Shell sidebar sidebarPosition={sidebarPosition} sidebarWidth={sidebarWidth} gap={LAYOUT_GAP.md}>
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
        ))}
      </Stack>
    </Frame>
  </>
);

export const Examples = () => (
  <Frame>
    <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
      app shell
    </div>
    <Shell sidebar gap={LAYOUT_GAP.md} style={{ minHeight: 340 }}>
      <Layout.Header>
        <Placeholder color={color.interactive.default}>Top bar</Placeholder>
      </Layout.Header>
      <Layout.Sidebar>
        <Stack direction="vertical" gap="normal">
          <Placeholder color={color.background.secondary}>Dashboard</Placeholder>
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

