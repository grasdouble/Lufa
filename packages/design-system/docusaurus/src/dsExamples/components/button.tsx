/**
 * Live examples for Button component documentation
 * These components are imported and rendered in button.mdx
 */

import React from 'react';

import { Button } from '@grasdouble/lufa_design-system';

/**
 * Basic demo showing default Button usage
 */
export function LiveDemo() {
  return <Button>Button</Button>;
}

export function SizeVariantsDemo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--lufa-token-spacing-default)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-default)',
        borderRadius: 'var(--lufa-token-radius-base)',
        flexWrap: 'wrap',
      }}
    >
      <Button size="sm" variant="primary">
        Small
      </Button>
      <Button size="md" variant="primary">
        Medium
      </Button>
      <Button size="lg" variant="primary">
        Large
      </Button>
    </div>
  );
}

export function LoadingStatesDemo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--lufa-token-spacing-default)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-default)',
        borderRadius: 'var(--lufa-token-radius-base)',
        flexWrap: 'wrap',
      }}
    >
      <Button loading variant="primary">
        Saving
      </Button>
      <Button loading variant="success">
        Publishing
      </Button>
      <Button loading variant="danger">
        Deleting
      </Button>
    </div>
  );
}

export function TypeVariantsDemo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--lufa-token-spacing-default)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-default)',
        borderRadius: 'var(--lufa-token-radius-base)',
        flexWrap: 'wrap',
      }}
    >
      <Button type="solid" variant="primary">
        Solid
      </Button>
      <Button type="outline" variant="primary">
        Outline
      </Button>
      <Button type="ghost" variant="primary">
        Ghost
      </Button>
    </div>
  );
}

export function VariantDemo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--lufa-token-spacing-default)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-default)',
        borderRadius: 'var(--lufa-token-radius-base)',
        flexWrap: 'wrap',
      }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="info">Info</Button>
      <Button variant="neutral">Neutral</Button>
    </div>
  );
}

export function RadiusDemo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--lufa-token-spacing-default)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-default)',
        borderRadius: 'var(--lufa-token-radius-base)',
        flexWrap: 'wrap',
      }}
    >
      <Button radius="none">None</Button>
      <Button radius="sm">Small</Button>
      <Button radius="base">Base</Button>
      <Button radius="md">Medium</Button>
      <Button radius="full">Full</Button>
    </div>
  );
}

export function IconDemo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--lufa-token-spacing-default)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-default)',
        borderRadius: 'var(--lufa-token-radius-base)',
        flexWrap: 'wrap',
      }}
    >
      <Button iconLeft="search">Search</Button>
      <Button iconRight="arrow-right">Continue</Button>
      <Button iconLeft="plus" variant="success">
        Add
      </Button>
    </div>
  );
}
