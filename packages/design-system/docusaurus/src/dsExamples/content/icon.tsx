/**
 * Live examples for Icon component documentation
 * These components are imported and rendered in icon.mdx
 */

import React from 'react';

import { Icon } from '@grasdouble/lufa_design-system';

/**
 * Basic demo showing default Icon usage
 */
export function LiveDemo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon name="user" />
      <span>Default icon</span>
    </div>
  );
}

/**
 * Size variants demonstration
 */
export function SizeVariants() {
  const sizes: { value: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; label: string; pixels: string }[] = [
    { value: 'xs', label: 'Extra Small', pixels: '16px' },
    { value: 'sm', label: 'Small', pixels: '20px' },
    { value: 'md', label: 'Medium', pixels: '24px' },
    { value: 'lg', label: 'Large', pixels: '32px' },
    { value: 'xl', label: 'Extra Large', pixels: '40px' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-semantic-ui-spacing-comfortable)',
        padding: 'var(--lufa-semantic-ui-spacing-default)',
        border: '1px solid var(--lufa-semantic-ui-border-default)',
        borderRadius: 'var(--lufa-primitive-radius-scale-base)',
      }}
    >
      {sizes.map(({ value, label, pixels }) => (
        <div
          key={value}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--lufa-semantic-ui-spacing-default)',
            padding: 'var(--lufa-semantic-ui-spacing-compact)',
            border: '1px solid var(--lufa-semantic-ui-border-default)',
            borderRadius: 'var(--lufa-primitive-radius-scale-sm)',
            backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
          }}
        >
          <Icon name="star" size={value} color="primary" aria-hidden="true" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 'var(--lufa-primitive-typography-font-size-sm)',
                fontWeight: 'var(--lufa-primitive-typography-font-weight-semibold)',
                color: 'var(--lufa-semantic-ui-text-primary)',
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: 'var(--lufa-primitive-typography-font-size-xs)',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              size="{value}" ({pixels})
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Color variants demonstration
 */
