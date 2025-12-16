import React, { useState } from "react";
import { Menu, Stack, tokens } from "@grasdouble/lufa_design-system";

const { color } = tokens;

const Frame = ({ title, children }: { title?: string; children: React.ReactNode }) => (
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
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        {title}
      </div>
    ) : null}
    {children}
  </div>
);

const menuItems = [
  { key: "home", label: "Home", href: "/" },
  { key: "products", label: "Products", href: "/products" },
  { key: "about", label: "About", href: "/about" },
  { key: "contact", label: "Contact", href: "/contact" },
];

const menuWithSubmenu = [
  { key: "home", label: "Home", href: "/" },
  {
    key: "products",
    label: "Products",
    children: [
      {
        key: "electronics",
        label: "Electronics",
        href: "/products/electronics",
      },
      { key: "clothing", label: "Clothing", href: "/products/clothing" },
      { key: "books", label: "Books", href: "/products/books" },
    ],
  },
  { key: "about", label: "About", href: "/about" },
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
        <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>vertical (default)</div>
        <Menu mode="vertical" items={menuItems} selectedKey="products" />
      </div>
      <div>
        <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>horizontal</div>
        <Menu mode="horizontal" items={menuItems} selectedKey="about" />
      </div>
      <div>
        <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>inline</div>
        <Menu mode="inline" items={menuItems} selectedKey="contact" />
      </div>
    </Stack>
  </Frame>
);

export const Theme = () => (
  <Frame title="theme">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
      <div>
        <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>light</div>
        <Menu theme="light" items={menuItems} selectedKey="home" />
      </div>
      <div>
        <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>dark</div>
        <Menu theme="dark" items={menuItems} selectedKey="home" />
      </div>
    </div>
  </Frame>
);

export const SelectedKey = () => {
  const [selectedKey, setSelectedKey] = useState("home");

  return (
    <Frame title="selectedKey / onSelect">
      <Menu items={menuItems} selectedKey={selectedKey} onSelect={setSelectedKey} />
      <div style={{ marginTop: 12, fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>
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
        borderRadius: 12,
        border: `1px solid ${color.border.light}`,
        backgroundColor: color.background.primary,
        color: color.text.primary,
        padding: 12,
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
