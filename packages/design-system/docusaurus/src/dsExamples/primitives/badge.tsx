/**
 * Live examples for Badge component documentation
 * These components are imported and rendered in badge.mdx
 */

import React from 'react';

import type { BadgeProps } from '@grasdouble/lufa_design-system';
import { Badge } from '@grasdouble/lufa_design-system';

/**
 * Basic demo showing default Badge usage
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
      <Badge variant="success">Active</Badge>
      <span style={{ color: 'var(--lufa-token-color-text-primary)' }}>Default Badge with semantic variant</span>
    </div>
  );
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
        border: '1px solid var(--lufa-token-color-border-base)',
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
            border: '1px solid var(--lufa-token-color-border-subtle)',
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
        border: '1px solid var(--lufa-token-color-border-base)',
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
            border: '1px solid var(--lufa-token-color-border-subtle)',
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
        border: '1px solid var(--lufa-token-color-border-base)',
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
          border: '1px solid var(--lufa-token-color-border-subtle)',
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
          border: '1px solid var(--lufa-token-color-border-subtle)',
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
          border: '1px solid var(--lufa-token-color-border-subtle)',
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

/**
 * Notification badges with counts
 */
export function NotificationBadges() {
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
      {/* Navigation with notification counts */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--lufa-token-spacing-comfortable)',
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-compact)' }}>
          <span style={{ fontSize: 'var(--lufa-token-font-size-sm)' }}>Messages</span>
          <Badge dot variant="error" size="sm">
            5
          </Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-compact)' }}>
          <span style={{ fontSize: 'var(--lufa-token-font-size-sm)' }}>Tasks</span>
          <Badge dot variant="warning" size="sm">
            2
          </Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-compact)' }}>
          <span style={{ fontSize: 'var(--lufa-token-font-size-sm)' }}>Alerts</span>
          <Badge dot variant="info" size="sm">
            New
          </Badge>
        </div>
      </div>

      {/* Inbox items with unread indicators */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--lufa-token-spacing-compact)',
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-default)' }}>
          <Badge dot variant="default" size="sm">
            Unread
          </Badge>
          <span style={{ fontSize: 'var(--lufa-token-font-size-sm)' }}>New message from John</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-default)' }}>
          <Badge dot variant="default" size="sm">
            Unread
          </Badge>
          <span style={{ fontSize: 'var(--lufa-token-font-size-sm)' }}>Team update: Project milestone reached</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--lufa-token-spacing-default)' }}>
          <span style={{ fontSize: 'var(--lufa-token-font-size-sm)', marginLeft: '66px' }}>
            Meeting notes from yesterday
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Status labels for data lists
 */
export function StatusLabels() {
  type User = {
    name: string;
    status: 'active' | 'inactive' | 'pending';
    role: string;
  }

  const users: User[] = [
    { name: 'Alice Johnson', status: 'active', role: 'Admin' },
    { name: 'Bob Smith', status: 'inactive', role: 'User' },
    { name: 'Carol White', status: 'pending', role: 'Editor' },
    { name: 'David Lee', status: 'active', role: 'User' },
  ];

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="success" size="sm">
            Active
          </Badge>
        );
      case 'inactive':
        return (
          <Badge variant="error" size="sm">
            Inactive
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="warning" size="sm">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-base)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {users.map((user, index) => (
        <div
          key={user.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--lufa-token-spacing-default)',
            padding: 'var(--lufa-token-spacing-compact)',
            borderBottom: index < users.length - 1 ? '1px solid var(--lufa-token-color-border-subtle)' : undefined,
          }}
        >
          <span
            style={{
              flex: 1,
              fontSize: 'var(--lufa-token-font-size-sm)',
              fontWeight: 'var(--lufa-token-font-weight-medium)',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            {user.name}
          </span>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
              width: '80px',
            }}
          >
            {user.role}
          </span>
          {getStatusBadge(user.status)}
        </div>
      ))}
    </div>
  );
}

/**
 * Category tags for content
 */
