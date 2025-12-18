import React from 'react';

import { Badge, Stack, tokens } from '@grasdouble/lufa_design-system';

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

export const LiveDemo = () => (
  <Frame title="live demo">
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Badge variant="primary" rounded>
        New
      </Badge>
      <Badge variant="success" dot rounded>
        Synced
      </Badge>
      <Badge variant="warning" rounded>
        Pending
      </Badge>
    </div>
  </Frame>
);

export const Variant = () => (
  <Frame title="variant">
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {(['default', 'primary', 'success', 'warning', 'danger', 'info'] as const).map((variant) => (
        <Badge key={variant} variant={variant} rounded>
          {variant}
        </Badge>
      ))}
    </div>
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Badge key={size} size={size} variant="primary" rounded>
          {size}
        </Badge>
      ))}
    </div>
  </Frame>
);

export const Dot = () => (
  <Frame title="dot">
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Badge variant="success" dot>
        Synced
      </Badge>
      <Badge variant="warning" dot>
        Delayed
      </Badge>
      <Badge variant="danger" dot>
        Action required
      </Badge>
    </div>
  </Frame>
);

export const Rounded = () => (
  <Frame title="rounded">
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Badge variant="info">default radius</Badge>
      <Badge variant="info" rounded>
        rounded
      </Badge>
      <Badge variant="success" dot rounded>
        dot + rounded
      </Badge>
    </div>
  </Frame>
);

export const Variants = () => (
  <>
    <Variant />
    <Size />
    <Dot />
    <Rounded />
  </>
);

export const StatusListExample = () => (
  <Frame title="status list">
    <Stack direction="vertical" gap="condensed">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ color: color.text.primary }}>Payments</div>
        <Badge variant="success" dot rounded>
          Healthy
        </Badge>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ color: color.text.primary }}>Webhooks</div>
        <Badge variant="warning" dot rounded>
          Delayed
        </Badge>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ color: color.text.primary }}>Fraud checks</div>
        <Badge variant="danger" dot rounded>
          Action required
        </Badge>
      </div>
    </Stack>
  </Frame>
);

export const NavigationCountExample = () => (
  <Frame title="navigation count">
    <Stack direction="vertical" gap="condensed">
      {[
        { label: 'Inbox', count: 12, variant: 'primary' as const },
        { label: 'Mentions', count: 3, variant: 'info' as const },
        { label: 'Archived', count: 0, variant: 'default' as const },
      ].map(({ label, count, variant }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ color: color.text.primary }}>{label}</div>
          {count > 0 ? (
            <Badge variant={variant} rounded>
              {count}
            </Badge>
          ) : (
            <div style={{ color: color.text.tertiary, fontSize: 12 }}>—</div>
          )}
        </div>
      ))}
    </Stack>
  </Frame>
);

export const Examples = () => (
  <>
    <StatusListExample />
    <NavigationCountExample />
  </>
);
