import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Container,
  Layout,
  LAYOUT_GAP,
  LAYOUT_SIDEBAR_POSITION,
  LAYOUT_SIDEBAR_WIDTH,
  Placeholder,
  Stack,
  tokens,
} from '@grasdouble/lufa_design-system';

const { color } = tokens;

const meta = {
  title: '2. Layout/Layout',
  component: Layout,
  tags: [],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A page-level scaffold using CSS grid areas: Header / Sidebar / Content / Footer.',
      },
    },
  },
  argTypes: {
    sidebar: { control: 'boolean', table: { defaultValue: { summary: false } } },
    sidebarPosition: {
      control: 'inline-radio',
      options: Object.values(LAYOUT_SIDEBAR_POSITION),
      table: { defaultValue: { summary: 'left' } },
    },
    sidebarWidth: {
      control: 'select',
      options: Object.values(LAYOUT_SIDEBAR_WIDTH),
      table: { defaultValue: { summary: 'default' } },
    },
    gap: { control: 'select', options: Object.values(LAYOUT_GAP), table: { defaultValue: { summary: 'md' } } },
    children: { control: false },
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    sidebar: true,
    sidebarPosition: LAYOUT_SIDEBAR_POSITION.left,
    sidebarWidth: LAYOUT_SIDEBAR_WIDTH.default,
    gap: LAYOUT_GAP.md,
  },
  render: (args) => (
    <Container size="xl" paddingX="none">
      <Layout
        {...args}
        style={{
          backgroundColor: color.background.secondary,
          border: `1px solid ${color.border.light}`,
          borderRadius: '16px',
          padding: '16px',
        }}
      >
        <Layout.Header>
          <Placeholder color={color.interactive.default} height="small" width="full">
            Header
          </Placeholder>
        </Layout.Header>

        {args.sidebar && (
          <Layout.Sidebar>
            <Stack direction="vertical" gap="normal">
              <Placeholder color={color.background.primary} height="small" width="full">
                Nav 1
              </Placeholder>
              <Placeholder color={color.background.primary} height="small" width="full">
                Nav 2
              </Placeholder>
              <Placeholder color={color.background.primary} height="small" width="full">
                Nav 3
              </Placeholder>
            </Stack>
          </Layout.Sidebar>
        )}

        <Layout.Content>
          <Stack direction="vertical" gap="normal">
            <Placeholder color={color.background.primary} height="large" width="full">
              Content
            </Placeholder>
            <Placeholder color={color.background.primary} height="medium" width="full">
              More content
            </Placeholder>
          </Stack>
        </Layout.Content>

        <Layout.Footer>
          <Placeholder color={color.background.primary} height="small" width="full">
            Footer
          </Placeholder>
        </Layout.Footer>
      </Layout>
    </Container>
  ),
};

export const SidebarPositions: Story = {
  render: () => (
    <Container size="xl" paddingX="none">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px' }}>
        {([LAYOUT_SIDEBAR_POSITION.left, LAYOUT_SIDEBAR_POSITION.right] as const).map((position) => (
          <Layout
            key={position}
            sidebar
            sidebarPosition={position}
            sidebarWidth={LAYOUT_SIDEBAR_WIDTH.default}
            gap={LAYOUT_GAP.md}
            style={{
              backgroundColor: color.background.secondary,
              border: `1px solid ${color.border.light}`,
              borderRadius: '16px',
              padding: '16px',
            }}
          >
            <Layout.Header>
              <div style={{ fontFamily: 'monospace', color: color.text.secondary, marginBottom: '8px' }}>
                sidebarPosition: {position}
              </div>
              <Placeholder color={color.interactive.default} height="small" width="full">
                Header
              </Placeholder>
            </Layout.Header>
            <Layout.Sidebar>
              <Placeholder color={color.background.primary} height="large" width="full">
                Sidebar
              </Placeholder>
            </Layout.Sidebar>
            <Layout.Content>
              <Placeholder color={color.background.primary} height="large" width="full">
                Content
              </Placeholder>
            </Layout.Content>
            <Layout.Footer>
              <Placeholder color={color.background.primary} height="small" width="full">
                Footer
              </Placeholder>
            </Layout.Footer>
          </Layout>
        ))}
      </div>
    </Container>
  ),
};

export const SidebarWidths: Story = {
  render: () => (
    <Container size="xl" paddingX="none">
      <Stack direction="vertical" gap="spacious">
        {(Object.values(LAYOUT_SIDEBAR_WIDTH) as Array<keyof typeof LAYOUT_SIDEBAR_WIDTH>).map((width) => (
          <Layout
            key={width}
            sidebar
            sidebarPosition={LAYOUT_SIDEBAR_POSITION.left}
            sidebarWidth={width}
            gap={LAYOUT_GAP.md}
            style={{
              backgroundColor: color.background.secondary,
              border: `1px solid ${color.border.light}`,
              borderRadius: '16px',
              padding: '16px',
            }}
          >
            <Layout.Header>
              <div style={{ fontFamily: 'monospace', color: color.text.secondary, marginBottom: '8px' }}>
                sidebarWidth: {width}
              </div>
              <Placeholder color={color.interactive.default} height="small" width="full">
                Header
              </Placeholder>
            </Layout.Header>
            <Layout.Sidebar>
              <Placeholder color={color.background.primary} height="large" width="full">
                Sidebar
              </Placeholder>
            </Layout.Sidebar>
            <Layout.Content>
              <Placeholder color={color.background.primary} height="large" width="full">
                Content
              </Placeholder>
            </Layout.Content>
            <Layout.Footer>
              <Placeholder color={color.background.primary} height="small" width="full">
                Footer
              </Placeholder>
            </Layout.Footer>
          </Layout>
        ))}
      </Stack>
    </Container>
  ),
};

export const WithoutSidebar: Story = {
  render: () => (
    <Container size="xl" paddingX="none">
      <Layout
        sidebar={false}
        gap={LAYOUT_GAP.md}
        style={{
          backgroundColor: color.background.secondary,
          border: `1px solid ${color.border.light}`,
          borderRadius: '16px',
          padding: '16px',
        }}
      >
        <Layout.Header>
          <Placeholder color={color.interactive.default} height="small" width="full">
            Header
          </Placeholder>
        </Layout.Header>
        <Layout.Content>
          <Placeholder color={color.background.primary} height="large" width="full">
            Content
          </Placeholder>
        </Layout.Content>
        <Layout.Footer>
          <Placeholder color={color.background.primary} height="small" width="full">
            Footer
          </Placeholder>
        </Layout.Footer>
      </Layout>
    </Container>
  ),
};
