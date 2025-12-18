import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, Stack, tokens } from '@grasdouble/lufa_design-system';
import { useState } from 'react';

const { color } = tokens;

const meta = {
  title: '4. Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tabs component for organizing content into separate views. Supports multiple types and positions with keyboard navigation.',
      },
    },
  },
  tags: [],
  argTypes: {
    items: { control: 'object', description: 'Array of tab items' },
    activeKey: { control: 'text', description: 'Active tab key' },
    type: { control: 'select', options: ['line', 'card', 'pill'], description: 'Tab type' },
    tabPosition: { control: 'select', options: ['top', 'bottom', 'left', 'right'], description: 'Tab position' },
    size: { control: 'select', options: ['small', 'medium', 'large'], description: 'Size variant' },
    onChange: { action: 'tab changed' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path
      fillRule="evenodd"
      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
      clipRule="evenodd"
    />
  </svg>
);

const basicTabs = [
  { key: 'tab1', label: 'Tab 1', children: <div style={{ padding: '16px' }}>Content for Tab 1</div> },
  { key: 'tab2', label: 'Tab 2', children: <div style={{ padding: '16px' }}>Content for Tab 2</div> },
  { key: 'tab3', label: 'Tab 3', children: <div style={{ padding: '16px' }}>Content for Tab 3</div> },
];

const tabsWithIcons = [
  { key: 'home', label: 'Home', icon: <HomeIcon />, children: <div style={{ padding: '16px' }}>Home content</div> },
  {
    key: 'profile',
    label: 'Profile',
    icon: <UserIcon />,
    children: <div style={{ padding: '16px' }}>Profile content</div>,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    children: <div style={{ padding: '16px' }}>Settings content</div>,
  },
];

export const Playground: Story = {
  args: {
    items: basicTabs,
    type: 'line',
    tabPosition: 'top',
    size: 'medium',
  },
};

export const BasicTabs: Story = {
  render: () => <Tabs items={basicTabs} />,
};

export const Types: Story = {
  render: () => (
    <Stack gap="spacious">
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Line (Default)</h4>
        <Tabs type="line" items={basicTabs} />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Card</h4>
        <Tabs type="card" items={basicTabs} />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Pill</h4>
        <Tabs type="pill" items={basicTabs} />
      </div>
    </Stack>
  ),
};

export const Positions: Story = {
  render: () => (
    <Stack gap="spacious">
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Top (Default)</h4>
        <Tabs tabPosition="top" items={basicTabs} />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Bottom</h4>
        <Tabs tabPosition="bottom" items={basicTabs} />
      </div>
      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Left</h4>
          <Tabs tabPosition="left" items={basicTabs} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Right</h4>
          <Tabs tabPosition="right" items={basicTabs} />
        </div>
      </div>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="spacious">
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h4>
        <Tabs size="small" items={basicTabs} />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (Default)</h4>
        <Tabs size="medium" items={basicTabs} />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h4>
        <Tabs size="large" items={basicTabs} />
      </div>
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => <Tabs items={tabsWithIcons} />,
};

export const Controlled: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState('tab1');

    return (
      <Stack gap="spacious">
        <div style={{ padding: '12px', backgroundColor: color.background.secondary, borderRadius: '8px' }}>
          <div style={{ fontSize: '14px', marginBottom: '8px' }}>
            Active tab: <strong>{activeKey}</strong>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveKey('tab1')}
              style={{
                padding: '4px 12px',
                borderRadius: '4px',
                border: `1px solid ${color.border.light}`,
                backgroundColor: activeKey === 'tab1' ? color.interactive.default : 'transparent',
                color: activeKey === 'tab1' ? 'white' : color.text.primary,
                cursor: 'pointer',
              }}
            >
              Go to Tab 1
            </button>
            <button
              onClick={() => setActiveKey('tab2')}
              style={{
                padding: '4px 12px',
                borderRadius: '4px',
                border: `1px solid ${color.border.light}`,
                backgroundColor: activeKey === 'tab2' ? color.interactive.default : 'transparent',
                color: activeKey === 'tab2' ? 'white' : color.text.primary,
                cursor: 'pointer',
              }}
            >
              Go to Tab 2
            </button>
            <button
              onClick={() => setActiveKey('tab3')}
              style={{
                padding: '4px 12px',
                borderRadius: '4px',
                border: `1px solid ${color.border.light}`,
                backgroundColor: activeKey === 'tab3' ? color.interactive.default : 'transparent',
                color: activeKey === 'tab3' ? 'white' : color.text.primary,
                cursor: 'pointer',
              }}
            >
              Go to Tab 3
            </button>
          </div>
        </div>
        <Tabs items={basicTabs} activeKey={activeKey} onChange={setActiveKey} />
      </Stack>
    );
  },
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs
      items={[
        { key: 'tab1', label: 'Active Tab', children: <div style={{ padding: '16px' }}>Active content</div> },
        {
          key: 'tab2',
          label: 'Disabled Tab',
          children: <div style={{ padding: '16px' }}>Disabled content</div>,
          disabled: true,
        },
        {
          key: 'tab3',
          label: 'Another Active',
          children: <div style={{ padding: '16px' }}>Another active content</div>,
        },
      ]}
    />
  ),
};

