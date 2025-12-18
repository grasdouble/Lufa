import React, { useState } from 'react';

import { Stack, Tabs, tokens } from '@grasdouble/lufa_design-system';

const { color } = tokens;

const Frame = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div
    style={{
      padding: '20px',
      backgroundColor: color.background.secondary,
      color: color.text.primary,
      borderRadius: '8px',
      marginBottom: '16px',
    }}
  >
    {title ? (
      <div
        style={{
          fontFamily: 'monospace',
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

const tabItems = [
  {
    key: 'tab1',
    label: 'Overview',
    children: <div style={{ padding: '16px' }}>Overview content goes here</div>,
  },
  {
    key: 'tab2',
    label: 'Documentation',
    children: <div style={{ padding: '16px' }}>Documentation content goes here</div>,
  },
  {
    key: 'tab3',
    label: 'Examples',
    children: <div style={{ padding: '16px' }}>Examples content goes here</div>,
  },
];

export const LiveDemo = () => {
  const [activeKey, setActiveKey] = useState('tab1');

  return (
    <Frame title="live demo">
      <Tabs items={tabItems} activeKey={activeKey} onChange={setActiveKey} />
    </Frame>
  );
};

export const Type = () => {
  const [activeKeyLine, setActiveKeyLine] = useState('tab1');
  const [activeKeyCard, setActiveKeyCard] = useState('tab1');
  const [activeKeyPill, setActiveKeyPill] = useState('tab1');

  return (
    <Frame title="type">
      <Stack gap="spacious">
        <div>
          <div
            style={{
              fontFamily: 'monospace',
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            line (default)
          </div>
          <Tabs type="line" items={tabItems} activeKey={activeKeyLine} onChange={setActiveKeyLine} />
        </div>
        <div>
          <div
            style={{
              fontFamily: 'monospace',
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            card
          </div>
          <Tabs type="card" items={tabItems} activeKey={activeKeyCard} onChange={setActiveKeyCard} />
        </div>
        <div>
          <div
            style={{
              fontFamily: 'monospace',
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            pill
          </div>
          <Tabs type="pill" items={tabItems} activeKey={activeKeyPill} onChange={setActiveKeyPill} />
        </div>
      </Stack>
    </Frame>
  );
};

export const TabPosition = () => {
  const [activeTop, setActiveTop] = useState('tab1');
  const [activeBottom, setActiveBottom] = useState('tab1');
  const [activeLeft, setActiveLeft] = useState('tab1');
  const [activeRight, setActiveRight] = useState('tab1');

  const panelBoxStyle: React.CSSProperties = {
    minHeight: 160,
    padding: 12,
    borderRadius: 8,
    border: `1px solid ${color.border.secondary}`,
  };

  const leftRightBoxStyle: React.CSSProperties = {
    ...panelBoxStyle,
    display: 'grid',
    alignItems: 'stretch',
  };

  return (
    <Frame title="tabPosition">
      <Stack gap="spacious">
        <div>
          <div
            style={{
              fontFamily: 'monospace',
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            top (default)
          </div>
          <div style={panelBoxStyle}>
            <Tabs tabPosition="top" items={tabItems} activeKey={activeTop} onChange={setActiveTop} />
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: 'monospace',
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            bottom
          </div>
          <div style={panelBoxStyle}>
            <Tabs tabPosition="bottom" items={tabItems} activeKey={activeBottom} onChange={setActiveBottom} />
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: 'monospace',
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            left
          </div>
          <div style={leftRightBoxStyle}>
            <Tabs tabPosition="left" items={tabItems} activeKey={activeLeft} onChange={setActiveLeft} />
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: 'monospace',
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            right
          </div>
          <div style={leftRightBoxStyle}>
            <Tabs tabPosition="right" items={tabItems} activeKey={activeRight} onChange={setActiveRight} />
          </div>
        </div>
      </Stack>
    </Frame>
  );
};

export const Size = () => {
  const [activeSmall, setActiveSmall] = useState('tab1');
  const [activeMedium, setActiveMedium] = useState('tab1');
  const [activeLarge, setActiveLarge] = useState('tab1');

  return (
    <Frame title="size">
      <Stack gap="spacious">
        <div>
          <div
            style={{
              fontFamily: 'monospace',
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            small
          </div>
          <Tabs size="small" items={tabItems} activeKey={activeSmall} onChange={setActiveSmall} />
        </div>
        <div>
          <div
            style={{
              fontFamily: 'monospace',
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            medium (default)
          </div>
          <Tabs size="medium" items={tabItems} activeKey={activeMedium} onChange={setActiveMedium} />
        </div>
        <div>
          <div
            style={{
              fontFamily: 'monospace',
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
            large
          </div>
          <Tabs size="large" items={tabItems} activeKey={activeLarge} onChange={setActiveLarge} />
        </div>
      </Stack>
    </Frame>
  );
};

export const ActiveKey = () => {
  const [activeKey, setActiveKey] = useState('tab1');

  return (
    <Frame title="activeKey / onChange (controlled)">
      <Tabs items={tabItems} activeKey={activeKey} onChange={setActiveKey} />
      <div style={{ marginTop: 12, color: color.text.secondary }}>Active tab: {activeKey}</div>
    </Frame>
  );
};

export const DefaultActiveKey = () => (
  <Frame title="defaultActiveKey (uncontrolled)">
    <Tabs items={tabItems} defaultActiveKey="tab2" />
  </Frame>
);

export const Items = () => {
  const [activeKey, setActiveKey] = useState('overview');

  const items = [
    {
      key: 'overview',
      label: 'Overview',
      icon: <span aria-hidden>ℹ️</span>,
      children: <div style={{ padding: 16 }}>Overview content</div>,
    },
    {
      key: 'billing',
      label: 'Billing',
      icon: <span aria-hidden>💳</span>,
      children: <div style={{ padding: 16 }}>Billing content</div>,
    },
    {
      key: 'security',
      label: 'Security',
      icon: <span aria-hidden>🔒</span>,
      disabled: true,
      children: <div style={{ padding: 16 }}>Security content</div>,
    },
  ];

  return (
    <Frame title="items (icon / disabled)">
      <Tabs items={items} activeKey={activeKey} onChange={setActiveKey} />
      <div style={{ marginTop: 12, color: color.text.secondary }}>
        “Security” is disabled (focus skips it with arrow keys).
      </div>
    </Frame>
  );
};

export const SettingsTabsExample = () => {
  const [activeKey, setActiveKey] = useState('profile');

  const items = [
    {
      key: 'profile',
      label: 'Profile',
      children: (
        <Stack gap="condensed">
          <div style={{ fontWeight: 600 }}>Profile settings</div>
          <div style={{ color: color.text.secondary }}>Update your public information.</div>
        </Stack>
      ),
    },
    {
      key: 'security',
      label: 'Security',
      children: (
        <Stack gap="condensed">
          <div style={{ fontWeight: 600 }}>Security</div>
          <div style={{ color: color.text.secondary }}>Manage password and 2FA.</div>
        </Stack>
      ),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      children: (
        <Stack gap="condensed">
          <div style={{ fontWeight: 600 }}>Notifications</div>
          <div style={{ color: color.text.secondary }}>Choose what we email you.</div>
        </Stack>
      ),
    },
  ];

  return (
    <Frame title="settings panel">
      <Tabs type="card" items={items} activeKey={activeKey} onChange={setActiveKey} />
    </Frame>
  );
};

export const ProductDetailsTabsExample = () => {
  const [activeKey, setActiveKey] = useState('details');

  const items = [
    {
      key: 'details',
      label: 'Details',
      children: <div style={{ padding: 16 }}>Product details and description.</div>,
    },
    {
      key: 'specs',
      label: 'Specs',
      children: <div style={{ padding: 16 }}>Technical specifications.</div>,
    },
    {
      key: 'reviews',
      label: 'Reviews',
      children: <div style={{ padding: 16 }}>Customer reviews and ratings.</div>,
    },
  ];

  return (
    <Frame title="product details">
      <Tabs type="line" items={items} activeKey={activeKey} onChange={setActiveKey} />
    </Frame>
  );
};

export const Variants = () => (
  <>
    <Type />
    <TabPosition />
    <Size />
    <ActiveKey />
    <DefaultActiveKey />
    <Items />
  </>
);

export const Examples = () => (
  <>
    <SettingsTabsExample />
    <ProductDetailsTabsExample />
  </>
);
