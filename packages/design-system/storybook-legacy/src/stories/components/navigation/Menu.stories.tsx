import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Menu, Stack } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '4. Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Menu component for navigation and action lists. Supports vertical, horizontal, and inline modes with optional submenus.',
      },
    },
  },
  tags: [],
  argTypes: {
    items: { control: 'object', description: 'Array of menu items' },
    selectedKey: { control: 'text', description: 'Selected menu item key' },
    mode: { control: 'select', options: ['vertical', 'horizontal', 'inline'], description: 'Menu mode' },
    theme: { control: 'select', options: ['light', 'dark'], description: 'Theme variant' },
    onSelect: { action: 'selected' },
  },
} satisfies Meta<typeof Menu>;

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

const basicItems = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'products', label: 'Products', href: '/products' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'contact', label: 'Contact', href: '/contact' },
];

const itemsWithIcons = [
  { key: 'home', label: 'Home', icon: <HomeIcon />, href: '/' },
  { key: 'profile', label: 'Profile', icon: <UserIcon />, href: '/profile' },
  { key: 'settings', label: 'Settings', icon: <SettingsIcon />, href: '/settings' },
];

const itemsWithSubmenus = [
  { key: 'home', label: 'Home', icon: <HomeIcon />, href: '/' },
  {
    key: 'products',
    label: 'Products',
    children: [
      { key: 'all-products', label: 'All Products', href: '/products' },
      { key: 'electronics', label: 'Electronics', href: '/products/electronics' },
      { key: 'clothing', label: 'Clothing', href: '/products/clothing' },
    ],
  },
  {
    key: 'account',
    label: 'Account',
    icon: <UserIcon />,
    children: [
      { key: 'profile', label: 'Profile', href: '/profile' },
      { key: 'settings', label: 'Settings', href: '/settings' },
      { key: 'logout', label: 'Logout', onClick: () => console.log('Logout') },
    ],
  },
];

export const Playground: Story = {
  args: {
    items: basicItems,
    mode: 'vertical',
    theme: 'light',
  },
};

export const BasicMenu: Story = {
  render: () => {
    const [selected, setSelected] = useState('home');
    return <Menu items={basicItems} selectedKey={selected} onSelect={setSelected} />;
  },
};

export const Modes: Story = {
  render: () => (
    <Stack gap="spacious">
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Vertical (Default)
        </h4>
        <Menu items={basicItems} mode="vertical" />
      </div>
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Horizontal
        </h4>
        <Menu items={basicItems} mode="horizontal" />
      </div>
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Inline
        </h4>
        <Menu items={basicItems} mode="inline" />
      </div>
    </Stack>
  ),
};

export const Themes: Story = {
  render: () => (
    <Stack gap="spacious">
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Light Theme
        </h4>
        <Menu items={itemsWithIcons} theme="light" />
      </div>
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Dark Theme
        </h4>
        <div
          style={{
            padding: '16px',
            backgroundColor: tokens.color.surface.overlay,
            borderRadius: '8px',
          }}
        >
          <Menu items={itemsWithIcons} theme="dark" />
        </div>
      </div>
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => {
    const [selected, setSelected] = useState('home');
    return <Menu items={itemsWithIcons} selectedKey={selected} onSelect={setSelected} />;
  },
};

export const WithSubmenus: Story = {
  render: () => {
    const [selected, setSelected] = useState('home');
    return <Menu items={itemsWithSubmenus} selectedKey={selected} onSelect={setSelected} mode="vertical" />;
  },
};

export const DisabledItems: Story = {
  render: () => (
    <Menu
      items={[
        { key: 'home', label: 'Home', href: '/' },
        { key: 'products', label: 'Products (Disabled)', href: '/products', disabled: true },
        { key: 'about', label: 'About', href: '/about' },
        { key: 'contact', label: 'Contact (Disabled)', href: '/contact', disabled: true },
      ]}
    />
  ),
};

export const SidebarNavigation: Story = {
  render: () => {
    const [selected, setSelected] = useState('dashboard');
    return (
      <div
        style={{
          width: '280px',
          padding: '16px',
          backgroundColor: tokens.color.background.secondary,
          borderRadius: '8px',
        }}
      >
        <h3
          style={{
            marginBottom: '16px',
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          Dashboard
        </h3>
        <Menu
          items={[
            { key: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
            {
              key: 'users',
              label: 'Users',
              icon: <UserIcon />,
              children: [
                { key: 'all-users', label: 'All Users' },
                { key: 'add-user', label: 'Add User' },
                { key: 'user-roles', label: 'User Roles' },
              ],
            },
            {
              key: 'settings',
              label: 'Settings',
              icon: <SettingsIcon />,
              children: [
                { key: 'general', label: 'General' },
                { key: 'security', label: 'Security' },
                { key: 'notifications', label: 'Notifications' },
              ],
            },
          ]}
          selectedKey={selected}
          onSelect={setSelected}
          mode="vertical"
        />
      </div>
    );
  },
};
