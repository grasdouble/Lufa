import React from 'react';

import { Alert, Badge, Button, Stack, tokens } from '@grasdouble/lufa_design-system';

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

const InlineIcon = ({ label }: { label: string }) => (
  <span
    style={{
      display: 'inline-flex',
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      background: color.background.secondary,
      outline: `1px solid ${color.border.light}`,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: 12,
      color: color.text.secondary,
    }}
  >
    {label}
  </span>
);

export const LiveDemo = () => (
  <Frame title="live demo">
    <Alert title="Saved" variant="success">
      Your changes have been saved.
    </Alert>
  </Frame>
);

export const Variant = () => (
  <Frame title="variant">
    <Stack direction="vertical" gap="normal">
      <Alert title="Info" variant="info">
        This is an informational message.
      </Alert>
      <Alert title="Success" variant="success">
        The operation completed successfully.
      </Alert>
      <Alert title="Warning" variant="warning">
        Please double-check your input before continuing.
      </Alert>
      <Alert title="Error" variant="error">
        Something went wrong. Try again.
      </Alert>
    </Stack>
  </Frame>
);

export const Closable = () => (
  <Frame title="closable">
    <Alert title="Trial expires soon" variant="warning" closable onClose={() => console.log('Alert closed')}>
      Upgrade your plan to keep access to premium features.
    </Alert>
  </Frame>
);

export const Icon = () => (
  <Frame title="icon">
    <Alert title="New message" variant="info" icon={<InlineIcon label="!" />}>
      Support replied to your ticket.
    </Alert>
  </Frame>
);

export const ClosableWithActionExample = () => (
  <Frame title="closable + action">
    <Alert title="Trial expires soon" variant="warning" closable onClose={() => console.log('Alert closed')}>
      <Stack direction="vertical" gap="condensed">
        <div>Upgrade your plan to keep access to premium features.</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          <Button variant="solid">Upgrade</Button>
          <Button variant="text">Later</Button>
        </div>
      </Stack>
    </Alert>
  </Frame>
);

export const CustomIconWithMetaExample = () => (
  <Frame title="custom icon + meta">
    <Alert title="New message" variant="info" icon={<InlineIcon label="!" />}>
      <Stack direction="vertical" gap="condensed">
        <div>Support replied to your ticket.</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          <Badge variant="info" rounded>
            Ticket #1284
          </Badge>
          <Button variant="link">Open</Button>
        </div>
      </Stack>
    </Alert>
  </Frame>
);

export const Variants = () => (
  <>
    <Variant />
    <Closable />
    <Icon />
  </>
);

export const Examples = () => (
  <>
    <ClosableWithActionExample />
    <CustomIconWithMetaExample />
  </>
);
