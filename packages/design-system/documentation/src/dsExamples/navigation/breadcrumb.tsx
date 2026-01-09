import React from 'react';

import { Breadcrumb, Stack } from '@grasdouble/lufa_design-system';
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
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Current Product' },
      ]}
    />
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <Stack gap="spacious">
      {(['small', 'medium', 'large'] as const).map((size) => (
        <div key={size}>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            size: {size}
          </div>
          <Breadcrumb
            size={size}
            items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Current Page' }]}
          />
        </div>
      ))}
    </Stack>
  </Frame>
);

export const Separator = () => (
  <Frame title="separator">
    <Stack gap="spacious">
      {(['/', '›', '→'] as const).map((separator) => (
        <div key={separator}>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            separator: {JSON.stringify(separator)}
          </div>
          <Breadcrumb
            separator={separator}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Docs', href: '/docs' },
              { label: 'Components', href: '/docs/components' },
              { label: 'Breadcrumb' },
            ]}
          />
        </div>
      ))}
    </Stack>
  </Frame>
);

export const ProductHierarchyExample = () => (
  <Frame title="product hierarchy">
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'E-commerce', href: '/ecommerce' },
        { label: 'Products', href: '/ecommerce/products' },
        { label: 'Electronics', href: '/ecommerce/products/electronics' },
        {
          label: 'Computers',
          href: '/ecommerce/products/electronics/computers',
        },
        {
          label: 'Laptops',
          href: '/ecommerce/products/electronics/computers/laptops',
        },
        { label: 'Current Product' },
      ]}
    />
  </Frame>
);

export const CompactHeaderExample = () => (
  <Frame title="compact header">
    <Stack gap="condensed">
      <Breadcrumb
        size="small"
        items={[{ label: 'Home', href: '/' }, { label: 'Settings', href: '/settings' }, { label: 'Security' }]}
      />
      <div style={{ fontWeight: tokens.fontWeight.bold }}>Security</div>
    </Stack>
  </Frame>
);

export const Variants = () => (
  <>
    <Size />
    <Separator />
  </>
);

export const Examples = () => (
  <>
    <ProductHierarchyExample />
    <CompactHeaderExample />
  </>
);