export const ProductDetails: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <Tabs
        type="pill"
        items={[
          {
            key: 'description',
            label: 'Description',
            children: (
              <div style={{ padding: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>Product Description</h3>
                <p style={{ lineHeight: '1.6' }}>
                  This is a detailed description of the product. It includes all the important features, specifications,
                  and benefits that customers should know about.
                </p>
              </div>
            ),
          },
          {
            key: 'specs',
            label: 'Specifications',
            children: (
              <div style={{ padding: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>Technical Specifications</h3>
                <ul style={{ lineHeight: '1.8' }}>
                  <li>Dimension: 10 x 5 x 3 inches</li>
                  <li>Weight: 2.5 lbs</li>
                  <li>Material: Premium aluminum</li>
                  <li>Color: Space Gray</li>
                </ul>
              </div>
            ),
          },
          {
            key: 'reviews',
            label: 'Reviews (24)',
            children: (
              <div style={{ padding: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>Customer Reviews</h3>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: color.background.secondary,
                    borderRadius: '8px',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>Great product!</div>
                  <div style={{ fontSize: '14px', color: color.text.secondary }}>
                    Really happy with this purchase. Highly recommended.
                  </div>
                </div>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: color.background.secondary,
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>Excellent quality</div>
                  <div style={{ fontSize: '14px', color: color.text.secondary }}>
                    The quality is outstanding. Worth every penny.
                  </div>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <Tabs
      type="card"
      items={[
        {
          key: 'overview',
          label: 'Overview',
          icon: <HomeIcon />,
          children: (
            <div style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '16px' }}>Dashboard Overview</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: color.background.secondary,
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>1,234</div>
                  <div style={{ fontSize: '14px', color: color.text.secondary }}>Total Users</div>
                </div>
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: color.background.secondary,
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>567</div>
                  <div style={{ fontSize: '14px', color: color.text.secondary }}>Active Sessions</div>
                </div>
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: color.background.secondary,
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>89%</div>
                  <div style={{ fontSize: '14px', color: color.text.secondary }}>Satisfaction Rate</div>
                </div>
              </div>
            </div>
          ),
        },
        {
          key: 'users',
          label: 'Users',
          icon: <UserIcon />,
          children: (
            <div style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '16px' }}>User Management</h3>
              <p>User management interface would go here...</p>
            </div>
          ),
        },
        {
          key: 'settings',
          label: 'Settings',
          icon: <SettingsIcon />,
          children: (
            <div style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '16px' }}>Settings</h3>
              <p>Settings configuration would go here...</p>
            </div>
          ),
        },
      ]}
    />
  ),
};
