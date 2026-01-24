/**
 * Live examples for Icon component documentation
 * These components are imported and rendered in icon.mdx
 */

import React from 'react';

import type { IconName } from '@grasdouble/lufa_design-system';
import { Icon } from '@grasdouble/lufa_design-system';

/**
 * Basic demo showing default Icon usage
 */
export function LiveDemo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--lufa-token-spacing-default)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-base)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      <Icon name="user" size="md" color="primary" title="User profile" />
      <span style={{ color: 'var(--lufa-token-color-text-primary)' }}>Default Icon with title</span>
    </div>
  );
}

/**
 * Gallery showing all available icon names
 */
export function IconGallery() {
  const icons: IconName[] = [
    'user',
    'home',
    'check',
    'x',
    'chevron-down',
    'chevron-up',
    'chevron-left',
    'chevron-right',
    'arrow-left',
    'arrow-right',
    'arrow-up',
    'arrow-down',
    'search',
    'settings',
    'heart',
    'star',
    'bell',
    'mail',
    'calendar',
    'file',
    'folder',
    'trash',
    'edit',
    'plus',
    'minus',
    'info',
    'alert-circle',
    'alert-triangle',
    'help-circle',
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 'var(--lufa-token-spacing-default)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-base)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {icons.map((iconName) => (
        <div
          key={iconName}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--lufa-token-spacing-compact)',
            padding: 'var(--lufa-token-spacing-compact)',
            border: '1px solid var(--lufa-token-color-border-subtle)',
            borderRadius: 'var(--lufa-token-radius-sm)',
            backgroundColor: 'var(--lufa-token-color-background-base)',
          }}
        >
          <Icon name={iconName} size="lg" color="primary" aria-hidden="true" />
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
              textAlign: 'center',
              wordBreak: 'break-word',
            }}
          >
            {iconName}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Size variants demonstration
 */
export function SizeVariants() {
  const sizes: Array<{ value: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; label: string; pixels: string }> = [
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
        gap: 'var(--lufa-token-spacing-comfortable)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-base)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {sizes.map(({ value, label, pixels }) => (
        <div
          key={value}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--lufa-token-spacing-default)',
            padding: 'var(--lufa-token-spacing-compact)',
            border: '1px solid var(--lufa-token-color-border-subtle)',
            borderRadius: 'var(--lufa-token-radius-sm)',
            backgroundColor: 'var(--lufa-token-color-background-base)',
          }}
        >
          <Icon name="star" size={value} color="primary" aria-hidden="true" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-sm)',
                fontWeight: 'var(--lufa-token-font-weight-semibold)',
                color: 'var(--lufa-token-color-text-primary)',
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-secondary)',
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
  const colors: Array<{
    value: 'currentColor' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'muted';
    label: string;
  }> = [
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
        gap: 'var(--lufa-token-spacing-comfortable)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-base)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {colors.map(({ value, label }) => (
        <div
          key={value}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--lufa-token-spacing-default)',
            padding: 'var(--lufa-token-spacing-compact)',
            border: '1px solid var(--lufa-token-color-border-subtle)',
            borderRadius: 'var(--lufa-token-radius-sm)',
            backgroundColor: 'var(--lufa-token-color-background-base)',
            color: value === 'currentColor' ? 'var(--lufa-token-color-text-accent)' : undefined,
          }}
        >
          <Icon name="heart" size="lg" color={value} aria-hidden="true" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-sm)',
                fontWeight: 'var(--lufa-token-font-weight-semibold)',
                color: 'var(--lufa-token-color-text-primary)',
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-secondary)',
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
        gap: 'var(--lufa-token-spacing-comfortable)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-base)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {/* Decorative icon (no title) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--lufa-token-spacing-default)',
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <Icon name="check" size="md" color="success" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-sm)',
              fontWeight: 'var(--lufa-token-font-weight-semibold)',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Decorative Icon
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
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
          gap: 'var(--lufa-token-spacing-default)',
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <Icon name="alert-triangle" size="md" color="warning" title="Warning: This action cannot be undone" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-sm)',
              fontWeight: 'var(--lufa-token-font-weight-semibold)',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Accessible Icon
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
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
          gap: 'var(--lufa-token-spacing-default)',
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--lufa-token-spacing-compact)',
            border: '1px solid var(--lufa-token-color-border-base)',
            borderRadius: 'var(--lufa-token-radius-base)',
            backgroundColor: 'var(--lufa-token-color-background-base)',
            cursor: 'pointer',
          }}
          aria-label="Delete item"
        >
          <Icon name="trash" size="md" color="error" title="Delete" />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-sm)',
              fontWeight: 'var(--lufa-token-font-weight-semibold)',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Icon-Only Button
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
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
        gap: 'var(--lufa-token-spacing-comfortable)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-base)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {/* Default (span) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--lufa-token-spacing-default)',
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <Icon name="user" size="md" color="primary" aria-hidden="true" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-sm)',
              fontWeight: 'var(--lufa-token-font-weight-semibold)',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Default (span)
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
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
          gap: 'var(--lufa-token-spacing-default)',
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <Icon name="home" size="md" color="primary" as="div" aria-hidden="true" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-sm)',
              fontWeight: 'var(--lufa-token-font-weight-semibold)',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            As div
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
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
          gap: 'var(--lufa-token-spacing-default)',
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <Icon name="star" size="md" color="primary" as="i" aria-hidden="true" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-sm)',
              fontWeight: 'var(--lufa-token-font-weight-semibold)',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            As i (semantic)
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
            }}
          >
            &lt;Icon name="star" as="i" /&gt; - renders as &lt;i&gt;
          </span>
        </div>
      </div>
    </div>
  );
}
