/* eslint-disable no-console */
import React from 'react';

import { Button, Card, Stack, Typography } from '@grasdouble/lufa_design-system';
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
    <Card title="Example Card" subtitle="Cards are versatile containers">
      <Typography variant="body" color="secondary">
        Group related content and actions.
      </Typography>
    </Card>
  </Frame>
);

export const Variant = () => (
  <Frame title="variant">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: tokens.spacing.base,
      }}
    >
      <Card variant="default" title="Default">
        <Typography variant="bodySmall" color="secondary">
          Standard card
        </Typography>
      </Card>
      <Card variant="elevated" title="Elevated">
        <Typography variant="bodySmall" color="secondary">
          With shadow
        </Typography>
      </Card>
      <Card variant="outlined" title="Outlined">
        <Typography variant="bodySmall" color="secondary">
          Stronger border
        </Typography>
      </Card>
      <Card variant="filled" title="Filled">
        <Typography variant="bodySmall" color="secondary">
          Filled background
        </Typography>
      </Card>
    </div>
  </Frame>
);

export const Padding = () => (
  <Frame title="padding">
    <Stack direction="vertical" gap="normal">
      {(['none', 'small', 'medium', 'large'] as const).map((padding) => (
        <Card
          key={padding}
          padding={padding}
          variant="outlined"
          title={`Padding: ${padding}`}
          subtitle="Compare content spacing"
        >
          <Typography variant="bodySmall" color="secondary">
            The `padding` prop adjusts the internal spacing.
          </Typography>
        </Card>
      ))}
    </Stack>
  </Frame>
);

export const Interactive = () => (
  <Frame title="interactive">
    <Stack direction="vertical" gap="normal">
      <Card title="Static">
        <Typography variant="bodySmall" color="secondary">
          Default card, no hover affordance.
        </Typography>
      </Card>

      <Card title="Hoverable" hoverable>
        <Typography variant="bodySmall" color="secondary">
          Adds a hover affordance.
        </Typography>
      </Card>

      <Card title="Clickable" subtitle="hoverable + onClick" hoverable onClick={() => console.log('Card clicked')}>
        <Stack direction="vertical" gap="normal">
          <Typography variant="bodySmall" color="secondary">
            Click the card.
          </Typography>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              fontSize: tokens.fontSize.xs,
            }}
          >
            (Check console)
          </div>
        </Stack>
      </Card>
    </Stack>
  </Frame>
);

export const FooterActionsExample = () => (
  <Frame title="footer actions">
    <Card
      variant="outlined"
      title="Card with actions"
      subtitle="Footer actions"
      footer={
        <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
          <Button variant="solid">Primary</Button>
          <Button variant="text">Cancel</Button>
        </div>
      }
    >
      <Typography variant="body" color="secondary">
        Use the footer slot for actions.
      </Typography>
    </Card>
  </Frame>
);

export const ClickableCardExample = () => (
  <Frame title="clickable card">
    <Card
      variant="elevated"
      hoverable
      onClick={() => console.log('Card clicked')}
      title="Clickable"
      subtitle="hoverable + onClick"
    >
      <Stack direction="vertical" gap="normal">
        <Typography variant="body" color="secondary">
          Combine hoverable and onClick for interactive cards.
        </Typography>
        <div
          style={{
            fontFamily: tokens.fontFamily.mono,
            color: tokens.color.text.tertiary,
            fontSize: tokens.fontSize.xs,
          }}
        >
          (Check console)
        </div>
      </Stack>
    </Card>
  </Frame>
);

export const Variants = () => (
  <>
    <Variant />
    <Padding />
    <Interactive />
  </>
);

export const Examples = () => (
  <>
    <FooterActionsExample />
    <ClickableCardExample />
  </>
);