export function CategoryTags() {
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
      {/* Article with categories */}
      <div
        style={{
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--lufa-token-spacing-compact)',
            marginBottom: 'var(--lufa-token-spacing-compact)',
          }}
        >
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-md)',
              fontWeight: 'var(--lufa-token-font-weight-semibold)',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Getting Started with Design Systems
          </span>
          <Badge variant="info" size="sm">
            New
          </Badge>
        </div>
        <div style={{ display: 'flex', gap: 'var(--lufa-token-spacing-compact)', flexWrap: 'wrap' }}>
          <Badge variant="default" size="sm">
            React
          </Badge>
          <Badge variant="default" size="sm">
            TypeScript
          </Badge>
          <Badge variant="default" size="sm">
            Design
          </Badge>
          <Badge variant="default" size="sm">
            Tutorial
          </Badge>
        </div>
      </div>

      {/* Project with tags */}
      <div
        style={{
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <div style={{ marginBottom: 'var(--lufa-token-spacing-compact)' }}>
          <span
            style={{
              fontSize: 'var(--lufa-token-font-size-md)',
              fontWeight: 'var(--lufa-token-font-weight-semibold)',
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            E-commerce Platform Redesign
          </span>
        </div>
        <div style={{ display: 'flex', gap: 'var(--lufa-token-spacing-compact)', flexWrap: 'wrap' }}>
          <Badge variant="default" size="sm">
            Frontend
          </Badge>
          <Badge variant="default" size="sm">
            UI/UX
          </Badge>
          <Badge variant="default" size="sm">
            High Priority
          </Badge>
        </div>
      </div>
    </div>
  );
}

/**
 * Real-world combination examples
 */
export function RealWorldCombinations() {
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
      {/* Dashboard metrics with counts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 'var(--lufa-token-spacing-default)',
        }}
      >
        <div
          style={{
            padding: 'var(--lufa-token-spacing-default)',
            border: '1px solid var(--lufa-token-color-border-subtle)',
            borderRadius: 'var(--lufa-token-radius-base)',
            backgroundColor: 'var(--lufa-token-color-background-base)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--lufa-token-spacing-compact)',
          }}
        >
          <span style={{ fontSize: 'var(--lufa-token-font-size-xs)', color: 'var(--lufa-token-color-text-secondary)' }}>
            Active Users
          </span>
          <Badge variant="success" size="lg">
            1,234
          </Badge>
        </div>
        <div
          style={{
            padding: 'var(--lufa-token-spacing-default)',
            border: '1px solid var(--lufa-token-color-border-subtle)',
            borderRadius: 'var(--lufa-token-radius-base)',
            backgroundColor: 'var(--lufa-token-color-background-base)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--lufa-token-spacing-compact)',
          }}
        >
          <span style={{ fontSize: 'var(--lufa-token-font-size-xs)', color: 'var(--lufa-token-color-text-secondary)' }}>
            Errors Today
          </span>
          <Badge variant="error" size="lg">
            3
          </Badge>
        </div>
        <div
          style={{
            padding: 'var(--lufa-token-spacing-default)',
            border: '1px solid var(--lufa-token-color-border-subtle)',
            borderRadius: 'var(--lufa-token-radius-base)',
            backgroundColor: 'var(--lufa-token-color-background-base)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--lufa-token-spacing-compact)',
          }}
        >
          <span style={{ fontSize: 'var(--lufa-token-font-size-xs)', color: 'var(--lufa-token-color-text-secondary)' }}>
            Pending Tasks
          </span>
          <Badge variant="warning" size="lg">
            12
          </Badge>
        </div>
      </div>

      {/* Feature list with version badges */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--lufa-token-spacing-default)',
            padding: 'var(--lufa-token-spacing-compact)',
            borderBottom: '1px solid var(--lufa-token-color-border-subtle)',
          }}
        >
          <span style={{ flex: 1, fontSize: 'var(--lufa-token-font-size-sm)' }}>Dark Mode Support</span>
          <Badge variant="success" size="sm">
            Stable
          </Badge>
          <Badge variant="success" size="sm">
            Available
          </Badge>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--lufa-token-spacing-default)',
            padding: 'var(--lufa-token-spacing-compact)',
            borderBottom: '1px solid var(--lufa-token-color-border-subtle)',
          }}
        >
          <span style={{ flex: 1, fontSize: 'var(--lufa-token-font-size-sm)' }}>AI Assistant</span>
          <Badge variant="info" size="sm">
            Beta
          </Badge>
          <Badge variant="success" size="sm">
            Available
          </Badge>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--lufa-token-spacing-default)',
            padding: 'var(--lufa-token-spacing-compact)',
          }}
        >
          <span style={{ flex: 1, fontSize: 'var(--lufa-token-font-size-sm)' }}>Real-time Collaboration</span>
          <Badge variant="warning" size="sm">
            Experimental
          </Badge>
          <Badge variant="default" size="sm">
            Coming Soon
          </Badge>
        </div>
      </div>

      {/* Inline status with text */}
      <div
        style={{
          padding: 'var(--lufa-token-spacing-compact)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
        }}
      >
        <p style={{ fontSize: 'var(--lufa-token-font-size-sm)', margin: 0 }}>
          Project <strong>Design System v2.0</strong> is{' '}
          <Badge variant="success" size="sm">
            active
          </Badge>{' '}
          with{' '}
          <Badge dot variant="warning" size="sm">
            2 pending
          </Badge>{' '}
          code reviews.
        </p>
      </div>
    </div>
  );
}
