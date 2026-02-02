/**
 * Live examples for Badge component documentation
 * These components are imported and rendered in Badge.mdx
 */

import React from 'react';

import type { BadgeProps } from '@grasdouble/lufa_design-system';
import { Badge } from '@grasdouble/lufa_design-system';

/**
 * Basic demo showing default Badge usage
 */
export function LiveDemo() {
  return <Badge variant="success">Active</Badge>;
}

/**
 * All variant demonstrations
 */
export function AllVariants() {
  const variants: { value: BadgeProps['variant']; label: string; description: string }[] = [
    { value: 'default', label: 'Default', description: 'Neutral labels, general tags' },
    { value: 'success', label: 'Success', description: 'Active, published, completed' },
    { value: 'error', label: 'Error', description: 'Failed, blocked, offline' },
    { value: 'warning', label: 'Warning', description: 'Pending, in review, attention needed' },
    { value: 'info', label: 'Info', description: 'Beta, new feature, version tags' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-token-spacing-comfortable)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-default)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {variants.map(({ value, label, description }) => (
        <div
          key={value}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--lufa-token-spacing-default)',
            padding: 'var(--lufa-token-spacing-compact)',
            border: '1px solid var(--lufa-token-color-border-light)',
            borderRadius: 'var(--lufa-token-radius-sm)',
            backgroundColor: 'var(--lufa-token-color-background-base)',
          }}
        >
          <Badge variant={value}>{label}</Badge>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-sm)',
                fontWeight: 'var(--lufa-token-font-weight-semibold)',
                color: 'var(--lufa-token-color-text-primary)',
              }}
            >
              variant="{value}"
            </span>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              {description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Size variants demonstration
 */
export function AllSizes() {
  const sizes: { value: BadgeProps['size']; label: string; fontSize: string }[] = [
    { value: 'sm', label: 'Small', fontSize: '10px' },
    { value: 'md', label: 'Medium', fontSize: '12px' },
    { value: 'lg', label: 'Large', fontSize: '14px' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-token-spacing-comfortable)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-default)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {sizes.map(({ value, label, fontSize }) => (
        <div
          key={value}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--lufa-token-spacing-default)',
            padding: 'var(--lufa-token-spacing-compact)',
            border: '1px solid var(--lufa-token-color-border-light)',
            borderRadius: 'var(--lufa-token-radius-sm)',
            backgroundColor: 'var(--lufa-token-color-background-base)',
          }}
        >
          <Badge size={value} variant="success">
            {label}
          </Badge>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-sm)',
                fontWeight: 'var(--lufa-token-font-weight-semibold)',
                color: 'var(--lufa-token-color-text-primary)',
              }}
            >
              size="{value}"
            </span>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              Font size: {fontSize}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Dot indicator demonstration
 */
export function WithDotIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-token-spacing-comfortable)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-default)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {/* Without dot */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--lufa-token-spacing-default)',
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-light)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <Badge variant="error">5 alerts</Badge>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-sm)',
              fontWeight: 'var(--lufa-token-font-weight-semibold)',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Without dot
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
            }}
          >
            Standard badge without indicator
          </span>
        </div>
      </div>

      {/* With dot */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--lufa-token-spacing-default)',
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-light)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <Badge dot variant="error">
          5 alerts
        </Badge>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-sm)',
              fontWeight: 'var(--lufa-token-font-weight-semibold)',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            With dot
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
            }}
          >
            Draws attention with 6px dot indicator
          </span>
        </div>
      </div>

      {/* Dot with different variants */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--lufa-token-spacing-default)',
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-light)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <div style={{ display: 'flex', gap: 'var(--lufa-token-spacing-compact)', flexWrap: 'wrap' }}>
          <Badge dot variant="success">
            Online
          </Badge>
          <Badge dot variant="warning">
            2 pending
          </Badge>
          <Badge dot variant="info">
            New
          </Badge>
          <Badge dot variant="default">
            Unread
          </Badge>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-sm)',
              fontWeight: 'var(--lufa-token-font-weight-semibold)',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Multiple variants with dot
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
            }}
          >
            Dot indicator works with all variants
          </span>
        </div>
      </div>
    </div>
  );
}
