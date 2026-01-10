import React, { useState } from 'react';

import { Menu, Stack } from '@grasdouble/lufa_design-system';
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

const menuItems = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'products', label: 'Products', href: '/products' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'contact', label: 'Contact', href: '/contact' },
];

const menuWithSubmenu = [
  { key: 'home', label: 'Home', href: '/' },
  {
    key: 'products',
    label: 'Products',
    children: [
      {
        key: 'electronics',
        label: 'Electronics',
        href: '/products/electronics',
      },
      { key: 'clothing', label: 'Clothing', href: '/products/clothing' },
      { key: 'books', label: 'Books', href: '/products/books' },
    ],
  },
  { key: 'about', label: 'About', href: '/about' },
];

export const LiveDemo = () => (
  <Frame title="live demo">
    <Menu items={menuItems} selectedKey="home" />
  </Frame>
);

export const Mode = () => (
  <Frame title="mode">
    <Stack gap="spacious">
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          vertical (default)
        </div>
        <Menu mode="vertical" items={menuItems} selectedKey="products" />
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          horizontal
        </div>
        <Menu mode="horizontal" items={menuItems} selectedKey="about" />
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          inline
        </div>
        <Menu mode="inline" items={menuItems} selectedKey="contact" />
      </div>
    </Stack>
  </Frame>
);

export const Theme = () => (
  <Frame title="theme">
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
          light
        </div>
        <Menu theme="light" items={menuItems} selectedKey="home" />
      </div>
      <div>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            marginBottom: tokens.spacing.sm,
          }}
        >
          dark
        </div>
        <Menu theme="dark" items={menuItems} selectedKey="home" />
      </div>
    </div>
  </Frame>
);

export const SelectedKey = () => {
  const [selectedKey, setSelectedKey] = useState('home');

  return (
    <Frame title="selectedKey / onSelect">
      <Menu items={menuItems} selectedKey={selectedKey} onSelect={setSelectedKey} />
      <div
        style={{
          marginTop: tokens.spacing.md,
          fontFamily: tokens.fontFamily.mono,
          color: tokens.color.text.tertiary,
          fontSize: tokens.fontSize.xs,
        }}
      >
        selectedKey: {selectedKey}
      </div>
    </Frame>
  );
};

export const SubmenuExample = () => (
  <Frame title="submenu">
    <Menu items={menuWithSubmenu} selectedKey="electronics" />
  </Frame>
);

export const HeaderNavExample = () => (
  <Frame title="header navigation">
    <div
      style={{
        borderRadius: tokens.radius.lg,
        border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
        backgroundColor: tokens.color.background.primary,
        color: tokens.color.text.primary,
        padding: tokens.spacing.md,
      }}
    >
      <Menu mode="horizontal" items={menuItems} selectedKey="products" />
    </div>
  </Frame>
);

export const Variants = () => (
  <>
    <Mode />
    <Theme />
    <SelectedKey />
  </>
);

export const Examples = () => (
  <>
    <SubmenuExample />
    <HeaderNavExample />
  </>
);