export function ColorVariants() {
  const colors: {
    value: 'currentColor' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'muted';
    label: string;
  }[] = [
    { value: 'currentColor', label: 'Current Color (inherit from parent)' },
    { value: 'primary', label: 'Primary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'success', label: 'Success' },
    { value: 'error', label: 'Error' },
    { value: 'warning', label: 'Warning' },
    { value: 'info', label: 'Info' },
    { value: 'muted', label: 'Muted' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-semantic-ui-spacing-comfortable)',
        padding: 'var(--lufa-semantic-ui-spacing-default)',
        border: '1px solid var(--lufa-semantic-ui-border-default)',
        borderRadius: 'var(--lufa-primitive-radius-scale-base)',
      }}
    >
      {colors.map(({ value, label }) => (
        <div
          key={value}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--lufa-semantic-ui-spacing-default)',
            padding: 'var(--lufa-semantic-ui-spacing-compact)',
            border: '1px solid var(--lufa-semantic-ui-border-default)',
            borderRadius: 'var(--lufa-primitive-radius-scale-sm)',
            backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
            color: value === 'currentColor' ? 'var(--lufa-core-brand-primary-default)' : undefined,
          }}
        >
          <Icon name="heart" size="lg" color={value} aria-hidden="true" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 'var(--lufa-primitive-typography-font-size-sm)',
                fontWeight: 'var(--lufa-primitive-typography-font-weight-semibold)',
                color: 'var(--lufa-semantic-ui-text-primary)',
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: 'var(--lufa-primitive-typography-font-size-xs)',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              color="{value}"
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Title prop examples for accessibility
 */
export function TitleExamples() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-semantic-ui-spacing-comfortable)',
        padding: 'var(--lufa-semantic-ui-spacing-default)',
        border: '1px solid var(--lufa-semantic-ui-border-default)',
        borderRadius: 'var(--lufa-primitive-radius-scale-base)',
      }}
    >
      {/* Decorative icon (no title) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--lufa-semantic-ui-spacing-default)',
          padding: 'var(--lufa-semantic-ui-spacing-compact)',
          border: '1px solid var(--lufa-semantic-ui-border-default)',
          borderRadius: 'var(--lufa-primitive-radius-scale-sm)',
          backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
        }}
      >
        <Icon name="check" size="md" color="success" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-primitive-typography-font-size-sm)',
              fontWeight: 'var(--lufa-primitive-typography-font-weight-semibold)',
              color: 'var(--lufa-semantic-ui-text-primary)',
            }}
          >
            Decorative Icon
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-primitive-typography-font-size-xs)',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            No title prop - aria-hidden="true" applied automatically
          </span>
        </div>
      </div>

      {/* Accessible icon (with title) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--lufa-semantic-ui-spacing-default)',
          padding: 'var(--lufa-semantic-ui-spacing-compact)',
          border: '1px solid var(--lufa-semantic-ui-border-default)',
          borderRadius: 'var(--lufa-primitive-radius-scale-sm)',
          backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
        }}
      >
        <Icon name="alert-circle" size="md" color="warning" title="Warning: This action cannot be undone" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-primitive-typography-font-size-sm)',
              fontWeight: 'var(--lufa-primitive-typography-font-weight-semibold)',
              color: 'var(--lufa-semantic-ui-text-primary)',
            }}
          >
            Accessible Icon
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-primitive-typography-font-size-xs)',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            With title - role="img" and aria-label applied automatically
          </span>
        </div>
      </div>

      {/* Icon-only button (with title) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--lufa-semantic-ui-spacing-default)',
          padding: 'var(--lufa-semantic-ui-spacing-compact)',
          border: '1px solid var(--lufa-semantic-ui-border-default)',
          borderRadius: 'var(--lufa-primitive-radius-scale-sm)',
          backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
        }}
      >
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--lufa-semantic-ui-spacing-compact)',
            border: '1px solid var(--lufa-semantic-ui-border-default)',
            borderRadius: 'var(--lufa-primitive-radius-scale-base)',
            backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
            cursor: 'pointer',
          }}
          aria-label="Delete item"
        >
          <Icon name="trash" size="md" color="error" title="Delete" />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-primitive-typography-font-size-sm)',
              fontWeight: 'var(--lufa-primitive-typography-font-weight-semibold)',
              color: 'var(--lufa-semantic-ui-text-primary)',
            }}
          >
            Icon-Only Button
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-primitive-typography-font-size-xs)',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            Button has aria-label, Icon has title for tooltip
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Polymorphic rendering with 'as' prop
 */
export function PolymorphicVariant() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-semantic-ui-spacing-comfortable)',
        padding: 'var(--lufa-semantic-ui-spacing-default)',
        border: '1px solid var(--lufa-semantic-ui-border-default)',
        borderRadius: 'var(--lufa-primitive-radius-scale-base)',
      }}
    >
      {/* Default (span) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--lufa-semantic-ui-spacing-default)',
          padding: 'var(--lufa-semantic-ui-spacing-compact)',
          border: '1px solid var(--lufa-semantic-ui-border-default)',
          borderRadius: 'var(--lufa-primitive-radius-scale-sm)',
          backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
        }}
      >
        <Icon name="user" size="md" color="primary" aria-hidden="true" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-primitive-typography-font-size-sm)',
              fontWeight: 'var(--lufa-primitive-typography-font-weight-semibold)',
              color: 'var(--lufa-semantic-ui-text-primary)',
            }}
          >
            Default (span)
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-primitive-typography-font-size-xs)',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            &lt;Icon name="user" /&gt; - renders as &lt;span&gt;
          </span>
        </div>
      </div>

      {/* As div */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--lufa-semantic-ui-spacing-default)',
          padding: 'var(--lufa-semantic-ui-spacing-compact)',
          border: '1px solid var(--lufa-semantic-ui-border-default)',
          borderRadius: 'var(--lufa-primitive-radius-scale-sm)',
          backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
        }}
      >
        <Icon name="home" size="md" color="primary" as="div" aria-hidden="true" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-primitive-typography-font-size-sm)',
              fontWeight: 'var(--lufa-primitive-typography-font-weight-semibold)',
              color: 'var(--lufa-semantic-ui-text-primary)',
            }}
          >
            As div
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-primitive-typography-font-size-xs)',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            &lt;Icon name="home" as="div" /&gt; - renders as &lt;div&gt;
          </span>
        </div>
      </div>

      {/* As i (semantic) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--lufa-semantic-ui-spacing-default)',
          padding: 'var(--lufa-semantic-ui-spacing-compact)',
          border: '1px solid var(--lufa-semantic-ui-border-default)',
          borderRadius: 'var(--lufa-primitive-radius-scale-sm)',
          backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
        }}
      >
        <Icon name="star" size="md" color="primary" as="i" aria-hidden="true" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-primitive-typography-font-size-sm)',
              fontWeight: 'var(--lufa-primitive-typography-font-weight-semibold)',
              color: 'var(--lufa-semantic-ui-text-primary)',
            }}
          >
            As i (semantic)
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-primitive-typography-font-size-xs)',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            &lt;Icon name="star" as="i" /&gt; - renders as &lt;i&gt;
          </span>
        </div>
      </div>
    </div>
  );
}
